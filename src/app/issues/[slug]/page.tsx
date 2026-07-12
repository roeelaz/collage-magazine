import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getIssueBySlug } from "@/lib/data";
import { formatHebrewDate, formatPrice } from "@/lib/format";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const issue = await getIssueBySlug(slug);
  return { title: issue?.title ?? "גיליון" };
}

export default async function IssuePage({ params }: { params: Params }) {
  const { slug } = await params;
  const issue = await getIssueBySlug(slug);

  if (!issue) notFound();

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <div className="grid gap-10 sm:grid-cols-[280px_1fr]">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-line">
          <Image
            src={issue.coverImageUrl}
            alt={issue.title}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h1 className="font-serif text-3xl font-bold text-ink">
            {issue.title}
          </h1>
          {issue.publishedAt && (
            <p className="mt-2 text-sm text-ink-soft">
              פורסם ב־{formatHebrewDate(issue.publishedAt)}
            </p>
          )}
          <p className="mt-6 whitespace-pre-line leading-relaxed text-ink">
            {issue.description}
          </p>

          <div className="mt-8">
            {issue.isFree ? (
              <a
                href={`/issues/${issue.slug}/download`}
                className="inline-block rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-dark"
              >
                הורדת הגיליון (חינם)
              </a>
            ) : (
              <div className="space-y-3">
                <p className="text-lg font-medium text-ink">
                  {formatPrice(issue.priceAgorot ?? 0)}
                </p>
                <button
                  disabled
                  className="cursor-not-allowed rounded-full border border-line px-6 py-3 text-sm font-medium text-ink-soft"
                >
                  רכישה — בקרוב
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
