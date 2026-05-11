export type SeoSubject = {
  name: string;
  slug: string;
  priority: boolean;
  related: string[];
};

const prioritySlugs = new Set([
  "maths",
  "english",
  "science",
  "11-plus",
  "primary",
  "gcse",
  "a-level",
  "gcse-maths",
  "gcse-english",
  "gcse-science",
  "a-level-maths"
]);

const relatedBySlug: Record<string, string[]> = {
  maths: ["physics", "statistics", "further-maths", "gcse-maths", "a-level-maths"],
  english: ["english-language", "english-literature", "creative-writing"],
  science: ["combined-science", "triple-science", "biology"],
  biology: ["science", "chemistry", "physics"],
  chemistry: ["science", "biology", "physics"],
  physics: ["science", "maths", "chemistry"],
  "11-plus": ["entrance-exams", "verbal-reasoning", "non-verbal-reasoning"],
  "entrance-exams": ["11-plus", "grammar-school-entrance", "private-school-entrance"],
  primary: ["primary-maths", "primary-english", "ks1"],
  gcse: ["gcse-maths", "gcse-english", "gcse-science"],
  "a-level": ["a-level-maths", "biology", "chemistry"],
  sen: ["send", "dyslexia", "autism"],
  send: ["sen", "adhd", "asd"],
  dyslexia: ["sen", "reading", "spelling"],
  autism: ["sen", "asd", "send"],
  "computer-science": ["coding", "programming", "python"],
  french: ["spanish", "german", "italian"],
  spanish: ["french", "german", "italian"],
  history: ["geography", "religious-studies", "politics"],
  economics: ["business-studies", "accounting", "maths"]
};

const subjectNames = [
  "Maths",
  "English",
  "English Language",
  "English Literature",
  "Science",
  "Combined Science",
  "Triple Science",
  "Biology",
  "Chemistry",
  "Physics",
  "11 Plus",
  "11+",
  "Entrance Exams",
  "Grammar School Entrance",
  "Private School Entrance",
  "Verbal Reasoning",
  "Non-Verbal Reasoning",
  "Creative Writing",
  "Reading",
  "Spelling",
  "Phonics",
  "Primary Maths",
  "Primary English",
  "KS1",
  "KS2",
  "KS3",
  "GCSE",
  "GCSE Maths",
  "GCSE English",
  "GCSE Science",
  "A-Level",
  "A-Level Maths",
  "A-Level English",
  "A-Level Science",
  "Further Maths",
  "Statistics",
  "Mechanics",
  "Computer Science",
  "ICT",
  "Coding",
  "Programming",
  "Python",
  "JavaScript",
  "Web Development",
  "French",
  "Spanish",
  "German",
  "Italian",
  "Latin",
  "Classical Civilisation",
  "History",
  "Geography",
  "Religious Studies",
  "Philosophy",
  "Sociology",
  "Psychology",
  "Economics",
  "Business Studies",
  "Accounting",
  "Politics",
  "Law",
  "Media Studies",
  "Drama",
  "Music",
  "Art",
  "Design Technology",
  "Food Technology",
  "PE",
  "Sports Science",
  "Health and Social Care",
  "Childcare",
  "Functional Skills Maths",
  "Functional Skills English",
  "Adult Learning",
  "English as a Foreign Language",
  "ESOL",
  "EAL",
  "IELTS",
  "University Admissions",
  "Oxbridge Admissions",
  "UCAS Support",
  "Personal Statement Support",
  "Medical School Admissions",
  "Dentistry Admissions",
  "LNAT",
  "BMAT",
  "UCAT",
  "SATs",
  "Year 6 SATs",
  "Scottish Nationals",
  "Scottish Highers",
  "IB",
  "International Baccalaureate",
  "iGCSE",
  "T-Level Support",
  "BTEC Support",
  "SEN",
  "SEND",
  "Dyslexia",
  "Dyspraxia",
  "ADHD",
  "Autism",
  "ASD",
  "Homeschooling Support",
  "Exam Technique",
  "Study Skills",
  "Revision Skills"
];

export const seoSubjects: SeoSubject[] = subjectNames.map((name) => {
  const slug = slugifySubject(name);
  return {
    name,
    slug,
    priority: prioritySlugs.has(slug),
    related: relatedBySlug[slug] ?? defaultRelated(slug)
  };
});

export function findSeoSubject(slug: string) {
  const normalized = slug === "11" ? "11-plus" : slug;
  return seoSubjects.find((subject) => subject.slug === normalized);
}

function defaultRelated(slug: string) {
  if (slug.includes("english")) return ["english", "reading", "creative-writing"].filter((item) => item !== slug);
  if (slug.includes("maths") || slug.includes("statistics") || slug.includes("mechanics")) return ["maths", "gcse-maths", "a-level-maths"].filter((item) => item !== slug);
  if (slug.includes("science")) return ["science", "biology", "chemistry"].filter((item) => item !== slug);
  if (slug.includes("admissions")) return ["university-admissions", "ucas-support", "personal-statement-support"].filter((item) => item !== slug);
  return ["maths", "english", "science"].filter((item) => item !== slug);
}

function slugifySubject(value: string) {
  return value
    .toLowerCase()
    .replace(/\+/g, "plus")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
