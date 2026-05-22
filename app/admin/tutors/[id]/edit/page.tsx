import { notFound } from "next/navigation";
import { updateTutorProfileAsAdmin } from "@/app/actions/admin";
import { Button, Field, LinkButton, Panel, inputClass } from "@/components/ui";
import { requireAdmin } from "@/lib/auth";
import { LEVELS, SUBJECTS } from "@/lib/constants";
import { getAdminTutorById } from "@/lib/tutors";

export default async function AdminTutorEditPage({
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
  const qualification = tutor.qualifications?.[0];
  const subjectOptions = new Set<string>(SUBJECTS);
  const levelOptions = new Set<string>(LEVELS);
  const selectedSubjects = tutor.subjects.filter((subject) => subjectOptions.has(subject));
  const selectedLevels = tutor.levels.filter((level) => levelOptions.has(level));

  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <Panel>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <LinkButton href={`/admin/tutors/${tutor.id}`} variant="ghost" className="px-0">
                Back to profile review
              </LinkButton>
              <h1 className="mt-2 text-3xl font-bold text-navy-900">Edit {tutor.display_name}</h1>
              <p className="mt-2 max-w-3xl text-slate-600">
                Admin edits update the tutor profile without approving, rejecting, or suspending it. Use the moderation controls separately when the
                profile is ready.
              </p>
            </div>
            <span className="rounded-full border border-navy-100 bg-navy-50 px-3 py-1 text-sm font-semibold text-navy-800">
              {tutor.status}
            </span>
          </div>

          {error ? (
            <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
              {error}
            </p>
          ) : null}

          <form action={updateTutorProfileAsAdmin} className="mt-8 grid gap-5">
            <input type="hidden" name="tutorId" value={tutor.id} />
            <input type="hidden" name="returnTo" value={`/admin/tutors/${tutor.id}/edit`} />

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Current profile photo">
                {tutor.profile_photo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={tutor.profile_photo_url} alt="" className="size-24 rounded-lg object-cover" />
                ) : (
                  <div className="grid size-24 place-items-center rounded-lg bg-navy-50 text-xl font-bold text-navy-800">
                    {tutor.display_name
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                )}
                <span className="text-xs font-normal text-slate-500">Profile photo changes can still be made by the tutor from their dashboard.</span>
              </Field>
              <Field label="Full name">
                <input name="fullName" required className={inputClass} defaultValue={tutor.display_name} />
              </Field>
              <Field label="Display name">
                <input name="displayName" required className={inputClass} defaultValue={tutor.display_name} />
              </Field>
              <Field label="Phone number optional/private">
                <input name="phone" className={inputClass} defaultValue={tutor.phone ?? ""} />
              </Field>
              <Field label="Town/city">
                <input name="town" required className={inputClass} defaultValue={tutor.town} />
              </Field>
              <Field label="County">
                <input name="county" required className={inputClass} defaultValue={tutor.county} />
              </Field>
              <Field label="Postcode first part">
                <input name="postcodeArea" required className={inputClass} placeholder="SW1A" defaultValue={tutor.postcode_area} />
              </Field>
              <Field label="Minimum hourly rate">
                <input name="minRate" required type="number" min="0" className={inputClass} defaultValue={tutor.min_rate} />
              </Field>
              <Field label="Maximum hourly rate">
                <input name="maxRate" required type="number" min="0" className={inputClass} defaultValue={tutor.max_rate} />
              </Field>
              <Field label="Website URL optional">
                <input name="websiteUrl" type="url" className={inputClass} defaultValue={tutor.website_url ?? ""} />
              </Field>
              <Field label="LinkedIn URL optional">
                <input name="linkedinUrl" type="url" className={inputClass} defaultValue={tutor.linkedin_url ?? ""} />
              </Field>
            </div>

            <div className="grid gap-3 rounded-md border border-slate-200 p-4">
              <p className="font-semibold text-navy-900">Availability</p>
              <label className="flex gap-2 text-sm">
                <input name="onlineAvailable" type="checkbox" defaultChecked={tutor.online_available} /> Online tuition available
              </label>
              <label className="flex gap-2 text-sm">
                <input name="inPersonAvailable" type="checkbox" defaultChecked={tutor.in_person_available} /> In-person tuition available
              </label>
              <label className="flex gap-2 text-sm">
                <input name="willingToTravel" type="checkbox" defaultChecked={tutor.willing_to_travel} /> Willing to travel
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Subjects taught">
                <select name="subjects" multiple required className="min-h-48 rounded-md border border-slate-300 px-3 py-2" defaultValue={selectedSubjects}>
                  {SUBJECTS.map((subject) => (
                    <option key={subject}>{subject}</option>
                  ))}
                </select>
                <p className="text-xs text-slate-500">Select at least one. Hold Ctrl on Windows to choose more than one.</p>
              </Field>
              <Field label="Levels taught">
                <select name="levels" multiple required className="min-h-48 rounded-md border border-slate-300 px-3 py-2" defaultValue={selectedLevels}>
                  {LEVELS.map((level) => (
                    <option key={level}>{level}</option>
                  ))}
                </select>
                <p className="text-xs text-slate-500">Select at least one. Hold Ctrl on Windows to choose more than one.</p>
              </Field>
            </div>

            <Field label="Short bio" hint="40 to 220 characters.">
              <textarea name="shortBio" required rows={3} className={inputClass} defaultValue={tutor.short_bio} />
            </Field>
            <Field label="Long bio" hint="At least 120 characters.">
              <textarea name="longBio" required rows={6} className={inputClass} defaultValue={tutor.long_bio} />
            </Field>
            <Field label="Experience summary" hint="At least 40 characters.">
              <textarea name="experience" required rows={5} className={inputClass} defaultValue={tutor.experience} />
            </Field>

            <div className="grid gap-4 rounded-md border border-slate-200 p-4">
              <div>
                <p className="font-semibold text-navy-900">Qualifications</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Editing qualification text does not create a profile-check badge. Use admin checks separately when evidence has been seen.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Qualification title">
                  <input name="qualificationTitle" className={inputClass} defaultValue={qualification?.title ?? ""} />
                </Field>
                <Field label="Institution optional">
                  <input name="qualificationInstitution" className={inputClass} defaultValue={qualification?.institution ?? ""} />
                </Field>
                <Field label="Year optional">
                  <input name="qualificationYear" className={inputClass} defaultValue={qualification?.year ?? ""} />
                </Field>
              </div>
              <Field label="Qualification details optional">
                <textarea name="qualificationDescription" rows={3} className={inputClass} defaultValue={qualification?.description ?? ""} />
              </Field>
            </div>

            <div className="grid gap-3 rounded-md border border-slate-200 p-4">
              <p className="font-semibold text-navy-900">Contact display preferences</p>
              <label className="flex gap-2 text-sm">
                <input name="showEmail" type="checkbox" defaultChecked={tutor.show_email} /> Show email publicly
              </label>
              <label className="flex gap-2 text-sm">
                <input name="showPhone" type="checkbox" defaultChecked={tutor.show_phone} /> Show phone publicly
              </label>
              <label className="flex gap-2 text-sm">
                <input name="showWhatsapp" type="checkbox" defaultChecked={tutor.show_whatsapp} /> Show WhatsApp publicly
              </label>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button type="submit">Save admin edits</Button>
              <LinkButton href={`/admin/tutors/${tutor.id}`} variant="secondary">
                Cancel
              </LinkButton>
            </div>
          </form>
        </Panel>
      </div>
    </section>
  );
}
