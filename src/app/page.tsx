import Link from "next/link";
import { getLatestIssue } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const latestIssue = await getLatestIssue();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <section className="max-w-2xl">
        <h1 className="font-serif text-4xl font-bold text-ink sm:text-5xl">
          קולאז&apos;
        </h1>
        <p className="mt-2 text-lg text-ink-soft">כתב עת לספרות</p>
        <p className="mt-6 text-lg leading-relaxed text-ink">
          במה ליוצרים בתחילת דרכם הספרותית, כאלה שטרם זכו להכרה, וליוצרים
          ויוצרות מהשוליים
        </p>
        <p className="mt-6 text-lg font-bold text-ink">
          הקול הקורא לגיליון השני פתוח עד 14.12
        </p>
        <p className="mt-2 leading-relaxed text-ink">
          נושא: מקומות מסתור. לאן אתם נעלמים כשאתם נעלמים? ממי ומה אתם
          מבקשים להתחבא? ספרו לנו על חדרי מדרגות, מקלטים, כבישים סואנים
          ופינות קטנטנות.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/issues"
            className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-dark"
          >
            לגיליון הבכורה
          </Link>
          <Link
            href="/submit"
            className="rounded-full border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
          >
            הגישו יצירה
          </Link>
        </div>
      </section>

      {latestIssue && (
        <section className="mt-20 rounded-2xl border border-line bg-card p-8">
          <p className="text-sm text-ink-soft">הגיליון האחרון</p>
          <h2 className="mt-2 font-serif text-2xl font-bold text-ink">
            {latestIssue.title}
          </h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            {latestIssue.description}
          </p>
          <Link
            href={`/issues/${latestIssue.slug}`}
            className="mt-5 inline-block text-sm font-medium text-accent hover:text-accent-dark"
          >
            למעבר לגיליון ←
          </Link>
        </section>
      )}

    </div>
  );
}
