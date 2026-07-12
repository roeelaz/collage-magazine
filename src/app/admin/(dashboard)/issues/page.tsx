import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";
import { deleteIssueAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminIssuesPage() {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-bold text-ink">גיליונות</h1>
        <Link
          href="/admin/issues/new"
          className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-white hover:bg-accent-dark"
        >
          גיליון חדש
        </Link>
      </div>

      <ul className="mt-8 divide-y divide-line">
        {issues.map((issue) => (
          <li key={issue.id} className="flex items-center justify-between py-4">
            <div>
              <p className="font-medium text-ink">{issue.title}</p>
              <p className="mt-1 text-sm text-ink-soft">
                {issue.publishedAt ? "פורסם" : "טיוטה"} ·{" "}
                {issue.isFree ? "חינם" : formatPrice(issue.priceAgorot ?? 0)}
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <Link
                href={`/admin/issues/${issue.id}/edit`}
                className="text-accent hover:text-accent-dark"
              >
                עריכה
              </Link>
              <form action={deleteIssueAction}>
                <input type="hidden" name="id" value={issue.id} />
                <button type="submit" className="text-ink-soft hover:text-accent">
                  מחיקה
                </button>
              </form>
            </div>
          </li>
        ))}
        {issues.length === 0 && (
          <li className="py-6 text-ink-soft">אין גיליונות עדיין.</li>
        )}
      </ul>
    </div>
  );
}
