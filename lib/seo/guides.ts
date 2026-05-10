import { coreSeoFaqs, tutorSignupFaqs } from "@/lib/seo/faqs";
import type { SeoPage } from "@/lib/seo-pages";

type GuideAudience = "parents" | "tutors" | "checks" | "exams" | "costs";

type GuideSeed = {
  title: string;
  slug: string;
  audience: GuideAudience;
};

const guideSeeds: GuideSeed[] = [
  { title: "How to find a good private tutor", slug: "how-to-find-a-good-private-tutor", audience: "parents" },
  { title: "How to choose a tutor for your child", slug: "how-to-choose-a-tutor-for-your-child", audience: "parents" },
  { title: "How much does a private tutor cost in the UK?", slug: "how-much-does-a-private-tutor-cost-in-the-uk", audience: "costs" },
  { title: "How much should I pay for a tutor?", slug: "how-much-should-i-pay-for-a-tutor", audience: "costs" },
  { title: "How much does GCSE tutoring cost?", slug: "how-much-does-gcse-tutoring-cost", audience: "costs" },
  { title: "How much does 11 Plus tutoring cost?", slug: "how-much-does-11-plus-tutoring-cost", audience: "costs" },
  { title: "How much does online tutoring cost?", slug: "how-much-does-online-tutoring-cost", audience: "costs" },
  { title: "How to find a Maths tutor", slug: "how-to-find-a-maths-tutor", audience: "parents" },
  { title: "How to find an English tutor", slug: "how-to-find-an-english-tutor", audience: "parents" },
  { title: "How to find a Science tutor", slug: "how-to-find-a-science-tutor", audience: "parents" },
  { title: "How to find an 11 Plus tutor", slug: "how-to-find-an-11-plus-tutor", audience: "parents" },
  { title: "How to find a GCSE tutor", slug: "how-to-find-a-gcse-tutor", audience: "parents" },
  { title: "How to find an A-Level tutor", slug: "how-to-find-an-a-level-tutor", audience: "parents" },
  { title: "How to find a tutor near me", slug: "how-to-find-a-tutor-near-me", audience: "parents" },
  { title: "Best tutor websites UK", slug: "best-tutor-websites-uk", audience: "parents" },
  { title: "Best free tutor websites UK", slug: "best-free-tutor-websites-uk", audience: "parents" },
  { title: "Free tutor directory UK", slug: "free-tutor-directory-uk", audience: "parents" },
  { title: "How to advertise as a tutor for free", slug: "how-to-advertise-as-a-tutor-for-free", audience: "tutors" },
  { title: "How to get more tutoring students", slug: "how-to-get-more-tutoring-students", audience: "tutors" },
  { title: "How to become a private tutor in the UK", slug: "how-to-become-a-private-tutor-in-the-uk", audience: "tutors" },
  { title: "Do private tutors need a DBS check?", slug: "do-private-tutors-need-a-dbs-check", audience: "checks" },
  { title: "Can you tutor without a teaching qualification?", slug: "can-you-tutor-without-a-teaching-qualification", audience: "checks" },
  { title: "Do tutors need to be qualified?", slug: "do-tutors-need-to-be-qualified", audience: "checks" },
  { title: "What makes a good tutor?", slug: "what-makes-a-good-tutor", audience: "parents" },
  { title: "Questions to ask a private tutor", slug: "questions-to-ask-a-private-tutor", audience: "parents" },
  { title: "Private tutor vs tuition centre", slug: "private-tutor-vs-tuition-centre", audience: "parents" },
  { title: "Online tutoring vs in-person tutoring", slug: "online-tutoring-vs-in-person-tutoring", audience: "parents" },
  { title: "Is online tutoring effective?", slug: "is-online-tutoring-effective", audience: "parents" },
  { title: "How often should my child have tutoring?", slug: "how-often-should-my-child-have-tutoring", audience: "parents" },
  { title: "How long should tutoring sessions be?", slug: "how-long-should-tutoring-sessions-be", audience: "parents" },
  { title: "When should my child start 11 Plus tutoring?", slug: "when-should-my-child-start-11-plus-tutoring", audience: "exams" },
  { title: "When should my child start GCSE tutoring?", slug: "when-should-my-child-start-gcse-tutoring", audience: "exams" },
  { title: "How to prepare for GCSE Maths", slug: "how-to-prepare-for-gcse-maths", audience: "exams" },
  { title: "How to prepare for GCSE English", slug: "how-to-prepare-for-gcse-english", audience: "exams" },
  { title: "How to prepare for GCSE Science", slug: "how-to-prepare-for-gcse-science", audience: "exams" },
  { title: "How to revise for A-Level Maths", slug: "how-to-revise-for-a-level-maths", audience: "exams" },
  { title: "How to support your child with homework", slug: "how-to-support-your-child-with-homework", audience: "parents" },
  { title: "What is the Kent Test?", slug: "what-is-the-kent-test", audience: "exams" },
  { title: "What is the Medway Test?", slug: "what-is-the-medway-test", audience: "exams" },
  { title: "Kent Test vs Medway Test", slug: "kent-test-vs-medway-test", audience: "exams" },
  { title: "GL Assessment 11 Plus explained", slug: "gl-assessment-11-plus-explained", audience: "exams" },
  { title: "CEM 11 Plus explained", slug: "cem-11-plus-explained", audience: "exams" },
  { title: "How to prepare for grammar school entrance exams", slug: "how-to-prepare-for-grammar-school-entrance-exams", audience: "exams" },
  { title: "How to choose between 11 Plus tutors", slug: "how-to-choose-between-11-plus-tutors", audience: "exams" },
  { title: "What is a DBS check for tutors?", slug: "what-is-a-dbs-check-for-tutors", audience: "checks" },
  { title: "How parents can safely choose a private tutor", slug: "how-parents-can-safely-choose-a-private-tutor", audience: "checks" },
  { title: "What should be included in a tutor profile?", slug: "what-should-be-included-in-a-tutor-profile", audience: "tutors" },
  { title: "How tutors can write a good profile bio", slug: "how-tutors-can-write-a-good-profile-bio", audience: "tutors" },
  { title: "How tutors can set their hourly rate", slug: "how-tutors-can-set-their-hourly-rate", audience: "tutors" },
  { title: "How tutors can stand out online", slug: "how-tutors-can-stand-out-online", audience: "tutors" },
  { title: "How to start tutoring as a student", slug: "how-to-start-tutoring-as-a-student", audience: "tutors" },
  { title: "How retired teachers can become private tutors", slug: "how-retired-teachers-can-become-private-tutors", audience: "tutors" },
  { title: "How teachers can earn extra income tutoring", slug: "how-teachers-can-earn-extra-income-tutoring", audience: "tutors" },
  { title: "How to become an online tutor", slug: "how-to-become-an-online-tutor", audience: "tutors" },
  { title: "How to tutor GCSE Maths", slug: "how-to-tutor-gcse-maths", audience: "tutors" },
  { title: "How to tutor GCSE English", slug: "how-to-tutor-gcse-english", audience: "tutors" },
  { title: "How to tutor 11 Plus", slug: "how-to-tutor-11-plus", audience: "tutors" },
  { title: "How to tutor online safely", slug: "how-to-tutor-online-safely", audience: "checks" },
  { title: "Safeguarding tips for private tutors", slug: "safeguarding-tips-for-private-tutors", audience: "checks" },
  { title: "GDPR for private tutors", slug: "gdpr-for-private-tutors", audience: "checks" },
  { title: "Should tutors have insurance?", slug: "should-tutors-have-insurance", audience: "checks" },
  { title: "Do tutors need to register with HMRC?", slug: "do-tutors-need-to-register-with-hmrc", audience: "checks" },
  { title: "Do tutors need an ICO registration?", slug: "do-tutors-need-an-ico-registration", audience: "checks" },
  { title: "Private tutoring laws UK", slug: "private-tutoring-laws-uk", audience: "checks" }
];

export const guideSeoPages: SeoPage[] = guideSeeds.map((guide) => guidePage(guide));

function guidePage(guide: GuideSeed): SeoPage {
  return {
    path: `/guides/${guide.slug}`,
    title: `${guide.title} | TuitionList`,
    description: `A plain English TuitionList guide: ${guide.title.toLowerCase()}. Learn what to consider before arranging or offering private tuition in the UK.`,
    h1: guide.title,
    intro: introFor(guide),
    sections: sectionsFor(guide),
    faqs: guide.audience === "tutors" ? tutorSignupFaqs : coreSeoFaqs,
    links: linksFor(guide)
  };
}

function introFor(guide: GuideSeed) {
  if (guide.audience === "tutors") {
    return `${guide.title} is a practical guide for tutors, teachers, and tuition providers who want to build a clear, honest online profile and receive enquiries directly.`;
  }
  if (guide.audience === "costs") {
    return `${guide.title} depends on subject, level, location, lesson format, experience, and what is included. TuitionList helps families compare tutor profiles and contact tutors directly.`;
  }
  if (guide.audience === "checks") {
    return `${guide.title} is an important question for private tuition. This guide explains practical considerations while keeping TuitionList's directory-only role clear.`;
  }
  if (guide.audience === "exams") {
    return `${guide.title} is a common question for families planning exam support. This guide explains what to consider when comparing tutors and tuition providers.`;
  }
  return `${guide.title} is a common question for parents, carers, and students looking for private tuition. This guide explains how to compare tutor profiles carefully.`;
}

function sectionsFor(guide: GuideSeed) {
  if (guide.audience === "tutors") {
    return [
      {
        heading: "Build a clear tutor profile",
        body:
          "A useful tutor profile should explain your subjects, levels, experience, availability, rates, online or in-person tuition options, qualifications, and contact preferences."
      },
      {
        heading: "Be accurate and transparent",
        body:
          "Tutors and tuition providers should keep profile information accurate, current, lawful, and not misleading, especially around qualifications, DBS status, insurance, safeguarding training, and rates."
      },
      {
        heading: "Free tutor visibility",
        body:
          "TuitionList lets tutors create a free profile, with no lesson commission, no parent finder fees, and no subscription charges. Profiles are reviewed before appearing publicly."
      }
    ];
  }

  if (guide.audience === "costs") {
    return [
      {
        heading: "What affects tutoring costs",
        body:
          "Rates can vary by subject, level, tutor experience, lesson length, preparation time, travel, online or in-person format, and whether tuition is one-to-one or group based."
      },
      {
        heading: "Compare the full arrangement",
        body:
          "Families should ask what is included, how cancellations work, whether resources are provided, how progress is reviewed, and how lesson payments are handled directly with the tutor."
      },
      {
        heading: "No TuitionList commission",
        body:
          "TuitionList does not take lesson commission or charge parent finder fees. Any lesson fees are agreed directly between the family and the tutor or tuition provider."
      }
    ];
  }

  if (guide.audience === "checks") {
    return [
      {
        heading: "Checks and profile labels",
        body:
          "Tutor profiles may show self-declared information and, where possible, profile labels for evidence marked as seen or confirmed by TuitionList."
      },
      {
        heading: "No guarantee or endorsement",
        body:
          "A badge, blue tick, DBS label, or profile check label does not mean TuitionList recommends, guarantees, supervises, or accepts responsibility for any tutor."
      },
      {
        heading: "Make your own enquiries",
        body:
          "Parents, carers, and students should check identity, DBS certificate details where relevant, qualifications, references, safeguarding arrangements, online safety, insurance, and suitability before arranging tuition."
      }
    ];
  }

  if (guide.audience === "exams") {
    return [
      {
        heading: "Understand the exam goal",
        body:
          "Before choosing a tutor, clarify the exam board or test, current level, target grade or outcome, timeline, subject gaps, and whether the learner needs content support, exam technique, or confidence building."
      },
      {
        heading: "Ask about relevant experience",
        body:
          "Families may wish to ask whether a tutor has experience with the relevant curriculum, exam board, entrance test format, past papers, timing, marking style, and revision planning."
      },
      {
        heading: "Balance preparation and wellbeing",
        body:
          "Exam tuition should be practical and realistic. Consider workload, school commitments, rest, feedback, and whether lessons are helping the learner make steady progress."
      }
    ];
  }

  return [
    {
      heading: "Compare tutor profiles carefully",
      body:
        "Look at subjects, levels, location, online availability, hourly rate, experience, qualifications, profile labels, and how clearly the tutor explains their approach."
    },
    {
      heading: "Ask practical questions",
      body:
        "Before arranging tuition, ask about lesson format, progress updates, resources, homework, cancellations, fees, safeguarding arrangements, and what evidence the tutor can provide."
    },
    {
      heading: "Directory-only reminder",
      body:
        "TuitionList is an online directory only. Tutors are independent providers, and parents, carers, and students remain responsible for making their own checks."
    }
  ];
}

function linksFor(guide: GuideSeed) {
  const common = [
    { href: "/find-a-tutor", label: "Find a tutor" },
    { href: "/online-tutors", label: "Online tutors" },
    { href: "/profile-checks", label: "Profile checks" },
    { href: "/safeguarding", label: "Safeguarding" },
    { href: "/guides", label: "All guides" }
  ];
  if (guide.audience === "tutors") {
    return [
      { href: "/become-a-tutor", label: "Become a tutor" },
      { href: "/free-tutor-listing-uk", label: "Free tutor listing" },
      { href: "/for-tutors", label: "For tutors" },
      ...common
    ];
  }
  if (guide.audience === "exams") {
    return [
      { href: "/tutors/11-plus", label: "11 Plus tutors" },
      { href: "/tutors/gcse", label: "GCSE tutors" },
      { href: "/tutors/a-level", label: "A-Level tutors" },
      ...common
    ];
  }
  return common;
}
