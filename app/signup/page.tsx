import type { Metadata } from "next";
import { UserRoundPlus } from "lucide-react";
import { signUpTutor } from "@/app/actions/auth";
import { TrackEvent, TrackFormSubmit } from "@/components/analytics/track-event";
import { Button, Field, LinkButton, Panel, inputClass } from "@/components/ui";

export const metadata: Metadata = {
  title: "Tutor Sign Up",
  robots: { index: false, follow: false }
};

export default async function SignupPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const error = Array.isArray(params.error) ? params.error[0] : params.error;

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <TrackEvent name="tutor_signup_started" properties={{ path: "/signup" }} />
      <Panel>
        <UserRoundPlus className="size-9 text-leaf-700" aria-hidden />
        <h1 className="mt-4 text-3xl font-bold text-navy-900">Tutor sign up</h1>
        <p className="mt-3 leading-7 text-slate-700">Create a free tutor account, then complete your profile and submit it for admin review.</p>
        {error ? (
          <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
            {error}
          </p>
        ) : null}
        <form id="tutor-signup-form" action={signUpTutor} className="mt-6 grid gap-4">
          <TrackFormSubmit formId="tutor-signup-form" name="tutor_signup_started" properties={{ action: "form_submit" }} />
          <Field label="Email">
            <input name="email" type="email" required className={inputClass} />
          </Field>
          <Field label="Password">
            <input name="password" type="password" required minLength={8} className={inputClass} />
          </Field>
          <Button type="submit" className="sm:w-fit">Create tutor account</Button>
        </form>
        <div className="mt-6 flex flex-wrap gap-3">
          <LinkButton href="/login" variant="secondary">
            I already have an account
          </LinkButton>
        </div>
      </Panel>
    </section>
  );
}
