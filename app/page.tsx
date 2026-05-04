import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, Search, ShieldAlert, UserRoundPlus } from "lucide-react";
import { LinkButton, Panel } from "@/components/ui";
import { SearchBox } from "@/components/directory/search-box";
import { DIRECTORY_DISCLAIMER } from "@/lib/constants";

const parentBenefits = [
  "Search tutors by subject, level and location",
  "Contact tutors directly through enquiry forms",
  "View qualifications, experience, rates and DBS status",
  "No parent finder's fee at launch"
];

const tutorBenefits = [
  "Create a free profile",
  "Receive parent enquiries",
  "No commission on lessons",
  "No paid listings at launch",
  "Suitable for tutors, teachers and tuition centres"
];

export const metadata: Metadata = {
  title: "TuitionList | Free UK Tutor Directory",
  description:
    "Find tutors across the UK for free. TuitionList helps parents, carers, and students discover independent tutors and tuition providers with no commission or parent finder fees at launch.",
  alternates: {
    canonical: "/"
  }
};

export default function HomePage() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TuitionList",
    url: "https://tuitionlist.co.uk",
    logo: "https://tuitionlist.co.uk/brand/tuitionlist-logo.png",
    description: "A free UK tutor directory at launch for independent tutors, teachers, tuition providers, parents, carers, and students."
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "TuitionList",
    url: "https://tuitionlist.co.uk",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://tuitionlist.co.uk/find-a-tutor?keyword={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_440px] lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase text-leaf-700">A free UK tutor directory</p>
            <h1 className="mt-4 text-4xl font-bold tracking-normal text-navy-900 sm:text-6xl">Find tutors for free</h1>
            <p className="mt-6 text-lg leading-8 text-slate-700">
              TuitionList is a free UK tutor directory helping parents, carers, and students find independent tutors, teachers, and tuition providers
              across the UK.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/find-a-tutor" className="gap-2">
                Find a tutor
                <ArrowRight className="size-4" aria-hidden />
              </LinkButton>
              <LinkButton href="/signup" variant="secondary">
                Create a free tutor profile
              </LinkButton>
            </div>
            <div className="mt-8 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
              {["No commission", "No finder fees", "No paid listings at launch"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-leaf-700" aria-hidden />
                  {item}
                </span>
              ))}
            </div>
          </div>
          <Panel className="self-start border-navy-900 bg-navy-900 text-white">
            <div className="grid gap-4">
              <Search className="size-10 text-leaf-100" aria-hidden />
              <h2 className="text-2xl font-bold text-white">Search by what matters</h2>
              <p className="leading-7 text-white">
                Search by subject, level, UK location, online or in-person availability, and hourly rate. Clear profiles without agency commission.
              </p>
            </div>
          </Panel>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <SearchBox />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Panel>
          <h2 className="text-2xl font-bold text-navy-900">For parents</h2>
          <ul className="mt-5 grid gap-3 text-slate-700">
            {parentBenefits.map((benefit) => (
              <li key={benefit} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-leaf-700" aria-hidden />
                {benefit}
              </li>
            ))}
          </ul>
        </Panel>
        <Panel>
          <h2 className="text-2xl font-bold text-navy-900">For tutors</h2>
          <ul className="mt-5 grid gap-3 text-slate-700">
            {tutorBenefits.map((benefit) => (
              <li key={benefit} className="flex gap-3">
                <UserRoundPlus className="mt-0.5 size-5 shrink-0 text-leaf-700" aria-hidden />
                {benefit}
              </li>
            ))}
          </ul>
        </Panel>
      </section>

      <section className="border-y border-slate-200 bg-navy-50">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3">
            <ShieldAlert className="mt-1 size-6 shrink-0 text-navy-800" aria-hidden />
            <div>
              <h2 className="text-2xl font-bold text-navy-900">Directory only, with careful wording</h2>
              <p className="mt-3 max-w-4xl leading-7 text-slate-700">
                TuitionList may show self-declared information from tutors and, where applicable, admin-checked badges. Parents, carers, and students
                should always carry out their own checks before arranging tuition.
              </p>
            </div>
          </div>
          <p className="max-w-5xl text-sm leading-6 text-slate-600">{DIRECTORY_DISCLAIMER}</p>
        </div>
      </section>

      <section className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-4 py-12 sm:px-6 md:flex-row md:items-center lg:px-8">
        <div>
          <h2 className="text-3xl font-bold text-navy-900">Create your free tutor profile</h2>
          <p className="mt-2 text-slate-600">Or start finding independent tutors and tuition providers across the UK.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <LinkButton href="/signup">Create profile</LinkButton>
          <LinkButton href="/find-a-tutor" variant="secondary">
            Start finding tutors
          </LinkButton>
        </div>
      </section>
    </>
  );
}
