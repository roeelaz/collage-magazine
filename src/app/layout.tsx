import type { Metadata } from "next";
import { Alef } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageBackground } from "@/components/page-background";

const alef = Alef({
  variable: "--font-alef",
  subsets: ["hebrew", "latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"),
  title: {
    default: "קולאז' — כתב עת לספרות",
    template: "%s | קולאז'",
  },
  description:
    "קולאז' הוא כתב עת לספרות המעניק במה ליוצרות ויוצרים חדשים — פרוזה, שירה ואיור.",
  openGraph: {
    type: "website",
    locale: "he_IL",
    siteName: "קולאז'",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${alef.variable} h-full bg-paper antialiased`}
    >
      <body className="flex min-h-full flex-col text-ink">
        <PageBackground />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
