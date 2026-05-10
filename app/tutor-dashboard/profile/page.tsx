import { submitTutorProfile } from "@/app/actions/profile";
import { Button, Field, Panel, inputClass } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { LEVELS, SUBJECTS } from "@/lib/constants";
import { getTutorDashboardProfile } from "@/lib/tutors";

export const dynamic = "force-dynamic";

export default async function TutorProfileEditPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { user } = await requireUser();
  const profile = await getTutorDashboardProfile(user.id);
  const params = await searchParams;
  const error = Array.isArray(params.error) ? params.error[0] : params.error;
  const warning = Array.isArray(params.warning) ? params.warning[0] : params.warning;
  const qualification = profile?.qualifications?.[0];
  const selectedSubjects = Array.isArray(profile?.subjects) ? profile.subjects.filter((subject) => SUBJECTS.includes(subject)) : [];
  const selectedLevels = Array.isArray(profile?.levels) ? profile.levels.filter((level) => LEVELS.includes(level)) : [];

  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <Panel>
          <h1 className="text-3xl font-bold text-navy-900">Edit tutor profile</h1>
          <p className="mt-2 text-slate-600">Submitting this form sends the profile to admin review. It will not publish immediately.</p>
          {error ? (
            <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
              {error}
            </p>
          ) : null}
          {warning ? (
            <p className="mt-4 rounded-md border border-orange-200 bg-orange-50 px-3 py-2 text-sm font-medium text-orange-700">
              {warning}
            </p>
          ) : null}
          <form action={submitTutorProfile} className="mt-8 grid gap-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Profile photo" hint="Public image shown on your tutor card. JPG, PNG or WebP up to 5MB.">
                {profile?.profile_photo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={profile.profile_photo_url} alt="" className="size-24 rounded-lg object-cover" />
                ) : null}
                <input name="profilePhoto" type="file" accept="image/jpeg,image/png,image/webp" className={inputClass} />
              </Field>
              <Field label="Full name">
                <input name="fullName" required className={inputClass} defaultValue={profile?.display_name ?? ""} />
              </Field>
              <Field label="Display name">
                <input name="displayName" required className={inputClass} defaultValue={profile?.display_name ?? ""} />
              </Field>
              <Field label="Phone number optional/private">
                <input name="phone" className={inputClass} defaultValue={profile?.phone ?? ""} />
              </Field>
              <Field label="Town/city">
                <input name="town" required className={inputClass} defaultValue={profile?.town ?? ""} />
              </Field>
              <Field label="County">
                <input name="county" required className={inputClass} defaultValue={profile?.county ?? ""} />
              </Field>
              <Field label="Postcode first part">
                <input name="postcodeArea" required className={inputClass} placeholder="ME5" defaultValue={profile?.postcode_area ?? ""} />
              </Field>
              <Field label="Minimum hourly rate">
                <input name="minRate" required type="number" min="0" className={inputClass} defaultValue={profile?.min_rate ?? ""} />
              </Field>
              <Field label="Maximum hourly rate">
                <input name="maxRate" required type="number" min="0" className={inputClass} defaultValue={profile?.max_rate ?? ""} />
              </Field>
              <Field label="Website URL optional">
                <input name="websiteUrl" type="url" className={inputClass} defaultValue={profile?.website_url ?? ""} />
              </Field>
              <Field label="LinkedIn URL optional">
                <input name="linkedinUrl" type="url" className={inputClass} defaultValue={profile?.linkedin_url ?? ""} />
              </Field>
            </div>

            <div className="grid gap-3 rounded-md border border-slate-200 p-4">
              <p className="font-semibold text-navy-900">Availability</p>
              <label className="flex gap-2 text-sm"><input name="onlineAvailable" type="checkbox" defaultChecked={profile?.online_available} /> Online tuition available</label>
              <label className="flex gap-2 text-sm"><input name="inPersonAvailable" type="checkbox" defaultChecked={profile?.in_person_available} /> In-person tuition available</label>
              <label className="flex gap-2 text-sm"><input name="willingToTravel" type="checkbox" defaultChecked={profile?.willing_to_travel} /> Willing to travel</label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Subjects taught">
                <select name="subjects" multiple required className="min-h-48 rounded-md border border-slate-300 px-3 py-2" defaultValue={selectedSubjects}>
                  {SUBJECTS.map((subject) => <option key={subject}>{subject}</option>)}
                </select>
                <p className="text-xs text-slate-500">Select at least one. Hold Ctrl on Windows to choose more than one.</p>
              </Field>
              <Field label="Levels taught">
                <select name="levels" multiple required className="min-h-48 rounded-md border border-slate-300 px-3 py-2" defaultValue={selectedLevels}>
                  {LEVELS.map((level) => <option key={level}>{level}</option>)}
                </select>
                <p className="text-xs text-slate-500">Select at least one. Hold Ctrl on Windows to choose more than one.</p>
              </Field>
            </div>

            <Field label="Short bio" hint="40 to 220 characters.">
              <textarea name="shortBio" required rows={3} className={inputClass} defaultValue={profile?.short_bio ?? ""} />
            </Field>
            <Field label="Long bio" hint="At least 120 characters.">
              <textarea name="longBio" required rows={6} className={inputClass} defaultValue={profile?.long_bio ?? ""} />
            </Field>
            <Field label="Experience summary" hint="At least 40 characters.">
              <textarea name="experience" required rows={5} className={inputClass} defaultValue={profile?.experience ?? ""} />
            </Field>

            <div className="grid gap-4 rounded-md border border-slate-200 p-4">
              <div>
                <p className="font-semibold text-navy-900">Qualifications</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Add a qualification you would like shown on your profile. TuitionList may mark it as seen only after admin review.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Qualification title">
                  <input
                    name="qualificationTitle"
                    className={inputClass}
                    placeholder="BA English, PGCE, QTS, MSc Maths"
                    defaultValue={qualification?.title ?? ""}
                  />
                </Field>
                <Field label="Institution optional">
                  <input
                    name="qualificationInstitution"
                    className={inputClass}
                    placeholder="University or awarding body"
                    defaultValue={qualification?.institution ?? ""}
                  />
                </Field>
                <Field label="Year optional">
                  <input name="qualificationYear" className={inputClass} placeholder="2020" defaultValue={qualification?.year ?? ""} />
                </Field>
              </div>
              <Field label="Qualification details optional">
                <textarea
                  name="qualificationDescription"
                  rows={3}
                  className={inputClass}
                  placeholder="Add any useful detail about this qualification."
                  defaultValue={qualification?.description ?? ""}
                />
              </Field>
            </div>

            <div className="grid gap-3 rounded-md border border-slate-200 p-4">
              <p className="font-semibold text-navy-900">Contact display preferences</p>
              <label className="flex gap-2 text-sm"><input name="showEmail" type="checkbox" defaultChecked={profile?.show_email} /> Show email publicly</label>
              <label className="flex gap-2 text-sm"><input name="showPhone" type="checkbox" defaultChecked={profile?.show_phone} /> Show phone publicly</label>
              <label className="flex gap-2 text-sm"><input name="showWhatsapp" type="checkbox" defaultChecked={profile?.show_whatsapp} /> Show WhatsApp publicly</label>
            </div>

            <Button type="submit" className="sm:w-fit">Submit for review</Button>
          </form>
        </Panel>
      </div>
    </section>
  );
}
