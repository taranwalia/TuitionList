export type SeoLevel = {
  name: string;
  slug: string;
  priority: boolean;
  related: string[];
};

const prioritySlugs = new Set(["primary", "ks1", "ks2", "11-plus", "ks3", "gcse", "a-level", "sen", "send"]);

const relatedBySlug: Record<string, string[]> = {
  primary: ["ks1", "ks2", "year-6"],
  "primary-school": ["primary", "ks1", "ks2"],
  ks1: ["primary", "key-stage-1", "year-1"],
  "key-stage-1": ["ks1", "year-1", "year-2"],
  ks2: ["primary", "key-stage-2", "11-plus"],
  "key-stage-2": ["ks2", "year-5", "year-6"],
  sats: ["year-6-sats", "ks2", "primary"],
  "year-6-sats": ["sats", "ks2", "11-plus"],
  "11-plus": ["entrance-exams", "grammar-school-entrance", "ks2"],
  "entrance-exams": ["11-plus", "private-school-entrance", "grammar-school-entrance"],
  "secondary-school": ["ks3", "gcse", "year-7"],
  ks3: ["secondary-school", "gcse", "year-9"],
  gcse: ["igcse", "year-10", "year-11"],
  igcse: ["gcse", "year-10", "year-11"],
  "a-level": ["as-level", "sixth-form", "year-12"],
  "as-level": ["a-level", "sixth-form", "year-12"],
  "sixth-form": ["a-level", "as-level", "year-13"],
  ib: ["international-baccalaureate", "a-level", "sixth-form"],
  "functional-skills": ["adult-learner", "beginner", "intermediate"],
  university: ["degree-level", "advanced", "adult-learner"],
  sen: ["send", "homeschooling", "primary"],
  send: ["sen", "homeschooling", "primary"]
};

const levelNames = [
  "Primary",
  "Primary school",
  "KS1",
  "Key Stage 1",
  "KS2",
  "Key Stage 2",
  "Year 1",
  "Year 2",
  "Year 3",
  "Year 4",
  "Year 5",
  "Year 6",
  "SATs",
  "Year 6 SATs",
  "11 Plus",
  "11+",
  "Entrance Exams",
  "Grammar School Entrance",
  "Private School Entrance",
  "Secondary School",
  "KS3",
  "Key Stage 3",
  "Year 7",
  "Year 8",
  "Year 9",
  "GCSE",
  "iGCSE",
  "Year 10",
  "Year 11",
  "A-Level",
  "AS-Level",
  "Sixth Form",
  "Year 12",
  "Year 13",
  "IB",
  "International Baccalaureate",
  "BTEC",
  "T-Level",
  "Functional Skills",
  "Adult Learner",
  "University",
  "Degree Level",
  "Beginner",
  "Intermediate",
  "Advanced",
  "Homeschooling",
  "SEN",
  "SEND"
];

export const seoLevels: SeoLevel[] = levelNames.map((name) => {
  const slug = slugifyLevel(name);
  return {
    name,
    slug,
    priority: prioritySlugs.has(slug),
    related: relatedBySlug[slug] ?? defaultRelated(slug)
  };
});

export function findSeoLevel(slug: string) {
  const normalized = slug === "11" ? "11-plus" : slug;
  return seoLevels.find((level) => level.slug === normalized);
}

function defaultRelated(slug: string) {
  if (slug.startsWith("year-")) return ["primary", "ks2", "gcse"].filter((item) => item !== slug);
  return ["primary", "gcse", "a-level"].filter((item) => item !== slug);
}

function slugifyLevel(value: string) {
  return value
    .toLowerCase()
    .replace(/\+/g, "plus")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
