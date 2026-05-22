import { createSupabaseServerClient } from "@/lib/supabase/server";

export type EmailLog = {
  id: string;
  recipient: string;
  subject: string;
  status: "sent" | "failed" | "skipped";
  provider: string;
  provider_message_id?: string | null;
  error_message?: string | null;
  created_at: string;
};

export async function getAdminEmailLogs({
  query,
  status,
  limit = 100
}: {
  query?: string;
  status?: string;
  limit?: number;
} = {}) {
  const supabase = await createSupabaseServerClient();
  let request = supabase
    .from("email_logs")
    .select("id, recipient, subject, status, provider, provider_message_id, error_message, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (status && ["sent", "failed", "skipped"].includes(status)) {
    request = request.eq("status", status);
  }

  if (query?.trim()) {
    const term = query.trim().replaceAll("%", "\\%").replaceAll("_", "\\_");
    request = request.or(`recipient.ilike.%${term}%,subject.ilike.%${term}%`);
  }

  const { data, error } = await request;
  if (error) throw error;
  return (data ?? []) as EmailLog[];
}
