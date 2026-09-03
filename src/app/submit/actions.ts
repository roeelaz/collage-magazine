"use server";

import { z } from "zod";
import { sendSubmissionEmail } from "@/lib/mail";

const submissionSchema = z.object({
  name: z.string().trim().min(1, "נא למלא שם מלא"),
  email: z.string().trim().email("נא להזין כתובת אימייל תקינה"),
  phone: z.string().trim().min(6, "נא להזין מספר טלפון תקין"),
  workTitle: z.string().trim().min(1, "נא למלא את שם היצירה"),
  message: z.string().trim().min(1, "נא להדביק את תוכן היצירה (או קישור אליה)"),
});

export type SubmitFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitWork(
  _prevState: SubmitFormState,
  formData: FormData
): Promise<SubmitFormState> {
  const parsed = submissionSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    workTitle: formData.get("workTitle"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "נא לבדוק את הטופס ולנסות שוב",
    };
  }

  try {
    await sendSubmissionEmail(parsed.data);
  } catch (error) {
    console.error("Failed to send submission email", error);
    return {
      status: "error",
      message: "אירעה תקלה בשליחה. נסו שוב או כתבו לנו ישירות למייל.",
    };
  }

  return { status: "success", message: "היצירה נשלחה בהצלחה, תודה!" };
}
