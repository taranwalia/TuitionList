import { moderateTutor, updateTutorChecks } from "@/app/actions/admin";
import { Badge, Button, LinkButton, Panel, inputClass } from "@/components/ui";
import { requireAdmin } from "@/lib/auth";
import { getAdminTutors } from "@/lib/tutors";
import type { TutorProfile } from "@/types/domain";

export default async function ManageTutorsPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireAdmin();
  const params = await searchParams;
  const query = String(Array.isArray(params.q) ? params.q[0] : params.q ?? "").trim();
  const deleted = (Array.isArray(params.deleted) ? params.deleted[0] : params.deleted) === "1";
  const error = Array.isArray(params.error) ? params.error[0] : params.error;
  const tutors = await getAdminTutors();
  const visibleTutors = query ? tutors.filter((tutor) => matchesTutorSearch(tutor, query)) : tutors;

  return (
    <section className="mx-auto grid max-w-7xl gap-5 px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-navy-900">Manage tutors</h1>
      <Panel>
        <form className="grid gap-3 sm:grid-cols-[1fr_auto]" action="/admin/tutors">
          <label className="grid gap-2 text-sm font-medium text-navy-900">
            Search tutors
            <input name="q" className={inputClass} defaultValue={query} placeholder="Search by name, email, phone, town, county, subject or status" />
          </label>
          <Button type="submit" className="self-end">
            Search
          </Button>
        </form>
        {query ? <p className="mt-3 text-sm text-slate-600">{visibleTutors.length} result{visibleTutors.length === 1 ? "" : "s"} found.</p> : null}
        {deleted ? (
          <p className="mt-3 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-800">
            Tutor account and profile deleted.
          </p>
        ) : null}
        {error ? (
          <p className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-800">
            {error}
          </p>
        ) : null}
      </Panel>
      {visibleTutors.length === 0 ? (
        <Panel>
          <p className="text-sm text-slate-600">No tutors found.</p>
        </Panel>
      ) : null}
      {visibleTutors.map((tutor) => (
        <Panel key={tutor.id} className="grid gap-4 lg:grid-cols-[1fr_320px_320px]">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold text-navy-900">{tutor.display_name}</h2>
              <Badge>{tutor.status}</Badge>
            </div>
            <p className="mt-2 text-sm text-slate-600">{tutor.town}, {tutor.county} - {tutor.subjects.join(", ")}</p>
            <div className="mt-2 grid gap-1 text-sm text-slate-600">
              <p>Email: {tutor.admin_email ?? "Not recorded"}</p>
              <p>Phone: {tutor.phone ?? "Not recorded"}</p>
            </div>
            {tutor.rejection_reason ? <p className="mt-2 text-sm text-red-700">{tutor.rejection_reason}</p> : null}
            <div className="mt-4 flex flex-wrap gap-2">
              <LinkButton href={`/admin/tutors/${tutor.id}`} variant="secondary">
                View profile
              </LinkButton>
              <a
                href={`/admin/tutors/${tutor.id}/data`}
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-navy-200 bg-white px-4 py-2 text-sm font-semibold text-navy-900 transition hover:bg-navy-50"
              >
                Download data
              </a>
            </div>
          </div>
          <form action={moderateTutor} className="grid gap-2 sm:min-w-72">
            <input type="hidden" name="tutorId" value={tutor.id} />
            <textarea name="rejectionReason" placeholder="Reason if rejecting" className="rounded-md border border-slate-300 px-3 py-2 text-sm" />
            <div className="flex flex-wrap gap-2">
              <Button name="action" value="approve" type="submit">Approve</Button>
              <Button name="action" value="reject" type="submit" variant="secondary">Reject</Button>
              <Button name="action" value="suspend" type="submit" variant="secondary">Suspend</Button>
            </div>
          </form>
          <form action={updateTutorChecks} className="grid gap-2 text-sm">
            <input type="hidden" name="tutorId" value={tutor.id} />
            <p className="font-semibold text-navy-900">Admin checks</p>
            <label className="flex gap-2"><input name="idSeen" type="checkbox" defaultChecked={tutor.checks?.id_seen} /> ID seen</label>
            <label className="flex gap-2"><input name="dbsSeen" type="checkbox" defaultChecked={tutor.checks?.dbs_seen} /> DBS seen</label>
            <label className="flex gap-2"><input name="qualificationSeen" type="checkbox" defaultChecked={tutor.checks?.qualification_seen} /> Qualification seen</label>
            <label className="flex gap-2"><input name="referenceReceived" type="checkbox" defaultChecked={tutor.checks?.reference_received} /> Reference received</label>
            <label className="flex gap-2"><input name="insuranceConfirmed" type="checkbox" defaultChecked={tutor.checks?.insurance_confirmed} /> Insurance confirmed</label>
            <label className="flex gap-2"><input name="safeguardingSeen" type="checkbox" defaultChecked={tutor.checks?.safeguarding_seen} /> Safeguarding training confirmed</label>
            <textarea name="notes" placeholder="Private check notes" className="rounded-md border border-slate-300 px-3 py-2 text-sm" />
            <Button type="submit" variant="secondary">Save checks</Button>
          </form>
        </Panel>
      ))}
    </section>
  );
}

function matchesTutorSearch(tutor: TutorProfile, query: string) {
  const normalized = query.toLowerCase();
  return [
    tutor.display_name,
    tutor.admin_email,
    tutor.phone,
    tutor.town,
    tutor.county,
    tutor.postcode_area,
    tutor.status,
    ...tutor.subjects,
    ...tutor.levels
  ]
    .filter(Boolean)
    .some((value) => String(value).toLowerCase().includes(normalized));
}
