import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { LinkButton, Panel } from "@/components/ui";

export const metadata: Metadata = {
  title: "Create a Free Tutor Profile",
  description:
    "Create a free tutor profile on TuitionList and receive parent enquiries with no commission, no finder fees, and no paid listings.",
  alternates: {
    canonical: "/become-a-tutor"
  }
};

export default function BecomeTutorPage() {
  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8">
      <div>
        <h1 className="text-4xl font-bold text-navy-900">Create your free tutor profile</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
          Add your subjects, levels, location, online/in-person availability, rates, qualifications, DBS status, safeguarding training, insurance,
          and experience. Once submitted, your profile will be reviewed before going live.
        </p>
        <p className="mt-4 max-w-3xl leading-7 text-slate-600">
          Where possible, TuitionList may review certain information or evidence you provide. If evidence has been reviewed, this may be shown on
          your profile using badges, blue ticks, or profile labels, such as "DBS certificate seen" or "Qualification seen".
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <LinkButton href="/signup">Start free profile</LinkButton>
          <LinkButton href="/how-it-works" variant="secondary">
            How it works
          </LinkButton>
        </div>
      </div>
      <Panel>
        <h2 className="text-xl font-bold text-navy-900">Free tutor profiles</h2>
        <ul className="mt-4 grid gap-3 text-slate-700">
          {[
            "No lesson commission",
            "No paid listings",
            "Parents contact you through enquiries",
            "Admin approval before public listing",
            "Profile badges available where checks are marked as seen or confirmed"
          ].map((item) => (
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
