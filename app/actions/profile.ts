"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { canUseDemoData } from "@/lib/demo-mode";
import { parseEmailRecipients, sendEmail } from "@/lib/email";
import { adminProfileSubmittedEmail, profileSubmittedEmail } from "@/lib/email-templates";
import { getOrCreateLookupRows } from "@/lib/profile-lookups";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";
import { tutorProfileSchema } from "@/lib/validation";

export async function submitTutorProfile(formData: FormData) {
  const parsed = tutorProfileSchema.safeParse({
    displayName: formData.get("displayName"),
    fullName: formData.get("fullName"),
    phone: formData.get("phone") || undefined,
    town: formData.get("town"),
    county: formData.get("county"),
    postcodeArea: formData.get("postcodeArea"),
    onlineAvailable: formData.get("onlineAvailable") === "on",
    inPersonAvailable: formData.get("inPersonAvailable") === "on",
    willingToTravel: formData.get("willingToTravel") === "on",
    minRate: formData.get("minRate"),
    maxRate: formData.get("maxRate"),
    shortBio: formData.get("shortBio"),
    longBio: formData.get("longBio"),
    experience: formData.get("experience"),
    subjects: formData.getAll("subjects").map(String),
    levels: formData.getAll("levels").map(String),
    websiteUrl: formData.get("websiteUrl") || "",
    linkedinUrl: formData.get("linkedinUrl") || "",
    qualificationTitle: formData.get("qualificationTitle") || "",
    qualificationInstitution: formData.get("qualificationInstitution") || "",
    qualificationYear: formData.get("qualificationYear") || "",
    qualificationDescription: formData.get("qualificationDescription") || "",
    showEmail: formData.get("showEmail") === "on",
    showPhone: formData.get("showPhone") === "on",
    showWhatsapp: formData.get("showWhatsapp") === "on"
  });

  if (!parsed.success) {
    redirect(`/tutor-dashboard/profile?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Please check the profile form.")}`);
  }

  const profileInput = parsed.data;
  const displayName = profileInput.displayName;
  const subjects = profileInput.subjects;
  const levels = profileInput.levels;
  let unauthenticated = false;
  let tutorEmail: string | undefined;
  let saved = false;
  let photoWarning: string | null = null;
  let shouldSendSubmissionEmails = false;

  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();
    if (!user) {
      unauthenticated = true;
      throw new Error("Unauthenticated");
    }
    tutorEmail = user.email;
    const slug = slugify(`${displayName} ${subjects[0] ?? "tutor"} ${profileInput.town} ${user.id.slice(0, 8)}`);
    const profilePhoto = formData.get("profilePhoto");
    const { data: existingProfile, error: existingProfileError } = await supabase
      .from("tutor_profiles")
      .select("status")
      .eq("user_id", user.id)
      .maybeSingle();
    if (existingProfileError) throw existingProfileError;
    shouldSendSubmissionEmails = existingProfile?.status !== "pending";

    const { data: profile, error } = await supabase
      .from("tutor_profiles")
      .upsert(
        {
          user_id: user.id,
          full_name: profileInput.fullName,
          display_name: displayName,
          slug,
          town: profileInput.town,
          county: profileInput.county,
          postcode_area: profileInput.postcodeArea.toUpperCase(),
          online_available: profileInput.onlineAvailable,
          in_person_available: profileInput.inPersonAvailable,
          willing_to_travel: profileInput.willingToTravel,
          min_rate: profileInput.minRate,
          max_rate: profileInput.maxRate,
          short_bio: profileInput.shortBio,
          long_bio: profileInput.longBio,
          experience: profileInput.experience,
          website_url: profileInput.websiteUrl || null,
          linkedin_url: profileInput.linkedinUrl || null,
          phone: profileInput.phone || null,
          show_phone: profileInput.showPhone,
          show_email: profileInput.showEmail,
          show_whatsapp: profileInput.showWhatsapp,
          status: "pending",
          submitted_at: new Date().toISOString()
        },
        { onConflict: "user_id" }
      )
      .select("id")
      .single();
    if (error) throw error;

    const [deleteSubjects, deleteLevels] = await Promise.all([
      supabase.from("tutor_subjects").delete().eq("tutor_id", profile.id),
      supabase.from("tutor_levels").delete().eq("tutor_id", profile.id)
    ]);
    if (deleteSubjects.error) throw deleteSubjects.error;
    if (deleteLevels.error) throw deleteLevels.error;

    const lookupSupabase = createSupabaseAdminClient();
    const [subjectRows, levelRows] = await Promise.all([
      getOrCreateLookupRows(lookupSupabase, "subjects", subjects),
      getOrCreateLookupRows(lookupSupabase, "levels", levels)
    ]);

    const [insertSubjects, insertLevels] = await Promise.all([
      subjectRows.length
        ? supabase.from("tutor_subjects").insert(subjectRows.map((subject) => ({ tutor_id: profile.id, subject_id: subject.id })))
        : Promise.resolve(),
      levelRows.length
        ? supabase.from("tutor_levels").insert(levelRows.map((level) => ({ tutor_id: profile.id, level_id: level.id })))
        : Promise.resolve()
    ]);
    if (insertSubjects && "error" in insertSubjects && insertSubjects.error) throw insertSubjects.error;
    if (insertLevels && "error" in insertLevels && insertLevels.error) throw insertLevels.error;

    const { error: deleteQualificationsError } = await supabase.from("qualifications").delete().eq("tutor_id", profile.id);
    if (deleteQualificationsError) throw deleteQualificationsError;

    if (profileInput.qualificationTitle?.trim()) {
      const { error: qualificationError } = await supabase.from("qualifications").insert({
        tutor_id: profile.id,
        title: profileInput.qualificationTitle.trim(),
        institution: profileInput.qualificationInstitution?.trim() || null,
        year: profileInput.qualificationYear?.trim() || null,
        description: profileInput.qualificationDescription?.trim() || null,
        admin_checked: false
      });
      if (qualificationError) throw qualificationError;
    }

    if (profilePhoto instanceof File && profilePhoto.size > 0) {
      try {
        if (!["image/jpeg", "image/png", "image/webp"].includes(profilePhoto.type)) {
          throw new Error("Profile photo must be a JPG, PNG or WebP image.");
        }

        if (profilePhoto.size > 5 * 1024 * 1024) {
          throw new Error("Profile photo must be 5MB or smaller.");
        }

        const extension = profilePhoto.type === "image/png" ? "png" : profilePhoto.type === "image/webp" ? "webp" : "jpg";
        const photoPath = `${user.id}/profile-photo-${Date.now()}.${extension}`;
        const storageSupabase = createSupabaseAdminClient();
        const { error: createBucketError } = await storageSupabase.storage.createBucket("profile-photos", {
          public: true,
          fileSizeLimit: 5 * 1024 * 1024,
          allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"]
        });

        if (createBucketError && !createBucketError.message.toLowerCase().includes("already exists")) {
          const { error: getBucketError } = await storageSupabase.storage.getBucket("profile-photos");
          if (getBucketError) {
            throw new Error("Profile photo storage is not ready. Run supabase/migrations/002_profile_photos_storage.sql in Supabase SQL Editor.");
          }
        }

        const { error: uploadError } = await storageSupabase.storage.from("profile-photos").upload(photoPath, profilePhoto, {
          cacheControl: "3600",
          upsert: true,
          contentType: profilePhoto.type
        });
        if (uploadError) {
          throw new Error(
            uploadError.message.toLowerCase().includes("bucket not found")
              ? "Profile photo bucket not found. Run supabase/migrations/002_profile_photos_storage.sql in Supabase SQL Editor."
              : uploadError.message
          );
        }

        const { data: publicUrlData } = storageSupabase.storage.from("profile-photos").getPublicUrl(photoPath);
        const { error: photoUpdateError } = await supabase
          .from("tutor_profiles")
          .update({ profile_photo_url: publicUrlData.publicUrl })
          .eq("id", profile.id);
        if (photoUpdateError) throw photoUpdateError;
      } catch (error) {
        photoWarning = error instanceof Error ? error.message : "Profile photo upload failed.";
      }
    }

    saved = true;
  } catch (error) {
    if (!unauthenticated && !canUseDemoData()) {
      const message = error instanceof Error ? error.message : "Unable to save profile. Check Supabase configuration.";
      redirect(`/tutor-dashboard/profile?error=${encodeURIComponent(message)}`);
    }
  }

  if (unauthenticated) redirect("/login");
  if (!saved && !canUseDemoData()) redirect("/tutor-dashboard/profile?error=Unable to save profile.");

  if (saved && shouldSendSubmissionEmails) {
    const adminEmails = parseEmailRecipients(process.env.ADMIN_EMAIL);
    await Promise.all([
      adminEmails.length
        ? sendEmail({
            to: adminEmails,
            ...adminProfileSubmittedEmail(displayName)
          })
        : Promise.resolve(),
      tutorEmail
        ? sendEmail({
            to: tutorEmail,
            ...profileSubmittedEmail(displayName)
          })
        : Promise.resolve()
    ]);
  }

  revalidatePath("/tutor-dashboard");
  if (saved && photoWarning) {
    redirect(`/tutor-dashboard/profile?warning=${encodeURIComponent(`Profile saved, but photo upload failed: ${photoWarning}`)}`);
  }
  redirect(saved ? "/tutor-dashboard?submitted=1" : "/tutor-dashboard?demo=1");
}
