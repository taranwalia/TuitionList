import { describe, expect, it } from "vitest";
import {
  joinSitemapUrl,
  renderSitemapIndexXml,
  renderUrlSetXml,
  sectionSeoPages,
  sitemapEntriesForSection,
  sitemapIndexEntries,
  tutorSitemapEntries,
  xmlHasWhitespaceInLoc
} from "@/lib/sitemap";

const unsafePaths = [
  "/verified-tutors",
  "/dbs-verified-tutors",
  "/identity-verified-tutors",
  "/background-checked-tutors",
  "/dbs-checked-tutors",
  "/safe-tutor-directory",
  "/find-a-safe-tutor",
  "/qualified-tutors",
  "/qts-tutors",
  "/teacher-tutors",
  "/experienced-tutors",
  "/tutor-reviews",
  "/tutor-references"
];

describe("sitemap generation", () => {
  it("trims the base URL and paths before joining", () => {
    const url = joinSitemapUrl(" /find-a-tutor ");
    expect(url).toMatch(/\/find-a-tutor$/);
    expect(url).not.toMatch(/\s/);
  });

  it("does not render whitespace inside any sitemap loc", async () => {
    const indexXml = renderSitemapIndexXml(sitemapIndexEntries());
    expect(xmlHasWhitespaceInLoc(indexXml)).toBe(false);

    const coreXml = renderUrlSetXml(await sitemapEntriesForSection("core"));
    expect(xmlHasWhitespaceInLoc(coreXml)).toBe(false);
  });

  it("deduplicates sitemap entries", async () => {
    const entries = await sitemapEntriesForSection("core");
    const urls = entries.map((entry) => entry.url);
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls.filter((url) => url.endsWith("/become-a-tutor"))).toHaveLength(1);
  });

  it("excludes unsafe verification-claim pages from all non-tutor sitemap sections", async () => {
    const sections = ["core", "guides", "subjects", "locations", "combinations"] as const;
    const urls = (await Promise.all(sections.map((section) => sitemapEntriesForSection(section)))).flat().map((entry) => entry.url);

    unsafePaths.forEach((path) => {
      expect(urls.some((url) => url.endsWith(path))).toBe(false);
    });
  });

  it("does not include noindex or unsafe pages in section page lists", () => {
    const corePaths = sectionSeoPages("core").map((page) => page.path);
    unsafePaths.forEach((path) => {
      expect(corePaths).not.toContain(path);
    });
  });

  it("excludes sample and unpublished tutor profiles", () => {
    const entries = tutorSitemapEntries([
      {
        id: "sample-1",
        display_name: "Sample Tutor",
        slug: "sample-tutor",
        town: "London",
        county: "London",
        postcode_area: "SW1A",
        online_available: true,
        in_person_available: false,
        willing_to_travel: false,
        min_rate: 20,
        max_rate: 30,
        short_bio: "Sample tutor",
        long_bio: "Sample tutor profile",
        experience: "Sample experience",
        show_phone: false,
        show_email: false,
        show_whatsapp: false,
        status: "published",
        subjects: ["Maths"],
        levels: ["GCSE"],
        created_at: "2026-05-01"
      },
      {
        id: "real-1",
        display_name: "Real Tutor",
        slug: "real-tutor",
        town: "London",
        county: "London",
        postcode_area: "SW1A",
        online_available: true,
        in_person_available: false,
        willing_to_travel: false,
        min_rate: 20,
        max_rate: 30,
        short_bio: "Real tutor",
        long_bio: "Real tutor profile",
        experience: "Real experience",
        show_phone: false,
        show_email: false,
        show_whatsapp: false,
        status: "published",
        subjects: ["Maths"],
        levels: ["GCSE"],
        approved_at: "2026-05-02",
        created_at: "2026-05-01"
      },
      {
        id: "real-2",
        display_name: "Pending Tutor",
        slug: "pending-tutor",
        town: "London",
        county: "London",
        postcode_area: "SW1A",
        online_available: true,
        in_person_available: false,
        willing_to_travel: false,
        min_rate: 20,
        max_rate: 30,
        short_bio: "Pending tutor",
        long_bio: "Pending tutor profile",
        experience: "Pending experience",
        show_phone: false,
        show_email: false,
        show_whatsapp: false,
        status: "pending",
        subjects: ["Maths"],
        levels: ["GCSE"],
        created_at: "2026-05-01"
      }
    ]);

    expect(entries.map((entry) => entry.url)).toHaveLength(1);
    expect(entries[0].url).toMatch(/\/tutor\/real-tutor$/);
    expect(entries[0].lastModified).toBe("2026-05-02");
  });
});
