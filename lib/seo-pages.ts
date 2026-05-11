import { SITE_URL } from "@/lib/constants";
import { seoExamBoards } from "@/lib/seo/examBoards";
import { coreSeoFaqs, type SeoFaq } from "@/lib/seo/faqs";
import { guideSeoPages } from "@/lib/seo/guides";
import { findSeoLevel } from "@/lib/seo/levels";
import { findSeoLocation, seoLocations } from "@/lib/seo/locations";
import { getPriorityTutorPage, priorityTutorSubjectPages } from "@/lib/seo/priorityTutorPages";
import { alternativePageTemplate, dbsCheckedSubjectTemplate, freeTutorListingSubjectTemplate, tutorRouteTemplate } from "@/lib/seo/seoTemplates";
import { findSeoSubject, seoSubjects } from "@/lib/seo/subjects";
import { trustSeoPages } from "@/lib/seo/trustPages";
import { tutorGrowthSeoPages } from "@/lib/seo/tutorGrowthPages";
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
  faqs?: SeoFaq[];
  index?: boolean;
  tutorSearch?: {
    subject?: string;
    subjectSlug?: string;
    level?: string;
    levelSlug?: string;
    location?: string;
    locationSlug?: string;
    onlineOnly?: boolean;
    nearbyLinks?: SeoLink[];
    relatedSubjectLinks?: SeoLink[];
  };
};

export const nationalSeoLinks: SeoLink[] = [
  { href: "/find-a-tutor", label: "Find a tutor" },
  { href: "/online-tutors", label: "Online tutors" },
  { href: "/guides", label: "Parent guides" },
  { href: "/profile-checks", label: "Profile checks explained" },
  { href: "/free-tutor-directory-uk", label: "Free tutor directory UK" },
  { href: "/local-tutors-uk", label: "Local tutors UK" },
  { href: "/independent-tutors-uk", label: "Independent tutors UK" },
  { href: "/no-commission-tutor-platform", label: "No commission tutor platform" },
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

const guideLinks: SeoLink[] = [
  { href: "/guides/how-to-choose-a-tutor", label: "How to choose a tutor" },
  { href: "/guides/online-vs-in-person-tutoring", label: "Online vs in-person tutoring" },
  { href: "/guides/how-much-does-a-tutor-cost", label: "How much does a tutor cost?" },
  { href: "/guides/what-to-ask-a-tutor", label: "What to ask a tutor" },
  { href: "/guides/dbs-checks-for-private-tutors", label: "DBS checks for private tutors" },
  { href: "/guides/how-to-check-a-tutor-before-booking", label: "How to check a tutor before booking" }
];

const checkLinks: SeoLink[] = [
  { href: "/profile-checks", label: "Profile checks" },
  { href: "/dbs-checks", label: "DBS checks" },
  { href: "/dbs-checked-tutors", label: "DBS checked tutors" },
  { href: "/background-checked-tutors", label: "Background-checked tutors" },
  { href: "/identity-checks", label: "Identity checks" },
  { href: "/qualification-checks", label: "Qualification checks" },
  { href: "/safeguarding-checks", label: "Safeguarding checks" }
];

const examBoardLinks: SeoLink[] = [
  ...seoExamBoards.map((board) => ({ href: `/exam-boards/${board.slug}`, label: board.name }))
];

export const staticSeoPages: SeoPage[] = [
  {
    path: "/tutors",
    title: "Find Tutors Near Me | Local and Online Tutors UK | TuitionList",
    description: "Search local and online tutors across the UK. Find private tutors for Maths, English, Science, 11 Plus, GCSE, A-Level and more.",
    h1: "Find Tutors Near You",
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
    title: "Online Tutors UK | Find Private Online Tutors | TuitionList",
    description: "Find online tutors for Maths, English, Science, 11 Plus, GCSE, A-Level and more. Browse independent UK tutors and contact them directly.",
    h1: "Find Online Tutors Across the UK",
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
          "Tutors, teachers, and tuition providers can create free profiles. There is no commission, no parent finder fee, and no paid listings."
      }
    ],
    links: nationalSeoLinks
  },
  {
    path: "/free-tutor-directory-uk",
    title: "Free Tutor Directory UK | TuitionList",
    description: "TuitionList is a free UK tutor directory, helping tutors stay visible and helping parents find tuition support.",
    h1: "Free tutor directory UK",
    intro:
      "TuitionList is free for basic tutor profiles and parent enquiries, with no commission and no parent finder fees.",
    sections: [
      {
        heading: "Free tutor directory",
        body:
          "Tutors and tuition providers can create a profile for free. Parents, carers, and students can search and send enquiries without paying finder fees."
      },
      {
        heading: "No paid listings",
        body:
          "TuitionList is focused on simple tutor discovery. Paid featured listings, subscriptions, bookings, and payments are not part of the MVP."
      }
    ],
    links: nationalSeoLinks
  },
  {
    path: "/free-tutor-directory",
    title: "Free Tutor Directory UK | Find and List Tutors for Free",
    description:
      "TuitionList is a free UK tutor directory for parents, students and independent tutors. Find tutors or create a tutor profile without commission or subscription fees.",
    h1: "Free UK Tutor Directory",
    intro:
      "TuitionList is a free UK tutor directory where parents, carers, and students can search for independent tutors and send enquiries directly.",
    sections: [
      {
        heading: "Free search and enquiries",
        body:
          "Families can search published tutor profiles and send enquiries without parent finder fees, subscription charges, or hidden platform markups."
      },
      {
        heading: "Free tutor profiles",
        body:
          "Tutors, teachers, and tuition providers can create basic profiles for free and submit them for review before they appear publicly."
      },
      {
        heading: "Directory only",
        body:
          "TuitionList does not employ, manage, supervise, endorse, or guarantee tutors. Parents, carers, and students remain responsible for making their own checks."
      }
    ],
    faqs: coreSeoFaqs,
    links: [
      { href: "/find-a-tutor", label: "Find a tutor" },
      { href: "/become-a-tutor", label: "Create a free tutor profile" },
      { href: "/online-tutors", label: "Online tutors" },
      { href: "/tutors-near-me", label: "Tutors near me" },
      { href: "/profile-checks", label: "Profile checks explained" },
      { href: "/no-commission-tutor-platform", label: "No commission tutor platform" }
    ]
  },
  {
    path: "/free-tutor-listing-uk",
    title: "Free Tutor Listing UK | TuitionList",
    description: "Create a free tutor listing on TuitionList and receive enquiries without commission, subscriptions, or parent finder fees.",
    h1: "Free tutor listing UK",
    intro:
      "Tutors, teachers, and tuition providers can create a free TuitionList profile so parents, carers, and students can find them across the UK.",
    sections: [
      {
        heading: "Free profile for tutors",
        body:
          "Add your subjects, levels, location, online or in-person availability, rates, qualifications, experience, and contact preferences. Profiles are reviewed before they appear publicly."
      },
      {
        heading: "No commission or subscription",
        body:
          "TuitionList does not charge lesson commission, tutor subscription fees, parent finder fees, or hidden platform markups. Parents send enquiries directly through your published profile."
      },
      {
        heading: "Profile checks where possible",
        body:
          "Where possible, TuitionList may review evidence such as ID, DBS certificate details, qualifications, insurance, or safeguarding training. Badges show what has been self-declared, seen, or confirmed."
      }
    ],
    links: [
      { href: "/become-a-tutor", label: "Create your free tutor profile" },
      { href: "/no-commission-tutor-platform", label: "No commission tutor platform" },
      { href: "/how-tutor-listings-rank", label: "How listings rank" },
      { href: "/profile-checks", label: "Profile checks explained" }
    ]
  },
  {
    path: "/become-a-tutor",
    title: "List as a Tutor for Free | Join TuitionList UK",
    description: "Join TuitionList and create a free tutor profile. Advertise your private tuition services to parents and students across the UK.",
    h1: "List Your Tutor Profile for Free",
    intro:
      "Create a free tutor profile on TuitionList so parents, carers, and students can find your tutoring services locally and online.",
    sections: [
      {
        heading: "Free tutor profiles",
        body:
          "Add your subjects, levels, location, online or in-person availability, rates, qualifications, DBS status, safeguarding training, insurance, and experience. Profiles are reviewed before going live."
      },
      {
        heading: "No commission",
        body:
          "TuitionList does not take lesson commission or charge parent finder fees. Parents contact you through enquiries on your published profile."
      },
      {
        heading: "Profile checks where possible",
        body:
          "Where possible, TuitionList may review evidence you provide. Badges, blue ticks, and profile labels show what has been self-declared, seen, or confirmed, and do not mean TuitionList recommends or guarantees a tutor."
      }
    ],
    links: [
      { href: "/signup", label: "Start free profile" },
      { href: "/how-it-works", label: "How TuitionList works" },
      { href: "/free-tutor-listing-uk", label: "Free tutor listing UK" },
      { href: "/no-commission-tutor-platform", label: "No commission tutor platform" },
      { href: "/profile-checks", label: "Profile checks explained" }
    ]
  },
  {
    path: "/local-tutors-uk",
    title: "Local Tutors UK | TuitionList",
    description: "Search local tutors and tuition providers across the UK by subject, level, location, tuition type, and rate.",
    h1: "Local tutors UK",
    intro:
      "TuitionList helps families search for local tutors across the UK, as well as online tutors when local availability is limited.",
    sections: [
      {
        heading: "Find tutors by area",
        body:
          "Search by town, city, county, or postcode area to compare published profiles for local in-person tuition, online tuition, or tutors who offer both."
      },
      {
        heading: "Local does not mean checked by default",
        body:
          "A tutor appearing in a location search does not mean TuitionList recommends or guarantees them. Families should read profile badges and make their own checks before arranging tuition."
      },
      {
        heading: "Compare subjects and levels",
        body:
          "Use subject, level, tuition type, and rate filters to narrow the search, then send an enquiry directly through a tutor's public profile."
      }
    ],
    links: [
      { href: "/tutors-near-me", label: "Tutors near me" },
      { href: "/locations", label: "Browse locations" },
      { href: "/online-tutors", label: "Online tutors UK" },
      { href: "/guides/how-to-choose-a-tutor", label: "How to choose a tutor" }
    ]
  },
  {
    path: "/independent-tutors-uk",
    title: "Independent Tutors UK | TuitionList",
    description: "Find independent tutors, teachers, and tuition providers across the UK on TuitionList.",
    h1: "Independent tutors UK",
    intro:
      "TuitionList is built for independent tutor discovery, helping families find tutors, teachers, and tuition providers without agency fees or lesson commission.",
    sections: [
      {
        heading: "Independent providers",
        body:
          "Tutors and tuition providers listed on TuitionList are independent providers. TuitionList does not employ, manage, supervise, or endorse them."
      },
      {
        heading: "Direct enquiries",
        body:
          "Parents, carers, and students can send enquiries through tutor profiles. Lesson arrangements, fees, cancellations, refunds, and safeguarding arrangements are agreed directly."
      },
      {
        heading: "Useful profile information",
        body:
          "Profiles can show subjects, levels, rates, experience, location, tuition type, qualifications, self-declared information, and admin-seen profile labels where applicable."
      }
    ],
    links: [
      { href: "/private-tutors", label: "Private tutors UK" },
      { href: "/free-tutor-directory-uk", label: "Free tutor directory" },
      { href: "/find-a-tutor", label: "Find a tutor" },
      { href: "/become-a-tutor", label: "Create a tutor profile" }
    ]
  },
  {
    path: "/no-commission-tutor-platform",
    title: "No Commission Tutor Platform | TuitionList",
    description: "TuitionList is a no commission UK tutor directory with free tutor profiles and free parent enquiries.",
    h1: "No commission tutor platform",
    intro:
      "TuitionList helps tutors stay visible and helps families send enquiries without lesson commission, parent finder fees, subscription charges, or hidden platform markups.",
    sections: [
      {
        heading: "No lesson commission",
        body:
          "TuitionList does not take a percentage of tutor lesson fees. Any lesson fees are agreed directly between the parent, carer, student, tutor, or tuition provider."
      },
      {
        heading: "No parent finder fee",
        body:
          "Parents, carers, and students can search published profiles and send enquiries without paying TuitionList a finder fee."
      },
      {
        heading: "Directory only",
        body:
          "TuitionList does not arrange tuition, process lesson payments, supervise lessons, or become a party to any agreement between families and tutors."
      }
    ],
    links: [
      { href: "/free-tutor-directory-uk", label: "Free tutor directory UK" },
      { href: "/free-tutor-listing-uk", label: "Free tutor listing UK" },
      { href: "/tutor-directory-comparison", label: "Tutor directory comparison" },
      { href: "/terms", label: "Terms and conditions" }
    ]
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
  },
  {
    path: "/guides",
    title: "Tutor Search Guides UK | TuitionList",
    description: "Plain English guides for parents, carers, and students looking for tutors across the UK.",
    h1: "Tutor search guides",
    intro:
      "Helpful TuitionList guides for parents, carers, and students comparing independent tutors, teachers, and tuition providers across the UK.",
    sections: [
      {
        heading: "Make better enquiries",
        body:
          "These guides explain common tutor search questions, including what to ask before arranging tuition, how online tuition compares with in-person lessons, and how to understand profile checks."
      },
      {
        heading: "Directory-only guidance",
        body:
          "TuitionList does not recommend, employ, manage, or supervise tutors. The guides are designed to help families make their own enquiries before arranging tuition."
      }
    ],
    links: [...guideLinks, ...checkLinks]
  },
  {
    path: "/guides/how-to-choose-a-tutor",
    title: "How to Choose a Tutor | TuitionList",
    description: "A practical UK guide to choosing a tutor, including subjects, levels, rates, checks, and lesson arrangements.",
    h1: "How to choose a tutor",
    intro:
      "Choosing a tutor is about more than finding someone nearby. Parents, carers, and students should compare experience, subjects, teaching style, availability, rates, and safety arrangements.",
    sections: [
      {
        heading: "Start with the support needed",
        body:
          "Think about the subject, level, exam board, lesson format, frequency, budget, and whether the learner needs confidence building, exam preparation, catch-up support, or specialist help."
      },
      {
        heading: "Read profiles carefully",
        body:
          "A useful profile should explain what the tutor teaches, who they work with, their experience, rates, location, online availability, and any self-declared or admin-seen information."
      },
      {
        heading: "Carry out your own checks",
        body:
          "Before arranging tuition, families should consider identity, qualifications, DBS certificate details where relevant, references, safeguarding arrangements, online safety, insurance, and suitability."
      }
    ],
    links: [
      { href: "/find-a-tutor", label: "Search tutors" },
      { href: "/guides/what-to-ask-a-tutor", label: "Questions to ask a tutor" },
      { href: "/profile-checks", label: "Profile checks explained" },
      { href: "/safeguarding", label: "Safeguarding information" }
    ]
  },
  {
    path: "/guides/online-vs-in-person-tutoring",
    title: "Online vs In-Person Tutoring | TuitionList",
    description: "Compare online and in-person tutoring options before sending an enquiry on TuitionList.",
    h1: "Online vs in-person tutoring",
    intro:
      "Both online and in-person tutoring can work well. The right choice depends on the learner, subject, location, timetable, budget, and safeguarding arrangements.",
    sections: [
      {
        heading: "Online tutoring",
        body:
          "Online tuition can widen the choice of tutors across the UK and may make scheduling easier. Families should check the platform used, supervision arrangements, lesson recording policies, and online safety measures."
      },
      {
        heading: "In-person tutoring",
        body:
          "In-person tuition may suit learners who benefit from direct support, handwritten work, practical resources, or a familiar learning environment. Families should agree the location, adult supervision, travel, and safeguarding arrangements."
      },
      {
        heading: "Questions to ask",
        body:
          "Ask how lessons are planned, how progress is reviewed, what resources are used, what happens if a lesson is missed, and what checks or evidence the tutor can provide."
      }
    ],
    links: [
      { href: "/online-tutors", label: "Find online tutors" },
      { href: "/private-tutors", label: "Private tutors" },
      { href: "/guides/what-to-ask-a-tutor", label: "What to ask a tutor" }
    ]
  },
  {
    path: "/guides/how-much-does-a-tutor-cost",
    title: "How Much Does a Tutor Cost? | TuitionList",
    description: "A practical guide to tutor rates, hourly pricing, and what can affect tuition costs in the UK.",
    h1: "How much does a tutor cost?",
    intro:
      "Tutor rates can vary across the UK depending on subject, level, experience, location, online or in-person delivery, and whether the tutor is independent or part of a tuition provider.",
    sections: [
      {
        heading: "What affects tutor rates",
        body:
          "Rates may be influenced by qualifications, teaching experience, exam level, preparation time, specialist knowledge, travel, group size, and demand for a subject."
      },
      {
        heading: "Compare the full arrangement",
        body:
          "Before choosing a tutor, check what is included in the hourly rate, cancellation terms, travel costs, lesson length, resources, and how progress will be communicated."
      },
      {
        heading: "No parent finder fees",
        body:
          "TuitionList does not charge parent finder fees and does not take lesson commission. Any lesson fees are agreed directly between families and tutors."
      }
    ],
    links: [
      { href: "/find-a-tutor", label: "Search by rate" },
      { href: "/free-tutor-directory-uk", label: "Free tutor directory" },
      { href: "/terms", label: "Terms and conditions" }
    ]
  },
  {
    path: "/guides/what-to-ask-a-tutor",
    title: "What to Ask a Tutor Before Booking | TuitionList",
    description: "Questions parents, carers, and students may want to ask tutors before arranging tuition.",
    h1: "What to ask a tutor",
    intro:
      "A good enquiry helps families understand whether a tutor may be suitable before arranging lessons.",
    sections: [
      {
        heading: "Teaching and experience",
        body:
          "Ask what subjects and levels the tutor teaches, whether they have experience with the learner's year group or exam board, and how they adapt lessons to different needs."
      },
      {
        heading: "Checks and evidence",
        body:
          "Ask about identity, qualifications, DBS certificate details where relevant, references, safeguarding training, insurance, and whether any documents can be shown before tuition begins."
      },
      {
        heading: "Lesson arrangements",
        body:
          "Ask about lesson format, location, online platform, supervision, homework, progress updates, cancellations, fees, and who to contact if there is a concern."
      }
    ],
    links: [
      { href: "/guides/how-to-check-a-tutor-before-booking", label: "How to check a tutor" },
      { href: "/safeguarding", label: "Safeguarding information" },
      { href: "/find-a-tutor", label: "Find a tutor" }
    ]
  },
  {
    path: "/guides/dbs-checks-for-private-tutors",
    title: "DBS Checks for Private Tutors | TuitionList",
    description: "Plain English information about DBS checks, private tutoring, and why parents should make their own checks.",
    h1: "DBS checks for private tutors",
    intro:
      "DBS eligibility and suitability can depend on the nature, frequency, location, and supervision of tutoring work. Families and tutors should seek appropriate guidance where needed.",
    sections: [
      {
        heading: "What a DBS badge means",
        body:
          "A DBS self-declared badge means the tutor has stated information about DBS status. A DBS seen by TuitionList badge means an admin has marked DBS evidence as seen. Neither label means TuitionList recommends or guarantees the tutor."
      },
      {
        heading: "Ask to see relevant evidence",
        body:
          "Parents and carers may wish to ask the tutor to show relevant DBS certificate details, identity documents, references, qualifications, and safeguarding arrangements before tuition begins."
      },
      {
        heading: "Directory-only position",
        body:
          "TuitionList does not guarantee that a tutor is legally required to hold a particular DBS check in every circumstance and does not accept responsibility for tutor suitability."
      }
    ],
    links: [
      { href: "/dbs-checks", label: "DBS checks explained" },
      { href: "/profile-checks", label: "Profile checks explained" },
      { href: "/safeguarding", label: "Safeguarding information" }
    ]
  },
  {
    path: "/guides/how-to-check-a-tutor-before-booking",
    title: "How to Check a Tutor Before Booking | TuitionList",
    description: "A practical checklist for parents, carers, and students before arranging tuition.",
    h1: "How to check a tutor before booking",
    intro:
      "Before arranging tuition, parents, carers, and students should make their own enquiries and satisfy themselves that a tutor or tuition provider is suitable.",
    sections: [
      {
        heading: "Identity and contact details",
        body:
          "Confirm who will provide the tuition, how they can be contacted, where lessons will take place, and whether the details match any documents or online profiles provided."
      },
      {
        heading: "Qualifications and experience",
        body:
          "Ask for relevant qualifications, teaching experience, references, exam board experience, specialist knowledge, and examples of how lessons are planned."
      },
      {
        heading: "Safeguarding and practical arrangements",
        body:
          "Discuss DBS certificate details where relevant, safeguarding training, supervision, online safety, insurance, cancellations, payment arrangements, and how concerns should be raised."
      }
    ],
    links: [
      { href: "/profile-checks", label: "Profile checks" },
      { href: "/guides/what-to-ask-a-tutor", label: "Questions to ask" },
      { href: "/safeguarding", label: "Safeguarding information" }
    ]
  },
  {
    path: "/profile-checks",
    title: "Profile Checks Explained | TuitionList",
    description: "Understand TuitionList profile badges, blue ticks, and labels for self-declared, seen, or confirmed information.",
    h1: "Profile checks explained",
    intro:
      "TuitionList may review certain information or evidence where possible. Badges, blue ticks, and profile labels are intended to show what has been self-declared, seen, or confirmed.",
    sections: [
      {
        heading: "What the blue tick means",
        body:
          "The blue tick label is Profile checks completed. It appears only when one or more admin checks have been marked as seen or confirmed by TuitionList. It does not mean TuitionList recommends or guarantees the tutor."
      },
      {
        heading: "Read the individual badges",
        body:
          "Families should check the profile badges below the tutor's name to understand what has been self-declared and what has been marked as seen or confirmed."
      },
      {
        heading: "Checks are not a guarantee",
        body:
          "Profile checks do not replace a parent's, carer's, or student's own enquiries before arranging tuition."
      }
    ],
    links: checkLinks
  },
  {
    path: "/dbs-checks",
    title: "DBS Checks and Tutor Profiles | TuitionList",
    description: "Understand DBS self-declared and DBS seen labels on TuitionList tutor profiles.",
    h1: "DBS checks and tutor profiles",
    intro:
      "TuitionList tutor profiles may show DBS self-declared information or DBS evidence marked as seen by TuitionList where applicable.",
    sections: [
      {
        heading: "DBS self-declared",
        body:
          "DBS self-declared means the tutor has provided information about their own DBS status. TuitionList has not necessarily reviewed evidence for that label."
      },
      {
        heading: "DBS seen by TuitionList",
        body:
          "DBS seen by TuitionList means an admin has marked DBS evidence as seen. It does not mean TuitionList recommends, guarantees, supervises, or accepts responsibility for the tutor."
      }
    ],
    links: checkLinks
  },
  {
    path: "/dbs-checked-tutors",
    title: "DBS Checked Tutors UK | Find Background-Checked Tutors",
    description: "Browse tutors who display DBS or background-check information on their TuitionList profiles.",
    h1: "Find DBS Checked Tutors",
    intro:
      "Families often search for DBS checked tutors. On TuitionList, DBS wording is used carefully so families can see whether DBS information is self-declared or marked as seen by TuitionList.",
    sections: [
      {
        heading: "DBS self-declared or seen",
        body:
          "A DBS self-declared label means the tutor has provided DBS-related information. A DBS seen by TuitionList label means an admin has marked DBS evidence as seen."
      },
      {
        heading: "Not a guarantee",
        body:
          "DBS labels do not mean TuitionList recommends, guarantees, supervises, or accepts responsibility for any tutor. Families should ask to see relevant evidence before arranging tuition."
      },
      {
        heading: "Search with other factors",
        body:
          "DBS information should be considered alongside identity, qualifications, references, safeguarding arrangements, experience, lesson location, supervision, and suitability."
      }
    ],
    links: [
      { href: "/find-a-tutor?dbs=true", label: "Search tutors with DBS filters" },
      { href: "/dbs-checks", label: "DBS checks explained" },
      { href: "/profile-checks", label: "Profile checks explained" },
      { href: "/safeguarding", label: "Safeguarding information" }
    ]
  },
  {
    path: "/background-checked-tutors",
    title: "Background-Checked Tutors UK | TuitionList",
    description: "Understand profile checks, badges, and admin-seen labels when searching for tutors on TuitionList.",
    h1: "Background-checked tutors UK",
    intro:
      "Some families search for background-checked tutors. TuitionList uses clearer wording: profile badges show what information has been self-declared, seen, or confirmed where possible.",
    sections: [
      {
        heading: "Profile checks completed",
        body:
          "A blue tick may appear when one or more admin checks have been marked as seen or confirmed, such as ID seen, DBS seen, qualification seen, reference received, insurance confirmed, or safeguarding training seen."
      },
      {
        heading: "Check the badge details",
        body:
          "The blue tick does not mean every possible check has been completed. Families should read the individual badges to understand exactly what has been marked as seen or confirmed."
      },
      {
        heading: "Families remain responsible",
        body:
          "Profile checks are not a recommendation or guarantee. Parents, carers, and students remain responsible for making their own checks before arranging tuition."
      }
    ],
    links: [
      { href: "/profile-checks", label: "Profile checks explained" },
      { href: "/identity-checks", label: "Identity checks" },
      { href: "/qualification-checks", label: "Qualification checks" },
      { href: "/guides/how-to-check-a-tutor-before-booking", label: "How to check a tutor" }
    ]
  },
  {
    path: "/verified-tutors",
    title: "Verified Tutors UK | Find Trusted Private Tutors",
    description: "Search tutor profiles with profile check labels and find private tutors for Maths, English, Science, 11 Plus, GCSE and A-Level.",
    h1: "Find Verified Tutors",
    intro:
      "Some families search for verified tutors. On TuitionList, profile labels are used carefully to show what has been self-declared, seen, or confirmed by TuitionList where applicable.",
    sections: [
      {
        heading: "What profile checks mean",
        body:
          "A blue tick or profile check label may appear when one or more admin checks have been marked as seen or confirmed, such as ID seen, DBS seen, qualification seen, reference received, insurance confirmed, or safeguarding training seen."
      },
      {
        heading: "Not a guarantee or endorsement",
        body:
          "A badge, blue tick, or profile label does not mean TuitionList recommends, guarantees, supervises, or accepts responsibility for any tutor or tuition provider."
      },
      {
        heading: "Make your own checks",
        body:
          "Parents, carers, and students should still check identity, DBS certificate details where relevant, qualifications, references, safeguarding arrangements, online safety, lesson arrangements, and suitability before arranging tuition."
      }
    ],
    links: [
      { href: "/profile-checks", label: "Profile checks explained" },
      { href: "/dbs-checked-tutors", label: "DBS checked tutors" },
      { href: "/background-checked-tutors", label: "Background-checked tutors" },
      { href: "/find-a-tutor", label: "Find a tutor" },
      { href: "/safeguarding", label: "Safeguarding information" },
      { href: "/guides/how-to-check-a-tutor-before-booking", label: "How to check a tutor" }
    ]
  },
  {
    path: "/identity-checks",
    title: "Identity Checks and Tutor Profiles | TuitionList",
    description: "Understand the ID seen by TuitionList label on tutor profiles.",
    h1: "Identity checks and tutor profiles",
    intro:
      "Some tutor profiles may show ID seen by TuitionList where an admin has marked identity evidence as seen.",
    sections: [
      {
        heading: "What ID seen means",
        body:
          "ID seen by TuitionList means evidence has been marked as seen by an admin. It does not mean TuitionList employs, supervises, endorses, or guarantees the tutor."
      },
      {
        heading: "Parents should still check",
        body:
          "Families should still make their own enquiries and confirm identity and lesson arrangements before tuition starts."
      }
    ],
    links: checkLinks
  },
  {
    path: "/qualification-checks",
    title: "Qualification Checks and Tutor Profiles | TuitionList",
    description: "Understand qualification self-declared and qualification seen labels on TuitionList.",
    h1: "Qualification checks and tutor profiles",
    intro:
      "Tutor profiles may include self-declared qualifications or qualifications marked as seen by TuitionList where evidence has been reviewed.",
    sections: [
      {
        heading: "Self-declared qualifications",
        body:
          "Self-declared qualifications are information supplied by the tutor or tuition provider. Families should ask for evidence where qualifications are important to their decision."
      },
      {
        heading: "Qualification seen by TuitionList",
        body:
          "Qualification seen by TuitionList means an admin has marked evidence as seen. It is not a recommendation, guarantee, or endorsement."
      }
    ],
    links: checkLinks
  },
  {
    path: "/safeguarding-checks",
    title: "Safeguarding Checks and Tutor Profiles | TuitionList",
    description: "Understand safeguarding training labels and why families must make their own checks.",
    h1: "Safeguarding checks and tutor profiles",
    intro:
      "Some profiles may include safeguarding training self-declared by the tutor or safeguarding training marked as seen by TuitionList where evidence has been reviewed.",
    sections: [
      {
        heading: "Safeguarding training labels",
        body:
          "A safeguarding training label only describes information self-declared or marked as seen. It does not mean TuitionList supervises lessons or guarantees safeguarding suitability."
      },
      {
        heading: "Before arranging tuition",
        body:
          "Families should ask about supervision, lesson location, online safety, contact arrangements, concerns procedures, and any other safeguards relevant to the learner."
      }
    ],
    links: checkLinks
  },
  {
    path: "/exam-boards",
    title: "UK Exam Board Tutor Search | TuitionList",
    description: "Find tutors who may support AQA, Edexcel, OCR, Eduqas, CCEA, SQA, GCSE, IGCSE, and A-Level exam preparation.",
    h1: "UK exam board tutor search",
    intro:
      "Exam board experience can matter for GCSE, IGCSE, A-Level, and other qualifications. TuitionList helps families search tutor profiles and ask about relevant exam board support.",
    sections: [
      {
        heading: "Ask about exam board experience",
        body:
          "Families may wish to ask tutors whether they have experience with the relevant specification, assessment style, past papers, coursework rules, practical requirements, or grading criteria."
      },
      {
        heading: "No endorsement by exam boards",
        body:
          "TuitionList is not affiliated with exam boards. Tutor profiles may mention exam boards where tutors have supplied that information."
      }
    ],
    links: examBoardLinks
  },
  {
    path: "/how-tutor-listings-rank",
    title: "How Tutor Listings Rank | TuitionList",
    description: "Understand how tutor listing order works on TuitionList and why there are no paid featured listings.",
    h1: "How tutor listings rank",
    intro:
      "TuitionList is designed for clear tutor discovery without paid featured listings, parent finder fees, or lesson commission.",
    sections: [
      {
        heading: "Search and filters",
        body:
          "Tutor visibility can depend on search terms, subjects, levels, location, tuition type, profile status, and the filters selected by parents, carers, or students."
      },
      {
        heading: "No paid featured listings",
        body:
          "TuitionList does not use paid featured listings. A higher position should not be treated as a recommendation, guarantee, or endorsement."
      },
      {
        heading: "Published profiles only",
        body:
          "Profiles must be approved before appearing publicly. Draft, pending, rejected, and suspended profiles should not appear in public search results."
      }
    ],
    links: nationalSeoLinks
  },
  {
    path: "/tutor-directory-comparison",
    title: "Tutor Directory Comparison | TuitionList",
    description: "Compare how TuitionList approaches tutor discovery as a free UK tutor directory.",
    h1: "Tutor directory comparison",
    intro:
      "Different tutor directories work in different ways. TuitionList focuses on free tutor discovery, direct enquiries, clear profile information, and careful safeguarding wording.",
    sections: [
      {
        heading: "What makes TuitionList different",
        body:
          "Basic tutor profiles are free, parent enquiries are free, there are no parent finder fees, and TuitionList does not take commission from lessons."
      },
      {
        heading: "Directory, not agency",
        body:
          "TuitionList does not employ, manage, supervise, or endorse tutors. Families contact tutors directly and remain responsible for their own checks."
      }
    ],
    links: [
      { href: "/free-tutor-directory-uk", label: "Free tutor directory UK" },
      { href: "/first-tutors-alternative", label: "First Tutors alternative" },
      { href: "/find-a-tutor", label: "Find a tutor" },
      { href: "/become-a-tutor", label: "Create a tutor profile" }
    ]
  },
  {
    path: "/first-tutors-alternative",
    title: "First Tutors Alternative | Free UK Tutor Directory | TuitionList",
    description:
      "TuitionList is a free UK tutor directory where parents can find local and online tutors and tutors can create a profile for free.",
    h1: "Looking for a First Tutors Alternative?",
    intro:
      "If you are comparing UK tutor directories, TuitionList offers a simple free directory model for parents, carers, students, tutors, teachers, and tuition providers.",
    sections: [
      {
        heading: "Free tutor discovery",
        body:
          "Parents, carers, and students can search published tutor profiles and send enquiries without paying TuitionList a parent finder fee."
      },
      {
        heading: "Free tutor listings",
        body:
          "Tutors and tuition providers can create basic profiles for free. TuitionList does not charge lesson commission, subscription fees, or hidden platform markups."
      },
      {
        heading: "Directory-only model",
        body:
          "TuitionList is not a tutoring agency. It does not employ, manage, supervise, endorse, or guarantee tutors. Families remain responsible for checking suitability before arranging tuition."
      }
    ],
    links: [
      { href: "/free-tutor-directory-uk", label: "Free tutor directory UK" },
      { href: "/no-commission-tutor-platform", label: "No commission tutor platform" },
      { href: "/tutor-directory-comparison", label: "Tutor directory comparison" },
      { href: "/become-a-tutor", label: "Create a free tutor profile" }
    ]
  },
  {
    ...alternativePageTemplate("Superprof", "/superprof-alternative"),
    title: "Superprof Alternative UK | Free Tutor Directory | TuitionList",
    description: "Compare TuitionList as a free UK tutor directory for finding independent local and online tutors.",
    h1: "Looking for a Superprof Alternative?"
  },
  {
    ...alternativePageTemplate("Tutorful", "/tutorful-alternative"),
    title: "Tutorful Alternative UK | Free Tutor Directory | TuitionList",
    description: "Find independent local and online tutors through TuitionList, a free UK tutor directory.",
    h1: "Looking for a Tutorful Alternative?"
  },
  {
    ...alternativePageTemplate("MyTutor", "/mytutor-alternative"),
    title: "MyTutor Alternative UK | Free Tutor Directory | TuitionList",
    description: "Search online and local independent tutors with TuitionList, a free UK tutor directory.",
    h1: "Looking for a MyTutor Alternative?"
  },
  {
    ...alternativePageTemplate("Tutor Hunt", "/tutorhunt-alternative"),
    title: "Tutor Hunt Alternative UK | Free Tutor Directory | TuitionList",
    description: "TuitionList helps parents find independent tutors and lets tutors create a profile for free.",
    h1: "Looking for a Tutor Hunt Alternative?"
  },
  {
    ...alternativePageTemplate("Tutorperch", "/tutorperch-alternative"),
    title: "Tutorperch Alternative UK | Free Tutor Directory | TuitionList",
    description: "Compare TuitionList as a free UK tutor directory for parents, students, tutors, teachers, and tuition providers.",
    h1: "Looking for a Tutorperch Alternative?"
  },
  {
    path: "/best-tutor-websites-uk",
    title: "Best Tutor Websites UK | Free Tutor Directories and Platforms",
    description: "Compare tutor websites, tutoring platforms, and free tutor directories in the UK. TuitionList is a free UK tutor directory.",
    h1: "Best Tutor Websites UK",
    intro:
      "Parents, carers, students, tutors, teachers, and tuition providers can compare different tutor websites and directories when deciding where to search or list tutoring services.",
    sections: [
      {
        heading: "Free tutor websites and directories",
        body:
          "TuitionList is designed as a free UK tutor directory. Parents can search and send enquiries for free, and tutors can create basic profiles for free."
      },
      {
        heading: "What to compare",
        body:
          "When comparing tutor websites, consider fees, commission, profile visibility, enquiry access, safeguarding wording, profile checks, tutor independence, and whether the platform acts as an agency or directory."
      },
      {
        heading: "Related searches",
        body:
          "best tutor websites UK, best tutoring platforms UK, best tutor directories UK, free tutor platforms UK, free tutor websites UK, UK tutor marketplace, UK tutor directory, private tutor directory UK"
      }
    ],
    faqs: coreSeoFaqs,
    links: [
      { href: "/free-tutor-directory", label: "Free tutor directory" },
      { href: "/tutor-directory-comparison", label: "Tutor directory comparison" },
      { href: "/first-tutors-alternative", label: "First Tutors alternative" },
      { href: "/superprof-alternative", label: "Superprof alternative" },
      { href: "/tutorful-alternative", label: "Tutorful alternative" },
      { href: "/become-a-tutor", label: "Create a free tutor profile" }
    ]
  },
  {
    path: "/tutors-near-me",
    title: "Tutors Near Me | Find Local Private Tutors | TuitionList",
    description: "Looking for tutors near you? Search local private tutors by subject, level and location with TuitionList's free UK tutor directory.",
    h1: "Find Tutors Near Me",
    intro:
      "Use TuitionList to search for local tutors near you, online tutors across the UK, or tutors who offer both in-person and online lessons.",
    sections: [
      {
        heading: "Search by UK location",
        body:
          "Enter a town, city, county, or postcode area to explore published tutor profiles. You can also compare online tutors if local options are limited."
      },
      {
        heading: "Check suitability before arranging tuition",
        body:
          "Location is only one part of choosing a tutor. Families should check subjects, level, experience, rates, lesson arrangements, safeguarding, and evidence where relevant."
      }
    ],
    links: [
      { href: "/find-a-tutor", label: "Search tutors" },
      { href: "/locations", label: "Browse locations" },
      { href: "/online-tutors", label: "Online tutors" }
    ]
  },
  {
    path: "/homeschooling-tutors",
    title: "Homeschooling Tutors UK | TuitionList",
    description: "Find tutors and tuition providers who may support home education and homeschooling across the UK.",
    h1: "Homeschooling tutors UK",
    intro:
      "Families looking for home education or homeschooling support can use TuitionList to search independent tutors and tuition providers across the UK.",
    sections: [
      {
        heading: "Support for different needs",
        body:
          "Tutors may support core subjects, exam preparation, confidence building, SEN support, functional skills, or structured learning plans. Families should ask about relevant experience."
      },
      {
        heading: "Check responsibilities and arrangements",
        body:
          "Home education responsibilities and requirements can vary. Families should seek suitable guidance and satisfy themselves that any tutor is appropriate before arranging tuition."
      }
    ],
    links: [
      { href: "/primary-tutors", label: "Primary tutors" },
      { href: "/gcse-maths-tutors", label: "GCSE maths tutors" },
      { href: "/online-tutors", label: "Online tutors" }
    ]
  }
];

export const curatedSeoPages: SeoPage[] = [
  ...subjectPages.map((page) => subjectSeoPage(page.slug, page.subject, page.title)),
  ...locationPages.map((page) => locationSeoPage(page.slug, page.name)),
  ...examBoardLinks.map((link) => examBoardPage(link.href.replace("/exam-boards/", ""), link.label)),
  levelSubjectPage("ks1-tutors", "KS1", "KS1 Tutors UK"),
  levelSubjectPage("ks2-tutors", "KS2", "KS2 Tutors UK"),
  levelSubjectPage("ks3-tutors", "KS3", "KS3 Tutors UK"),
  levelSubjectPage("gcse-tutors", "GCSE", "GCSE Tutors UK"),
  levelSubjectPage("university-tutors", "University", "University Tutors UK"),
  levelSubjectPage("adult-learning-tutors", "Adult learning", "Adult Learning Tutors UK"),
  levelSubjectPage("sen-support-tutors", "SEN support", "SEN Support Tutors UK"),
  levelSubjectSpecificPage("gcse-english-tutors", "GCSE", "English", "GCSE English Tutors UK"),
  levelSubjectSpecificPage("gcse-science-tutors", "GCSE", "Science", "GCSE Science Tutors UK"),
  levelSubjectSpecificPage("a-level-maths-tutors", "A-Level", "Maths", "A-Level Maths Tutors UK"),
  levelSubjectSpecificPage("a-level-english-tutors", "A-Level", "English", "A-Level English Tutors UK"),
  levelSubjectSpecificPage("a-level-science-tutors", "A-Level", "Science", "A-Level Science Tutors UK"),
  levelSubjectSpecificPage("ks2-maths-tutors", "KS2", "Maths", "KS2 Maths Tutors UK"),
  levelSubjectSpecificPage("ks2-english-tutors", "KS2", "English", "KS2 English Tutors UK"),
  subjectAliasPage("subjects/maths", "Maths", "Maths Tutors UK"),
  subjectAliasPage("subjects/english", "English", "English Tutors UK"),
  subjectAliasPage("subjects/science", "Science", "Science Tutors UK"),
  subjectAliasPage("subjects/11-plus", "11 Plus", "11 Plus Tutors UK"),
  subjectAliasPage("subjects/gcse-maths", "GCSE Maths", "GCSE Maths Tutors UK")
];

export const allIndexableSeoPages = ensureMinimumSeoLinks(dedupeSeoPages([...staticSeoPages, ...curatedSeoPages, ...guideSeoPages, ...trustSeoPages, ...tutorGrowthSeoPages]));

export function getSeoPage(path: string) {
  const normalized = path.replace(/^\/+|\/+$/g, "");
  return allIndexableSeoPages.find((page) => page.path.replace(/^\/+/, "") === normalized) ?? generateNoindexSeoPage(normalized);
}

export function getTutorsSeoPage(parts: string[]) {
  if (parts.length === 0) return getSeoPage("/tutors");
  if (parts.length === 1) {
    const priorityPage = getPriorityTutorPage(parts[0]);
    if (priorityPage) return priorityPage;

    const subject = findSeoSubject(parts[0]);
    if (subject) return tutorRouteTemplate({ subject, path: `/tutors/${parts[0]}` });

    const location = findSeoLocation(parts[0]);
    if (location) return tutorRouteTemplate({ location, path: `/tutors/${parts[0]}` });
  }
  if (parts.length === 2) {
    const subject = findSeoSubject(parts[0]);
    const level = findSeoLevel(parts[1]);
    if (subject && level) return tutorRouteTemplate({ subject, level, path: `/tutors/${parts.join("/")}` });

    const levelFirst = findSeoLevel(parts[0]);
    const subjectSecond = findSeoSubject(parts[1]);
    if (levelFirst && subjectSecond) return tutorRouteTemplate({ subject: subjectSecond, level: levelFirst, path: `/tutors/${parts.join("/")}` });

    const location = findSeoLocation(parts[0]);
    const locationSubject = findSeoSubject(parts[1]);
    if (location && locationSubject) return tutorRouteTemplate({ location, subject: locationSubject, path: `/tutors/${parts.join("/")}` });

    const locationLevel = findSeoLevel(parts[1]);
    if (location && locationLevel) return tutorRouteTemplate({ location, level: locationLevel, path: `/tutors/${parts.join("/")}` });
  }
  if (parts.length === 3) {
    const location = findSeoLocation(parts[0]);
    const subject = findSeoSubject(parts[1]);
    const level = findSeoLevel(parts[2]);
    if (location && subject && level) return tutorRouteTemplate({ location, subject, level, path: `/tutors/${parts.join("/")}` });

    const locationLevel = findSeoLevel(parts[1]);
    const locationSubject = findSeoSubject(parts[2]);
    if (location && locationLevel && locationSubject) return tutorRouteTemplate({ location, subject: locationSubject, level: locationLevel, path: `/tutors/${parts.join("/")}` });
  }
  return null;
}

export function getDbsCheckedTutorsSeoPage(parts: string[]) {
  if (parts.length === 0) return getSeoPage("/dbs-checked-tutors");
  if (parts.length === 1) {
    const subject = findSeoSubject(parts[0]);
    if (subject) return dbsCheckedSubjectTemplate(subject);
  }
  return null;
}

export function getFreeTutorListingSeoPage(parts: string[]) {
  if (parts.length === 0) return getSeoPage("/free-tutor-listing-uk");
  if (parts.length === 1) {
    const subject = findSeoSubject(parts[0]);
    if (subject) return freeTutorListingSubjectTemplate(subject);
  }
  return null;
}

export function getOnlineTutorsSeoPage(parts: string[]) {
  if (parts.length === 0) return getSeoPage("/online-tutors");
  if (parts.length === 1) {
    const subject = findSeoSubject(parts[0]);
    if (subject) return tutorRouteTemplate({ subject, onlineOnly: true, path: `/online-tutors/${parts[0]}` });
  }
  if (parts.length === 2) {
    const subject = findSeoSubject(parts[0]);
    const level = findSeoLevel(parts[1]);
    if (subject && level) return tutorRouteTemplate({ subject, level, onlineOnly: true, path: `/online-tutors/${parts.join("/")}` });
  }
  return null;
}

export function priorityProgrammaticSeoPages() {
  const prioritySubjects = seoSubjects.filter((subject) => subject.priority);
  const priorityLocations = seoLocations.filter((location) => location.priority);
  const priorityLevels = ["gcse", "a-level", "ks2", "11-plus"].map((slug) => findSeoLevel(slug)).filter(Boolean);
  const pages: SeoPage[] = [];

  prioritySubjects.forEach((subject) => {
    pages.push(tutorRouteTemplate({ subject, path: `/tutors/${subject.slug}` }));
    pages.push(tutorRouteTemplate({ subject, onlineOnly: true, path: `/online-tutors/${subject.slug}` }));
    pages.push(dbsCheckedSubjectTemplate(subject));
    pages.push(freeTutorListingSubjectTemplate(subject));
  });

  priorityLocations.forEach((location) => {
    pages.push(tutorRouteTemplate({ location, path: `/tutors/${location.slug}` }));
  });

  priorityLocations.slice(0, 8).forEach((location) => {
    prioritySubjects.slice(0, 6).forEach((subject) => {
      pages.push(tutorRouteTemplate({ location, subject, path: `/tutors/${location.slug}/${subject.slug}` }));
    });
  });

  priorityLocations.slice(0, 5).forEach((location) => {
    prioritySubjects.slice(0, 4).forEach((subject) => {
      priorityLevels.forEach((level) => {
        if (level) pages.push(tutorRouteTemplate({ location, subject, level, path: `/tutors/${location.slug}/${subject.slug}/${level.slug}` }));
      });
    });
  });

  prioritySubjects.slice(0, 6).forEach((subject) => {
    priorityLevels.forEach((level) => {
      if (level) {
        pages.push(tutorRouteTemplate({ subject, level, path: `/tutors/${subject.slug}/${level.slug}` }));
        pages.push(tutorRouteTemplate({ subject, level, onlineOnly: true, path: `/online-tutors/${subject.slug}/${level.slug}` }));
      }
    });
  });

  return dedupeSeoPages([...priorityTutorSubjectPages(), ...kentMedwayPriorityPages(), ...pages]);
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
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description
    }
  };
}

function dedupeSeoPages(pages: SeoPage[]) {
  return Array.from(new Map(pages.map((page) => [page.path, page])).values());
}

function ensureMinimumSeoLinks(pages: SeoPage[]) {
  return pages.map((page) => {
    const links = Array.from(new Map([...(page.links ?? []), ...nationalSeoLinks].map((link) => [link.href, link])).values());
    return links.length >= 5 ? { ...page, links } : page;
  });
}

function kentMedwayPriorityPages() {
  const locationSlugs = [
    "kent",
    "medway",
    "chatham",
    "rochester",
    "gillingham",
    "rainham",
    "strood",
    "walderslade",
    "lordswood",
    "hempstead",
    "maidstone",
    "sittingbourne",
    "gravesend",
    "dartford",
    "tonbridge",
    "tunbridge-wells",
    "sevenoaks",
    "ashford",
    "canterbury",
    "folkestone",
    "dover",
    "whitstable",
    "herne-bay",
    "faversham",
    "swanley"
  ];
  const elevenPlusLocations = [
    "kent",
    "medway",
    "chatham",
    "rochester",
    "gillingham",
    "rainham",
    "strood",
    "walderslade",
    "maidstone",
    "dartford",
    "gravesend",
    "sevenoaks",
    "tonbridge",
    "tunbridge-wells"
  ];
  const gcseMathsLocations = ["kent", "medway", "chatham", "rochester", "gillingham", "rainham", "walderslade"];
  const gcseEnglishLocations = ["kent", "medway", "chatham", "rochester", "gillingham"];
  const gcseScienceLocations = ["kent", "medway", "chatham", "rochester", "gillingham"];

  const pages: SeoPage[] = [];
  locationSlugs.forEach((locationSlug) => {
    const location = findSeoLocation(locationSlug);
    if (location) pages.push(tutorRouteTemplate({ location, path: `/tutors/${location.slug}` }));
  });

  addLocationSubjectPages(pages, elevenPlusLocations, "11-plus");
  addLocationSubjectPages(pages, gcseMathsLocations, "gcse-maths");
  addLocationSubjectPages(pages, gcseEnglishLocations, "gcse-english");
  addLocationSubjectPages(pages, gcseScienceLocations, "gcse-science");

  return pages;
}

function addLocationSubjectPages(pages: SeoPage[], locationSlugs: string[], subjectSlug: string) {
  const subject = findSeoSubject(subjectSlug);
  if (!subject) return;
  locationSlugs.forEach((locationSlug) => {
    const location = findSeoLocation(locationSlug);
    if (location) pages.push(tutorRouteTemplate({ location, subject, path: `/tutors/${location.slug}/${subject.slug}` }));
  });
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

function levelSubjectPage(slug: string, level: string, title: string): SeoPage {
  return {
    path: `/${slug}`,
    title: `${title} | TuitionList`,
    description: `Find ${level.toLowerCase()} tutors and tuition providers across the UK on TuitionList.`,
    h1: title,
    intro: `Search for independent tutors, teachers, and tuition providers offering ${level.toLowerCase()} support across the UK.`,
    sections: [
      {
        heading: `${level} tutor search`,
        body:
          "Use TuitionList to compare published tutor profiles by subject, location, online or in-person availability, rate, and experience."
      },
      {
        heading: "Ask about suitability",
        body:
          "Families should ask about relevant experience, lesson approach, safeguarding arrangements, qualifications, references, and any checks or evidence that matter for their situation."
      }
    ],
    links: [
      { href: `/find-a-tutor?level=${encodeURIComponent(level)}`, label: `Search ${level} tutors` },
      { href: "/subjects", label: "Subjects" },
      { href: "/locations", label: "Locations" },
      { href: "/guides/how-to-choose-a-tutor", label: "How to choose a tutor" }
    ]
  };
}

function levelSubjectSpecificPage(slug: string, level: string, subject: string, title: string): SeoPage {
  return {
    path: `/${slug}`,
    title: `${title} | TuitionList`,
    description: `Find ${title.toLowerCase()} across the UK on TuitionList. Search by location, online availability, rate, and profile information.`,
    h1: title,
    intro: `Search for independent tutors, teachers, and tuition providers offering ${level} ${subject.toLowerCase()} support across the UK.`,
    sections: [
      {
        heading: `${level} ${subject} tutor search`,
        body:
          "Compare published profiles by subject, level, location, online or in-person availability, hourly rate, experience, and any self-declared or admin-seen profile labels."
      },
      {
        heading: "Ask about the learner's needs",
        body:
          "Before arranging tuition, ask about the tutor's experience with the relevant year group, exam board or curriculum, lesson style, resources, homework, progress updates, and safeguarding arrangements."
      },
      {
        heading: "Directory-only reminder",
        body:
          "TuitionList does not recommend or guarantee tutors. Families should make their own checks before arranging tuition."
      }
    ],
    links: [
      { href: `/find-a-tutor?subject=${encodeURIComponent(subject)}&level=${encodeURIComponent(level)}`, label: `Search ${level} ${subject} tutors` },
      { href: `/${slugifySeo(subject)}-tutors`, label: `${subject} tutors` },
      { href: `/${slugifySeo(level)}-tutors`, label: `${level} tutors` },
      { href: "/locations", label: "Browse locations" },
      { href: "/guides/how-to-choose-a-tutor", label: "How to choose a tutor" }
    ]
  };
}

function examBoardPage(slug: string, name: string): SeoPage {
  return {
    path: `/exam-boards/${slug}`,
    title: `${name} Tutors | TuitionList`,
    description: `Search tutors who may support ${name} exam preparation across the UK on TuitionList.`,
    h1: `${name} tutors`,
    intro: `Find tutors and tuition providers who may support ${name} exam preparation across the UK.`,
    sections: [
      {
        heading: "Ask about specification experience",
        body:
          "Before arranging tuition, ask whether the tutor has experience with the relevant subject specification, assessment format, past papers, marking style, and exam level."
      },
      {
        heading: "Independent tutor profiles",
        body:
          "Exam board information on profiles is supplied by tutors or tuition providers. TuitionList is not affiliated with exam boards and does not guarantee tutor suitability."
      }
    ],
    links: [
      { href: "/exam-boards", label: "All exam boards" },
      { href: "/gcse-tutors", label: "GCSE tutors" },
      { href: "/a-level-tutors", label: "A-Level tutors" },
      { href: "/find-a-tutor", label: "Find a tutor" }
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
