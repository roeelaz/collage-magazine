import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export async function requireAdmin() {
  const session = await getSession();
  if (!session.adminEmail) {
    redirect("/admin/login");
  }
  return session;
}
