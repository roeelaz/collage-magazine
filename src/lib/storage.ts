import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

function extensionFor(file: File): string {
  const fromName = path.extname(file.name);
  if (fromName) return fromName;
  if (file.type === "application/pdf") return ".pdf";
  if (file.type === "image/png") return ".png";
  if (file.type === "image/webp") return ".webp";
  return ".jpg";
}

/**
 * Saves an uploaded file and returns its public URL.
 * Uses Vercel Blob when it's configured — either the classic
 * BLOB_READ_WRITE_TOKEN or the newer OIDC-based auth (BLOB_STORE_ID +
 * VERCEL_OIDC_TOKEN, set automatically once Blob storage is connected to
 * the Vercel project) — otherwise falls back to local disk under
 * public/uploads (local dev without Blob configured).
 */
export async function saveUpload(file: File, prefix: string): Promise<string> {
  const filename = `${prefix}-${randomUUID()}${extensionFor(file)}`;

  if (process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID) {
    const { put } = await import("@vercel/blob");
    const blob = await put(filename, file, { access: "public" });
    return blob.url;
  }

  await mkdir(UPLOAD_DIR, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);
  return `/uploads/${filename}`;
}
