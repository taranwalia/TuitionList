import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const filesWithSchema = [
  "app/page.tsx",
  "app/tutor/[slug]/page.tsx",
  "components/seo/seo-landing-page.tsx"
];

describe("JSON-LD safety", () => {
  it("does not add fake review or rating schema", () => {
    const source = filesWithSchema.map((file) => readFileSync(join(process.cwd(), file), "utf8")).join("\n");

    expect(source).not.toContain("AggregateRating");
    expect(source).not.toContain('"Review"');
    expect(source).not.toContain("reviewRating");
    expect(source).not.toContain("ratingValue");
    expect(source).not.toContain("reviewCount");
  });

  it("does not add fake DBS verification claims to schema pages", () => {
    const source = filesWithSchema.map((file) => readFileSync(join(process.cwd(), file), "utf8")).join("\n");

    expect(source.toLowerCase()).not.toContain("fully verified");
    expect(source.toLowerCase()).not.toContain("dbs verified");
  });
});
