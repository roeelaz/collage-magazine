import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const [issueCount, updateCount] = await Promise.all([
    prisma.issue.count(),
    prisma.update.count(),
  ]);

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-ink">לוח בקרה</h1>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Link
          href="/admin/issues"
          className="rounded-2xl border border-line bg-card p-6 hover:border-accent"
        >
          <p className="text-sm text-ink-soft">גיליונות</p>
          <p className="mt-1 font-serif text-3xl font-bold text-ink">
            {issueCount}
          </p>
        </Link>
        <Link
          href="/admin/updates"
          className="rounded-2xl border border-line bg-card p-6 hover:border-accent"
        >
          <p className="text-sm text-ink-soft">עדכונים</p>
          <p className="mt-1 font-serif text-3xl font-bold text-ink">
            {updateCount}
          </p>
        </Link>
      </div>
    </div>
  );
}
