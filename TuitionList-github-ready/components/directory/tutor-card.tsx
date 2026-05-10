import { MapPin, Monitor, Users } from "lucide-react";
import { Badge, LinkButton, Panel } from "@/components/ui";
import { rateLabel } from "@/lib/utils";
import type { TutorProfile } from "@/types/domain";
import { AdminBadge } from "@/components/profile/admin-badge";
import { TrustBadges } from "@/components/profile/trust-badges";
import { VettedBadge } from "@/components/profile/vetted-badge";

export function TutorCard({ tutor, showPublicActions = true }: { tutor: TutorProfile; showPublicActions?: boolean }) {
  return (
    <Panel className="grid gap-4 md:grid-cols-[96px_1fr_auto]">
      <div className="grid size-24 place-items-center rounded-lg bg-navy-50 text-2xl font-bold text-navy-800">
        {tutor.profile_photo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={tutor.profile_photo_url} alt="" className="size-24 rounded-lg object-cover" />
        ) : (
          tutor.display_name
            .split(" ")
            .map((part) => part[0])
            .slice(0, 2)
            .join("")
        )}
      </div>
      <div className="grid gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-navy-900">
            {tutor.display_name}
            <AdminBadge isAdmin={tutor.is_platform_admin} />
            <VettedBadge checks={tutor.checks} />
          </h2>
          <p className="mt-1 flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-4" aria-hidden />
              {tutor.town}, {tutor.county}
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
        </div>
        <div className="flex flex-wrap gap-2">
          {tutor.subjects.slice(0, 4).map((subject) => (
            <Badge key={subject}>{subject}</Badge>
          ))}
          {tutor.levels.slice(0, 3).map((level) => (
            <Badge key={level} className="bg-white">
              {level}
            </Badge>
          ))}
        </div>
        <p className="text-sm leading-6 text-slate-700">{tutor.short_bio}</p>
        <TrustBadges checks={tutor.checks} />
      </div>
      <div className="flex min-w-36 flex-col justify-between gap-3 md:items-end">
        <p className="text-lg font-bold text-navy-900">{rateLabel(tutor)}</p>
        {showPublicActions ? (
          <div className="flex flex-wrap gap-2 md:flex-col">
            <LinkButton href={`/tutor/${tutor.slug}`} variant="secondary">
              View profile
            </LinkButton>
            <LinkButton href={`/tutor/${tutor.slug}#enquire`}>Send enquiry</LinkButton>
          </div>
        ) : null}
      </div>
    </Panel>
  );
}
