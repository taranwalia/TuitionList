import { LinkButton, Panel } from "@/components/ui";
import { DIRECTORY_DISCLAIMER } from "@/lib/constants";
import { canonicalUrl } from "@/lib/seo-pages";
import type { SeoPage } from "@/lib/seo-pages";

export function SeoLandingPage({ page }: { page: SeoPage }) {
  const breadcrumbs = breadcrumbItems(page.path, page.h1);

  return (
    <section className="bg-slate-50">
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
          <div className="mt-8 grid gap-5">
            {page.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-bold text-navy-900">{section.heading}</h2>
                <p className="mt-3 leading-7 text-slate-700">{section.body}</p>
              </section>
            ))}
          </div>
        </Panel>

        {page.links?.length ? (
          <Panel>
            <h2 className="text-2xl font-bold text-navy-900">Explore TuitionList</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {page.links.map((link) => (
                <LinkButton key={link.href} href={link.href} variant="secondary">
                  {link.label}
                </LinkButton>
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
      </div>
    </section>
  );
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
