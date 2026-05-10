"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button, Panel } from "@/components/ui";

export default function TutorProfileError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Panel>
        <AlertTriangle className="size-9 text-red-700" aria-hidden />
        <h1 className="mt-4 text-3xl font-bold text-navy-900">Profile page could not load</h1>
        <p className="mt-3 leading-7 text-slate-700">
          Please refresh the page. If this keeps happening, log out and log back in before editing your tutor profile.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button type="button" onClick={reset}>
            Try again
          </Button>
          <Link
            href="/tutor-dashboard"
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-navy-200 bg-white px-4 py-2 text-sm font-semibold text-navy-900 transition hover:bg-navy-50"
          >
            Back to dashboard
          </Link>
        </div>
      </Panel>
    </section>
  );
}
