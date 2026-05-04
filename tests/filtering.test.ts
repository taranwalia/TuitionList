import { describe, expect, it } from "vitest";
import { sampleTutors } from "@/lib/sample-data";
import { filterTutors, slugify } from "@/lib/utils";

describe("slugify", () => {
  it("creates clean URL slugs", () => {
    expect(slugify("Jane Smith GCSE Maths Kent")).toBe("jane-smith-gcse-maths-kent");
    expect(slugify("11 Plus & SEN Support")).toBe("11-plus-and-sen-support");
  });
});

describe("filterTutors", () => {
  it("only returns published tutors", () => {
    const tutors = filterTutors(
      [
        ...sampleTutors,
        {
          ...sampleTutors[0],
          id: "draft",
          slug: "draft",
          status: "draft"
        }
      ],
      {}
    );

    expect(tutors.every((tutor) => tutor.status === "published")).toBe(true);
  });

  it("filters by subject, level and location", () => {
    const tutors = filterTutors(sampleTutors, {
      subject: "Maths",
      level: "GCSE",
      location: "Kent"
    });

    expect(tutors).toHaveLength(1);
    expect(tutors[0].slug).toBe("jane-smith-gcse-maths-kent");
  });
});
