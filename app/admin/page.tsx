import { ClipboardCheck, Inbox, Mail, Users } from "lucide-react";
import type { ReactNode } from "react";
import { Button, LinkButton, Panel, inputClass } from "@/components/ui";
import { requireAdmin } from "@/lib/auth";
import { getAdminEnquiries } from "@/lib/enquiries";
import { getAdminTutors } from "@/lib/tutors";
import type { TutorProfile } from "@/types/domain";

export default async function AdminDashboardPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireAdmin();
  const params = await searchParams;
  const query = String(Array.isArray(params.q) ? params.q[0] : params.q ?? "").trim();
  const tutors = await getAdminTutors();
  const enquiries = await getAdminEnquiries();
  const searchResults = query ? tutors.filter((tutor) => matchesTutorSearch(tutor, query)).slice(0, 8) : tutors.slice(0, 5);
  const pending = tutors.filter((tutor) => tutor.status === "pending").length;
  const published = tutors.filter((tutor) => tutor.status === "published").length;
  const unavailable = tutors.filter((tutor) => tutor.status === "rejected" || tutor.status === "suspended").length;

  return (
    <section className="bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-4">
          <h1 className="text-4xl font-bold text-navy-900">Admin dashboard</h1>
          <p className="mt-3 text-slate-700">Manage tutor approvals, checks and enquiries.</p>
        </div>
        <Stat title="Total tutors" value={tutors.length} icon={<Users className="size-6" />} />
        <Stat title="Published" value={published} icon={<ClipboardCheck className="size-6" />} />
        <Stat title="Pending" value={pending} icon={<ClipboardCheck className="size-6" />} />
        <Stat title="Rejected/suspended" value={unavailable} icon={<Users className="size-6" />} />
        <Panel className="lg:col-span-2">
          <h2 className="text-xl font-bold">Tutor management</h2>
          <p className="mt-2 text-sm text-slate-600">Review, approve, reject and suspend tutor profiles.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <LinkButton href="/admin/tutors">Manage tutors</LinkButton>
            <LinkButton href="/admin/tutors/pending" variant="secondary">Pending approvals</LinkButton>
          </div>
        </Panel>
        <Panel className="lg:col-span-2">
          <Inbox className="size-7 text-leaf-700" aria-hidden />
          <h2 className="mt-3 text-xl font-bold">Latest enquiries</h2>
          <p className="mt-2 text-sm text-slate-600">
            {enquiries.length} {enquiries.length === 1 ? "enquiry" : "enquiries"} recorded.
          </p>
          <LinkButton href="/admin/enquiries" className="mt-5" variant="secondary">Manage enquiries</LinkButton>
        </Panel>
        <Panel className="lg:col-span-4">
          <Mail className="size-7 text-leaf-700" aria-hidden />
          <h2 className="mt-3 text-xl font-bold">Email logs</h2>
          <p className="mt-2 text-sm text-slate-600">
            View account, profile review and enquiry email attempts sent by TuitionList.
          </p>
          <LinkButton href="/admin/email-logs" className="mt-5" variant="secondary">View email logs</LinkButton>
        </Panel>
        <Panel className="lg:col-span-4">
          <h2 className="text-xl font-bold text-navy-900">Search tutors</h2>
          <form className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]" action="/admin">
            <input name="q" className={inputClass} defaultValue={query} placeholder="Search by name, email, phone, town, subject or status" />
            <Button type="submit">Search</Button>
          </form>
          <div className="mt-5 grid gap-3">
            {searchResults.map((tutor) => (
              <div key={tutor.id} className="rounded-md border border-slate-200 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-navy-900">{tutor.display_name}</p>
                    <p className="mt-1 text-sm text-slate-600">
                      {tutor.town}, {tutor.county} - {tutor.status}
                    </p>
                    <p className="mt-2 text-sm text-slate-600">Email: {tutor.admin_email ?? "Not recorded"}</p>
                    <p className="text-sm text-slate-600">Phone: {tutor.phone ?? "Not recorded"}</p>
                  </div>
                  <LinkButton href={`/admin/tutors/${tutor.id}`} variant="secondary">
                    View profile
                  </LinkButton>
                </div>
              </div>
            ))}
            {searchResults.length === 0 ? <p className="text-sm text-slate-600">No tutors found.</p> : null}
          </div>
        </Panel>
      </div>
    </section>
  );
}

function Stat({ title, value, icon }: { title: string; value: number; icon: ReactNode }) {
  return (
    <Panel>
      <div className="flex items-center justify-between text-leaf-700">{icon}</div>
      <p className="mt-4 text-3xl font-bold text-navy-900">{value}</p>
      <p className="mt-1 text-sm text-slate-600">{title}</p>
    </Panel>
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
