import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, MapPin, MessageSquareText, Search, ShieldAlert, Sparkles, UserRoundPlus } from "lucide-react";
import { LinkButton, Panel } from "@/components/ui";
import { SearchBox } from "@/components/directory/search-box";
import { DIRECTORY_DISCLAIMER } from "@/lib/constants";

const parentBenefits = [
  "Search tutors by subject, level and location",
  "Contact tutors directly through enquiry forms",
  "View qualifications, experience, rates and DBS status",
  "No parent finder fee or unlock fee"
];

const tutorBenefits = [
  "Create a free profile",
  "Receive parent enquiries",
  "No commission on lessons",
  "No paid listings",
  "Suitable for tutors, teachers and tuition centres"
];

export const metadata: Metadata = {
  title: "TuitionList | Free UK Tutor Directory",
  description:
    "Find tutors across the UK for free. TuitionList helps parents, carers, and students discover independent tutors and tuition providers with no commission, no unlock fees, and no parent finder fees.",
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
    description: "A free UK tutor directory for independent tutors, teachers, tuition providers, parents, carers, and students."
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
      <section className="border-b border-navy-100 bg-sky-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_460px] lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-leaf-100 bg-white px-3 py-1 text-sm font-semibold text-leaf-700 shadow-soft">
              <Sparkles className="size-4" aria-hidden />
              A free UK tutor directory
            </p>
            <h1 className="mt-5 text-4xl font-bold tracking-normal text-navy-900 sm:text-6xl">Find independent tutors for free</h1>
            <p className="mt-6 text-lg leading-8 text-slate-700">
              TuitionList helps parents, carers, and students discover independent tutors, teachers, and tuition providers across the UK. Search,
              compare, and send enquiries without commission, unlock fees, or parent finder fees.
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
            <div className="mt-8 grid gap-3 text-sm text-slate-700 sm:grid-cols-2 lg:grid-cols-4">
              {["No commission", "No unlock fees", "No finder fees", "No paid listings"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-md border border-white bg-white px-3 py-2 shadow-soft">
                  <CheckCircle2 className="size-4 text-leaf-700" aria-hidden />
                  {item}
                </span>
              ))}
            </div>
          </div>
          <Panel className="self-start overflow-hidden border-navy-800 bg-navy-900 p-0 text-white shadow-lift">
            <div className="border-b border-white/10 bg-white/5 p-5">
              <Search className="size-10 text-leaf-100" aria-hidden />
              <h2 className="mt-4 text-2xl font-bold text-white">Search by what matters</h2>
              <p className="mt-3 leading-7 text-sky-50">
                Search by subject, level, UK location, online or in-person availability, and hourly rate. Clear profiles without agency commission.
              </p>
            </div>
            <div className="grid gap-3 p-5 text-sm text-sky-50">
              <span className="flex items-center gap-3 rounded-md bg-white/10 px-3 py-2">
                <MapPin className="size-4 text-gold-100" aria-hidden />
                National UK search
              </span>
              <span className="flex items-center gap-3 rounded-md bg-white/10 px-3 py-2">
                <MessageSquareText className="size-4 text-leaf-100" aria-hidden />
                Send enquiries directly
              </span>
              <span className="flex items-center gap-3 rounded-md bg-white/10 px-3 py-2">
                <CheckCircle2 className="size-4 text-sky-100" aria-hidden />
                Free tutor discovery
              </span>
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
        <Panel className="border-t-4 border-t-sky-600">
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
        <Panel className="border-t-4 border-t-leaf-600">
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

      <section className="border-y border-navy-100 bg-white">
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
