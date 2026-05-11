import { SITE_URL } from "@/lib/constants";
import { allIndexableSeoPages, priorityProgrammaticSeoPages, type SeoPage, unsafeVerificationClaimPaths } from "@/lib/seo-pages";
import { findSeoLocation } from "@/lib/seo/locations";
import { findSeoSubject, seoSubjects } from "@/lib/seo/subjects";
import { getPublishedTutors } from "@/lib/tutors";
import type { TutorProfile } from "@/types/domain";

export type SitemapSection = "core" | "guides" | "tutors" | "subjects" | "locations" | "combinations";

export type SitemapEntry = {
  url: string;
  lastModified: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
};

export const SITEMAP_SECTIONS: SitemapSection[] = ["core", "guides", "tutors", "subjects", "locations", "combinations"];

const STATIC_CONTENT_LASTMOD = "2026-05-11";
const TUTOR_COMBINATION_PATH_PATTERN = /^\/tutors\/[^/]+\/[^/]+$/;

const corePublicPages = [
  "/",
  "/find-a-tutor",
  "/become-a-tutor",
  "/for-tutors",
  "/for-parents",
  "/how-it-works",
  "/about",
  "/safeguarding",
  "/contact",
  "/pricing",
  "/terms",
  "/privacy",
  "/disclaimer"
];

export function sitemapIndexEntries() {
  return SITEMAP_SECTIONS.map((section) => ({
    url: joinSitemapUrl(`/sitemaps/${section}.xml`),
    lastModified: STATIC_CONTENT_LASTMOD
  }));
}

export async function sitemapEntriesForSection(section: SitemapSection): Promise<SitemapEntry[]> {
  if (section === "tutors") {
    return tutorSitemapEntries(await getPublishedTutors());
  }

  const pages = sectionSeoPages(section);
  return dedupeSitemapEntries(
    pages
      .filter(isCanonicalIndexableSeoPage)
      .map((page) => ({
        url: joinSitemapUrl(page.path),
        lastModified: STATIC_CONTENT_LASTMOD,
        changeFrequency: "monthly" as const,
        priority: priorityForPath(page.path)
      }))
  );
}

export function sectionSeoPages(section: Exclude<SitemapSection, "tutors">): SeoPage[] {
  const staticSeoPages = allIndexableSeoPages.filter((page) => !page.path.startsWith("/guides"));
  const priorityPages = priorityProgrammaticSeoPages();

  if (section === "core") {
    const explicitCorePages = corePublicPages.map((path) => {
      const knownPage = allIndexableSeoPages.find((page) => page.path === path);
      return (
        knownPage ?? {
          path,
          title: path,
          description: path,
          h1: path,
          intro: path,
          sections: []
        }
      );
    });

    return publicSitemapPages([...explicitCorePages, ...staticSeoPages.filter((page) => isCoreSeoPath(page.path))]);
  }

  if (section === "guides") {
    return publicSitemapPages(allIndexableSeoPages.filter((page) => page.path === "/guides" || page.path.startsWith("/guides/")));
  }

  if (section === "subjects") {
    return publicSitemapPages(
      priorityPages.filter((page) => {
        const parts = pathParts(page.path);
        if (parts[0] === "online-tutors" && parts.length === 2) return Boolean(findSeoSubject(parts[1]));
        if (parts[0] === "tutors" && parts.length === 2) return Boolean(findSeoSubject(parts[1]) || isLevelSlug(parts[1]));
        return false;
      })
    );
  }

  if (section === "locations") {
    return publicSitemapPages([
      ...allIndexableSeoPages.filter((page) => page.path === "/locations" || page.path.startsWith("/locations/")),
      ...priorityPages.filter((page) => {
        const parts = pathParts(page.path);
        return parts[0] === "tutors" && parts.length === 2 && Boolean(findSeoLocation(parts[1]));
      })
    ]);
  }

  return publicSitemapPages(
    priorityPages.filter((page) => {
      if (!TUTOR_COMBINATION_PATH_PATTERN.test(page.path)) return false;
      const [, locationSlug, subjectSlug] = page.path.match(/^\/tutors\/([^/]+)\/([^/]+)$/) ?? [];
      return Boolean(locationSlug && subjectSlug && findSeoLocation(locationSlug) && findSeoSubject(subjectSlug));
    })
  );
}

export function tutorSitemapEntries(tutors: TutorProfile[]): SitemapEntry[] {
  return dedupeSitemapEntries(
    tutors
      .filter((tutor) => tutor.status === "published" && !tutor.id.startsWith("sample-") && Boolean(tutor.slug?.trim()))
      .map((tutor) => ({
        url: joinSitemapUrl(`/tutor/${tutor.slug}`),
        lastModified: tutor.approved_at ?? tutor.created_at ?? STATIC_CONTENT_LASTMOD,
        changeFrequency: "weekly" as const,
        priority: 0.7
      }))
  );
}

export function joinSitemapUrl(path: string) {
  const base = SITE_URL.trim().replace(/\/+$/, "");
  const cleanPath = `/${path.trim().replace(/^\/+/, "")}`;
  return `${base}${cleanPath === "/" ? "" : cleanPath}`;
}

export function xmlHasWhitespaceInLoc(xml: string) {
  return Array.from(xml.matchAll(/<loc>(.*?)<\/loc>/g)).some((match) => /\s/.test(match[1] ?? ""));
}

export function renderSitemapIndexXml(entries = sitemapIndexEntries()) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries
    .map((entry) => `  <sitemap><loc>${escapeXml(entry.url)}</loc><lastmod>${escapeXml(entry.lastModified)}</lastmod></sitemap>`)
    .join("\n")}\n</sitemapindex>\n`;
}

export function renderUrlSetXml(entries: SitemapEntry[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries
    .map(
      (entry) =>
        `  <url><loc>${escapeXml(entry.url)}</loc><lastmod>${escapeXml(entry.lastModified)}</lastmod><changefreq>${entry.changeFrequency}</changefreq><priority>${entry.priority.toFixed(1)}</priority></url>`
    )
    .join("\n")}\n</urlset>\n`;
}

function isCanonicalIndexableSeoPage(page: SeoPage) {
  const path = page.path.trim();
  if (page.index === false) return false;
  if (isUnsafeVerificationClaimPath(path)) return false;
  if (path !== page.path) return false;
  if (!path.startsWith("/")) return false;
  if (/\s/.test(path)) return false;
  return true;
}

function isUnsafeVerificationClaimPath(path: string) {
  return unsafeVerificationClaimPaths.has(path) || path.startsWith("/dbs-checked-tutors/");
}

function isCoreSeoPath(path: string) {
  if (path.startsWith("/guides/")) return false;
  if (path.startsWith("/locations/")) return false;
  if (path.startsWith("/tutors/")) return false;
  if (path.startsWith("/online-tutors/")) return false;
  if (path.startsWith("/dbs-checked-tutors")) return false;
  if (path.startsWith("/free-tutor-listing/")) return false;
  return !path.startsWith("/exam-boards/");
}

function priorityForPath(path: string) {
  if (path === "/") return 1;
  if (path === "/tutors" || path === "/online-tutors" || path === "/free-tutor-directory") return 0.8;
  if (path.startsWith("/tutors/") || path.startsWith("/locations/")) return 0.6;
  return 0.7;
}

function dedupeSitemapEntries(entries: SitemapEntry[]) {
  return Array.from(new Map(entries.map((entry) => [entry.url, entry])).values());
}

function dedupeSeoPages(pages: SeoPage[]) {
  return Array.from(new Map(pages.map((page) => [page.path, page])).values());
}

function publicSitemapPages(pages: SeoPage[]) {
  return dedupeSeoPages(pages).filter(isCanonicalIndexableSeoPage);
}

function pathParts(path: string) {
  return path.split("/").filter(Boolean);
}

function isLevelSlug(slug: string) {
  return seoSubjects.some((subject) => subject.slug === slug && ["gcse", "a-level", "ks1", "ks2", "ks3", "primary", "11-plus"].includes(subject.slug));
}

function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
