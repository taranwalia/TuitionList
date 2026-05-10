import type { Metadata } from "next";
import { SearchBox } from "@/components/directory/search-box";
import { LinkButton, Panel } from "@/components/ui";
import { DIRECTORY_DISCLAIMER } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Find a Private Tutor for Your Child | TuitionList UK",
  description: "Search independent tutors for your child by subject, level, location and online availability.",
  alternates: { canonical: "/for-parents" }
};

export default function ForParentsPage() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-4xl font-bold text-navy-900">Find the Right Tutor for Your Child</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
            Search independent tutors by subject, level, location, online availability, and rate. TuitionList lets parents contact tutors directly
            without parent finder fees.
          </p>
        </div>
        <SearchBox />
        <Panel>
          <h2 className="text-2xl font-bold text-navy-900">Before arranging tuition</h2>
          <p className="mt-3 leading-7 text-slate-700">{DIRECTORY_DISCLAIMER}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <LinkButton href="/guides/how-to-choose-a-tutor" variant="secondary">
              How to choose a tutor
            </LinkButton>
            <LinkButton href="/safeguarding" variant="secondary">
              Safeguarding guidance
            </LinkButton>
          </div>
        </Panel>
      </div>
    </section>
  );
}
