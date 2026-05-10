"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { canUseDemoData } from "@/lib/demo-mode";
import { parseEmailRecipients, sendEmail } from "@/lib/email";
import { parentEnquiryAdminEmail, parentEnquiryConfirmationEmail, parentEnquiryTutorEmail } from "@/lib/email-templates";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { enquirySchema } from "@/lib/validation";

export async function submitEnquiry(formData: FormData) {
  const returnPath = String(formData.get("returnPath") ?? "");
  const safeReturnPath = returnPath.startsWith("/tutor/") && !returnPath.startsWith("//") ? returnPath : "";
  const parsed = enquirySchema.safeParse({
    tutorId: formData.get("tutorId"),
    parentName: formData.get("parentName"),
    parentEmail: formData.get("parentEmail"),
    parentPhone: formData.get("parentPhone") || undefined,
    studentYearGroup: formData.get("studentYearGroup"),
    subject: formData.get("subject"),
    level: formData.get("level"),
    tuitionPreference: formData.get("tuitionPreference"),
    location: formData.get("location") || undefined,
    message: formData.get("message"),
    consentGiven: formData.get("consentGiven"),
    website: formData.get("website") || undefined
  });

  if (!parsed.success) {
    const message = encodeURIComponent(parsed.error.issues[0]?.message ?? "Please check the form.");
    redirect(safeReturnPath ? `${safeReturnPath}?error=${message}#enquire` : `/find-a-tutor?error=${message}`);
  }

  const enquiry = parsed.data;
  let tutorEmail: string | undefined;
  let saved = false;

  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.from("enquiries").insert({
      tutor_id: enquiry.tutorId,
      parent_name: enquiry.parentName,
      parent_email: enquiry.parentEmail,
      parent_phone: enquiry.parentPhone,
      student_year_group: enquiry.studentYearGroup,
      subject: enquiry.subject,
      level: enquiry.level,
      tuition_preference: enquiry.tuitionPreference,
      location: enquiry.location,
      message: enquiry.message,
      consent_given: true,
      status: "new"
    });
    if (error) throw error;
    saved = true;

    try {
      const adminSupabase = createSupabaseAdminClient();
      const { data: tutor } = await adminSupabase.from("tutor_profiles").select("user_id").eq("id", enquiry.tutorId).eq("status", "published").single();
      if (tutor?.user_id) {
        const { data: owner } = await adminSupabase.from("profiles").select("email").eq("auth_user_id", tutor.user_id).single();
        tutorEmail = owner?.email;
      }
    } catch {
      // Tutor notification requires SUPABASE_SERVICE_ROLE_KEY; parent/admin email can still be sent.
    }
  } catch {
    if (!canUseDemoData()) {
      const message = encodeURIComponent("Unable to send enquiry. Please try again later.");
      redirect(safeReturnPath ? `${safeReturnPath}?error=${message}#enquire` : `/find-a-tutor?error=${message}`);
    }
  }

  const adminEmails = parseEmailRecipients(process.env.ADMIN_EMAIL);
  await Promise.all([
    tutorEmail
      ? sendEmail({
          to: tutorEmail,
          ...parentEnquiryTutorEmail(enquiry.parentName, enquiry.message)
        })
      : Promise.resolve(),
    adminEmails.length
      ? sendEmail({
          to: adminEmails,
          ...parentEnquiryAdminEmail(enquiry.tutorId, enquiry.parentName, enquiry.message)
        })
      : Promise.resolve(),
    sendEmail({
      to: enquiry.parentEmail,
      ...parentEnquiryConfirmationEmail()
    })
  ]);

  revalidatePath("/admin/enquiries");
  redirect(safeReturnPath ? `${safeReturnPath}?enquiry=sent#enquire` : saved ? "/enquiry-submitted" : "/enquiry-submitted?demo=1");
}
