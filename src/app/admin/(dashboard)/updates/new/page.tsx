import { AdminUpdateForm } from "@/components/admin-update-form";
import { createUpdateAction } from "../actions";

export default function NewUpdatePage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-ink">עדכון חדש</h1>
      <div className="mt-8 max-w-xl">
        <AdminUpdateForm action={createUpdateAction} submitLabel="פרסום" />
      </div>
    </div>
  );
}
