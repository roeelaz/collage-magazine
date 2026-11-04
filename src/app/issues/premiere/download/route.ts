import { NextResponse } from "next/server";
import { issueSignedToken, presignUrl } from "@vercel/blob";

export const dynamic = "force-dynamic";

// The premiere issue lives in the private Blob store. Each click gets a fresh
// signed URL scoped to this one file, read-only, valid for 10 minutes.
const PATHNAME = "collagemag102026.pdf";

export async function GET() {
  const validUntil = Date.now() + 10 * 60 * 1000;
  const token = await issueSignedToken({
    pathname: PATHNAME,
    operations: ["get"],
    validUntil,
  });
  const { presignedUrl } = await presignUrl(token, {
    operation: "get",
    pathname: PATHNAME,
    access: "private",
  });
  // download=1 makes Blob send Content-Disposition: attachment (save, not open).
  // It isn't part of the signature, so the signed URL stays valid.
  const url = new URL(presignedUrl);
  url.searchParams.set("download", "1");
  return NextResponse.redirect(url);
}
