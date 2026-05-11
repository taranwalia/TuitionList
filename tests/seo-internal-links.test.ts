import { describe, expect, it } from "vitest";
import { locationSeoLinks, subjectSeoLinks } from "@/lib/seo/internalLinks";

describe("SEO internal links", () => {
  it("links subject pages to online, level, location, similar subject and tutor signup pages", () => {
    const hrefs = subjectSeoLinks("maths").map((link) => link.href);

    expect(hrefs).toContain("/online-tutors/maths");
    expect(hrefs).toContain("/tutors/maths/gcse");
    expect(hrefs).toContain("/tutors/maths/a-level");
    expect(hrefs).toContain("/tutors/london/maths");
    expect(hrefs).toContain("/tutors/physics");
    expect(hrefs).toContain("/tutors/statistics");
    expect(hrefs).toContain("/tutors/further-maths");
    expect(hrefs).toContain("/become-a-tutor");
  });

  it("links location pages to core subject pages, online tutors and nearby towns", () => {
    const hrefs = locationSeoLinks("medway").map((link) => link.href);

    expect(hrefs).toContain("/tutors/medway/maths");
    expect(hrefs).toContain("/tutors/medway/english");
    expect(hrefs).toContain("/tutors/medway/science");
    expect(hrefs).toContain("/tutors/medway/11-plus");
    expect(hrefs).toContain("/tutors/medway/gcse");
    expect(hrefs).toContain("/online-tutors");
    expect(hrefs).toContain("/tutors/chatham");
    expect(hrefs).toContain("/tutors/rochester");
    expect(hrefs).toContain("/tutors/gillingham");
    expect(hrefs).toContain("/tutors/rainham");
  });
});
