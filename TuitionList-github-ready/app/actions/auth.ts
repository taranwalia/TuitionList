"use server";

import { redirect } from "next/navigation";
import { accountCreatedEmail } from "@/lib/email-templates";
import { sendEmail } from "@/lib/email";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function signUpErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "";
  if (message.toLowerCase().includes("rate limit")) {
    return "Unable to send the signup email because the email rate limit has been reached. Please try again later or contact TuitionList.";
  }
  if (message.toLowerCase().includes("already registered") || message.toLowerCase().includes("already been registered")) {
    return "An account with this email already exists. Please log in instead.";
  }
  if (message.toLowerCase().includes("signup") && message.toLowerCase().includes("disabled")) {
    return "Tutor signups are currently disabled in Supabase Auth settings.";
  }
  return "Unable to create account. Check Supabase configuration.";
}

export async function signUpTutor(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || password.length < 8) {
    redirect("/signup?error=Please enter an email and a password of at least 8 characters.");
  }

  try {
    const supabase = await createSupabaseServerClient();
    let userId: string | undefined;

    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const adminSupabase = createSupabaseAdminClient();
      const { data, error } = await adminSupabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true
      });
      if (error) throw error;
      userId = data.user?.id;

      if (!userId) throw new Error("Supabase did not return a user for this signup.");

      const { error: profileError } = await adminSupabase.from("profiles").upsert(
        {
          auth_user_id: userId,
          role: "tutor",
          email
        },
        { onConflict: "auth_user_id" }
      );
      if (profileError) console.error("Unable to create tutor profile row after signup:", profileError.message);
    } else {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      userId = data.user?.id;
      if (!userId) throw new Error("Supabase did not return a user for this signup.");
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) throw signInError;

    await sendEmail({
      to: email,
      ...accountCreatedEmail()
    });
  } catch (error) {
    redirect(`/signup?error=${encodeURIComponent(signUpErrorMessage(error))}`);
  }

  redirect("/tutor-dashboard/profile");
}

export async function signIn(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const destination = String(formData.get("destination") ?? "/tutor-dashboard");
  const safeDestination = destination.startsWith("/") && !destination.startsWith("//") ? destination : "/tutor-dashboard";

  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  } catch {
    redirect(`${safeDestination === "/admin" ? "/admin/login" : "/login"}?error=Unable to sign in.`);
  }

  redirect(safeDestination);
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/");
}
