import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "מי אנחנו",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-serif text-3xl font-bold text-ink">מי אנחנו</h1>
      <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink">
        <p>
          קולאז&apos; הוקם כדי להיות פלטפורמה לכותבים בתחילת דרכם שטרם
          נכנסו לעולם הספרותי כפי שאנחנו מכירות אותו כיום. במציאות
          שבה השדה הספרותי מתנהל כמערכת סגורה אנו מבקשות ליצור אפשרות
          לפרסום שתאיר על אלה שעד כה היו בצללים. אנחנו מתחייבות לפרסם קולות
          חדשים ללא משוא פנים, ללא התחשבות בקליקות, אינטריגות, שמות דבר
          ומעגלים חברתיים. כמי שאינן מגיעות מתוך המילייה הספרותי, אנחנו
          רואות עצמנו כחפות מאינטרסים קולגיאליים.
        </p>
      </div>
    </div>
  );
}
