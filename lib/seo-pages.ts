import { SITE_URL } from "@/lib/constants";
import type { Metadata } from "next";

export type SeoLink = {
  href: string;
  label: string;
};

export type SeoPage = {
  path: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  sections: { heading: string; body: string }[];
  links?: SeoLink[];
  index?: boolean;
};

export const nationalSeoLinks: SeoLink[] = [
  { href: "/find-a-tutor", label: "Find a tutor" },
  { href: "/online-tutors", label: "Online tutors" },
  { href: "/free-tutor-directory-uk", label: "Free tutor directory UK" },
  { href: "/subjects", label: "Subjects" },
  { href: "/locations", label: "Locations" },
  { href: "/become-a-tutor", label: "Create a free tutor profile" },
  { href: "/safeguarding", label: "Safeguarding information" }
];

export const subjectPages = [
  { slug: "maths-tutors", subject: "Maths", title: "Maths Tutors UK" },
  { slug: "english-tutors", subject: "English", title: "English Tutors UK" },
  { slug: "science-tutors", subject: "Science", title: "Science Tutors UK" },
  { slug: "11-plus-tutors", subject: "11 Plus", title: "11 Plus Tutors UK" },
  { slug: "gcse-maths-tutors", subject: "GCSE Maths", title: "GCSE Maths Tutors UK" },
  { slug: "a-level-tutors", subject: "A-Level", title: "A-Level Tutors UK" },
  { slug: "primary-tutors", subject: "Primary", title: "Primary Tutors UK" }
];

export const locationPages = [
  "London",
  "Birmingham",
  "Manchester",
  "Leeds",
  "Liverpool",
  "Bristol",
  "Sheffield",
  "Nottingham",
  "Newcastle",
  "Cardiff",
  "Glasgow",
  "Edinburgh",
  "Belfast"
].map((name) => ({ name, slug: slugifySeo(name) }));

export const staticSeoPages: SeoPage[] = [
  {
    path: "/tutors",
    title: "Tutors UK | TuitionList",
    description: "Search independent tutors, teachers, and tuition providers across the UK on TuitionList.",
    h1: "Tutors across the UK",
    intro:
      "TuitionList helps parents, carers, and students discover independent tutors, teachers, and tuition providers across the UK.",
    sections: [
      {
        heading: "Search by what matters",
        body:
          "Use TuitionList to search by subject, level, location, online or in-person availability, and hourly rate. Parents can send enquiries directly through published tutor profiles."
      },
      {
        heading: "Directory only",
        body:
          "TuitionList is an online directory only. Tutors and tuition providers are independent providers, and parents, carers, and students remain responsible for making their own checks."
      }
    ],
    links: nationalSeoLinks
  },
  {
    path: "/online-tutors",
    title: "Online Tutors UK | TuitionList",
    description: "Find online tutors across the UK by subject, level, rate, and availability.",
    h1: "Online tutors UK",
    intro:
      "Find online tutors across the UK for school subjects, exam preparation, adult learning, and specialist support.",
    sections: [
      {
        heading: "Online tuition across the UK",
        body:
          "Online tuition can help families compare tutors beyond their immediate area. Search by subject, level, rate, and availability, then contact tutors directly through TuitionList enquiries."
      },
      {
        heading: "Check arrangements before lessons",
        body:
          "Before arranging online tuition, parents and carers should consider identity, experience, qualifications, safeguarding arrangements, supervision, and online safety measures."
      }
    ],
    links: nationalSeoLinks
  },
  {
    path: "/private-tutors",
    title: "Private Tutors UK | TuitionList",
    description: "Find private tutors and independent tuition providers across the UK on TuitionList.",
    h1: "Private tutors UK",
    intro:
      "TuitionList lists independent tutors, teachers, and tuition providers so families can find private tuition support across the UK.",
    sections: [
      {
        heading: "Independent tutor discovery",
        body:
          "TuitionList is not a tutoring agency and does not employ tutors. Parents, carers, and students contact tutors directly through enquiry forms."
      },
      {
        heading: "Profile information and checks",
        body:
          "Tutor profiles may include self-declared information and, where possible, profile labels showing information marked as seen or confirmed by TuitionList."
      }
    ],
    links: nationalSeoLinks
  },
  {
    path: "/tutor-directory-uk",
    title: "Tutor Directory UK | TuitionList",
    description: "TuitionList is a UK tutor directory for parents, carers, students, tutors, teachers, and tuition providers.",
    h1: "Tutor directory UK",
    intro:
      "TuitionList is a national UK tutor directory built to help tutors stay visible and help families find tuition support.",
    sections: [
      {
        heading: "For families",
        body:
          "Parents, carers, and students can search published profiles by subject, level, location, tuition type, and rate, then send enquiries directly."
      },
      {
        heading: "For tutors",
        body:
          "Tutors, teachers, and tuition providers can create free profiles at launch. There is no commission, no parent finder fee, and no paid listings at launch."
      }
    ],
    links: nationalSeoLinks
  },
  {
    path: "/free-tutor-directory-uk",
    title: "Free Tutor Directory UK | TuitionList",
    description: "TuitionList is a free UK tutor directory at launch, helping tutors stay visible and helping parents find tuition support.",
    h1: "Free tutor directory UK",
    intro:
      "TuitionList is free at launch for basic tutor profiles and parent enquiries, with no commission and no parent finder fees.",
    sections: [
      {
        heading: "Free at launch",
        body:
          "Tutors and tuition providers can create a profile for free. Parents, carers, and students can search and send enquiries without paying finder fees."
      },
      {
        heading: "No paid listings at launch",
        body:
          "TuitionList is focused on simple tutor discovery. Paid featured listings, subscriptions, bookings, and payments are not part of the MVP."
      }
    ],
    links: nationalSeoLinks
  },
  {
    path: "/subjects",
    title: "Tutoring Subjects UK | TuitionList",
    description: "Explore tutoring subjects on TuitionList, including maths, English, science, 11 Plus, GCSE, A-Level, and primary tuition.",
    h1: "Tutoring subjects",
    intro:
      "Explore common tutoring subjects and levels across the UK, from primary support to GCSE, A-Level, 11 Plus, and adult learning.",
    sections: [
      {
        heading: "Subject pages",
        body:
          "Use subject pages to understand common tutor search options, compare published profiles, and learn what to consider before sending an enquiry."
      }
    ],
    links: subjectPages.map((page) => ({ href: `/${page.slug}`, label: page.title }))
  },
  {
    path: "/locations",
    title: "Tutor Locations UK | TuitionList",
    description: "Explore tutor location pages for major UK cities and regions on TuitionList.",
    h1: "Tutor locations across the UK",
    intro:
      "TuitionList is a national directory. Location pages help families search for tutors and tuition providers in major UK cities and nearby areas.",
    sections: [
      {
        heading: "Search locally or online",
        body:
          "Families can search for local in-person tuition, online tuition, or tutors who offer both. Location pages do not imply TuitionList has checked every tutor in that area."
      }
    ],
    links: locationPages.map((page) => ({ href: `/locations/${page.slug}`, label: page.name }))
  }
];

export const curatedSeoPages: SeoPage[] = [
  ...subjectPages.map((page) => subjectSeoPage(page.slug, page.subject, page.title)),
  ...locationPages.map((page) => locationSeoPage(page.slug, page.name)),
  subjectAliasPage("subjects/maths", "Maths", "Maths Tutors UK"),
  subjectAliasPage("subjects/english", "English", "English Tutors UK"),
  subjectAliasPage("subjects/science", "Science", "Science Tutors UK"),
  subjectAliasPage("subjects/11-plus", "11 Plus", "11 Plus Tutors UK"),
  subjectAliasPage("subjects/gcse-maths", "GCSE Maths", "GCSE Maths Tutors UK")
];

export const allIndexableSeoPages = [...staticSeoPages, ...curatedSeoPages];

export function getSeoPage(path: string) {
  const normalized = path.replace(/^\/+|\/+$/g, "");
  return allIndexableSeoPages.find((page) => page.path.replace(/^\/+/, "") === normalized) ?? generateNoindexSeoPage(normalized);
}

export function canonicalUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export function metadataForSeoPage(page: SeoPage): Metadata {
  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: canonicalUrl(page.path)
    },
    robots: page.index === false ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      title: page.title,
      description: page.description,
      url: canonicalUrl(page.path),
      type: "website"
    }
  };
}

function subjectSeoPage(slug: string, subject: string, title: string): SeoPage {
  const displaySubject = subject.replace("A-Level", "A-Level").replace("GCSE Maths", "GCSE maths");
  return {
    path: `/${slug}`,
    title: `${title} | TuitionList`,
    description: `Find ${displaySubject.toLowerCase()} tutors across the UK on TuitionList. Search by level, location, online availability, and rate.`,
    h1: title,
    intro: `Find independent ${displaySubject.toLowerCase()} tutors, teachers, and tuition providers across the UK.`,
    sections: [
      {
        heading: `Finding ${displaySubject.toLowerCase()} tuition`,
        body:
          "Use TuitionList to compare published tutor profiles, check subjects and levels taught, review rates and availability, and send enquiries directly."
      },
      {
        heading: "Before choosing a tutor",
        body:
          "Read profile information carefully and make your own checks, including identity, qualifications, references, DBS certificate details where relevant, safeguarding arrangements, and suitability."
      },
      {
        heading: "Badges and profile labels",
        body:
          "Badges, blue ticks, and profile labels show what has been self-declared, seen, or confirmed by TuitionList. They do not mean TuitionList recommends or guarantees a tutor."
      }
    ],
    links: [
      { href: `/find-a-tutor?subject=${encodeURIComponent(subject.includes("GCSE") ? "Maths" : subject)}`, label: `Search ${subject} tutors` },
      { href: "/online-tutors", label: "Online tutors" },
      { href: "/subjects", label: "All subjects" },
      { href: "/locations", label: "Tutor locations" }
    ]
  };
}

function subjectAliasPage(path: string, subject: string, title: string): SeoPage {
  return {
    ...subjectSeoPage(path.split("/").pop() ?? path, subject, title),
    path: `/${path}`,
    title: `${title} | TuitionList`
  };
}

function locationSeoPage(slug: string, name: string): SeoPage {
  return {
    path: `/locations/${slug}`,
    title: `Tutors in ${name} | TuitionList`,
    description: `Find tutors and tuition providers in ${name} and online across the UK on TuitionList.`,
    h1: `Tutors in ${name}`,
    intro: `Search published tutor and tuition provider profiles for ${name}, nearby areas, and online tuition across the UK.`,
    sections: [
      {
        heading: "Local and online tutor search",
        body:
          "Families can use TuitionList to look for in-person tuition, online tuition, or tutors offering both. Tutor availability and travel arrangements should be confirmed directly."
      },
      {
        heading: "Independent providers",
        body:
          "Tutors and tuition providers listed on TuitionList are independent providers. TuitionList does not employ, manage, supervise, or endorse them."
      },
      {
        heading: "Checks before arranging tuition",
        body:
          "Parents, carers, and students should make their own enquiries and satisfy themselves that a tutor or tuition provider is suitable before arranging tuition."
      }
    ],
    links: [
      { href: `/find-a-tutor?location=${encodeURIComponent(name)}`, label: `Search tutors in ${name}` },
      { href: "/online-tutors", label: "Online tutors" },
      { href: "/subjects", label: "Subjects" },
      { href: "/locations", label: "All locations" }
    ]
  };
}

function generateNoindexSeoPage(path: string): SeoPage | null {
  const parts = path.split("/").filter(Boolean);
  if (parts.length === 2 && parts[0] === "subjects") {
    const subject = titleFromSlug(parts[1]);
    return { ...subjectSeoPage(path, subject, `${subject} Tutors UK`), path: `/${path}`, index: false };
  }
  if (parts.length === 2 && parts[0] === "locations") {
    const location = titleFromSlug(parts[1]);
    return { ...locationSeoPage(parts[1], location), index: false };
  }
  if (parts.length === 1 && parts[0].endsWith("-tutors")) {
    const subject = titleFromSlug(parts[0].replace(/-tutors$/, ""));
    return { ...subjectSeoPage(parts[0], subject, `${subject} Tutors UK`), index: false };
  }
  if (parts.length === 2 && parts[0].endsWith("-tutors")) {
    const subject = titleFromSlug(parts[0].replace(/-tutors$/, ""));
    const location = titleFromSlug(parts[1]);
    return {
      ...subjectSeoPage(path, subject, `${subject} Tutors in ${location}`),
      path: `/${path}`,
      index: false,
      intro: `Search for ${subject.toLowerCase()} tutors in ${location} and online across the UK.`
    };
  }
  if (parts.length === 1 && parts[0].startsWith("online-") && parts[0].endsWith("-tutors")) {
    const subject = titleFromSlug(parts[0].replace(/^online-/, "").replace(/-tutors$/, ""));
    return {
      ...subjectSeoPage(parts[0], subject, `Online ${subject} Tutors UK`),
      index: false,
      intro: `Search for online ${subject.toLowerCase()} tutors across the UK.`
    };
  }
  return null;
}

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((part) => {
      if (part.toLowerCase() === "gcse") return "GCSE";
      if (part.toLowerCase() === "ks1" || part.toLowerCase() === "ks2" || part.toLowerCase() === "ks3") return part.toUpperCase();
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(" ");
}

function slugifySeo(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
