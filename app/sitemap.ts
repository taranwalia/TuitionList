import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { allIndexableSeoPages, priorityProgrammaticSeoPages } from "@/lib/seo-pages";
import { getPublishedTutors } from "@/lib/tutors";

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const tutors = await getPublishedTutors();
  const tutorProfileUrls = tutors
    .filter((tutor) => tutor.status === "published" && !tutor.id.startsWith("sample-"))
    .map((tutor) => ({
      url: `${SITE_URL}/tutor/${tutor.slug}`,
      lastModified: tutor.created_at ? new Date(tutor.created_at) : now,
      changeFrequency: "weekly" as const,
      priority: 0.7
    }));

  return [
    ...corePublicPages.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.7
    })),
    ...[...allIndexableSeoPages, ...priorityProgrammaticSeoPages()]
      .filter((page) => page.index !== false)
      .map((page) => ({
        url: `${SITE_URL}${page.path}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: page.path === "/online-tutors" || page.path === "/free-tutor-directory-uk" ? 0.8 : 0.65
      })),
    ...tutorProfileUrls
  ];
}
