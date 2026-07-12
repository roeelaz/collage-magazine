"use client";

import { useActionState } from "react";
import { submitWork, type SubmitFormState } from "@/app/submit/actions";

const initialState: SubmitFormState = { status: "idle" };

const fieldClasses =
  "w-full rounded-lg border border-line bg-card px-4 py-2.5 text-ink placeholder:text-ink-soft/60 focus:border-accent focus:outline-none";

export function SubmitForm() {
  const [state, formAction, pending] = useActionState(submitWork, initialState);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-line bg-card p-8 text-center">
        <p className="font-serif text-xl text-ink">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm text-ink-soft">
          שם מלא
        </label>
        <input id="name" name="name" required className={fieldClasses} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm text-ink-soft">
            אימייל
          </label>
          <input
            id="email"
            name="email"
            type="email"
            dir="ltr"
            required
            className={fieldClasses}
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm text-ink-soft">
            טלפון
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            dir="ltr"
            required
            className={fieldClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="workTitle" className="mb-1.5 block text-sm text-ink-soft">
          שם היצירה
        </label>
        <input id="workTitle" name="workTitle" required className={fieldClasses} />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm text-ink-soft">
          תוכן היצירה (עד 1,200 מילים לפרוזה / עד שלושה שירים) או קישור לקובץ
        </label>
        <textarea
          id="message"
          name="message"
          rows={10}
          required
          className={fieldClasses}
        />
      </div>

      {state.status === "error" && (
        <p className="text-sm text-accent">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-dark disabled:opacity-60"
      >
        {pending ? "שולח..." : "שליחת היצירה"}
      </button>
    </form>
  );
}
