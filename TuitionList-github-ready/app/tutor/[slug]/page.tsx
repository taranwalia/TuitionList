import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Monitor, Users } from "lucide-react";
import { Badge, Panel } from "@/components/ui";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { AdminBadge } from "@/components/profile/admin-badge";
import { TrustBadges } from "@/components/profile/trust-badges";
import { VettedBadge } from "@/components/profile/vetted-badge";
import { PROFILE_DISCLAIMER, SITE_URL } from "@/lib/constants";
import { getTutorBySlug } from "@/lib/tutors";
import { rateLabel } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tutor = await getTutorBySlug(slug);
  if (!tutor) return {};

  return {
    title: `${tutor.display_name} | ${tutor.subjects.slice(0, 2).join(" and ")} tutor`,
    description: `${tutor.display_name} teaches ${tutor.subjects.join(", ")} in ${tutor.town}, ${tutor.county}. ${tutor.short_bio}`,
    alternates: {
      canonical: `${SITE_URL}/tutor/${tutor.slug}`
    },
    openGraph: {
      title: `${tutor.display_name} on TuitionList`,
      description: tutor.short_bio,
      url: `${SITE_URL}/tutor/${tutor.slug}`,
      images: tutor.profile_photo_url ? [tutor.profile_photo_url] : undefined
    }
  };
}

export default async function TutorProfilePage({
  params,
  searchParams
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const query = await searchParams;
  const tutor = await getTutorBySlug(slug);
  if (!tutor) notFound();
  const enquirySent = (Array.isArray(query.enquiry) ? query.enquiry[0] : query.enquiry) === "sent";
  const enquiryError = Array.isArray(query.error) ? query.error[0] : query.error;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: tutor.display_name,
    url: `${SITE_URL}/tutor/${tutor.slug}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: tutor.town,
      addressRegion: tutor.county,
      addressCountry: "GB"
    },
    description: tutor.short_bio,
    knowsAbout: tutor.subjects
  };

  return (
    <section className="bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
        <div className="grid gap-6">
          <Panel className="grid gap-5 md:grid-cols-[128px_1fr]">
            <div className="grid size-32 place-items-center rounded-lg bg-navy-50 text-3xl font-bold text-navy-800">
              {tutor.profile_photo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={tutor.profile_photo_url} alt="" className="size-32 rounded-lg object-cover" />
              ) : (
                tutor.display_name
                  .split(" ")
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")
              )}
            </div>
            <div>
              <h1 className="flex flex-wrap items-center gap-3 text-4xl font-bold text-navy-900">
                {tutor.display_name}
                <AdminBadge isAdmin={tutor.is_platform_admin} />
                <VettedBadge checks={tutor.checks} size="lg" />
              </h1>
              <p className="mt-3 flex flex-wrap gap-3 text-sm text-slate-600">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="size-4" aria-hidden />
                  {tutor.town}, {tutor.county} ({tutor.postcode_area})
                </span>
                {tutor.online_available ? (
                  <span className="inline-flex items-center gap-1">
                    <Monitor className="size-4" aria-hidden />
                    Online
                  </span>
                ) : null}
                {tutor.in_person_available ? (
                  <span className="inline-flex items-center gap-1">
                    <Users className="size-4" aria-hidden />
                    In-person
                  </span>
                ) : null}
              </p>
              <p className="mt-4 text-2xl font-bold text-navy-900">{rateLabel(tutor)}</p>
              <div className="mt-4">
                <TrustBadges checks={tutor.checks} />
              </div>
            </div>
          </Panel>

          <Panel>
            <h2 className="text-2xl font-bold text-navy-900">Subjects and levels</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {tutor.subjects.map((subject) => (
                <Badge key={subject}>{subject}</Badge>
              ))}
              {tutor.levels.map((level) => (
                <Badge key={level} className="bg-white">
                  {level}
                </Badge>
              ))}
            </div>
          </Panel>

          <Panel>
            <h2 className="text-2xl font-bold text-navy-900">About</h2>
            <p className="mt-4 leading-7 text-slate-700">{tutor.long_bio}</p>
          </Panel>

          <Panel>
            <h2 className="text-2xl font-bold text-navy-900">Experience</h2>
            <p className="mt-4 leading-7 text-slate-700">{tutor.experience}</p>
          </Panel>

          <Panel>
            <h2 className="text-2xl font-bold text-navy-900">Qualifications</h2>
            {tutor.qualifications?.length ? (
              <div className="mt-4 grid gap-3">
                {tutor.qualifications.map((qualification) => (
                  <div key={qualification.id} className="rounded-md border border-slate-200 p-4">
                    <p className="font-semibold text-navy-900">{qualification.title}</p>
                    <p className="text-sm text-slate-600">
                      {[qualification.institution, qualification.year].filter(Boolean).join(" · ")}
                    </p>
                    {qualification.description ? <p className="mt-2 text-sm text-slate-700">{qualification.description}</p> : null}
                    <p className="mt-2 text-xs font-medium text-slate-500">
                      {qualification.admin_checked ? "Qualification seen by TuitionList" : "Self-declared by tutor"}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-slate-600">No qualifications shown on this profile yet.</p>
            )}
          </Panel>
        </div>

        <aside className="grid content-start gap-5">
          <EnquiryForm
            tutorId={tutor.id}
            tutorName={tutor.display_name}
            returnPath={`/tutor/${tutor.slug}`}
            success={enquirySent}
            error={enquiryError}
          />
          <Panel className="bg-navy-50">
            <h2 className="font-bold text-navy-900">Before arranging tuition</h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">{PROFILE_DISCLAIMER}</p>
          </Panel>
        </aside>
      </div>
    </section>
  );
}
