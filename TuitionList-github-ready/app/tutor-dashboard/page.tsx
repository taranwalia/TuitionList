import { Inbox, ShieldCheck, UserPen } from "lucide-react";
import { LinkButton, Panel } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { getTutorDashboardProfile } from "@/lib/tutors";
import type { TutorStatus } from "@/types/domain";

export default async function TutorDashboardPage() {
  const { user } = await requireUser();
  const profile = await getTutorDashboardProfile(user.id);
  const statusDisplay = getStatusDisplay(profile?.status);

  return (
    <section className="bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="lg:col-span-3">
          <h1 className="text-4xl font-bold text-navy-900">Tutor dashboard</h1>
          <p className="mt-3 text-slate-700">Create, submit and manage your TuitionList profile.</p>
        </div>
        <Panel>
          <UserPen className="size-8 text-leaf-700" aria-hidden />
          <h2 className="mt-4 text-xl font-bold">Profile</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Complete your tutor profile and submit it for approval.</p>
          <LinkButton href="/tutor-dashboard/profile" className="mt-5">
            Edit profile
          </LinkButton>
        </Panel>
        <Panel>
          <Inbox className="size-8 text-leaf-700" aria-hidden />
          <h2 className="mt-4 text-xl font-bold">Enquiries</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">View parent enquiries sent through your profile.</p>
          <LinkButton href="/tutor-dashboard/enquiries" className="mt-5" variant="secondary">
            View enquiries
          </LinkButton>
        </Panel>
        <Panel>
          <h2 className="text-xl font-bold">Profile status</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Profiles begin as drafts, move to pending approval, then become published only after admin approval.</p>
          <div className={`mt-5 rounded-md border px-4 py-3 text-xl font-extrabold ${statusDisplay.className}`}>
            {statusDisplay.label}
          </div>
          {profile?.rejection_reason ? (
            <p className="mt-3 text-sm leading-6 text-red-700">{profile.rejection_reason}</p>
          ) : null}
        </Panel>
        <Panel className="lg:col-span-3">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <ShieldCheck className="size-8 text-leaf-700" aria-hidden />
              <h2 className="mt-4 text-xl font-bold text-navy-900">Profile checks</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                To request profile checks, email{" "}
                <a href="mailto:hello@tuitionlist.co.uk" className="font-semibold text-navy-800 underline">
                  hello@tuitionlist.co.uk
                </a>
                {" "}with the information or evidence you would like TuitionList to review. Any badges or labels only show what has been marked as
                seen or confirmed by TuitionList.
              </p>
            </div>
            <div className="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm">
              <p className="font-semibold text-navy-900">Admin documents required</p>
              <ul className="mt-3 grid gap-2 text-slate-700 sm:grid-cols-2 lg:grid-cols-3">
                <li>ID</li>
                <li>DBS</li>
                <li>Qualifications</li>
                <li>Reference</li>
                <li>Insurance</li>
                <li>Safeguarding training</li>
              </ul>
            </div>
          </div>
        </Panel>
      </div>
    </section>
  );
}

function getStatusDisplay(status?: TutorStatus) {
  if (status === "published") {
    return {
      label: "APPROVED",
      className: "border-green-200 bg-green-50 text-green-700"
    };
  }

  if (status === "rejected") {
    return {
      label: "REJECTED PLEASE CONTACT US",
      className: "border-red-200 bg-red-50 text-red-700"
    };
  }

  if (status === "suspended") {
    return {
      label: "SUSPENDED",
      className: "border-orange-200 bg-orange-50 text-orange-700"
    };
  }

  if (status === "pending") {
    return {
      label: "PENDING APPROVAL",
      className: "border-navy-100 bg-navy-50 text-navy-800"
    };
  }

  return {
    label: "DRAFT",
    className: "border-slate-200 bg-slate-50 text-slate-700"
  };
}
