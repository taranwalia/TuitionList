import { Resend } from "resend";

type EmailPayload = {
  to: string | string[];
  subject: string;
  html: string;
};

export function parseEmailRecipients(value: string | undefined) {
  return (
    value
      ?.split(",")
      .map((email) => email.trim())
      .filter(Boolean) ?? []
  );
}

export async function sendEmail(payload: EmailPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM ?? "TuitionList <hello@tuitionlist.co.uk>";

  if (!apiKey) {
    console.info("Email skipped because RESEND_API_KEY is not configured.", {
      to: payload.to,
      subject: payload.subject
    });
    return { skipped: true };
  }

  const resend = new Resend(apiKey);
  try {
    return await resend.emails.send({
      from,
      ...payload
    });
  } catch (error) {
    console.error("Email failed to send.", {
      to: payload.to,
      subject: payload.subject,
      error: error instanceof Error ? error.message : "Unknown email error"
    });
    return { error: true };
  }
}
