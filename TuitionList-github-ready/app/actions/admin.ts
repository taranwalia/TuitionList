"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { canUseDemoData } from "@/lib/demo-mode";
import { sendEmail } from "@/lib/email";
import { accountDeletedEmail, profileApprovedEmail, profileRejectedEmail, profileSuspendedEmail } from "@/lib/email-templates";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function moderateTutor(formData: FormData) {
  const tutorId = String(formData.get("tutorId") ?? "");
  const action = String(formData.get("action") ?? "");
  const rejectionReason = String(formData.get("rejectionReason") ?? "");
  const returnTo = String(formData.get("returnTo") ?? "/admin/tutors");
  const safeReturnTo = returnTo.startsWith("/admin/") ? returnTo : "/admin/tutors";

  const status = action === "approve" ? "published" : action === "reject" ? "rejected" : action === "suspend" ? "suspended" : null;
  if (!tutorId || !status) redirect(`${safeReturnTo}?error=Invalid moderation action`);

  const { supabase } = await requireAdmin();

  try {
    const { data, error } = await supabase
      .from("tutor_profiles")
      .update({
        status,
        rejection_reason: status === "rejected" ? rejectionReason : null,
        approved_at: status === "published" ? new Date().toISOString() : null
      })
      .eq("id", tutorId)
      .select("display_name, user_id")
      .single();
    if (error) throw error;

    const { data: owner } = await supabase.from("profiles").select("email").eq("auth_user_id", data.user_id).single();
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
