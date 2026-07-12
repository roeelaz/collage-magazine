"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { slugify } from "@/lib/slug";

const fields = z.object({
  title: z.string().trim().min(1, "נא למלא כותרת"),
  slug: z.string().trim().optional(),
  body: z.string().trim().min(1, "נא למלא תוכן"),
  publish: z.literal("on").optional(),
});

export type UpdateFormState = {
  status: "idle" | "error";
  message?: string;
};

export async function createUpdateAction(
  _prevState: UpdateFormState,
  formData: FormData
): Promise<UpdateFormState> {
  await requireAdmin();

  const parsed = fields.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message };
  }

  await prisma.update.create({
    data: {
      slug: slugify(parsed.data.slug || parsed.data.title),
      title: parsed.data.title,
      body: parsed.data.body,
      publishedAt: parsed.data.publish === "on" ? new Date() : null,
    },
  });

  revalidatePath("/updates");
  revalidatePath("/admin/updates");
  redirect("/admin/updates");
}

export async function updateUpdateAction(
  _prevState: UpdateFormState,
  formData: FormData
): Promise<UpdateFormState> {
  await requireAdmin();

  const id = formData.get("id");
  if (typeof id !== "string" || !id) {
    return { status: "error", message: "עדכון לא נמצא" };
  }

  const parsed = fields.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message };
  }

  const existing = await prisma.update.findUnique({ where: { id } });
  if (!existing) {
    return { status: "error", message: "עדכון לא נמצא" };
  }

  const shouldPublish = parsed.data.publish === "on";

  await prisma.update.update({
    where: { id },
    data: {
      slug: slugify(parsed.data.slug || parsed.data.title),
      title: parsed.data.title,
      body: parsed.data.body,
      publishedAt: shouldPublish ? (existing.publishedAt ?? new Date()) : null,
    },
  });

  revalidatePath("/updates");
  revalidatePath(`/updates/${existing.slug}`);
  revalidatePath("/admin/updates");
  redirect("/admin/updates");
}

export async function deleteUpdateAction(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id");
  if (typeof id !== "string" || !id) return;

  await prisma.update.delete({ where: { id } });

  revalidatePath("/updates");
  revalidatePath("/admin/updates");
}
