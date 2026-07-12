import { prisma } from "@/lib/prisma";

// Route Handlers decode percent-encoded dynamic segments (e.g. Hebrew slugs),
// but page component `params` currently arrive still percent-encoded. This
// normalizes either form so slug lookups work consistently everywhere.
function decodeSlug(slug: string): string {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

export function getPublishedIssues() {
  return prisma.issue.findMany({
    where: { publishedAt: { not: null } },
    orderBy: { publishedAt: "desc" },
  });
}

export function getLatestIssue() {
  return prisma.issue.findFirst({
    where: { publishedAt: { not: null } },
    orderBy: { publishedAt: "desc" },
  });
}

export function getIssueBySlug(slug: string) {
  return prisma.issue.findFirst({
    where: { slug: decodeSlug(slug), publishedAt: { not: null } },
  });
}

export function getPublishedUpdates() {
  return prisma.update.findMany({
    where: { publishedAt: { not: null } },
    orderBy: { publishedAt: "desc" },
  });
}

export function getLatestUpdates(take: number) {
  return prisma.update.findMany({
    where: { publishedAt: { not: null } },
    orderBy: { publishedAt: "desc" },
    take,
  });
}

export function getUpdateBySlug(slug: string) {
  return prisma.update.findFirst({
    where: { slug: decodeSlug(slug), publishedAt: { not: null } },
  });
}
