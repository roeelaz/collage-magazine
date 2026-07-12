import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminIssueForm } from "@/components/admin-issue-form";
import { updateIssueAction } from "../../actions";

export default async function EditIssuePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({ where: { id } });
  if (!issue) notFound();

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-ink">
        עריכת גיליון
      </h1>
      <div className="mt-8 max-w-xl">
        <AdminIssueForm
          action={updateIssueAction}
          submitLabel="שמירת שינויים"
          coverRequired={false}
          pdfRequired={false}
          defaultValues={{
            id: issue.id,
            title: issue.title,
            slug: issue.slug,
            description: issue.description,
            isFree: issue.isFree,
            priceIls: issue.priceAgorot
              ? String(issue.priceAgorot / 100)
              : undefined,
            published: Boolean(issue.publishedAt),
          }}
        />
      </div>
    </div>
  );
}
