import Link from "next/link";
import { getLatestIssue, getLatestUpdates } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [latestIssue, updates] = await Promise.all([
    getLatestIssue(),
    getLatestUpdates(3),
  ]);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <section className="max-w-2xl">
        <h1 className="font-serif text-4xl font-bold text-ink sm:text-5xl">
          קולאז&apos;
        </h1>
        <p className="mt-2 text-lg text-ink-soft">כתב עת לספרות</p>
        <p className="mt-6 text-lg leading-relaxed text-ink">
          קולאז&apos; הוא במה ליוצרות ויוצרים חדשים שטרם מצאו את מקומם
          במוסדות הספרות המבוססים. אנחנו מפרסמים פרוזה, שירה ואיור — בלי
          תיווך, בלי פרוטקציה, רק יצירה.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/issues"
            className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-dark"
          >
            לגיליונות
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

      {updates.length > 0 && (
        <section className="mt-20">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-ink">
              עדכונים אחרונים
            </h2>
            <Link
              href="/updates"
              className="text-sm text-accent hover:text-accent-dark"
            >
              כל העדכונים ←
            </Link>
          </div>
          <ul className="mt-6 space-y-6">
            {updates.map((update) => (
              <li key={update.id} className="border-b border-line pb-6">
                <Link
                  href={`/updates/${update.slug}`}
                  className="font-serif text-xl text-ink hover:text-accent"
                >
                  {update.title}
                </Link>
                {update.publishedAt && (
                  <p className="mt-1 text-sm text-ink-soft">
                    {new Intl.DateTimeFormat("he-IL", {
                      dateStyle: "long",
                    }).format(update.publishedAt)}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
