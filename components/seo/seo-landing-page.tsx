import { LinkButton, Panel } from "@/components/ui";
import { TutorCard } from "@/components/directory/tutor-card";
import { DIRECTORY_DISCLAIMER } from "@/lib/constants";
import { canonicalUrl } from "@/lib/seo-pages";
import type { SeoPage } from "@/lib/seo-pages";
import { TrackEvent } from "@/components/analytics/track-event";
import { getPublishedTutors } from "@/lib/tutors";
import type { DirectoryFilters, TutorProfile } from "@/types/domain";

export async function SeoLandingPage({ page }: { page: SeoPage }) {
  const breadcrumbs = breadcrumbItems(page.path, page.h1);
  const analyticsEvent = page.path.startsWith("/locations/") || page.path.startsWith("/tutors/") ? "location_page_viewed" : page.path.includes("tutors") ? "subject_page_viewed" : undefined;
  const tutorResults = page.tutorSearch ? await tutorsForSeoPage(page) : null;

  return (
    <section className="bg-slate-50">
      {analyticsEvent ? <TrackEvent name={analyticsEvent} properties={{ path: page.path, title: page.h1 }} /> : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: breadcrumbs.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.label,
              item: canonicalUrl(item.href)
            }))
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: page.h1,
            description: page.description,
            url: canonicalUrl(page.path),
            isPartOf: {
              "@type": "WebSite",
              name: "TuitionList",
              url: canonicalUrl("/")
            }
          })
        }}
      />
      {page.faqs?.length ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: page.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer
                }
              }))
            })
          }}
        />
      ) : null}
      <div className="mx-auto grid max-w-5xl gap-6 px-4 py-12 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap gap-2 text-sm text-slate-600" aria-label="Breadcrumb">
          {breadcrumbs.map((item, index) => (
            <span key={item.href} className="inline-flex items-center gap-2">
              {index > 0 ? <span aria-hidden>/</span> : null}
              {index === breadcrumbs.length - 1 ? (
                <span>{item.label}</span>
              ) : (
                <a href={item.href} className="font-medium text-navy-800 underline">
                  {item.label}
                </a>
              )}
            </span>
          ))}
        </nav>

        <Panel>
          <h1 className="text-4xl font-bold text-navy-900">{page.h1}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">{page.intro}</p>
        </Panel>

        {tutorResults ? <SeoTutorResults page={page} results={tutorResults} /> : null}

        <Panel>
          <div className="grid gap-6">
            {page.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-bold text-navy-900">{section.heading}</h2>
                <p className="mt-3 leading-7 text-slate-700">{section.body}</p>
              </section>
            ))}
          </div>
        </Panel>

        {page.tutorSearch ? <StructuredTutorSeoSections page={page} /> : null}

        {page.links?.length ? (
          <Panel>
            <h2 className="text-2xl font-bold text-navy-900">Related searches</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {page.links.map((link) => (
                <LinkButton key={link.href} href={link.href} variant="secondary">
                  {link.label}
                </LinkButton>
              ))}
            </div>
          </Panel>
        ) : null}

        {page.faqs?.length ? (
          <Panel>
            <h2 className="text-2xl font-bold text-navy-900">FAQs</h2>
            <div className="mt-5 grid gap-4">
              {page.faqs.map((faq) => (
                <section key={faq.question}>
                  <h3 className="font-bold text-navy-900">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{faq.answer}</p>
                </section>
              ))}
            </div>
          </Panel>
        ) : null}

        <Panel className="bg-navy-50">
          <h2 className="text-xl font-bold text-navy-900">Directory-only reminder</h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">{DIRECTORY_DISCLAIMER}</p>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Where possible, TuitionList may review certain information or evidence provided by tutors and tuition providers. Badges, blue ticks, and
            profile labels only show what has been self-declared, seen, or confirmed by TuitionList.
          </p>
        </Panel>

        <div className="grid gap-4 md:grid-cols-2">
          <Panel className="bg-white">
            <h2 className="text-xl font-bold text-navy-900">Are you a tutor?</h2>
            <p className="mt-3 text-sm leading-6 text-slate-700">Create your free TuitionList profile so parents, carers, and students can find your tuition services.</p>
            <div className="mt-5">
              <LinkButton href="/become-a-tutor">Create your free TuitionList profile</LinkButton>
            </div>
          </Panel>
          <Panel className="bg-white">
            <h2 className="text-xl font-bold text-navy-900">Ready to search?</h2>
            <p className="mt-3 text-sm leading-6 text-slate-700">Browse published tutor profiles and send enquiries directly through TuitionList.</p>
            <div className="mt-5">
              <LinkButton href={findTutorHref(page)} variant="secondary">
                Start browsing tutors
              </LinkButton>
            </div>
          </Panel>
        </div>
      </div>
    </section>
  );
}

function SeoTutorResults({
  page,
  results
}: {
  page: SeoPage;
  results: {
    exact: TutorProfile[];
    nearby: TutorProfile[];
    online: TutorProfile[];
  };
}) {
  const visibleTutors = results.exact.length ? results.exact : [...results.nearby, ...results.online].slice(0, 4);
  const heading = results.exact.length ? "Tutors matching this search" : "Online and nearby tutors";

  return (
    <Panel>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-navy-900">{heading}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-700">
            {results.exact.length
              ? "These published tutor profiles match the subject, level, location, or tuition type for this page."
              : "No exact local match is published yet. You can still browse online tutors and nearby tutors where available."}
          </p>
        </div>
        <LinkButton href={findTutorHref(page)} variant="secondary">
          Start browsing tutors
        </LinkButton>
      </div>
      <div className="mt-5 grid gap-4">
        {visibleTutors.length ? (
          visibleTutors.map((tutor) => <TutorCard key={tutor.id} tutor={tutor} />)
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-sm leading-6 text-slate-700">
            No published tutors match this page yet. New tutor profiles are added after admin review, and online tutors may still be available through the main directory.
          </div>
        )}
      </div>
    </Panel>
  );
}

function StructuredTutorSeoSections({ page }: { page: SeoPage }) {
  const subjectOrLevel = [page.tutorSearch?.level, page.tutorSearch?.subject].filter(Boolean).join(" ") || "this subject";
  const location = page.tutorSearch?.location;

  return (
    <div className="grid gap-6">
      <Panel>
        <h2 className="text-2xl font-bold text-navy-900">Why choose a tutor for {subjectOrLevel}?</h2>
        <p className="mt-3 leading-7 text-slate-700">
          A tutor can offer focused support, structured practice, confidence building, exam preparation, or help with specific gaps in understanding. TuitionList does not guarantee results, so families should choose a tutor based on their own checks and the learner's needs.
        </p>
      </Panel>

      <Panel>
        <h2 className="text-2xl font-bold text-navy-900">Online vs in-person tutoring</h2>
        <p className="mt-3 leading-7 text-slate-700">
          Online tutoring can make it easier to compare tutors across the UK, while in-person tutoring may suit learners who prefer face-to-face support. Some tutors offer both. Before arranging tuition, agree the lesson format, supervision, safeguarding arrangements, communication rules, and how progress will be shared.
        </p>
      </Panel>

      <Panel>
        <h2 className="text-2xl font-bold text-navy-900">What to look for in a tutor</h2>
        <p className="mt-3 leading-7 text-slate-700">
          Look at experience, subject knowledge, teaching style, availability, rates, references or independent reviews where available outside TuitionList, DBS or background information where relevant, qualifications, safeguarding arrangements, and whether the tutor is a good fit for the learner.
        </p>
      </Panel>

      <div className="grid gap-6 lg:grid-cols-2">
        {page.tutorSearch?.nearbyLinks?.length ? (
          <Panel>
            <h2 className="text-2xl font-bold text-navy-900">Nearby areas{location ? ` near ${location}` : ""}</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {page.tutorSearch.nearbyLinks.map((link) => (
                <LinkButton key={link.href} href={link.href} variant="secondary">
                  {link.label}
                </LinkButton>
              ))}
            </div>
          </Panel>
        ) : null}

        {page.tutorSearch?.relatedSubjectLinks?.length ? (
          <Panel>
            <h2 className="text-2xl font-bold text-navy-900">Related subjects</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {page.tutorSearch.relatedSubjectLinks.map((link) => (
                <LinkButton key={link.href} href={link.href} variant="secondary">
                  {link.label}
                </LinkButton>
              ))}
            </div>
          </Panel>
        ) : null}
      </div>
    </div>
  );
}

async function tutorsForSeoPage(page: SeoPage) {
  const filters: DirectoryFilters = {
    subject: page.tutorSearch?.subject,
    level: page.tutorSearch?.level,
    location: page.tutorSearch?.location,
    tuitionPreference: page.tutorSearch?.onlineOnly ? "online" : undefined,
    sort: "newest"
  };

  const exact = await getPublishedTutors(filters);
  if (exact.length) return { exact: exact.slice(0, 4), nearby: [], online: [] };

  const nearby = page.tutorSearch?.nearbyLinks?.length
    ? (
        await Promise.all(
          page.tutorSearch.nearbyLinks.slice(0, 3).map((link) =>
            getPublishedTutors({
              subject: page.tutorSearch?.subject,
              level: page.tutorSearch?.level,
              location: locationFromNearbyLabel(link.label),
              sort: "newest"
            })
          )
        )
      )
        .flat()
        .slice(0, 3)
    : [];

  const online = await getPublishedTutors({
    subject: page.tutorSearch?.subject,
    level: page.tutorSearch?.level,
    tuitionPreference: "online",
    sort: "newest"
  });

  return { exact: [], nearby, online: online.slice(0, 4 - nearby.length) };
}

function locationFromNearbyLabel(label: string) {
  return label.replace(/^Tutors in\s+/i, "").trim();
}

function findTutorHref(page: SeoPage) {
  const params = new URLSearchParams();
  if (page.tutorSearch?.subject) params.set("subject", page.tutorSearch.subject);
  if (page.tutorSearch?.level) params.set("level", page.tutorSearch.level);
  if (page.tutorSearch?.location) params.set("location", page.tutorSearch.location);
  if (page.tutorSearch?.onlineOnly) params.set("tuitionPreference", "online");
  const query = params.toString();
  return query ? `/find-a-tutor?${query}` : "/find-a-tutor";
}

function breadcrumbItems(path: string, currentLabel: string) {
  const segments = path.replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);
  const items = [{ href: "/", label: "Home" }];

  segments.forEach((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;
    items.push({ href, label: index === segments.length - 1 ? currentLabel : titleFromSegment(segment) });
  });

  return items;
}

function titleFromSegment(segment: string) {
  return segment
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
