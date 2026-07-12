import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPublishedIssues } from "@/lib/data";
import { formatPrice } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "גיליונות",
};

export default async function IssuesPage() {
  const issues = await getPublishedIssues();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="font-serif text-3xl font-bold text-ink">גיליונות</h1>

      {issues.length === 0 ? (
        <p className="mt-6 text-ink-soft">
          הגיליון הראשון בדרך — עקבו אחרינו לעדכונים.
        </p>
      ) : (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {issues.map((issue) => (
            <Link
              key={issue.id}
              href={`/issues/${issue.slug}`}
              className="group overflow-hidden rounded-2xl border border-line bg-card"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-line">
                <Image
                  src={issue.coverImageUrl}
                  alt={issue.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <span className="inline-block rounded-full bg-paper px-3 py-1 text-xs text-ink-soft">
                  {issue.isFree
                    ? "חינם"
                    : formatPrice(issue.priceAgorot ?? 0)}
                </span>
                <h2 className="mt-3 font-serif text-lg font-bold text-ink group-hover:text-accent">
                  {issue.title}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
