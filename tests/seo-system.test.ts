import { describe, expect, it } from "vitest";
import {
  allIndexableSeoPages,
  getDbsCheckedTutorsSeoPage,
  getFreeTutorListingSeoPage,
  getOnlineTutorsSeoPage,
  getSeoPage,
  getTutorsSeoPage,
  metadataForSeoPage,
  priorityProgrammaticSeoPages
} from "@/lib/seo-pages";
import { seoExamBoards } from "@/lib/seo/examBoards";
import { seoLevels } from "@/lib/seo/levels";
import { seoLocations } from "@/lib/seo/locations";
import { seoSubjects } from "@/lib/seo/subjects";

describe("programmatic SEO system", () => {
  it("has reusable SEO data files populated", () => {
    expect(seoSubjects.length).toBeGreaterThan(10);
    expect(seoLevels.length).toBeGreaterThan(10);
    expect(seoLocations.length).toBeGreaterThan(10);
    expect(seoExamBoards.length).toBeGreaterThan(5);
  });

  it("supports required public SEO routes", () => {
    expect(getSeoPage("/tutors")?.h1).toBe("Find Tutors Near You");
    expect(getTutorsSeoPage(["maths"])?.path).toBe("/tutors/maths");
    expect(getTutorsSeoPage(["medway"])?.path).toBe("/tutors/medway");
    expect(getTutorsSeoPage(["medway", "maths"])?.path).toBe("/tutors/medway/maths");
    expect(getTutorsSeoPage(["medway", "maths", "gcse"])?.path).toBe("/tutors/medway/maths/gcse");
    expect(getOnlineTutorsSeoPage([])?.path).toBe("/online-tutors");
    expect(getOnlineTutorsSeoPage(["maths"])?.path).toBe("/online-tutors/maths");
    expect(getOnlineTutorsSeoPage(["maths", "gcse"])?.path).toBe("/online-tutors/maths/gcse");
    expect(getSeoPage("/become-a-tutor")).toBeTruthy();
    expect(getSeoPage("/free-tutor-directory")).toBeTruthy();
    expect(getSeoPage("/dbs-checked-tutors")).toBeTruthy();
    expect(getDbsCheckedTutorsSeoPage(["maths"])?.path).toBe("/dbs-checked-tutors/maths");
    expect(getFreeTutorListingSeoPage(["maths"])?.path).toBe("/free-tutor-listing/maths");
    expect(getSeoPage("/first-tutors-alternative")).toBeTruthy();
    expect(getSeoPage("/superprof-alternative")).toBeTruthy();
    expect(getSeoPage("/tutorful-alternative")).toBeTruthy();
    expect(getSeoPage("/mytutor-alternative")).toBeTruthy();
    expect(getSeoPage("/tutorhunt-alternative")).toBeTruthy();
  });

  it("generates dynamic metadata with canonical, Open Graph and Twitter fields", () => {
    const page = getTutorsSeoPage(["medway", "maths", "gcse"]);
    expect(page).toBeTruthy();
    const metadata = metadataForSeoPage(page!);

    expect(metadata.title).toContain("GCSE Maths Tutors in Medway");
    expect(metadata.description).toContain("medway");
    expect(metadata.alternates?.canonical?.toString()).toContain("/tutors/medway/maths/gcse");
    expect(metadata.openGraph?.title).toBe(metadata.title);
    expect(metadata.twitter?.title).toBe(metadata.title);
  });

  it("noindexes unsupported thin dynamic pages", () => {
    const page = getSeoPage("/made-up-topic-tutors");
    expect(page?.index).toBe(false);
    expect(metadataForSeoPage(page!).robots).toEqual({ index: false, follow: true });
  });

  it("keeps indexable SEO pages internally linked", () => {
    const pagesWithoutFiveLinks = allIndexableSeoPages.filter((page) => (page.links ?? []).length < 5);
    expect(pagesWithoutFiveLinks).toEqual([]);
  });

  it("generates a capped set of priority programmatic sitemap pages", () => {
    const pages = priorityProgrammaticSeoPages();
    const paths = pages.map((page) => page.path);

    expect(paths).toContain("/tutors/maths");
    expect(paths).toContain("/online-tutors/maths");
    expect(paths).toContain("/tutors/medway/maths");
    expect(paths).toContain("/tutors/medway/gcse-maths");
    expect(pages.length).toBeLessThan(1000);
  });
});
