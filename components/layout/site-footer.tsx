import { BrandLogo } from "@/components/layout/brand-logo";
import Link from "next/link";

const links = [
  ["Find a Tutor", "/find-a-tutor"],
  ["Online Tutors", "/online-tutors"],
  ["Free Directory", "/free-tutor-directory-uk"],
  ["Local Tutors", "/local-tutors-uk"],
  ["For Parents", "/for-parents"],
  ["For Tutors", "/for-tutors"],
  ["Subjects", "/subjects"],
  ["Locations", "/locations"],
  ["Guides", "/guides"],
  ["Profile Checks", "/profile-checks"],
  ["First Tutors Alternative", "/first-tutors-alternative"],
  ["Tutor Websites", "/best-tutor-websites-uk"],
  ["About", "/about"],
  ["Contact", "/contact"],
  ["Pricing", "/pricing"],
  ["Safeguarding", "/safeguarding"],
  ["Terms", "/terms"],
  ["Privacy", "/privacy"],
  ["Disclaimer", "/disclaimer"]
];

export function SiteFooter() {
  return (
    <footer className="border-t border-navy-100 bg-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 rounded-lg border border-navy-100 bg-sky-50 p-5 md:flex-row">
          <div>
            <BrandLogo imageClassName="h-9 w-36" />
            <p className="mt-1 max-w-2xl text-sm text-slate-600">
              A free UK tutor directory built to help tutors stay visible and parents, carers, and students find support.
            </p>
          </div>
          <nav className="flex flex-wrap gap-4 text-sm font-medium text-slate-600">
            {links.map(([label, href]) => (
              <Link key={href} href={href} className="hover:text-navy-900">
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="grid max-w-5xl gap-3 text-xs leading-5 text-slate-500">
          <p>
            TuitionList is an online directory only. Tutors and tuition providers listed on TuitionList are independent providers and are not
            employed, managed, supervised, or endorsed by TuitionList.
          </p>
          <p>
            Where possible, TuitionList may review certain information or evidence provided by tutors and tuition providers, such as identity, DBS
            certificate details, qualifications, insurance, or safeguarding training. Any badges, blue ticks, or profile labels are intended to show
            what information has been self-declared, seen, or confirmed by TuitionList. They do not mean that TuitionList recommends, guarantees,
            supervises, or accepts responsibility for any tutor or tuition provider.
          </p>
          <p>
            We do not arrange tuition, process lesson payments, supervise lessons, or guarantee the quality, suitability, availability,
            qualifications, DBS status, safeguarding arrangements, or outcomes of any tutor or tuition provider listed on the platform.
          </p>
          <p>
            Parents, carers, and students are responsible for making their own enquiries and satisfying themselves that a tutor or tuition provider is
            suitable before arranging tuition. This may include checking identity, DBS certificate details where relevant, qualifications, references,
            experience, insurance, safeguarding training, lesson arrangements, online safety measures, and any other information relevant to their
            needs.
          </p>
        </div>
      </div>
    </footer>
  );
}
