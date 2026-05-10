import { coreSeoFaqs } from "@/lib/seo/faqs";
import type { SeoPage } from "@/lib/seo-pages";

const trustLinks = [
  { href: "/find-a-tutor", label: "Find a tutor" },
  { href: "/dbs-checked-tutors", label: "DBS checked tutors" },
  { href: "/profile-checks", label: "Profile checks explained" },
  { href: "/qualification-checks", label: "Qualification checks" },
  { href: "/safeguarding", label: "Safeguarding information" },
  { href: "/guides/how-to-check-a-tutor-before-booking", label: "How to check a tutor" },
  { href: "/guides/what-to-ask-a-tutor", label: "Questions to ask a tutor" }
];

const directoryReminder =
  "TuitionList is an online directory only. Tutors and tuition providers are independent providers, and parents, carers, and students remain responsible for making their own checks before arranging tuition.";

type TrustPageSeed = {
  path: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  focus: string;
  checklist: string;
};

const trustPageSeeds: TrustPageSeed[] = [
  {
    path: "/dbs-verified-tutors",
    title: "DBS Tutor Checks Explained | TuitionList",
    description:
      "Learn how DBS information can appear on tutor profiles, including self-declared DBS details and DBS certificate details seen by TuitionList.",
    h1: "DBS tutor checks explained",
    intro:
      "Some families search for DBS verified tutors. TuitionList uses more careful wording: profile labels may show DBS self-declared or DBS certificate details seen by TuitionList where evidence has been reviewed.",
    focus:
      "A DBS label does not mean TuitionList recommends, guarantees, supervises, or accepts responsibility for a tutor. It simply helps explain what information has been self-declared or seen.",
    checklist:
      "Parents and carers should ask about the type of DBS certificate, the certificate date, whether the tutor uses the DBS Update Service, lesson arrangements, supervision, references, and suitability for the learner."
  },
  {
    path: "/identity-verified-tutors",
    title: "Tutor Identity Checks Explained | TuitionList",
    description:
      "Understand how identity check labels work on TuitionList tutor profiles and what parents should still check before arranging tuition.",
    h1: "Tutor identity checks explained",
    intro:
      "TuitionList may show profile labels where identity evidence has been marked as seen by an admin. This is intended to help families understand what evidence has been reviewed.",
    focus:
      "An identity check label does not mean every other check has been completed and does not mean TuitionList endorses the tutor.",
    checklist:
      "Before arranging tuition, parents and carers should confirm who will deliver lessons, check identity where relevant, ask about experience, and consider whether the tutor is suitable for the learner."
  },
  {
    path: "/safe-tutor-directory",
    title: "Safer Tutor Search Guide | TuitionList",
    description:
      "A plain English guide to using TuitionList for safer tutor discovery while remembering parents and carers must make their own checks.",
    h1: "Safer tutor search guide",
    intro:
      "Families understandably want to find a safe tutor. TuitionList cannot guarantee tutor safety, but it can help families compare profile information, badges, and enquiry details in one place.",
    focus:
      "Badges, blue ticks, and profile labels are information signals only. They show what has been self-declared, seen, or confirmed by TuitionList where possible.",
    checklist:
      "Ask about identity, DBS certificate details where relevant, qualifications, references, safeguarding training, online safety arrangements, lesson location, supervision, and communication expectations."
  },
  {
    path: "/find-a-safe-tutor",
    title: "How to Check a Tutor Before Booking | TuitionList",
    description:
      "Use this parent guide to understand what to ask before hiring a private tutor, including identity, DBS, qualifications, references, and safeguarding arrangements.",
    h1: "How to check a tutor before booking",
    intro:
      "No directory can make every decision for a family. TuitionList helps parents, carers, and students find tutors, then encourages them to make their own checks before arranging tuition.",
    focus:
      "A useful tutor profile should help you ask better questions about experience, lesson style, rates, availability, checks, and suitability.",
    checklist:
      "Consider asking for evidence of identity, qualifications, DBS details where relevant, references, insurance, safeguarding training, online safety measures, and how progress will be communicated."
  },
  {
    path: "/tutor-dbs-check",
    title: "Tutor DBS Checks Guide | TuitionList",
    description:
      "Learn what DBS checks can mean for private tutors and what parents should ask before arranging tuition.",
    h1: "Tutor DBS checks guide",
    intro:
      "DBS eligibility can depend on the nature, frequency, location, and supervision of tutoring work. TuitionList does not decide whether a specific tutor legally requires a particular DBS check.",
    focus:
      "Tutor profiles may include DBS self-declared information or DBS certificate details seen by TuitionList where evidence has been reviewed.",
    checklist:
      "Parents and tutors should seek appropriate guidance where unsure, and parents should ask to understand the type of DBS check, date, Update Service status, and lesson arrangements."
  },
  {
    path: "/enhanced-dbs-tutor",
    title: "Enhanced DBS for Tutors Explained | TuitionList",
    description:
      "Understand enhanced DBS wording on tutor profiles and what parents should check before arranging private tuition.",
    h1: "Enhanced DBS for tutors explained",
    intro:
      "Some tutors may state that they hold an enhanced DBS certificate. TuitionList may show this as self-declared or, where evidence has been reviewed, as DBS seen by TuitionList.",
    focus:
      "An enhanced DBS label is not a safety guarantee and does not replace parent checks, references, safeguarding questions, and suitability decisions.",
    checklist:
      "Ask about the certificate date, workforce category, Update Service status where applicable, whether the certificate is relevant to the tutoring arrangement, and what safeguarding arrangements will be in place."
  },
  {
    path: "/dbs-update-service-tutor",
    title: "DBS Update Service for Tutors | TuitionList",
    description:
      "Learn what parents may wish to ask about the DBS Update Service when comparing private tutor profiles.",
    h1: "DBS Update Service for tutors",
    intro:
      "The DBS Update Service can help keep certain DBS certificate information current where it applies. Tutors may mention this in their profile or during enquiries.",
    focus:
      "TuitionList may display DBS-related labels, but these labels do not mean TuitionList recommends or guarantees a tutor.",
    checklist:
      "Parents can ask whether the tutor subscribes to the Update Service, whether the DBS certificate is relevant to the role, and whether they can provide suitable evidence before tuition starts."
  },
  {
    path: "/tutor-background-check",
    title: "Tutor Background Checks Explained | TuitionList",
    description:
      "Understand background-check style labels on TuitionList and how families can make their own checks before arranging tuition.",
    h1: "Tutor background checks explained",
    intro:
      "Background-check wording can mean different things on different websites. TuitionList uses specific labels such as ID seen, DBS seen, qualification seen, reference received, insurance confirmed, and safeguarding training seen.",
    focus:
      "A blue tick means one or more profile checks have been marked as seen by TuitionList. It does not mean every possible check has been completed.",
    checklist:
      "Read the individual badges, ask follow-up questions, request references where appropriate, and consider whether the tutor's experience and arrangements match the learner's needs."
  },
  {
    path: "/private-tutor-safety",
    title: "Private Tutor Safety Guide | TuitionList",
    description:
      "A parent-friendly guide to safety questions, checks, and arrangements before booking a private tutor.",
    h1: "Private tutor safety guide",
    intro:
      "Private tuition arrangements are made directly between families and tutors. TuitionList helps with discovery, but families should make their own checks before lessons begin.",
    focus:
      "Safety considerations may include identity, DBS details where relevant, references, safeguarding arrangements, lesson setting, online platform choice, supervision, and communication boundaries.",
    checklist:
      "Agree lesson location, who will be present, how online sessions will be supervised, how concerns can be raised, how payments are handled directly, and what records or updates will be shared."
  },
  {
    path: "/child-safeguarding-tutor",
    title: "Child Safeguarding and Private Tutors | TuitionList",
    description:
      "Guidance for parents and carers considering safeguarding questions before arranging private tuition for a child or young person.",
    h1: "Child safeguarding and private tutors",
    intro:
      "Where tuition is for a child or young person, parents and carers should think carefully about safeguarding arrangements before lessons start.",
    focus:
      "TuitionList does not supervise lessons or guarantee safeguarding suitability. Profile labels can help show what information has been provided or seen, but they are not endorsements.",
    checklist:
      "Ask about safeguarding training, DBS details where relevant, lesson supervision, online safety, communication boundaries, transport or travel arrangements, and what happens if a concern is raised."
  },
  {
    path: "/safe-online-tutoring",
    title: "Online Tutoring Safety Guide | TuitionList",
    description:
      "A guide to online tutoring safety questions for parents, carers, students, and tutors using TuitionList.",
    h1: "Online tutoring safety guide",
    intro:
      "Online tuition can be flexible and convenient, but families should still agree clear safety and supervision arrangements before lessons begin.",
    focus:
      "TuitionList does not host video lessons or monitor tuition sessions. Parents, carers, students, and tutors agree online lesson arrangements directly.",
    checklist:
      "Consider the platform used, whether sessions are supervised, communication rules outside lessons, screen sharing, recording policies, safeguarding concerns, and how progress will be reported."
  },
  {
    path: "/parent-guide-to-hiring-a-tutor",
    title: "Parent Guide to Hiring a Tutor | TuitionList",
    description:
      "A practical UK parent guide to finding, comparing, checking, and contacting private tutors through TuitionList.",
    h1: "Parent guide to hiring a tutor",
    intro:
      "Hiring a tutor involves comparing teaching experience, subject knowledge, lesson style, cost, availability, checks, and whether the tutor is a good fit for the learner.",
    focus:
      "TuitionList gives parents, carers, and students a way to discover independent tutors and send enquiries directly. It does not choose or recommend tutors for families.",
    checklist:
      "Shortlist tutors, read profile details, ask questions, request evidence where relevant, agree lesson arrangements, and review whether the tuition is working after the first few sessions."
  },
  {
    path: "/check-tutor-qualifications",
    title: "How to Check Tutor Qualifications | TuitionList",
    description:
      "Learn how qualification labels work on TuitionList and what parents may wish to ask before arranging tuition.",
    h1: "How to check tutor qualifications",
    intro:
      "Tutor profiles may include self-declared qualifications or qualification details marked as seen by TuitionList where evidence has been reviewed.",
    focus:
      "A qualification label does not guarantee teaching quality, suitability, or results. It simply helps families understand what evidence has been provided or seen.",
    checklist:
      "Ask what qualification was awarded, the institution, subject, date, whether it is relevant to the tuition offered, and whether the tutor has experience teaching the learner's level."
  },
  {
    path: "/qualified-tutors",
    title: "Qualified Tutors UK | TuitionList",
    description:
      "Find tutor profiles that may include qualifications, teaching experience, QTS details, and qualification labels where evidence has been reviewed.",
    h1: "Qualified tutors UK",
    intro:
      "Many families look for qualified tutors. TuitionList profiles can show qualifications and teaching background where tutors have provided that information.",
    focus:
      "Qualification details may be self-declared unless a profile label says qualification evidence has been seen by TuitionList. Families should still ask their own questions.",
    checklist:
      "Consider qualifications, teaching experience, subject knowledge, exam board familiarity, lesson approach, references, safeguarding arrangements, and whether the tutor is suitable for the learner."
  },
  {
    path: "/qts-tutors",
    title: "QTS Tutors UK | TuitionList",
    description:
      "Search independent tutors who may display QTS or teaching qualification information on their TuitionList profiles.",
    h1: "QTS tutors UK",
    intro:
      "Some tutors are qualified teachers or may hold QTS. Tutor profiles can include teaching qualification details where the tutor has provided them.",
    focus:
      "QTS or teaching qualification information should be checked by parents and carers before arranging tuition unless an individual profile label states that evidence has been seen by TuitionList.",
    checklist:
      "Ask about current or previous teaching roles, curriculum experience, subject specialism, exam board experience, safeguarding training, references, and availability."
  },
  {
    path: "/teacher-tutors",
    title: "Teacher Tutors UK | TuitionList",
    description:
      "Find independent tutors who may also be teachers, former teachers, or education professionals across the UK.",
    h1: "Teacher tutors UK",
    intro:
      "Some independent tutors are current teachers, former teachers, or education professionals. TuitionList profiles can help families compare experience and subjects taught.",
    focus:
      "Teaching background is useful context, but it does not remove the need for parent checks or guarantee tutor suitability.",
    checklist:
      "Ask about teaching experience, year groups, curriculum knowledge, exam boards, safeguarding arrangements, references, and how the tutor adapts lessons for individual learners."
  },
  {
    path: "/experienced-tutors",
    title: "Experienced Tutors UK | TuitionList",
    description:
      "Search tutor profiles by experience, subject, level, location, online availability, and rate on TuitionList.",
    h1: "Experienced tutors UK",
    intro:
      "Tutor experience can include classroom teaching, private tuition, exam preparation, SEN support, adult learning, or specialist subject knowledge.",
    focus:
      "Experience is self-declared unless supported by profile labels or evidence reviewed by TuitionList. Families should ask questions that match their learner's needs.",
    checklist:
      "Ask how long the tutor has taught, which levels they support, what outcomes they can evidence, how they plan lessons, and how they communicate progress."
  },
  {
    path: "/tutor-references",
    title: "Tutor References Guide | TuitionList",
    description:
      "Learn why tutor references can matter and what parents may wish to ask before arranging private tuition.",
    h1: "Tutor references guide",
    intro:
      "References can help families understand a tutor's experience, reliability, and working style. Some TuitionList profiles may show a reference received label where applicable.",
    focus:
      "A reference label does not mean TuitionList recommends or guarantees a tutor. It means a reference has been recorded or marked as received where the profile data supports that.",
    checklist:
      "Ask whether references are available, who supplied them, whether they relate to similar tuition work, and whether you can speak to or review references before arranging lessons."
  },
  {
    path: "/tutor-reviews",
    title: "Tutor Reviews and References | TuitionList",
    description:
      "Understand how TuitionList treats tutor reviews, references, and profile information when families compare private tutors.",
    h1: "Tutor reviews and references",
    intro:
      "Tutor reviews are not currently part of TuitionList. Families should not assume that a tutor is recommended because they appear in the directory.",
    focus:
      "Instead, parents, carers, and students should read profile information, ask for references where appropriate, and make their own checks before arranging tuition.",
    checklist:
      "Ask about relevant experience, references, qualifications, DBS details where relevant, safeguarding arrangements, lesson style, fees, availability, and cancellation terms."
  },
  {
    path: "/safeguarding-for-tutors",
    title: "Safeguarding for Private Tutors | TuitionList",
    description:
      "Safeguarding guidance prompts for private tutors and tuition providers creating profiles on TuitionList.",
    h1: "Safeguarding for private tutors",
    intro:
      "Tutors and tuition providers should think carefully about safeguarding, communication, lesson arrangements, evidence, and profile accuracy when offering tuition.",
    focus:
      "TuitionList may review some evidence where possible, but tutors remain responsible for providing accurate, lawful, current, and not misleading information.",
    checklist:
      "Consider safeguarding training, DBS eligibility, insurance, references, online safety, communication boundaries, parent expectations, and how concerns will be handled."
  },
  {
    path: "/private-tutor-safeguarding",
    title: "Private Tutor Safeguarding Guide | TuitionList",
    description:
      "A plain English guide to safeguarding questions for private tuition arrangements in the UK.",
    h1: "Private tutor safeguarding guide",
    intro:
      "Private tutoring can happen online, at home, in a public setting, or through a tuition provider. Safeguarding arrangements should be discussed before lessons begin.",
    focus:
      "TuitionList does not supervise lessons or guarantee safeguarding arrangements. It provides directory profiles and enquiry forms.",
    checklist:
      "Families should ask who will be present, how communication works, how concerns are raised, whether safeguarding training has been completed, and what evidence the tutor can provide."
  }
];

export const trustSeoPages: SeoPage[] = trustPageSeeds.map((page) => ({
  path: page.path,
  title: page.title,
  description: page.description,
  h1: page.h1,
  intro: page.intro,
  sections: [
    {
      heading: "How TuitionList uses profile labels",
      body: page.focus
    },
    {
      heading: "What families should check",
      body: page.checklist
    },
    {
      heading: "Directory-only reminder",
      body: directoryReminder
    }
  ],
  faqs: coreSeoFaqs,
  links: trustLinks
}));
