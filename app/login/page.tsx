import { LogIn } from "lucide-react";
import { signIn } from "@/app/actions/auth";
import { Button, Field, LinkButton, Panel, inputClass } from "@/components/ui";

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const error = Array.isArray(params.error) ? params.error[0] : params.error;

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Panel>
        <LogIn className="size-9 text-leaf-700" aria-hidden />
        <h1 className="mt-4 text-3xl font-bold text-navy-900">Tutor and admin login</h1>
        <p className="mt-3 leading-7 text-slate-700">Sign in with Supabase Auth to access tutor or admin tools.</p>
        {error ? (
          <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
            {error}
          </p>
        ) : null}
        <form action={signIn} className="mt-6 grid gap-4">
          <Field label="Email">
            <input name="email" type="email" required className={inputClass} />
          </Field>
          <Field label="Password">
            <input name="password" type="password" required className={inputClass} />
          </Field>
          <Button type="submit" className="sm:w-fit">Sign in</Button>
        </form>
        <div className="mt-6 flex flex-wrap gap-3">
          <LinkButton href="/signup">Create tutor account</LinkButton>
          <LinkButton href="/admin" variant="secondary">
            Admin dashboard
          </LinkButton>
        </div>
      </Panel>
    </section>
  );
}
