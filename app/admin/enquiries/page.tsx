import { Panel } from "@/components/ui";
import { requireAdmin } from "@/lib/auth";
import { getAdminEnquiries } from "@/lib/enquiries";

export default async function AdminEnquiriesPage() {
  await requireAdmin();
  const enquiries = await getAdminEnquiries();

  return (
    <section className="mx-auto grid max-w-6xl gap-5 px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-navy-900">Manage enquiries</h1>
      {enquiries.length === 0 ? <Panel>No enquiries have been received yet.</Panel> : null}
      {enquiries.map((enquiry) => (
        <Panel key={enquiry.id}>
          <div className="flex flex-wrap justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-bold text-navy-900">{enquiry.parent_name}</p>
                {enquiry.withheld_from_tutor ? (
                  <span className="rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-800">
                    Held from tutor
                  </span>
                ) : null}
              </div>
              <p className="text-sm text-slate-600">{enquiry.parent_email}</p>
            </div>
            <p className="text-sm text-slate-500">{new Date(enquiry.created_at).toLocaleString("en-GB")}</p>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            {enquiry.subject} - {enquiry.level} - {enquiry.location}
          </p>
          {enquiry.withheld_from_tutor ? (
            <p className="mt-3 rounded-md border border-orange-200 bg-orange-50 px-3 py-2 text-sm leading-6 text-orange-900">
              This enquiry was not emailed to the tutor because it looked like marketing, research, or spam.
              {typeof enquiry.spam_score === "number" ? ` Spam score: ${enquiry.spam_score}.` : ""}
              {enquiry.moderation_reason ? ` ${enquiry.moderation_reason}` : ""}
            </p>
          ) : null}
          <p className="mt-3 whitespace-pre-wrap leading-7 text-slate-700">{enquiry.message}</p>
        </Panel>
      ))}
    </section>
  );
}
