"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { saveUpload } from "@/lib/storage";
import { slugify } from "@/lib/slug";

const baseFields = z.object({
  title: z.string().trim().min(1, "נא למלא כותרת"),
  slug: z.string().trim().optional(),
  description: z.string().trim().min(1, "נא למלא תיאור"),
  isFree: z.literal("on").optional(),
  priceIls: z.string().optional(),
  publish: z.literal("on").optional(),
});

export type IssueFormState = {
  status: "idle" | "error";
  message?: string;
};

function priceToAgorot(priceIls: string | undefined): number | null {
  const value = Number(priceIls);
  if (!priceIls || Number.isNaN(value) || value <= 0) return null;
  return Math.round(value * 100);
}

export async function createIssueAction(
  _prevState: IssueFormState,
  formData: FormData
): Promise<IssueFormState> {
  await requireAdmin();

  const parsed = baseFields.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message };
  }

  const cover = formData.get("cover");
  const pdf = formData.get("pdf");
  if (!(cover instanceof File) || cover.size === 0) {
    return { status: "error", message: "נא להעלות תמונת כריכה" };
  }
  if (!(pdf instanceof File) || pdf.size === 0) {
    return { status: "error", message: "נא להעלות קובץ PDF" };
  }

  const isFree = parsed.data.isFree === "on";
  const priceAgorot = isFree ? null : priceToAgorot(parsed.data.priceIls);
  if (!isFree && priceAgorot === null) {
    return { status: "error", message: "נא להזין מחיר תקין לגיליון בתשלום" };
  }

  const slug = slugify(parsed.data.slug || parsed.data.title);
  const coverImageUrl = await saveUpload(cover, "cover");
  const pdfUrl = await saveUpload(pdf, "issue");

  await prisma.issue.create({
    data: {
      slug,
      title: parsed.data.title,
      description: parsed.data.description,
      coverImageUrl,
      pdfUrl,
      isFree,
      priceAgorot,
      publishedAt: parsed.data.publish === "on" ? new Date() : null,
    },
  });

  revalidatePath("/issues");
  revalidatePath("/admin/issues");
  redirect("/admin/issues");
}

export async function updateIssueAction(
  _prevState: IssueFormState,
  formData: FormData
): Promise<IssueFormState> {
  await requireAdmin();

  const id = formData.get("id");
  if (typeof id !== "string" || !id) {
    return { status: "error", message: "גיליון לא נמצא" };
  }

  const parsed = baseFields.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message };
  }

  const existing = await prisma.issue.findUnique({ where: { id } });
  if (!existing) {
    return { status: "error", message: "גיליון לא נמצא" };
  }

  const isFree = parsed.data.isFree === "on";
  const priceAgorot = isFree ? null : priceToAgorot(parsed.data.priceIls);
  if (!isFree && priceAgorot === null) {
    return { status: "error", message: "נא להזין מחיר תקין לגיליון בתשלום" };
  }

  const cover = formData.get("cover");
  const pdf = formData.get("pdf");
  const coverImageUrl =
    cover instanceof File && cover.size > 0
      ? await saveUpload(cover, "cover")
      : existing.coverImageUrl;
  const pdfUrl =
    pdf instanceof File && pdf.size > 0
      ? await saveUpload(pdf, "issue")
      : existing.pdfUrl;

  const shouldPublish = parsed.data.publish === "on";
  const publishedAt = shouldPublish
    ? (existing.publishedAt ?? new Date())
    : null;

  await prisma.issue.update({
    where: { id },
    data: {
      slug: slugify(parsed.data.slug || parsed.data.title),
      title: parsed.data.title,
      description: parsed.data.description,
      coverImageUrl,
      pdfUrl,
      isFree,
      priceAgorot,
      publishedAt,
    },
  });

  revalidatePath("/issues");
  revalidatePath(`/issues/${existing.slug}`);
  revalidatePath("/admin/issues");
  redirect("/admin/issues");
}

export async function deleteIssueAction(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id");
  if (typeof id !== "string" || !id) return;

  await prisma.issue.delete({ where: { id } });

  revalidatePath("/issues");
  revalidatePath("/admin/issues");
}
