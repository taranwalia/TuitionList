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
