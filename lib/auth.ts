import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function requireUser() {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
      error
    } = await supabase.auth.getUser();

    if (error || !user) redirect("/login");
    return { supabase, user };
  } catch {
    redirect("/login");
  }
}

export async function requireAdmin() {
  const { supabase, user } = await requireUser();
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("auth_user_id", user.id)
    .single();

  if (error || profile?.role !== "admin") redirect("/login");
  return { supabase, user };
}

export async function getCurrentUserRole() {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data } = await supabase.from("profiles").select("role").eq("auth_user_id", user.id).single();
    return data?.role ?? null;
  } catch {
    return null;
  }
}

export async function getCurrentUserSummary() {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data } = await supabase.from("profiles").select("role,email").eq("auth_user_id", user.id).maybeSingle();
    return {
      id: user.id,
      email: data?.email ?? user.email ?? "",
      role: data?.role ?? "tutor"
    };
  } catch {
    return null;
  }
}
