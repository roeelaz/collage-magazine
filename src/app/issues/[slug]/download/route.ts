import { NextResponse } from "next/server";
import { getIssueBySlug } from "@/lib/data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const issue = await getIssueBySlug(slug);

  if (!issue) {
    return NextResponse.json({ error: "לא נמצא גיליון" }, { status: 404 });
  }

  // Paid issues aren't purchasable yet — see PLAN.md for the Order-based
  // checkout seam this will plug into once a payment processor is wired up.
  if (!issue.isFree) {
    return NextResponse.json(
      { error: "רכישת גיליון זה עדיין אינה זמינה" },
      { status: 402 }
    );
  }

  return NextResponse.redirect(new URL(issue.pdfUrl, _request.url));
}
