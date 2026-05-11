import { seoLevels } from "@/lib/seo/levels";
import { seoLocations } from "@/lib/seo/locations";
import { seoSubjects } from "@/lib/seo/subjects";
import type { SeoLink } from "@/lib/seo-pages";

export function baseInternalLinks(): SeoLink[] {
  return [
    { href: "/find-a-tutor", label: "Find a tutor" },
    { href: "/online-tutors", label: "Online tutors" },
    { href: "/free-tutor-directory", label: "Free tutor directory" },
    { href: "/become-a-tutor", label: "Create a free tutor profile" },
    { href: "/guides/how-to-choose-a-tutor", label: "How to choose a tutor" },
    { href: "/profile-checks", label: "Profile checks explained" }
  ];
}

export function subjectLinks(slug?: string): SeoLink[] {
  const subject = slug ? seoSubjects.find((item) => item.slug === slug) : null;
  const slugs = subject?.related ?? seoSubjects.filter((item) => item.priority).map((item) => item.slug);
  return slugs
    .map((itemSlug) => seoSubjects.find((item) => item.slug === itemSlug))
    .filter(Boolean)
    .slice(0, 5)
    .map((item) => ({ href: `/tutors/${item!.slug}`, label: `${item!.name} tutors` }));
}

export function levelLinks(): SeoLink[] {
  return seoLevels
    .filter((level) => level.priority)
    .slice(0, 5)
    .map((level) => ({ href: `/${level.slug}-tutors`, label: `${level.name} tutors` }));
}

export function nearbyLocationLinks(slug?: string): SeoLink[] {
  const location = slug ? seoLocations.find((item) => item.slug === slug) : null;
  const slugs = location?.nearby ?? seoLocations.filter((item) => item.priority).map((item) => item.slug);
  return slugs
    .map((itemSlug) => seoLocations.find((item) => item.slug === itemSlug))
    .filter(Boolean)
    .slice(0, 5)
    .map((item) => ({ href: `/tutors/${item!.slug}`, label: `Tutors in ${item!.name}` }));
}

export function subjectSeoLinks(subjectSlug: string): SeoLink[] {
  const subject = seoSubjects.find((item) => item.slug === subjectSlug);
  if (!subject) return baseInternalLinks();

  const gcse = seoLevels.find((level) => level.slug === "gcse");
  const aLevel = seoLevels.find((level) => level.slug === "a-level");
  const subjectLocationSlugs = ["london", "birmingham", "manchester", "medway", "chatham"];
  const priorityLocations = subjectLocationSlugs.map((slug) => seoLocations.find((location) => location.slug === slug)).filter(Boolean);

  const links: SeoLink[] = [
    { href: `/online-tutors/${subject.slug}`, label: `Online ${subject.name} tutors` },
    ...(gcse ? [{ href: `/tutors/${subject.slug}/${gcse.slug}`, label: `GCSE ${subject.name} tutors` }] : []),
    ...(aLevel ? [{ href: `/tutors/${subject.slug}/${aLevel.slug}`, label: `A-Level ${subject.name} tutors` }] : []),
    ...priorityLocations.map((location) => ({
      href: `/tutors/${location!.slug}/${subject.slug}`,
      label: `${subject.name} tutors in ${location!.name}`
    })),
    ...subjectLinks(subject.slug),
    { href: "/become-a-tutor", label: "Become a tutor" }
  ];

  return uniqueLinks(links).slice(0, 14);
}

export function locationSeoLinks(locationSlug: string): SeoLink[] {
  const location = seoLocations.find((item) => item.slug === locationSlug);
  if (!location) return baseInternalLinks();

  const coreSubjectSlugs = ["maths", "english", "science", "11-plus", "gcse"];
  const coreSubjectLinks = coreSubjectSlugs
    .map((subjectSlug) => seoSubjects.find((subject) => subject.slug === subjectSlug))
    .filter(Boolean)
    .map((subject) => ({
      href: `/tutors/${location.slug}/${subject!.slug}`,
      label: `${subject!.name} tutors in ${location.name}`
    }));

  return uniqueLinks([
    ...coreSubjectLinks,
    { href: "/online-tutors", label: "Online tutors" },
    ...nearbyLocationLinks(location.slug)
  ]).slice(0, 14);
}

export function combinedTutorSeoLinks({
  subjectSlug,
  locationSlug,
  levelSlug
}: {
  subjectSlug?: string;
  locationSlug?: string;
  levelSlug?: string;
}): SeoLink[] {
  const subject = subjectSlug ? seoSubjects.find((item) => item.slug === subjectSlug) : null;
  const location = locationSlug ? seoLocations.find((item) => item.slug === locationSlug) : null;
  const level = levelSlug ? seoLevels.find((item) => item.slug === levelSlug) : null;

  if (subject && location && level) {
    return uniqueLinks([
      { href: `/tutors/${location.slug}/${subject.slug}`, label: `${subject.name} tutors in ${location.name}` },
      { href: `/tutors/${subject.slug}/${level.slug}`, label: `${level.name} ${subject.name} tutors` },
      { href: `/online-tutors/${subject.slug}/${level.slug}`, label: `Online ${level.name} ${subject.name} tutors` },
      ...nearbyLocationLinks(location.slug),
      ...subjectLinks(subject.slug),
      { href: "/become-a-tutor", label: "Become a tutor" }
    ]).slice(0, 14);
  }

  if (subject && location) {
    return uniqueLinks([
      { href: `/online-tutors/${subject.slug}`, label: `Online ${subject.name} tutors` },
      { href: `/tutors/${subject.slug}/gcse`, label: `GCSE ${subject.name} tutors` },
      { href: `/tutors/${subject.slug}/a-level`, label: `A-Level ${subject.name} tutors` },
      ...nearbyLocationLinks(location.slug),
      ...subjectLinks(subject.slug),
      { href: "/become-a-tutor", label: "Become a tutor" }
    ]).slice(0, 14);
  }

  if (subject) return subjectSeoLinks(subject.slug);
  if (location) return locationSeoLinks(location.slug);
  return uniqueLinks([...baseInternalLinks(), ...levelLinks()]).slice(0, 14);
}

function uniqueLinks(links: SeoLink[]) {
  return Array.from(new Map(links.map((link) => [link.href, link])).values());
}
