import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function verifyAdminCredentials(
  email: string,
  password: string
): Promise<boolean> {
  const admin = await prisma.adminUser.findUnique({ where: { email } });
  if (!admin) return false;
  return bcrypt.compare(password, admin.passwordHash);
}
