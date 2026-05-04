import { Panel } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { getTutorEnquiries } from "@/lib/enquiries";

export default async function TutorEnquiriesPage() {
  const { user } = await requireUser();
  const enquiries = await getTutorEnquiries(user.id);

  return (
    <section className="mx-auto grid max-w-5xl gap-5 px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-navy-900">Enquiries received</h1>
      {enquiries.length === 0 ? <Panel>No enquiries have been sent to your profile yet.</Panel> : null}
      {enquiries.map((enquiry) => (
        <Panel key={enquiry.id}>
          <p className="font-bold text-navy-900">{enquiry.parent_name}</p>
          <p className="mt-1 text-sm text-slate-600">{enquiry.subject} · {enquiry.level} · {enquiry.tuition_preference}</p>
          <p className="mt-3 leading-7 text-slate-700">{enquiry.message}</p>
          <p className="mt-3 text-sm text-slate-600">{enquiry.parent_email} {enquiry.parent_phone ? `· ${enquiry.parent_phone}` : ""}</p>
        </Panel>
      ))}
    </section>
  );
}
