import { coreSeoFaqs } from "@/lib/seo/faqs";
import { baseInternalLinks, levelLinks, nearbyLocationLinks, subjectLinks } from "@/lib/seo/internalLinks";
import { renderKeywordPatterns } from "@/lib/seo/keywordPatterns";
import type { SeoPage } from "@/lib/seo-pages";

type PriorityTutorPage = {
  slug: string;
  title: string;
  h1: string;
  keywords: string[];
  introSubject: string;
};

const priorityTutorPages: PriorityTutorPage[] = [
  {
    slug: "maths",
    title: "Maths Tutors Near Me | GCSE, A-Level and Primary Maths Tutors",
    h1: "Find Maths Tutors Near You",
    introSubject: "maths",
    keywords: ["maths tutor", "maths tutors near me", "private maths tutor", "online maths tutor", "GCSE maths tutor", "A-Level maths tutor", "primary maths tutor"]
  },
  {
    slug: "english",
    title: "English Tutors Near Me | GCSE, A-Level and Primary English Tutors",
    h1: "Find English Tutors Near You",
    introSubject: "English",
    keywords: [
      "English tutor",
      "English tutors near me",
      "private English tutor",
      "online English tutor",
      "GCSE English tutor",
      "A-Level English tutor",
      "primary English tutor",
      "English Language tutor",
      "English Literature tutor"
    ]
  },
  {
    slug: "science",
    title: "Science Tutors Near Me | GCSE and A-Level Science Tutors",
    h1: "Find Science Tutors Near You",
    introSubject: "science",
    keywords: ["science tutor", "science tutors near me", "private science tutor", "online science tutor", "GCSE science tutor", "A-Level science tutor", "combined science tutor", "triple science tutor"]
  },
  {
    slug: "biology",
    title: "Biology Tutors Near Me | GCSE and A-Level Biology Tutors",
    h1: "Find Biology Tutors Near You",
    introSubject: "biology",
    keywords: ["biology tutor", "biology tutors near me", "GCSE biology tutor", "A-Level biology tutor", "online biology tutor"]
  },
  {
    slug: "chemistry",
    title: "Chemistry Tutors Near Me | GCSE and A-Level Chemistry Tutors",
    h1: "Find Chemistry Tutors Near You",
    introSubject: "chemistry",
    keywords: ["chemistry tutor", "chemistry tutors near me", "GCSE chemistry tutor", "A-Level chemistry tutor", "online chemistry tutor"]
  },
  {
    slug: "physics",
    title: "Physics Tutors Near Me | GCSE and A-Level Physics Tutors",
    h1: "Find Physics Tutors Near You",
    introSubject: "physics",
    keywords: ["physics tutor", "physics tutors near me", "GCSE physics tutor", "A-Level physics tutor", "online physics tutor"]
  },
  {
    slug: "11-plus",
    title: "11 Plus Tutors Near Me | Grammar School and Entrance Exam Tutors",
    h1: "Find 11 Plus Tutors Near You",
    introSubject: "11 Plus",
    keywords: ["11 plus tutor", "11+ tutor", "11 plus tutors near me", "11+ tutors near me", "grammar school tutor", "entrance exam tutor", "Kent 11 plus tutor", "Medway 11 plus tutor", "GL assessment tutor", "CEM tutor"]
  },
  {
    slug: "entrance-exams",
    title: "Entrance Exam Tutors Near Me | School Admissions Tutors",
    h1: "Find Entrance Exam Tutors",
    introSubject: "entrance exam",
    keywords: ["entrance exam tutor", "school entrance exam tutor", "private school entrance exam tutor", "grammar school entrance tutor", "independent school exam tutor"]
  },
  {
    slug: "primary",
    title: "Primary School Tutors Near Me | KS1 and KS2 Tutors",
    h1: "Find Primary School Tutors",
    introSubject: "primary school",
    keywords: ["primary school tutor", "primary tutors near me", "KS1 tutor", "KS2 tutor", "primary maths tutor", "primary English tutor"]
  },
  {
    slug: "gcse",
    title: "GCSE Tutors Near Me | Maths, English and Science GCSE Tutors",
    h1: "Find GCSE Tutors Near You",
    introSubject: "GCSE",
    keywords: ["GCSE tutor", "GCSE tutors near me", "private GCSE tutor", "online GCSE tutor", "GCSE maths tutor", "GCSE English tutor", "GCSE science tutor"]
  },
  {
    slug: "a-level",
    title: "A-Level Tutors Near Me | Private A-Level Tutors UK",
    h1: "Find A-Level Tutors Near You",
    introSubject: "A-Level",
    keywords: ["A-Level tutor", "A-Level tutors near me", "private A-Level tutor", "online A-Level tutor", "A-Level maths tutor", "A-Level chemistry tutor", "A-Level biology tutor", "A-Level physics tutor"]
  },
  {
    slug: "ks1",
    title: "KS1 Tutors Near Me | Primary English and Maths Tutors",
    h1: "Find KS1 Tutors",
    introSubject: "KS1",
    keywords: ["KS1 tutor", "KS1 tutors near me", "Year 1 tutor", "Year 2 tutor", "primary tutor"]
  },
  {
    slug: "ks2",
    title: "KS2 Tutors Near Me | Primary and 11 Plus Tutors",
    h1: "Find KS2 Tutors",
    introSubject: "KS2",
    keywords: ["KS2 tutor", "KS2 tutors near me", "Year 3 tutor", "Year 4 tutor", "Year 5 tutor", "Year 6 tutor", "primary maths tutor", "primary English tutor"]
  },
  {
    slug: "ks3",
    title: "KS3 Tutors Near Me | Secondary School Tutors UK",
    h1: "Find KS3 Tutors",
    introSubject: "KS3",
    keywords: ["KS3 tutor", "KS3 tutors near me", "Year 7 tutor", "Year 8 tutor", "Year 9 tutor", "secondary school tutor"]
  },
  {
    slug: "sen",
    title: "SEN Tutors Near Me | Special Educational Needs Tutors UK",
    h1: "Find SEN Tutors",
    introSubject: "SEN",
    keywords: ["SEN tutor", "SEN tutors near me", "special educational needs tutor", "SEND tutor", "learning support tutor"]
  },
  {
    slug: "dyslexia",
    title: "Dyslexia Tutors Near Me | Specialist Literacy Tutors",
    h1: "Find Dyslexia Tutors",
    introSubject: "dyslexia and literacy support",
    keywords: ["dyslexia tutor", "dyslexia tutors near me", "specialist dyslexia tutor", "literacy tutor", "reading support tutor"]
  },
  {
    slug: "autism",
    title: "Autism Tutors Near Me | SEN and SEND Tutors UK",
    h1: "Find Autism Tutors",
    introSubject: "autism, SEN and SEND",
    keywords: ["autism tutor", "autism tutors near me", "ASD tutor", "SEND tutor", "SEN tutor"]
  },
  {
    slug: "computer-science",
    title: "Computer Science Tutors Near Me | GCSE and A-Level Tutors",
    h1: "Find Computer Science Tutors",
    introSubject: "computer science",
    keywords: ["computer science tutor", "GCSE computer science tutor", "A-Level computer science tutor", "coding tutor", "programming tutor"]
  },
  {
    slug: "french",
    title: "French Tutors Near Me | GCSE and A-Level French Tutors",
    h1: "Find French Tutors",
    introSubject: "French",
    keywords: ["French tutor", "French tutors near me", "GCSE French tutor", "A-Level French tutor", "online French tutor"]
  },
  {
    slug: "spanish",
    title: "Spanish Tutors Near Me | GCSE and A-Level Spanish Tutors",
    h1: "Find Spanish Tutors",
    introSubject: "Spanish",
    keywords: ["Spanish tutor", "Spanish tutors near me", "GCSE Spanish tutor", "A-Level Spanish tutor", "online Spanish tutor"]
  }
];

export function getPriorityTutorPage(slug: string): SeoPage | null {
  const page = priorityTutorPages.find((item) => item.slug === slug);
  if (!page) return null;
  const keywordSet = Array.from(
    new Set([
      ...page.keywords,
      ...renderKeywordPatterns({ subject: page.introSubject, groups: ["subject", "find", "affordability", "checks"], limit: 14 })
    ])
  );

  return {
    path: `/tutors/${page.slug}`,
    title: page.title,
    description: `Search ${page.keywords.slice(0, 4).join(", ")} and more on TuitionList. Find local and online independent tutors across the UK.`,
    h1: page.h1,
    intro: `Search for ${page.introSubject} tutors near you or online across the UK. TuitionList helps parents, carers, and students find independent tutors and tuition providers without parent finder fees or lesson commission.`,
    sections: [
      {
        heading: `Find ${page.introSubject} tuition`,
        body:
          "Use TuitionList to compare published tutor profiles by subject, level, location, online or in-person availability, hourly rate, experience, and profile information."
      },
      {
        heading: "Local and online options",
        body:
          "You can search for local private tuition near you, online tutoring across the UK, or tutors who offer both. Always confirm lesson format, location, availability, fees, and safeguarding arrangements directly."
      },
      {
        heading: "What to look for",
        body:
          "Before arranging tuition, ask about relevant teaching experience, qualifications, references, DBS certificate details where relevant, lesson plans, progress updates, and suitability."
      },
      {
        heading: "Related keywords",
        body: keywordSet.join(", ")
      }
    ],
    faqs: coreSeoFaqs,
    links: [...subjectLinks(page.slug), ...levelLinks(), ...nearbyLocationLinks(), ...baseInternalLinks()].slice(0, 12)
  };
}

export function priorityTutorSubjectPages() {
  return priorityTutorPages.map((page) => getPriorityTutorPage(page.slug)).filter((page): page is SeoPage => Boolean(page));
}
