import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { LinkButton, Panel } from "@/components/ui";

export const metadata: Metadata = {
  title: "Free Tutor Advertising UK | Promote Your Tuition Services",
  description: "Create a free tutor listing on TuitionList and help parents find your tutoring services online or locally.",
  alternates: { canonical: "/for-tutors" }
};

export default function ForTutorsPage() {
  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8">
      <div>
        <h1 className="text-4xl font-bold text-navy-900">Advertise as a Tutor for Free</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
          Create a free tutor listing on TuitionList and help parents, carers, and students find your tutoring services online or locally.
        </p>
        <p className="mt-4 max-w-3xl leading-7 text-slate-600">
          TuitionList does not charge tutor subscription fees, lesson commission, parent finder fees, or hidden platform markups. Profiles are
          reviewed before they appear publicly.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <LinkButton href="/signup">Create a free tutor profile</LinkButton>
          <LinkButton href="/profile-checks" variant="secondary">
            Profile checks explained
          </LinkButton>
        </div>
      </div>
      <Panel>
        <h2 className="text-xl font-bold text-navy-900">Free tutor advertising includes</h2>
        <ul className="mt-4 grid gap-3 text-slate-700">
          {["Subject and level listings", "Online and local tuition options", "Hourly rate information", "Parent enquiry forms", "Profile badges where checks are marked as seen"].map((item) => (
            <li key={item} className="flex gap-2">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-leaf-700" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </Panel>
    </section>
  );
}
