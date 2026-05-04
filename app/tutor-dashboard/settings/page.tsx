import { Panel } from "@/components/ui";
import { requireUser } from "@/lib/auth";

export default async function SettingsPage() {
  await requireUser();

  return (
    <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Panel>
        <h1 className="text-3xl font-bold text-navy-900">Account settings</h1>
        <p className="mt-3 text-slate-700">Supabase Auth account settings can be connected here for password updates and email changes.</p>
      </Panel>
    </section>
  );
}
