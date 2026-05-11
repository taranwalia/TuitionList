import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, MapPin, MessageSquareText, Search, ShieldAlert, Sparkles, UserRoundPlus } from "lucide-react";
import { LinkButton, Panel } from "@/components/ui";
import { SearchBox } from "@/components/directory/search-box";
import { DIRECTORY_DISCLAIMER, SITE_URL } from "@/lib/constants";

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

const subjectLinks = [
  ["Maths", "/tutors/maths"],
  ["English", "/tutors/english"],
  ["Science", "/tutors/science"],
  ["11 Plus", "/tutors/11-plus"],
  ["GCSE Maths", "/tutors/gcse-maths"],
  ["Primary", "/tutors/primary"]
];

const levelLinks = [
  ["KS1", "/ks1-tutors"],
  ["KS2", "/ks2-tutors"],
  ["11 Plus", "/11-plus-tutors"],
  ["GCSE", "/gcse-tutors"],
  ["A-Level", "/a-level-tutors"],
  ["SEN support", "/sen-support-tutors"]
];

const locationLinks = [
  ["London", "/tutors/london"],
  ["Birmingham", "/tutors/birmingham"],
  ["Manchester", "/tutors/manchester"],
  ["Leeds", "/tutors/leeds"],
  ["Bristol", "/tutors/bristol"],
  ["Cardiff", "/tutors/cardiff"]
];

const popularSearches = [
  ["Find a tutor near me", "/tutors-near-me"],
  ["Online tutors UK", "/online-tutors"],
  ["Private tutors UK", "/private-tutors"],
  ["Local tutors UK", "/local-tutors-uk"],
  ["Independent tutors UK", "/independent-tutors-uk"],
  ["DBS checked tutors", "/dbs-checked-tutors"],
  ["No commission tutors", "/no-commission-tutor-platform"],
  ["List as a tutor for free", "/free-tutor-listing-uk"]
];

export const metadata: Metadata = {
  title: "Find a Tutor Near Me | Free UK Tutor Directory | TuitionList",
  description:
    "Find local and online tutors across the UK for Maths, English, Science, 11 Plus, GCSE, A-Level and more. TuitionList is a free UK tutor directory where parents can contact independent tutors directly.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Find a Tutor Near Me | Free UK Tutor Directory | TuitionList",
    description:
      "Find local and online tutors across the UK for Maths, English, Science, 11 Plus, GCSE, A-Level and more. TuitionList is a free UK tutor directory where parents can contact independent tutors directly.",
    url: "/",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Find a Tutor Near Me | Free UK Tutor Directory | TuitionList",
    description:
      "Find local and online tutors across the UK for Maths, English, Science, 11 Plus, GCSE, A-Level and more. TuitionList is a free UK tutor directory where parents can contact independent tutors directly."
  }
};

export default function HomePage() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TuitionList",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/tuitionlist-logo.png`,
    description: "A free UK tutor directory for independent tutors, teachers, tuition providers, parents, carers, and students."
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "TuitionList",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/find-a-tutor?keyword={search_term_string}`,
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
            <h1 className="mt-5 text-4xl font-bold tracking-normal text-navy-900 sm:text-6xl">Find Local and Online Tutors Across the UK</h1>
            <p className="mt-6 text-lg leading-8 text-slate-700">
              TuitionList is a free UK tutor directory helping parents, carers, and students find local and online tutors for Maths, English, Science,
              11 Plus, GCSE, A-Level and more. Search independent tutors directly without agency fees, commission, subscriptions, unlock fees, or
              parent finder fees.
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
          <Panel
            className="self-start overflow-hidden p-0 text-navy-900 shadow-lift"
            style={{ backgroundColor: "#ffffff", borderColor: "#d9eaff" }}
          >
            <div className="border-b p-5" style={{ borderColor: "#d9eaff", backgroundColor: "#f8fbff" }}>
              <Search className="size-10 text-leaf-700" aria-hidden />
              <h2 className="mt-4 text-2xl font-bold text-navy-900">Search by what matters</h2>
              <p className="mt-3 leading-7 text-slate-700">
                Search by subject, level, UK location, online or in-person availability, and hourly rate. Clear profiles without agency commission.
              </p>
            </div>
            <div className="grid gap-3 p-5 text-sm text-navy-900">
              <span className="flex items-center gap-3 rounded-md px-3 py-2" style={{ backgroundColor: "#eef5ff" }}>
                <MapPin className="size-4 text-gold-700" aria-hidden />
                National UK search
              </span>
              <span className="flex items-center gap-3 rounded-md px-3 py-2" style={{ backgroundColor: "#ecfdf3" }}>
                <MessageSquareText className="size-4 text-leaf-700" aria-hidden />
                Send enquiries directly
              </span>
              <span className="flex items-center gap-3 rounded-md px-3 py-2" style={{ backgroundColor: "#eef9ff" }}>
                <CheckCircle2 className="size-4 text-sky-600" aria-hidden />
                Free tutor discovery
              </span>
            </div>
          </Panel>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-navy-900">A Free UK Tutor Directory for Parents and Students</h2>
            <p className="mt-2 max-w-3xl leading-7 text-slate-700">
              Find a tutor, compare private tuition options near you, or search online tutors across the UK. Parents can contact independent tutors
              and tuition providers directly through TuitionList.
            </p>
          </div>
          <SearchBox />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <Panel>
          <h2 className="text-2xl font-bold text-navy-900">Find Tutors by Subject</h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">Search for subject tutors across the UK, including core school subjects and exam preparation.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {subjectLinks.map(([label, href]) => (
              <LinkButton key={href} href={href} variant="secondary">
                {label}
              </LinkButton>
            ))}
          </div>
        </Panel>
        <Panel>
          <h2 className="text-2xl font-bold text-navy-900">Find Tutors by Level</h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">Compare tutors for primary, 11 Plus, GCSE, A-Level, SEN support, adult learning and more.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {levelLinks.map(([label, href]) => (
              <LinkButton key={href} href={href} variant="secondary">
                {label}
              </LinkButton>
            ))}
          </div>
        </Panel>
        <Panel>
          <h2 className="text-2xl font-bold text-navy-900">Find Tutors Near You</h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">Search local tutors by town, city, county or postcode area, or widen your search with online tuition.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {locationLinks.map(([label, href]) => (
              <LinkButton key={href} href={href} variant="secondary">
                {label}
              </LinkButton>
            ))}
          </div>
        </Panel>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Panel className="border-t-4 border-t-sky-600">
          <h2 className="text-2xl font-bold text-navy-900">Why Use TuitionList?</h2>
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
          <h2 className="text-2xl font-bold text-navy-900">List as a Tutor for Free</h2>
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
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Panel className="bg-sky-50">
            <h2 className="text-2xl font-bold text-navy-900">Online and In-Person Tuition</h2>
            <p className="mt-3 leading-7 text-slate-700">
              TuitionList helps families search for online tutors UK-wide, local tutors near them, or tutors who offer both. Before arranging lessons,
              parents should confirm lesson format, location, online safety, supervision, fees and cancellation terms directly with the tutor.
            </p>
          </Panel>
          <Panel className="bg-leaf-50">
            <h2 className="text-2xl font-bold text-navy-900">DBS Checked and Profile-Checked Tutor Profiles</h2>
            <p className="mt-3 leading-7 text-slate-700">
              Tutor profiles may show DBS self-declared information or checks marked as seen by TuitionList, such as ID, DBS, qualifications,
              references, insurance or safeguarding training. Badges and blue ticks show what has been self-declared, seen or confirmed. They do not
              mean TuitionList recommends or guarantees any tutor.
            </p>
            <div className="mt-5">
              <LinkButton href="/profile-checks" variant="secondary">
                Learn about profile checks
              </LinkButton>
            </div>
          </Panel>
        </div>
      </section>

      <section className="border-b border-navy-100 bg-white">
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

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-12 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-2xl font-bold text-navy-900">Popular Tutor Searches</h2>
          <p className="mt-2 max-w-3xl leading-7 text-slate-700">
            Explore popular searches for free tutor discovery, private tuition near me, online tutors, local tutors and no commission tutor listings.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {popularSearches.map(([label, href]) => (
            <LinkButton key={href} href={href} variant="secondary">
              {label}
            </LinkButton>
          ))}
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
