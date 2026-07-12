import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteUpdateAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminUpdatesPage() {
  const updates = await prisma.update.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-bold text-ink">עדכונים</h1>
        <Link
          href="/admin/updates/new"
          className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-white hover:bg-accent-dark"
        >
          עדכון חדש
        </Link>
      </div>

      <ul className="mt-8 divide-y divide-line">
        {updates.map((update) => (
          <li key={update.id} className="flex items-center justify-between py-4">
            <div>
              <p className="font-medium text-ink">{update.title}</p>
              <p className="mt-1 text-sm text-ink-soft">
                {update.publishedAt ? "פורסם" : "טיוטה"}
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <Link
                href={`/admin/updates/${update.id}/edit`}
                className="text-accent hover:text-accent-dark"
              >
                עריכה
              </Link>
              <form action={deleteUpdateAction}>
                <input type="hidden" name="id" value={update.id} />
                <button type="submit" className="text-ink-soft hover:text-accent">
                  מחיקה
                </button>
              </form>
            </div>
          </li>
        ))}
        {updates.length === 0 && (
          <li className="py-6 text-ink-soft">אין עדכונים עדיין.</li>
        )}
      </ul>
    </div>
  );
}
