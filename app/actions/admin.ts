"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { canUseDemoData } from "@/lib/demo-mode";
import { sendEmail } from "@/lib/email";
import { accountDeletedEmail, profileApprovedEmail, profileRejectedEmail, profileSuspendedEmail } from "@/lib/email-templates";
import { getOrCreateLookupRows } from "@/lib/profile-lookups";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { tutorProfileSchema } from "@/lib/validation";

export async function moderateTutor(formData: FormData) {
  const tutorId = String(formData.get("tutorId") ?? "");
  const action = String(formData.get("action") ?? "");
  const rejectionReason = String(formData.get("rejectionReason") ?? "");
  const returnTo = String(formData.get("returnTo") ?? "/admin/tutors");
  const safeReturnTo = returnTo.startsWith("/admin/") ? returnTo : "/admin/tutors";

  const status = action === "approve" ? "published" : action === "reject" ? "rejected" : action === "suspend" ? "suspended" : null;
  if (!tutorId || !status) redirect(`${safeReturnTo}?error=Invalid moderation action`);

  await requireAdmin();
  const adminSupabase = createSupabaseAdminClient();

  try {
    const { data, error } = await adminSupabase
      .from("tutor_profiles")
      .update({
        status,
        rejection_reason: status === "rejected" ? rejectionReason : null,
        approved_at: status === "published" ? new Date().toISOString() : null
      })
      .eq("id", tutorId)
      .neq("status", status)
      .select("display_name, user_id")
      .maybeSingle();
    if (error) throw error;

    if (data) {
      const { data: owner } = await adminSupabase.from("profiles").select("email").eq("auth_user_id", data.user_id).single();
      const email = owner?.email;
      if (email) {
        const template =
          status === "published"
            ? profileApprovedEmail(data.display_name)
            : status === "rejected"
              ? profileRejectedEmail(data.display_name, rejectionReason)
              : profileSuspendedEmail(data.display_name);

        await sendEmail({
          to: email,
          ...template
        });
      }
    }
  } catch {
    if (!canUseDemoData()) redirect(`${safeReturnTo}?error=Unable to update tutor status.`);
  }

  revalidatePath("/admin");
  revalidatePath("/admin/tutors");
  revalidatePath(`/admin/tutors/${tutorId}`);
  revalidatePath("/find-a-tutor");
  redirect(safeReturnTo);
}

export async function updateTutorChecks(formData: FormData) {
  const tutorId = String(formData.get("tutorId") ?? "");
  const returnTo = String(formData.get("returnTo") ?? "/admin/tutors");
  const safeReturnTo = returnTo.startsWith("/admin/") ? returnTo : "/admin/tutors";
  if (!tutorId) redirect(`${safeReturnTo}?error=Missing tutor`);

  const { supabase } = await requireAdmin();

  try {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("checks").upsert(
      {
        tutor_id: tutorId,
        id_seen: formData.get("idSeen") === "on",
        dbs_seen: formData.get("dbsSeen") === "on",
        qualification_seen: formData.get("qualificationSeen") === "on",
        reference_received: formData.get("referenceReceived") === "on",
        insurance_confirmed: formData.get("insuranceConfirmed") === "on",
        safeguarding_seen: formData.get("safeguardingSeen") === "on",
        notes: formData.get("notes") || null,
        updated_by: user?.id ?? null,
        updated_at: new Date().toISOString()
      },
      { onConflict: "tutor_id" }
    );
    if (error) throw error;
  } catch {
    if (!canUseDemoData()) redirect(`${safeReturnTo}?error=Unable to update tutor checks.`);
  }

  revalidatePath("/admin/tutors");
  revalidatePath(`/admin/tutors/${tutorId}`);
  redirect(safeReturnTo);
}

export async function updateTutorProfileAsAdmin(formData: FormData) {
  const tutorId = String(formData.get("tutorId") ?? "");
  const returnTo = String(formData.get("returnTo") ?? `/admin/tutors/${tutorId}/edit`);
  const safeReturnTo = returnTo.startsWith("/admin/") ? returnTo : "/admin/tutors";
  if (!tutorId) redirect("/admin/tutors?error=Missing tutor");

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
    redirect(`${safeReturnTo}?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Please check the profile form.")}`);
  }

  await requireAdmin();
  const profileInput = parsed.data;
  const adminSupabase = createSupabaseAdminClient();

  try {
    const { data: existingTutor, error: tutorError } = await adminSupabase
      .from("tutor_profiles")
      .select("id, slug")
      .eq("id", tutorId)
      .single();
    if (tutorError || !existingTutor) throw tutorError ?? new Error("Tutor profile not found.");

    const { error: updateError } = await adminSupabase
      .from("tutor_profiles")
      .update({
        display_name: profileInput.displayName,
        full_name: profileInput.fullName,
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
        show_whatsapp: profileInput.showWhatsapp
      })
      .eq("id", tutorId);
    if (updateError) throw updateError;

    const [deleteSubjects, deleteLevels] = await Promise.all([
      adminSupabase.from("tutor_subjects").delete().eq("tutor_id", tutorId),
      adminSupabase.from("tutor_levels").delete().eq("tutor_id", tutorId)
    ]);
    if (deleteSubjects.error) throw deleteSubjects.error;
    if (deleteLevels.error) throw deleteLevels.error;

    const [subjectRows, levelRows] = await Promise.all([
      getOrCreateLookupRows(adminSupabase, "subjects", profileInput.subjects),
      getOrCreateLookupRows(adminSupabase, "levels", profileInput.levels)
    ]);

    const [insertSubjects, insertLevels] = await Promise.all([
      subjectRows.length
        ? adminSupabase.from("tutor_subjects").insert(subjectRows.map((subject) => ({ tutor_id: tutorId, subject_id: subject.id })))
        : Promise.resolve(),
      levelRows.length
        ? adminSupabase.from("tutor_levels").insert(levelRows.map((level) => ({ tutor_id: tutorId, level_id: level.id })))
        : Promise.resolve()
    ]);
    if (insertSubjects && "error" in insertSubjects && insertSubjects.error) throw insertSubjects.error;
    if (insertLevels && "error" in insertLevels && insertLevels.error) throw insertLevels.error;

    const { data: existingQualification } = await adminSupabase
      .from("qualifications")
      .select("admin_checked")
      .eq("tutor_id", tutorId)
      .limit(1)
      .maybeSingle();

    const { error: deleteQualificationsError } = await adminSupabase.from("qualifications").delete().eq("tutor_id", tutorId);
    if (deleteQualificationsError) throw deleteQualificationsError;

    if (profileInput.qualificationTitle?.trim()) {
      const { error: qualificationError } = await adminSupabase.from("qualifications").insert({
        tutor_id: tutorId,
        title: profileInput.qualificationTitle.trim(),
        institution: profileInput.qualificationInstitution?.trim() || null,
        year: profileInput.qualificationYear?.trim() || null,
        description: profileInput.qualificationDescription?.trim() || null,
        admin_checked: Boolean(existingQualification?.admin_checked)
      });
      if (qualificationError) throw qualificationError;
    }

    revalidatePath("/admin");
    revalidatePath("/admin/tutors");
    revalidatePath(`/admin/tutors/${tutorId}`);
    revalidatePath(`/admin/tutors/${tutorId}/edit`);
    revalidatePath("/find-a-tutor");
    revalidatePath(`/tutor/${existingTutor.slug}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update tutor profile.";
    redirect(`${safeReturnTo}?error=${encodeURIComponent(message)}`);
  }

  redirect(`/admin/tutors/${tutorId}?updated=1`);
}

export async function deleteTutorAccount(formData: FormData) {
  const tutorId = String(formData.get("tutorId") ?? "");
  const confirmation = String(formData.get("confirmation") ?? "");
  if (!tutorId) redirect("/admin/tutors?error=Missing tutor");
  if (confirmation !== "DELETE") redirect(`/admin/tutors/${tutorId}?error=Type DELETE to confirm account deletion.`);

  const { supabase, user: adminUser } = await requireAdmin();

  try {
    const { data: tutor, error } = await supabase
      .from("tutor_profiles")
      .select("id, user_id, display_name")
      .eq("id", tutorId)
      .single();
    if (error || !tutor) throw error ?? new Error("Tutor not found.");
    if (tutor.user_id === adminUser.id) throw new Error("You cannot delete your own admin account from this screen.");

    const adminSupabase = createSupabaseAdminClient();
    const { data: owner } = await adminSupabase.from("profiles").select("email").eq("auth_user_id", tutor.user_id).single();
    const ownerEmail = owner?.email;

    const [{ data: profilePhotoObjects }, { data: verificationObjects }] = await Promise.all([
      adminSupabase.storage.from("profile-photos").list(tutor.user_id),
      adminSupabase.storage.from("verification-documents").list(tutor.id)
    ]);

    const profilePhotoPaths = profilePhotoObjects?.map((object) => `${tutor.user_id}/${object.name}`) ?? [];
    const verificationPaths = verificationObjects?.map((object) => `${tutor.id}/${object.name}`) ?? [];

    await Promise.all([
      profilePhotoPaths.length ? adminSupabase.storage.from("profile-photos").remove(profilePhotoPaths) : Promise.resolve(),
      verificationPaths.length ? adminSupabase.storage.from("verification-documents").remove(verificationPaths) : Promise.resolve()
    ]);

    if (ownerEmail) {
      await sendEmail({
        to: ownerEmail,
        ...accountDeletedEmail(tutor.display_name)
      });
    }

    const { error: deleteUserError } = await adminSupabase.auth.admin.deleteUser(tutor.user_id);
    if (deleteUserError) throw deleteUserError;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to delete tutor account.";
    redirect(`/admin/tutors/${tutorId}?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/admin");
  revalidatePath("/admin/tutors");
  revalidatePath("/find-a-tutor");
  redirect("/admin/tutors?deleted=1");
}
