import type { Metadata } from "next";
import { LinkButton, Panel } from "@/components/ui";

export const metadata: Metadata = {
  title: "TuitionList Pricing | Free Tutor Directory UK",
  description: "TuitionList is designed to be a free UK tutor directory for parents, students and tutors.",
  alternates: { canonical: "/pricing" }
};

export default function PricingPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <Panel>
        <h1 className="text-4xl font-bold text-navy-900">TuitionList is Free</h1>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          TuitionList is designed to be a free UK tutor directory for parents, students, tutors, teachers, and tuition providers.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {["Free tutor search", "Free parent enquiries", "Free basic tutor profiles"].map((item) => (
            <div key={item} className="rounded-lg border border-navy-100 bg-sky-50 p-4 font-semibold text-navy-900">
              {item}
            </div>
          ))}
        </div>
        <p className="mt-6 leading-7 text-slate-700">
          TuitionList does not charge lesson commission, parent finder fees, subscription charges, or hidden platform markups. It does not process
          lesson payments.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <LinkButton href="/find-a-tutor">Find a tutor</LinkButton>
          <LinkButton href="/signup" variant="secondary">
            Create a free profile
          </LinkButton>
        </div>
      </Panel>
    </section>
  );
}
