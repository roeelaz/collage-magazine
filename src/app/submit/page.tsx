import type { Metadata } from "next";
import { SubmitForm } from "@/components/submit-form";

export const metadata: Metadata = {
  title: "הגשת יצירות",
};

export default function SubmitPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-serif text-3xl font-bold text-ink">הגשת יצירות</h1>
      <p className="mt-4 text-ink-soft">
        קולאז&apos; פתוח להגשות של סיפורים קצרים, מסות וקטעי פרוזה (עד 1,200
        מילים), שירה (עד שלושה שירים) ואיורים. שלחו לנו את היצירה בטופס
        שלמטה, ואנחנו נחזור אליכם בהקדם.
      </p>
      <div className="mt-10">
        <SubmitForm />
      </div>
    </div>
  );
}
