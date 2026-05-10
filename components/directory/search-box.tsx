import { Search } from "lucide-react";
import { TrackFormSubmit } from "@/components/analytics/track-event";
import { LEVELS, SUBJECTS } from "@/lib/constants";
import { Button, Field, inputClass } from "@/components/ui";

export function SearchBox({ compact = false }: { compact?: boolean }) {
  const formId = compact ? "compact-tutor-search" : "home-tutor-search";
  return (
    <form id={formId} action="/find-a-tutor" className="grid gap-3 rounded-lg border border-navy-100 bg-white p-4 shadow-lift md:grid-cols-5">
      <TrackFormSubmit formId={formId} name="tutor_search_performed" properties={{ source: compact ? "compact_search_box" : "home_search_box" }} />
      <Field label="Subject">
        <select name="subject" className={inputClass} defaultValue="">
          <option value="">Any subject</option>
          {SUBJECTS.map((subject) => (
            <option key={subject}>{subject}</option>
          ))}
        </select>
      </Field>
      <Field label="Level">
        <select name="level" className={inputClass} defaultValue="">
          <option value="">Any level</option>
          {LEVELS.map((level) => (
            <option key={level}>{level}</option>
          ))}
        </select>
      </Field>
      <Field label="Location or postcode">
        <input name="location" className={inputClass} placeholder="SW1A 2AA" />
      </Field>
      <Field label="Tuition type">
        <select name="tuitionPreference" className={inputClass} defaultValue="">
          <option value="">Online or in-person</option>
          <option value="online">Online</option>
          <option value="in-person">In-person</option>
          <option value="both">Both</option>
        </select>
      </Field>
      <div className="flex items-end">
        <Button className="w-full gap-2" type="submit">
          <Search className="size-4" aria-hidden />
          {compact ? "Search" : "Find tutors"}
        </Button>
      </div>
    </form>
  );
}
