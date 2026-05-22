import { clsx, type ClassValue } from "clsx";
import type { DirectoryFilters, TutorProfile } from "@/types/domain";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function rateLabel(tutor: Pick<TutorProfile, "min_rate" | "max_rate">) {
  if (tutor.min_rate === tutor.max_rate) return `£${tutor.min_rate}/hr`;
  return `£${tutor.min_rate}-£${tutor.max_rate}/hr`;
}

export function outwardPostcode(value?: string | null) {
  if (!value) return "";

  const normalized = value.trim().toUpperCase().replace(/\s+/g, " ");
  const compact = normalized.replace(/\s+/g, "");
  const outwardCode = compact.match(/^([A-Z]{1,2}\d[A-Z\d]?)/)?.[1];

  return outwardCode ?? normalized.split(" ")[0] ?? "";
}

export function filterTutors(tutors: TutorProfile[], filters: DirectoryFilters) {
  const keyword = filters.keyword?.toLowerCase().trim();
  const location = filters.location?.toLowerCase().trim();

  const filtered = tutors.filter((tutor) => {
    const text = [
      tutor.display_name,
      tutor.short_bio,
      tutor.long_bio,
      tutor.experience,
      tutor.town,
      tutor.county,
      tutor.postcode_area,
      ...tutor.subjects,
      ...tutor.levels
    ]
      .join(" ")
      .toLowerCase();

    if (keyword && !text.includes(keyword)) return false;
    if (filters.subject && !tutor.subjects.includes(filters.subject)) return false;
    if (filters.level && !tutor.levels.includes(filters.level)) return false;
    if (location && !`${tutor.town} ${tutor.county} ${tutor.postcode_area}`.toLowerCase().includes(location)) return false;
    if (filters.tuitionPreference === "online" && !tutor.online_available) return false;
    if (filters.tuitionPreference === "in-person" && !tutor.in_person_available) return false;
    if (filters.maxRate && tutor.min_rate > filters.maxRate) return false;
    if (filters.minRate && tutor.max_rate < filters.minRate) return false;
    if (filters.dbsOnly && !tutor.checks?.dbs_seen) return false;
    if (filters.qtsOnly && !tutor.checks?.qualification_seen) return false;
    return tutor.status === "published";
  });

  return filtered.sort((a, b) => {
    if (filters.sort === "price_asc") return a.min_rate - b.min_rate;
    if (filters.sort === "price_desc") return b.max_rate - a.max_rate;
    if (filters.sort === "newest") return Date.parse(b.created_at ?? "0") - Date.parse(a.created_at ?? "0");
    return 0;
  });
}
