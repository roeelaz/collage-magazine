import type { MetadataRoute } from "next";
import { getPublishedIssues, getPublishedUpdates } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.SITE_URL || "http://localhost:3000";
  const [issues, updates] = await Promise.all([
    getPublishedIssues(),
    getPublishedUpdates(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/issues`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/updates`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/submit`, changeFrequency: "monthly", priority: 0.4 },
  ];

  const issueRoutes: MetadataRoute.Sitemap = issues.map((issue) => ({
    url: `${baseUrl}/issues/${encodeURIComponent(issue.slug)}`,
    lastModified: issue.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const updateRoutes: MetadataRoute.Sitemap = updates.map((update) => ({
    url: `${baseUrl}/updates/${encodeURIComponent(update.slug)}`,
    lastModified: update.updatedAt,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...issueRoutes, ...updateRoutes];
}
