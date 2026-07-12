import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminUpdateForm } from "@/components/admin-update-form";
import { updateUpdateAction } from "../../actions";

export default async function EditUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const update = await prisma.update.findUnique({ where: { id } });
  if (!update) notFound();

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-ink">עריכת עדכון</h1>
      <div className="mt-8 max-w-xl">
        <AdminUpdateForm
          action={updateUpdateAction}
          submitLabel="שמירת שינויים"
          defaultValues={{
            id: update.id,
            title: update.title,
            slug: update.slug,
            body: update.body,
            published: Boolean(update.publishedAt),
          }}
        />
      </div>
    </div>
  );
}
