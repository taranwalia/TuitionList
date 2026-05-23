import { notFound } from "next/navigation";
import { MapPin, Monitor, Phone, Users } from "lucide-react";
import { deleteTutorAccount, moderateTutor, updateTutorChecks } from "@/app/actions/admin";
import { SubmitButton } from "@/components/forms/submit-button";
import { Badge, Button, LinkButton, Panel } from "@/components/ui";
import { TrustBadges } from "@/components/profile/trust-badges";
import { requireAdmin } from "@/lib/auth";
import { getAdminTutorById } from "@/lib/tutors";
import { rateLabel } from "@/lib/utils";

export default async function AdminTutorDetailPage({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireAdmin();
  const { id } = await params;
  const query = await searchParams;
  const tutor = await getAdminTutorById(id);
  if (!tutor) notFound();
  const error = Array.isArray(query.error) ? query.error[0] : query.error;
  const updated = (Array.isArray(query.updated) ? query.updated[0] : query.updated) === "1";

  return (
    <section className="bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <div className="grid gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <LinkButton href="/admin/tutors" variant="ghost" className="px-0">
                Back to manage tutors
              </LinkButton>
              <h1 className="mt-2 text-4xl font-bold text-navy-900">{tutor.display_name}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Badge>{tutor.status}</Badge>
                <Badge className="bg-white">{rateLabel(tutor)}</Badge>
              </div>
            </div>
            {tutor.status === "published" ? (
              <LinkButton href={`/tutor/${tutor.slug}`} variant="secondary">
                Public profile
              </LinkButton>
            ) : null}
            <LinkButton href={`/admin/tutors/${tutor.id}/edit`} variant="secondary">
              Edit profile
            </LinkButton>
          </div>

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
            <div className="grid gap-3">
              {tutor.full_name ? <p className="text-sm font-medium text-slate-700">Full name: {tutor.full_name}</p> : null}
              <p className="flex flex-wrap gap-3 text-sm text-slate-600">
                {tutor.admin_email ? (
                  <span className="inline-flex items-center gap-1">
                    Email: {tutor.admin_email}
                  </span>
                ) : null}
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
                {tutor.phone ? (
                  <span className="inline-flex items-center gap-1">
                    <Phone className="size-4" aria-hidden />
                    {tutor.phone}
                  </span>
                ) : null}
              </p>
              <div className="flex flex-wrap gap-2">
                {tutor.subjects.map((subject) => (
                  <Badge key={subject}>{subject}</Badge>
                ))}
                {tutor.levels.map((level) => (
                  <Badge key={level} className="bg-white">
                    {level}
                  </Badge>
                ))}
              </div>
              <TrustBadges checks={tutor.checks} />
            </div>
          </Panel>

          <Panel>
            <h2 className="text-2xl font-bold text-navy-900">Short bio</h2>
            <p className="mt-4 leading-7 text-slate-700">{tutor.short_bio}</p>
          </Panel>

          <Panel>
            <h2 className="text-2xl font-bold text-navy-900">About</h2>
            <p className="mt-4 whitespace-pre-wrap leading-7 text-slate-700">{tutor.long_bio}</p>
          </Panel>

          <Panel>
            <h2 className="text-2xl font-bold text-navy-900">Experience</h2>
            <p className="mt-4 whitespace-pre-wrap leading-7 text-slate-700">{tutor.experience}</p>
          </Panel>

          <Panel>
            <h2 className="text-2xl font-bold text-navy-900">Links</h2>
            <div className="mt-4 grid gap-2 text-sm">
              <p>
                Website:{" "}
                {tutor.website_url ? (
                  <a className="font-semibold text-navy-800 underline" href={tutor.website_url}>
                    {tutor.website_url}
                  </a>
                ) : (
                  "Not provided"
                )}
              </p>
              <p>
                LinkedIn:{" "}
                {tutor.linkedin_url ? (
                  <a className="font-semibold text-navy-800 underline" href={tutor.linkedin_url}>
                    {tutor.linkedin_url}
                  </a>
                ) : (
                  "Not provided"
                )}
              </p>
            </div>
          </Panel>
        </div>

        <aside className="grid content-start gap-5">
          {error ? (
            <Panel className="border-red-200 bg-red-50">
              <p className="text-sm font-semibold text-red-800">{error}</p>
            </Panel>
          ) : null}
          {updated ? (
            <Panel className="border-green-200 bg-green-50">
              <p className="text-sm font-semibold text-green-800">Tutor profile updated. You can now continue reviewing it.</p>
            </Panel>
          ) : null}

          <Panel>
            <h2 className="text-xl font-bold text-navy-900">Data request export</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Download the tutor data held by TuitionList as JSON so it can be reviewed and sent in response to a personal data request.
            </p>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              Review before sending. The export may include enquiry records and admin notes. Private verification document file contents are not
              included.
            </p>
            <a
              href={`/admin/tutors/${tutor.id}/data`}
              className="mt-4 inline-flex min-h-11 items-center justify-center rounded-md bg-navy-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy-900"
            >
              Download tutor data
            </a>
          </Panel>

          <Panel>
            <h2 className="text-xl font-bold text-navy-900">Moderation</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Approve, reject, or suspend this tutor after reviewing the profile details.</p>
            <form action={moderateTutor} className="mt-4 grid gap-3">
              <input type="hidden" name="tutorId" value={tutor.id} />
              <input type="hidden" name="returnTo" value={`/admin/tutors/${tutor.id}`} />
              <textarea name="rejectionReason" placeholder="Reason if rejecting" className="min-h-24 rounded-md border border-slate-300 px-3 py-2 text-sm" />
              <div className="flex flex-wrap gap-2">
                <SubmitButton name="action" value="approve" type="submit" pendingChildren="Approving...">
                  Approve
                </SubmitButton>
                <SubmitButton name="action" value="reject" type="submit" variant="secondary" pendingChildren="Rejecting...">
                  Reject
                </SubmitButton>
                <SubmitButton name="action" value="suspend" type="submit" variant="secondary" pendingChildren="Suspending...">
                  Suspend
                </SubmitButton>
              </div>
            </form>
          </Panel>

          <Panel>
            <h2 className="text-xl font-bold text-navy-900">Admin checks</h2>
            <form action={updateTutorChecks} className="mt-4 grid gap-2 text-sm">
              <input type="hidden" name="tutorId" value={tutor.id} />
              <input type="hidden" name="returnTo" value={`/admin/tutors/${tutor.id}`} />
              <label className="flex gap-2"><input name="idSeen" type="checkbox" defaultChecked={tutor.checks?.id_seen} /> ID seen</label>
              <label className="flex gap-2"><input name="dbsSeen" type="checkbox" defaultChecked={tutor.checks?.dbs_seen} /> DBS seen</label>
              <label className="flex gap-2"><input name="qualificationSeen" type="checkbox" defaultChecked={tutor.checks?.qualification_seen} /> Qualification seen</label>
              <label className="flex gap-2"><input name="referenceReceived" type="checkbox" defaultChecked={tutor.checks?.reference_received} /> Reference received</label>
              <label className="flex gap-2"><input name="insuranceConfirmed" type="checkbox" defaultChecked={tutor.checks?.insurance_confirmed} /> Insurance confirmed</label>
              <label className="flex gap-2"><input name="safeguardingSeen" type="checkbox" defaultChecked={tutor.checks?.safeguarding_seen} /> Safeguarding training confirmed</label>
              <textarea name="notes" placeholder="Private check notes" className="min-h-24 rounded-md border border-slate-300 px-3 py-2 text-sm" />
              <Button type="submit" variant="secondary">Save checks</Button>
            </form>
          </Panel>

          <Panel className="border-red-200 bg-red-50">
            <h2 className="text-xl font-bold text-red-900">Delete tutor account</h2>
            <p className="mt-2 text-sm leading-6 text-red-800">
              This permanently deletes the tutor's login account and removes their tutor profile from TuitionList. This should only be used for
              genuine removal requests or serious admin actions.
            </p>
            <form action={deleteTutorAccount} className="mt-4 grid gap-3">
              <input type="hidden" name="tutorId" value={tutor.id} />
              <label className="grid gap-2 text-sm font-medium text-red-950">
                Type DELETE to confirm
                <input
                  name="confirmation"
                  className="min-h-11 rounded-md border border-red-200 bg-white px-3 py-2 text-sm text-red-950 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
              </label>
              <Button type="submit" variant="secondary" className="border-red-300 text-red-900 hover:bg-red-100">
                Delete account and profile
              </Button>
            </form>
          </Panel>
        </aside>
      </div>
    </section>
  );
}
