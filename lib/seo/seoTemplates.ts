import { coreSeoFaqs, levelTutorFaqs, subjectTutorFaqs, tutorSignupFaqs } from "@/lib/seo/faqs";
import { findCompetitorKeywordCluster } from "@/lib/seo/competitorKeywords";
import { baseInternalLinks, combinedTutorSeoLinks, nearbyLocationLinks, subjectLinks } from "@/lib/seo/internalLinks";
import { renderKeywordPatterns } from "@/lib/seo/keywordPatterns";
import type { SeoLevel } from "@/lib/seo/levels";
import type { SeoLocation } from "@/lib/seo/locations";
import type { SeoSubject } from "@/lib/seo/subjects";
import type { SeoPage } from "@/lib/seo-pages";

type TutorRouteTemplateInput = {
  subject?: SeoSubject;
  location?: SeoLocation;
  level?: SeoLevel;
  onlineOnly?: boolean;
  path: string;
};

export function tutorRouteTemplate({ subject, location, level, onlineOnly, path }: TutorRouteTemplateInput): SeoPage {
  const subjectName = subject?.name;
  const levelName = level?.name;
  const locationName = location?.name;
  const h1 = tutorH1({ subjectName, levelName, locationName, onlineOnly });
  const title = tutorTitle({ subjectName, levelName, locationName, onlineOnly });
  const description = tutorDescription({ subjectName, levelName, locationName, onlineOnly });
  const keywordGroups = onlineOnly
    ? (["subject", "levelSubject", "find"] as const)
    : (["subject", "level", "levelSubject", "subjectLocation", "levelLocation", "levelSubjectLocation", "find", "affordability"] as const);
  const relatedSearches = renderKeywordPatterns({
    subject: subjectName,
    level: levelName,
    location: locationName,
    groups: [...keywordGroups],
    limit: 12
  });

  return {
    path,
    title,
    description,
    h1,
    intro: `Search for ${h1.toLowerCase()} on TuitionList, a free UK tutor directory for independent tutors, teachers, tuition providers, parents, carers, and students.`,
    sections: [
      {
        heading: "Free tutor discovery",
        body:
          "Parents, carers, and students can search published tutor profiles and send enquiries without parent finder fees, agency commission, subscription charges, or hidden platform markups."
      },
      {
        heading: onlineOnly ? "Online tutoring" : "Online and in-person tuition",
        body: onlineOnly
          ? "Online tuition can help families compare tutors across the UK. Before arranging lessons, check the online platform, supervision, safeguarding arrangements, lesson format, and how progress will be shared."
          : "Some families prefer local in-person tuition, while others need online lessons or a mix of both. Search filters can help compare availability, rates, and lesson arrangements."
      },
      {
        heading: "What to look for",
        body:
          "Read tutor profiles carefully and ask about relevant experience, qualifications, references, DBS certificate details where relevant, safeguarding arrangements, lesson location, online safety, and suitability."
      },
      {
        heading: "Badges and profile labels",
        body:
          "Badges, blue ticks, and profile labels show what has been self-declared, seen, or confirmed by TuitionList. They do not mean TuitionList recommends, guarantees, supervises, or accepts responsibility for any tutor."
      },
      {
        heading: "Related tutor searches",
        body: relatedSearches.join(", ")
      }
    ],
    faqs: subjectName ? subjectTutorFaqs(subjectName).slice(0, 6) : levelName ? levelTutorFaqs(levelName).slice(0, 6) : coreSeoFaqs,
    tutorSearch: {
      subject: subject?.name,
      subjectSlug: subject?.slug,
      level: level?.name,
      levelSlug: level?.slug,
      location: location?.name,
      locationSlug: location?.slug,
      onlineOnly,
      nearbyLinks: nearbyLocationLinks(location?.slug).slice(0, 8),
      relatedSubjectLinks: subjectLinks(subject?.slug).slice(0, 8)
    },
    links: combinedTutorSeoLinks({ subjectSlug: subject?.slug, locationSlug: location?.slug, levelSlug: level?.slug })
  };
}

export function dbsCheckedSubjectTemplate(subject: SeoSubject): SeoPage {
  const relatedSearches = renderKeywordPatterns({ subject: subject.name, groups: ["checks"], limit: 8 });
  return {
    path: `/dbs-checked-tutors/${subject.slug}`,
    title: `DBS Checked ${subject.name} Tutors UK | TuitionList`,
    description: `Browse ${subject.name.toLowerCase()} tutors who display DBS or background-check information on their profiles.`,
    h1: `Find DBS Checked ${subject.name} Tutors`,
    index: false,
    intro: `Search for ${subject.name.toLowerCase()} tutors who display DBS or background-check information on their TuitionList profiles.`,
    sections: [
      {
        heading: "DBS and background-check information",
        body:
          "Tutor profiles may show DBS self-declared information or DBS evidence marked as seen by TuitionList. These labels help families understand what information has been provided or reviewed."
      },
      {
        heading: "Not a guarantee",
        body:
          "A DBS or background-check label does not mean TuitionList recommends, guarantees, supervises, or accepts responsibility for any tutor."
      },
      {
        heading: "Before arranging tuition",
        body:
          "Parents, carers, and students should make their own checks, including identity, DBS certificate details where relevant, qualifications, references, safeguarding arrangements, and suitability."
      },
      {
        heading: "Related DBS search terms",
        body: relatedSearches.join(", ")
      }
    ],
    faqs: coreSeoFaqs,
    links: [
      { href: `/tutors/${subject.slug}`, label: `${subject.name} tutors` },
      { href: `/online-tutors/${subject.slug}`, label: `Online ${subject.name} tutors` },
      { href: "/dbs-checked-tutors", label: "DBS checked tutors" },
      { href: "/profile-checks", label: "Profile checks explained" },
      { href: "/safeguarding", label: "Safeguarding information" },
      ...baseInternalLinks()
    ].slice(0, 10)
  };
}

export function freeTutorListingSubjectTemplate(subject: SeoSubject): SeoPage {
  const relatedSearches = renderKeywordPatterns({ subject: subject.name, groups: ["directory", "subject"], limit: 10 });
  return {
    path: `/free-tutor-listing/${subject.slug}`,
    title: `Advertise as a ${subject.name} Tutor for Free | TuitionList`,
    description: `Create a free TuitionList profile and advertise your ${subject.name.toLowerCase()} tuition services to parents and students.`,
    h1: `List as a ${subject.name} Tutor for Free`,
    intro: `Create a free TuitionList profile and help parents, carers, and students find your ${subject.name.toLowerCase()} tuition services online or locally.`,
    sections: [
      {
        heading: "Free tutor advertising",
        body:
          "Add your subjects, levels, location, online or in-person availability, rates, experience, qualifications, and contact preferences."
      },
      {
        heading: "No commission or subscription",
        body:
          "TuitionList does not charge lesson commission, tutor subscription fees, parent finder fees, or hidden platform markups."
      },
      {
        heading: "Admin review before publishing",
        body:
          "Tutor profiles are reviewed before they appear publicly. Where possible, TuitionList may mark certain evidence as seen or confirmed using profile badges."
      },
      {
        heading: "Related tutor listing searches",
        body: relatedSearches.join(", ")
      }
    ],
    faqs: tutorSignupFaqs,
    links: [
      { href: "/signup", label: "Create a free tutor profile" },
      { href: "/for-tutors", label: "For tutors" },
      { href: "/free-tutor-listing-uk", label: "Free tutor listing UK" },
      { href: `/tutors/${subject.slug}`, label: `${subject.name} tutors` },
      { href: "/profile-checks", label: "Profile checks explained" },
      ...baseInternalLinks()
    ].slice(0, 10)
  };
}

export function alternativePageTemplate(competitor: string, path: string): SeoPage {
  const keywordCluster = findCompetitorKeywordCluster(path);
  return {
    path,
    title: `${competitor} Alternative | TuitionList`,
    description: `Looking for a ${competitor} alternative? TuitionList is a free UK tutor directory with no commission and no parent finder fees.`,
    h1: `${competitor} alternative`,
    intro:
      "TuitionList is a free UK tutor directory built for straightforward tutor discovery, direct enquiries, and careful directory-only wording.",
    sections: [
      {
        heading: "Free for parents and tutors",
        body:
          "Parents, carers, and students can search and send enquiries for free. Tutors and tuition providers can create basic profiles for free."
      },
      {
        heading: "No commission or finder fees",
        body:
          "TuitionList does not charge lesson commission, parent finder fees, subscription charges, or hidden platform markups."
      },
      {
        heading: "Independent tutor directory",
        body:
          "TuitionList is not a tutoring agency. Tutors and tuition providers are independent, and families remain responsible for checking suitability before arranging tuition."
      },
      {
        heading: "Related searches",
        body:
          keywordCluster?.keywords.join(", ") ??
          "best tutor websites UK, best tutoring platforms UK, best tutor directories UK, free tutor platforms UK, UK tutor directory"
      }
    ],
    faqs: [...coreSeoFaqs, ...tutorSignupFaqs],
    links: [
      { href: "/tutor-directory-comparison", label: "Tutor directory comparison" },
      { href: "/first-tutors-alternative", label: "First Tutors alternative" },
      { href: "/free-tutor-directory", label: "Free tutor directory" },
      { href: "/no-commission-tutor-platform", label: "No commission tutor platform" },
      { href: "/become-a-tutor", label: "Create a free tutor profile" },
      { href: "/find-a-tutor", label: "Find a tutor" }
    ]
  };
}

function tutorH1({
  subjectName,
  levelName,
  locationName,
  onlineOnly
}: {
  subjectName?: string;
  levelName?: string;
  locationName?: string;
  onlineOnly?: boolean;
}) {
  if (onlineOnly && subjectName && levelName) return `Find Online ${levelName} ${subjectName} Tutors`;
  if (onlineOnly && subjectName) return `Find Online ${subjectName} Tutors`;
  if (locationName && subjectName && levelName) return `Find ${levelName} ${subjectName} Tutors in ${locationName}`;
  if (locationName && subjectName) return `Find ${subjectName} Tutors in ${locationName}`;
  if (locationName) return `Find Tutors in ${locationName}`;
  if (subjectName && levelName) return `Find ${levelName} ${subjectName} Tutors`;
  if (subjectName) return `Find ${subjectName} Tutors Near You`;
  if (levelName) return `Find ${levelName} Tutors Near You`;
  return "Find Tutors Near You";
}

function tutorTitle({
  subjectName,
  levelName,
  locationName,
  onlineOnly
}: {
  subjectName?: string;
  levelName?: string;
  locationName?: string;
  onlineOnly?: boolean;
}) {
  if (onlineOnly && subjectName && levelName) return `Online ${levelName} ${subjectName} Tutors UK | TuitionList`;
  if (onlineOnly && subjectName) return `Online ${subjectName} Tutors UK | Private ${subjectName} Lessons Online`;
  if (locationName && subjectName && levelName) return `${levelName} ${subjectName} Tutors in ${locationName} | TuitionList`;
  if (locationName && subjectName) return `${subjectName} Tutors in ${locationName} | Private ${subjectName} Tuition`;
  if (locationName) return `Tutors in ${locationName} | Local and Online Tutors Near You`;
  if (subjectName && levelName) return `${levelName} ${subjectName} Tutors Near Me | TuitionList`;
  if (subjectName) return `${subjectName} Tutors Near Me | Local and Online ${subjectName} Tutors`;
  if (levelName) return `${levelName} Tutors Near Me | Private ${levelName} Tutors UK`;
  return "Find Tutors Near Me | Local and Online Tutors UK | TuitionList";
}

function tutorDescription({
  subjectName,
  levelName,
  locationName,
  onlineOnly
}: {
  subjectName?: string;
  levelName?: string;
  locationName?: string;
  onlineOnly?: boolean;
}) {
  const subjectLower = subjectName?.toLowerCase();
  const levelLower = levelName?.toLowerCase();
  const locationLower = locationName?.toLowerCase();
  if (onlineOnly && subjectName && levelName) return `Search online ${levelLower} ${subjectLower} tutors across the UK and contact independent tutors directly.`;
  if (onlineOnly && subjectName) return `Find online ${subjectLower} tutors across the UK. Browse independent tutors for flexible private lessons online.`;
  if (locationName && subjectName && levelName) return `Find ${levelLower} ${subjectLower} tutors in ${locationLower}. Browse independent tutor profiles for online and in-person tuition.`;
  if (locationName && subjectName) return `Search ${subjectLower} tutors in ${locationLower}. Find local and online private tutors and contact them directly.`;
  if (locationName) return `Find private tutors in ${locationName} for Maths, English, Science, 11 Plus, GCSE, A-Level and more.`;
  if (subjectName && levelName) return `Find ${levelLower} ${subjectLower} tutors for online or in-person lessons. Browse independent UK tutors and contact them directly.`;
  if (subjectName) return `Find local and online ${subjectLower} tutors across the UK. Browse independent tutor profiles and contact tutors directly through TuitionList.`;
  if (levelName) return `Search independent ${levelLower} tutors across the UK. Find local and online tutors by subject, location and availability.`;
  return "Search local and online tutors across the UK. Find private tutors by subject, level and location.";
}
