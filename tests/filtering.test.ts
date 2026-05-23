import { describe, expect, it } from "vitest";
import { sampleTutors } from "@/lib/sample-data";
import { filterTutors, outwardPostcode, slugify } from "@/lib/utils";

describe("slugify", () => {
  it("creates clean URL slugs", () => {
    expect(slugify("Jane Smith GCSE Maths Kent")).toBe("jane-smith-gcse-maths-kent");
    expect(slugify("11 Plus & SEN Support")).toBe("11-plus-and-sen-support");
  });
});

describe("outwardPostcode", () => {
  it("shows only the outward code for public postcode display", () => {
    expect(outwardPostcode("SW1A 2AA")).toBe("SW1A");
    expect(outwardPostcode("OX13 5AA")).toBe("OX13");
    expect(outwardPostcode("SW1A2AA")).toBe("SW1A");
    expect(outwardPostcode("ME5")).toBe("ME5");
    expect(outwardPostcode("b13 8ab")).toBe("B13");
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
      location: "London"
    });

    expect(tutors).toHaveLength(1);
    expect(tutors[0].slug).toBe("jane-smith-gcse-maths-london");
  });
});
