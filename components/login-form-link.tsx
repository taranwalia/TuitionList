import { signIn } from "@/app/actions/auth";
import { Button, Field, Panel, inputClass } from "@/components/ui";

export function LoginFormLink({ title, destination, error }: { title: string; destination: string; error?: string }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Panel>
        <h1 className="text-3xl font-bold text-navy-900">{title}</h1>
        <p className="mt-3 leading-7 text-slate-700">Sign in with the admin account created in Supabase.</p>
        {error ? (
          <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
            {error}
          </p>
        ) : null}
        <form action={signIn} className="mt-6 grid gap-4">
          <input type="hidden" name="destination" value={destination} />
          <Field label="Email">
            <input name="email" type="email" required className={inputClass} />
          </Field>
          <Field label="Password">
            <input name="password" type="password" required className={inputClass} />
          </Field>
          <Button type="submit" className="sm:w-fit">Sign in</Button>
        </form>
      </Panel>
    </section>
  );
}
