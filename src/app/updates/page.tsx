import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedUpdates } from "@/lib/data";
import { formatHebrewDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "עדכונים",
};

export default async function UpdatesPage() {
  const updates = await getPublishedUpdates();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-serif text-3xl font-bold text-ink">עדכונים</h1>

      {updates.length === 0 ? (
        <p className="mt-6 text-ink-soft">אין עדכונים כרגע.</p>
      ) : (
        <ul className="mt-10 space-y-8">
          {updates.map((update) => (
            <li key={update.id} className="border-b border-line pb-8">
              <Link
                href={`/updates/${update.slug}`}
                className="font-serif text-2xl font-bold text-ink hover:text-accent"
              >
                {update.title}
              </Link>
              {update.publishedAt && (
                <p className="mt-1 text-sm text-ink-soft">
                  {formatHebrewDate(update.publishedAt)}
                </p>
              )}
              <p className="mt-3 line-clamp-3 text-ink-soft">{update.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
