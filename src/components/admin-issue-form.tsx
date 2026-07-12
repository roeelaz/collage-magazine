"use client";

import { useActionState, useState } from "react";
import type { IssueFormState } from "@/app/admin/(dashboard)/issues/actions";

const initialState: IssueFormState = { status: "idle" };

const fieldClasses =
  "w-full rounded-lg border border-line bg-card px-4 py-2.5 text-ink focus:border-accent focus:outline-none";

type Props = {
  action: (state: IssueFormState, formData: FormData) => Promise<IssueFormState>;
  submitLabel: string;
  defaultValues?: {
    id?: string;
    title: string;
    slug: string;
    description: string;
    isFree: boolean;
    priceIls?: string;
    published: boolean;
  };
  coverRequired?: boolean;
  pdfRequired?: boolean;
};

export function AdminIssueForm({
  action,
  submitLabel,
  defaultValues,
  coverRequired = true,
  pdfRequired = true,
}: Props) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const [isFree, setIsFree] = useState(defaultValues?.isFree ?? true);

  return (
    <form action={formAction} className="space-y-5">
      {defaultValues?.id && (
        <input type="hidden" name="id" value={defaultValues.id} />
      )}

      <div>
        <label htmlFor="title" className="mb-1.5 block text-sm text-ink-soft">
          כותרת
        </label>
        <input
          id="title"
          name="title"
          required
          defaultValue={defaultValues?.title}
          className={fieldClasses}
        />
      </div>

      <div>
        <label htmlFor="slug" className="mb-1.5 block text-sm text-ink-soft">
          כתובת (slug) — אופציונלי, נוצר אוטומטית מהכותרת
        </label>
        <input
          id="slug"
          name="slug"
          dir="ltr"
          defaultValue={defaultValues?.slug}
          className={fieldClasses}
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-1.5 block text-sm text-ink-soft"
        >
          תיאור
        </label>
        <textarea
          id="description"
          name="description"
          rows={5}
          required
          defaultValue={defaultValues?.description}
          className={fieldClasses}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cover" className="mb-1.5 block text-sm text-ink-soft">
            תמונת כריכה {coverRequired ? "" : "(השאירו ריק כדי לשמור קיים)"}
          </label>
          <input
            id="cover"
            name="cover"
            type="file"
            accept="image/*"
            required={coverRequired}
            className={fieldClasses}
          />
        </div>
        <div>
          <label htmlFor="pdf" className="mb-1.5 block text-sm text-ink-soft">
            קובץ PDF {pdfRequired ? "" : "(השאירו ריק כדי לשמור קיים)"}
          </label>
          <input
            id="pdf"
            name="pdf"
            type="file"
            accept="application/pdf"
            required={pdfRequired}
            className={fieldClasses}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          id="isFree"
          name="isFree"
          type="checkbox"
          checked={isFree}
          onChange={(event) => setIsFree(event.target.checked)}
          className="h-4 w-4"
        />
        <label htmlFor="isFree" className="text-sm text-ink">
          גיליון חינמי
        </label>
      </div>

      {!isFree && (
        <div>
          <label
            htmlFor="priceIls"
            className="mb-1.5 block text-sm text-ink-soft"
          >
            מחיר (בשקלים)
          </label>
          <input
            id="priceIls"
            name="priceIls"
            type="number"
            min="1"
            step="0.5"
            dir="ltr"
            defaultValue={defaultValues?.priceIls}
            className={fieldClasses}
          />
        </div>
      )}

      <div className="flex items-center gap-3">
        <input
          id="publish"
          name="publish"
          type="checkbox"
          defaultChecked={defaultValues?.published ?? false}
          className="h-4 w-4"
        />
        <label htmlFor="publish" className="text-sm text-ink">
          פרסום (גלוי לציבור)
        </label>
      </div>

      {state.status === "error" && (
        <p className="text-sm text-accent">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-dark disabled:opacity-60"
      >
        {pending ? "שומר..." : submitLabel}
      </button>
    </form>
  );
}
