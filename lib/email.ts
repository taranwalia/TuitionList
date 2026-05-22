import { Resend } from "resend";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

type EmailPayload = {
  to: string | string[];
  subject: string;
  html: string;
};

type EmailLogStatus = "sent" | "failed" | "skipped";

export function parseEmailRecipients(value: string | undefined) {
  const recipients =
    value
      ?.split(",")
      .map((email) => email.trim())
      .filter(Boolean) ?? [];

  return Array.from(new Map(recipients.map((email) => [email.toLowerCase(), email])).values());
}

export async function sendEmail(payload: EmailPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM ?? "TuitionList <hello@tuitionlist.co.uk>";

  if (!apiKey) {
    console.info("Email skipped because RESEND_API_KEY is not configured.", {
      to: payload.to,
      subject: payload.subject
    });
    await logEmailAttempt({
      to: payload.to,
      subject: payload.subject,
      status: "skipped",
      errorMessage: "RESEND_API_KEY is not configured."
    });
    return { skipped: true };
  }

  const resend = new Resend(apiKey);
  try {
    const result = await resend.emails.send({
      from,
      ...payload
    });

    const providerMessageId = getProviderMessageId(result);
    const providerError = getProviderError(result);
    await logEmailAttempt({
      to: payload.to,
      subject: payload.subject,
      status: providerError ? "failed" : "sent",
      providerMessageId,
      errorMessage: providerError
    });
    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown email error";
    console.error("Email failed to send.", {
      to: payload.to,
      subject: payload.subject,
      error: errorMessage
    });
    await logEmailAttempt({
      to: payload.to,
      subject: payload.subject,
      status: "failed",
      errorMessage
    });
    return { error: true };
  }
}

async function logEmailAttempt({
  to,
  subject,
  status,
  providerMessageId,
  errorMessage
}: {
  to: string | string[];
  subject: string;
  status: EmailLogStatus;
  providerMessageId?: string | null;
  errorMessage?: string | null;
}) {
  try {
    const recipients = Array.isArray(to) ? to : [to];
    const rows = recipients.filter(Boolean).map((recipient) => ({
      recipient,
      subject,
      status,
      provider: "resend",
      provider_message_id: providerMessageId || null,
      error_message: errorMessage || null
    }));

    if (rows.length === 0) return;
    const supabase = createSupabaseAdminClient();
    await supabase.from("email_logs").insert(rows);
  } catch (error) {
    console.info("Email log skipped.", {
      subject,
      error: error instanceof Error ? error.message : "Email log table may not be ready."
    });
  }
}

function getProviderMessageId(result: unknown) {
  if (!result || typeof result !== "object") return null;
  const data = "data" in result ? (result as { data?: unknown }).data : undefined;
  if (!data || typeof data !== "object") return null;
  const id = "id" in data ? (data as { id?: unknown }).id : undefined;
  return typeof id === "string" ? id : null;
}

function getProviderError(result: unknown) {
  if (!result || typeof result !== "object") return null;
  const error = "error" in result ? (result as { error?: unknown }).error : undefined;
  if (!error) return null;
  if (typeof error === "string") return error;
  if (typeof error === "object" && "message" in error) {
    const message = (error as { message?: unknown }).message;
    return typeof message === "string" ? message : "Email provider returned an error.";
  }
  return "Email provider returned an error.";
}
