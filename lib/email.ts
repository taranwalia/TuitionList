import { Resend } from "resend";

type EmailPayload = {
  to: string | string[];
  subject: string;
  html: string;
};

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
  return resend.emails.send({
    from,
    ...payload
  });
}
