"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { verifyAdminCredentials } from "@/lib/auth";
import { getSession } from "@/lib/session";

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

export type LoginFormState = {
  status: "idle" | "error";
  message?: string;
};

export async function loginAction(
  _prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { status: "error", message: "נא למלא אימייל וסיסמה" };
  }

  const valid = await verifyAdminCredentials(
    parsed.data.email,
    parsed.data.password
  );

  if (!valid) {
    return { status: "error", message: "אימייל או סיסמה שגויים" };
  }

  const session = await getSession();
  session.adminEmail = parsed.data.email;
  await session.save();

  redirect("/admin");
}

export async function logoutAction() {
  const session = await getSession();
  session.destroy();
  redirect("/admin/login");
}
