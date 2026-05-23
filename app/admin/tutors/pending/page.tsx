import { moderateTutor } from "@/app/actions/admin";
import { TutorCard } from "@/components/directory/tutor-card";
import { SubmitButton } from "@/components/forms/submit-button";
import { LinkButton, Panel } from "@/components/ui";
import { requireAdmin } from "@/lib/auth";
import { getAdminTutors } from "@/lib/tutors";

export default async function PendingTutorsPage() {
  await requireAdmin();
  const tutors = (await getAdminTutors()).filter((tutor) => tutor.status === "pending");

  return (
    <section className="mx-auto grid max-w-7xl gap-5 px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-navy-900">Pending tutor approvals</h1>
      {tutors.length ? (
        tutors.map((tutor) => (
          <div key={tutor.id} className="grid gap-3">
            <TutorCard tutor={tutor} showPublicActions={false} />
            <Panel className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <p className="text-sm text-slate-600">
                This profile is pending approval and is not visible publicly yet.
              </p>
              <div className="flex flex-wrap gap-2">
                <LinkButton href={`/admin/tutors/${tutor.id}/edit`} variant="secondary">
                  Edit profile
                </LinkButton>
                <form action={moderateTutor} className="flex flex-wrap gap-2">
                  <input type="hidden" name="tutorId" value={tutor.id} />
                  <SubmitButton name="action" value="approve" type="submit" pendingChildren="Approving...">Approve</SubmitButton>
                  <SubmitButton name="action" value="reject" type="submit" variant="secondary" pendingChildren="Rejecting...">Reject</SubmitButton>
                  <SubmitButton name="action" value="suspend" type="submit" variant="secondary" pendingChildren="Suspending...">Suspend</SubmitButton>
                </form>
              </div>
            </Panel>
          </div>
        ))
      ) : (
        <p>No profiles are pending review.</p>
      )}
    </section>
  );
}
