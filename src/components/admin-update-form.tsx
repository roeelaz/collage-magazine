"use client";

import { useActionState } from "react";
import type { UpdateFormState } from "@/app/admin/(dashboard)/updates/actions";

const initialState: UpdateFormState = { status: "idle" };

const fieldClasses =
  "w-full rounded-lg border border-line bg-card px-4 py-2.5 text-ink focus:border-accent focus:outline-none";

type Props = {
  action: (
    state: UpdateFormState,
    formData: FormData
  ) => Promise<UpdateFormState>;
  submitLabel: string;
  defaultValues?: {
    id?: string;
    title: string;
    slug: string;
    body: string;
    published: boolean;
  };
};

export function AdminUpdateForm({ action, submitLabel, defaultValues }: Props) {
  const [state, formAction, pending] = useActionState(action, initialState);

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
        <label htmlFor="body" className="mb-1.5 block text-sm text-ink-soft">
          תוכן
        </label>
        <textarea
          id="body"
          name="body"
          rows={8}
          required
          defaultValue={defaultValues?.body}
          className={fieldClasses}
        />
      </div>

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
