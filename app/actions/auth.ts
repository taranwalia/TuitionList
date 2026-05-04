"use server";

import { redirect } from "next/navigation";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function signUpTutor(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || password.length < 8) {
    redirect("/signup?error=Please enter an email and a password of at least 8 characters.");
  }

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    if (!data.user) throw new Error("Supabase did not return a user for this signup.");

    const adminSupabase = createSupabaseAdminClient();
    const { error: profileError } = await adminSupabase.from("profiles").upsert(
      {
        auth_user_id: data.user.id,
        role: "tutor",
        email
      },
      { onConflict: "auth_user_id" }
    );
    if (profileError) throw profileError;
  } catch {
    redirect("/signup?error=Unable to create account. Check Supabase configuration.");
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
