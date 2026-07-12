import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { AdminLoginForm } from "@/components/admin-login-form";

export default async function AdminLoginPage() {
  const session = await getSession();
  if (session.adminEmail) {
    redirect("/admin");
  }

  return (
    <div className="mx-auto max-w-sm px-6 py-24">
      <h1 className="font-serif text-2xl font-bold text-ink">כניסת מערכת</h1>
      <div className="mt-8">
        <AdminLoginForm />
      </div>
    </div>
  );
}
