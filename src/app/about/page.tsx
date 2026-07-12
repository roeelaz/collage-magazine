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
          קולאז&apos; הוא כתב עת לספרות שהוקם כדי לתת במה ליוצרות ויוצרים
          חדשים שטרם פרסמו את יצירתם במסגרות המבוססות. אנחנו מאמינים
          שהעולם הספרותי הקיים לעיתים סגור ומוטה לטובת שמות מוכרים — וקולאז&apos;
          נועד להיות פתח נוסף, בלתי אמצעי, לכתיבה חדשה.
        </p>
        <p>
          בכל גיליון אנו מפרסמים סיפורים קצרים, מסות, קטעי פרוזה, שירה
          ואיורים — ללא הבחנה בנושא או בסגנון, מתוך רצון לאפשר מגוון קולות
          רחב ככל האפשר.
        </p>
        <p>
          העריכה בקולאז&apos; פועלת מתוך מחויבות לשוויוניות ואי־תלות בשיקולים
          חוץ־ספרותיים: כל יצירה נבחנת לגופה.
        </p>
      </div>
    </div>
  );
}
