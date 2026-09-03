const SUBMISSIONS_INBOX = process.env.SUBMISSIONS_EMAIL || "collagemagaz@gmail.com";

type SubmissionEmail = {
  name: string;
  email: string;
  phone: string;
  workTitle: string;
  message: string;
};

/**
 * Sends the submission-form email via SMTP when configured (production),
 * otherwise logs it so the flow is testable without mail credentials (local dev).
 */
export async function sendSubmissionEmail(data: SubmissionEmail): Promise<void> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  const text = [
    `שם: ${data.name}`,
    `אימייל: ${data.email}`,
    `טלפון: ${data.phone}`,
    `כותרת היצירה: ${data.workTitle}`,
    "",
    data.message,
  ].join("\n");

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("SMTP not configured in production (SMTP_HOST/SMTP_USER/SMTP_PASS)");
    }
    console.log("[mail] SMTP not configured — logging submission instead of sending:");
    console.log(text);
    return;
  }

  const nodemailer = await import("nodemailer");
  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT ? Number(SMTP_PORT) : 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  await transport.sendMail({
    from: SMTP_USER,
    to: SUBMISSIONS_INBOX,
    replyTo: data.email,
    subject: `הגשה חדשה: ${data.workTitle}`,
    text,
  });
}
