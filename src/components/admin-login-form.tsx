"use client";

import { useActionState } from "react";
import { loginAction, type LoginFormState } from "@/app/admin/login/actions";

const initialState: LoginFormState = { status: "idle" };

const fieldClasses =
  "w-full rounded-lg border border-line bg-card px-4 py-2.5 text-ink focus:border-accent focus:outline-none";

export function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-5">
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
        <label htmlFor="password" className="mb-1.5 block text-sm text-ink-soft">
          סיסמה
        </label>
        <input
          id="password"
          name="password"
          type="password"
          dir="ltr"
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
        className="w-full rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-dark disabled:opacity-60"
      >
        {pending ? "מתחבר..." : "כניסה"}
      </button>
    </form>
  );
}
