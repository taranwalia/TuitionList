import type { Metadata } from "next";
import { SearchBox } from "@/components/directory/search-box";
import { TutorCard } from "@/components/directory/tutor-card";
import { getPublishedTutors } from "@/lib/tutors";
import type { DirectoryFilters } from "@/types/domain";

export const metadata: Metadata = {
  title: "Find a Tutor for Free",
  description: "Search independent tutors and tuition providers by subject, level, location, tuition type, and rate on TuitionList.",
  alternates: {
    canonical: "/find-a-tutor"
  }
};

export default async function FindTutorPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const filters: DirectoryFilters = {
    keyword: asString(params.keyword),
    subject: asString(params.subject),
    level: asString(params.level),
    location: asString(params.location),
    tuitionPreference: asString(params.tuitionPreference) as DirectoryFilters["tuitionPreference"],
    minRate: asNumber(params.minRate),
    maxRate: asNumber(params.maxRate),
    dbsOnly: params.dbsOnly === "on",
    qtsOnly: params.qtsOnly === "on",
    sort: (asString(params.sort) as DirectoryFilters["sort"]) ?? "relevance"
  };
  const tutors = await getPublishedTutors(filters);

  return (
    <section className="bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-4xl font-bold text-navy-900">Find a tutor for free</h1>
          <p className="mt-3 max-w-3xl leading-7 text-slate-700">
            Search published tutor and tuition provider profiles across the UK. TuitionList is a directory, so parents, carers, and students should
            complete their own checks before arranging tuition.
          </p>
        </div>
        <SearchBox compact />
        <div className="grid gap-4 md:grid-cols-[260px_1fr]">
          <aside className="rounded-lg border border-slate-200 bg-white p-4">
            <form className="grid gap-4">
              <input type="hidden" name="subject" value={filters.subject ?? ""} />
              <input type="hidden" name="level" value={filters.level ?? ""} />
              <label className="grid gap-2 text-sm font-medium">
                Keyword
                <input name="keyword" defaultValue={filters.keyword} className="min-h-11 rounded-md border border-slate-300 px-3" />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Min price
                <input name="minRate" type="number" defaultValue={filters.minRate} className="min-h-11 rounded-md border border-slate-300 px-3" />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Max price
                <input name="maxRate" type="number" defaultValue={filters.maxRate} className="min-h-11 rounded-md border border-slate-300 px-3" />
              </label>
              <label className="flex gap-2 text-sm">
                <input name="dbsOnly" type="checkbox" defaultChecked={filters.dbsOnly} />
                DBS seen by TuitionList
              </label>
              <label className="flex gap-2 text-sm">
                <input name="qtsOnly" type="checkbox" defaultChecked={filters.qtsOnly} />
                Qualification seen by TuitionList
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Sort
                <select name="sort" defaultValue={filters.sort} className="min-h-11 rounded-md border border-slate-300 px-3">
                  <option value="relevance">Relevance</option>
                  <option value="newest">Newest</option>
                  <option value="price_asc">Price low-to-high</option>
                  <option value="price_desc">Price high-to-low</option>
                </select>
              </label>
              <button className="min-h-11 rounded-md bg-navy-800 px-4 text-sm font-semibold text-white">Apply filters</button>
            </form>
          </aside>
          <div className="grid gap-4">
            <p className="text-sm font-medium text-slate-600">{tutors.length} tutor{tutors.length === 1 ? "" : "s"} found</p>
            {tutors.length ? (
              tutors.map((tutor) => <TutorCard key={tutor.id} tutor={tutor} />)
            ) : (
              <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
                No published tutors match those filters yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function asString(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value || undefined;
}

function asNumber(value: string | string[] | undefined) {
  const raw = asString(value);
  if (!raw) return undefined;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : undefined;
}
