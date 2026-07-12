import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getUpdateBySlug } from "@/lib/data";
import { formatHebrewDate } from "@/lib/format";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const update = await getUpdateBySlug(slug);
  return { title: update?.title ?? "עדכון" };
}

export default async function UpdatePage({ params }: { params: Params }) {
  const { slug } = await params;
  const update = await getUpdateBySlug(slug);

  if (!update) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-serif text-3xl font-bold text-ink">
        {update.title}
      </h1>
      {update.publishedAt && (
        <p className="mt-2 text-sm text-ink-soft">
          {formatHebrewDate(update.publishedAt)}
        </p>
      )}
      <div className="mt-8 whitespace-pre-line text-lg leading-relaxed text-ink">
        {update.body}
      </div>
    </div>
  );
}
