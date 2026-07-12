import { AdminIssueForm } from "@/components/admin-issue-form";
import { createIssueAction } from "../actions";

export default function NewIssuePage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-ink">גיליון חדש</h1>
      <div className="mt-8 max-w-xl">
        <AdminIssueForm action={createIssueAction} submitLabel="יצירת גיליון" />
      </div>
    </div>
  );
}
