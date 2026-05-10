import { Send } from "lucide-react";
import { submitEnquiry } from "@/app/actions/enquiries";
import { LEVELS, PROFILE_DISCLAIMER, SUBJECTS } from "@/lib/constants";
import { Button, Field, inputClass } from "@/components/ui";
import { TrackFormSubmit } from "@/components/analytics/track-event";

export function EnquiryForm({
  tutorId,
  tutorName,
  returnPath,
  success,
  error
}: {
  tutorId: string;
  tutorName: string;
  returnPath?: string;
  success?: boolean;
  error?: string;
}) {
  return (
    <form action={submitEnquiry} id="enquire" className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <TrackFormSubmit formId="enquire" name="tutor_contact_clicked" properties={{ tutorId, tutorName }} />
      <input type="hidden" name="tutorId" value={tutorId} />
      {returnPath ? <input type="hidden" name="returnPath" value={returnPath} /> : null}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div>
        <h2 className="text-lg font-bold leading-7 text-navy-900 sm:text-xl">Send an enquiry to {tutorName}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">{PROFILE_DISCLAIMER}</p>
      </div>
      {success ? (
        <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold leading-6 text-green-800" role="status">
          Your enquiry has been successfully sent. The tutor should respond to you directly if they are available and able to help.
        </div>
      ) : null}
      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold leading-6 text-red-800" role="alert">
          {error}
        </div>
      ) : null}
      <div className="grid min-w-0 gap-4 xl:grid-cols-2">
        <Field label="Parent/student name">
          <input name="parentName" required className={`${inputClass} w-full min-w-0`} />
        </Field>
        <Field label="Email">
          <input name="parentEmail" type="email" required className={`${inputClass} w-full min-w-0`} />
        </Field>
        <Field label="Phone number optional">
          <input name="parentPhone" className={`${inputClass} w-full min-w-0`} />
        </Field>
        <Field label="Student year group">
          <input name="studentYearGroup" required className={`${inputClass} w-full min-w-0`} placeholder="Year 8" />
        </Field>
        <Field label="Subject needed">
          <select name="subject" required className={`${inputClass} w-full min-w-0`} defaultValue="">
            <option value="" disabled>
              Choose subject
            </option>
            {SUBJECTS.map((subject) => (
              <option key={subject}>{subject}</option>
            ))}
          </select>
        </Field>
        <Field label="Level needed">
          <select name="level" required className={`${inputClass} w-full min-w-0`} defaultValue="">
            <option value="" disabled>
              Choose level
            </option>
            {LEVELS.map((level) => (
              <option key={level}>{level}</option>
            ))}
          </select>
        </Field>
        <Field label="Preference">
          <select name="tuitionPreference" required className={`${inputClass} w-full min-w-0`} defaultValue="both">
            <option value="both">Online or in-person</option>
            <option value="online">Online</option>
            <option value="in-person">In-person</option>
          </select>
        </Field>
        <Field label="Location/postcode optional">
          <input name="location" className={`${inputClass} w-full min-w-0`} />
        </Field>
      </div>
      <Field label="Message">
        <textarea name="message" required rows={5} className={`${inputClass} w-full min-w-0`} placeholder="Tell the tutor what support you are looking for." />
      </Field>
      <label className="flex gap-3 text-sm leading-6 text-slate-700">
        <input name="consentGiven" required type="checkbox" className="mt-1 size-4 rounded border-slate-300" />
        I agree that TuitionList can share these details with this tutor and platform admins for the purpose of responding to my enquiry.
      </label>
      <Button type="submit" className="gap-2 sm:w-fit">
        <Send className="size-4" aria-hidden />
        Send enquiry
      </Button>
    </form>
  );
}
