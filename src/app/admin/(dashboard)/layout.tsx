import Link from "next/link";
import { requireAdmin } from "@/lib/require-admin";
import { logoutAction } from "@/app/admin/login/actions";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/admin" className="text-ink hover:text-accent">
            לוח בקרה
          </Link>
          <Link href="/admin/issues" className="text-ink hover:text-accent">
            גיליונות
          </Link>
          <Link href="/admin/updates" className="text-ink hover:text-accent">
            עדכונים
          </Link>
        </nav>
        <form action={logoutAction}>
          <button type="submit" className="text-sm text-ink-soft hover:text-accent">
            יציאה
          </button>
        </form>
      </div>
      <div className="mt-8">{children}</div>
    </div>
  );
}
