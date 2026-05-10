export type KeywordPatternGroup =
  | "subject"
  | "level"
  | "levelSubject"
  | "subjectLocation"
  | "levelLocation"
  | "levelSubjectLocation"
  | "find"
  | "comparisonIntent"
  | "affordability"
  | "checks"
  | "directory"
  | "tutorAdvertising";

export const keywordPatterns: Record<KeywordPatternGroup, string[]> = {
  subject: [
    "{subject} tutor",
    "{subject} tutors",
    "{subject} tutors near me",
    "private {subject} tutor",
    "online {subject} tutor",
    "local {subject} tutor",
    "{subject} tuition",
    "private {subject} tuition",
    "{subject} lessons",
    "{subject} teacher near me",
    "{subject} help near me"
  ],
  level: [
    "{level} tutor",
    "{level} tutors",
    "{level} tutors near me",
    "private {level} tutor",
    "online {level} tutor",
    "{level} tuition",
    "{level} revision tutor",
    "{level} exam tutor"
  ],
  levelSubject: [
    "{level} {subject} tutor",
    "{level} {subject} tutors",
    "{level} {subject} tutors near me",
    "private {level} {subject} tutor",
    "online {level} {subject} tutor",
    "local {level} {subject} tutor",
    "{level} {subject} tuition",
    "{level} {subject} revision",
    "{level} {subject} exam help",
    "{level} {subject} private lessons"
  ],
  subjectLocation: [
    "{subject} tutor in {location}",
    "{subject} tutors in {location}",
    "private {subject} tutor in {location}",
    "online {subject} tutor in {location}",
    "{subject} tuition in {location}",
    "{subject} lessons in {location}"
  ],
  levelLocation: [
    "{level} tutor in {location}",
    "{level} tutors in {location}",
    "private {level} tutor in {location}",
    "online {level} tutor in {location}",
    "{level} tuition in {location}"
  ],
  levelSubjectLocation: [
    "{level} {subject} tutor in {location}",
    "{level} {subject} tutors in {location}",
    "private {level} {subject} tutor in {location}",
    "online {level} {subject} tutor in {location}",
    "{level} {subject} tuition in {location}",
    "{level} {subject} exam tutor in {location}"
  ],
  find: [
    "find a {subject} tutor",
    "find a {level} tutor",
    "find a {level} {subject} tutor",
    "find a tutor in {location}",
    "find a {subject} tutor in {location}",
    "find a {level} tutor in {location}",
    "find a {level} {subject} tutor in {location}"
  ],
  comparisonIntent: [
    "best {subject} tutor",
    "best {subject} tutor near me",
    "best {level} {subject} tutor",
    "best {level} {subject} tutor near me",
    "best tutors in {location}",
    "best {subject} tutors in {location}",
    "best {level} {subject} tutors in {location}"
  ],
  affordability: [
    "affordable {subject} tutor",
    "affordable tutors near me",
    "affordable {level} tutor",
    "affordable {level} {subject} tutor",
    "affordable tutors in {location}"
  ],
  checks: [
    "DBS checked tutor",
    "DBS checked tutors",
    "DBS verified tutors",
    "background checked tutors",
    "verified tutors",
    "identity verified tutors",
    "safe tutor directory",
    "safeguarding for tutors",
    "private tutor safeguarding",
    "find a safe tutor",
    "how to check a tutor",
    "tutor DBS check",
    "enhanced DBS tutor",
    "DBS update service tutor",
    "tutor background check",
    "private tutor safety",
    "child safeguarding tutor",
    "safe online tutoring",
    "parent guide to hiring a tutor",
    "questions to ask a tutor",
    "check tutor qualifications",
    "qualified tutors",
    "QTS tutors",
    "teacher tutors",
    "experienced tutors",
    "tutor reviews",
    "tutor references",
    "DBS checked tutors near me",
    "DBS checked {subject} tutor",
    "DBS checked {level} tutor",
    "DBS checked {level} {subject} tutor",
    "DBS checked tutors in {location}",
    "verified tutor",
    "verified tutors near me",
    "verified {subject} tutor",
    "verified {level} tutor",
    "verified tutors in {location}"
  ],
  directory: [
    "free tutor directory",
    "free tutor directory UK",
    "free tutor listing",
    "free tutor advertising",
    "advertise as a tutor for free",
    "list as a tutor for free",
    "free profile for tutors",
    "free tutor platform",
    "no commission tutor platform",
    "no commission tutors",
    "independent tutor directory",
    "UK tutor directory"
  ],
  tutorAdvertising: [
    "advertise as a tutor",
    "advertise tutoring services",
    "advertise as a private tutor",
    "advertise tutoring online",
    "advertise tuition services",
    "free tutor advertising",
    "free tutor listing",
    "free tutor profile",
    "free tutor directory",
    "list as a tutor for free",
    "promote my tutoring services",
    "get tutoring students",
    "find tutoring students",
    "private tutor leads",
    "tutor leads UK",
    "online tutor leads",
    "how to get more tutoring clients",
    "how to advertise tutoring business",
    "best place to advertise tutoring",
    "where to advertise as a tutor",
    "tutor marketplace UK",
    "tutor platform UK",
    "no commission tutoring platform",
    "no subscription tutor platform",
    "free alternative to Superprof for tutors",
    "free alternative to Tutorful for tutors",
    "free alternative to Tutor Hunt for tutors",
    "First Tutors alternative for tutors"
  ]
};

export function renderKeywordPatterns({
  subject,
  level,
  location,
  groups,
  limit = 10
}: {
  subject?: string;
  level?: string;
  location?: string;
  groups: KeywordPatternGroup[];
  limit?: number;
}) {
  const values = groups.flatMap((group) => keywordPatterns[group]);
  return values
    .filter((pattern) => {
      if (pattern.includes("{subject}") && !subject) return false;
      if (pattern.includes("{level}") && !level) return false;
      if (pattern.includes("{location}") && !location) return false;
      return true;
    })
    .map((pattern) =>
      pattern
        .replaceAll("{subject}", subject ?? "")
        .replaceAll("{level}", level ?? "")
        .replaceAll("{location}", location ?? "")
        .replace(/\s+/g, " ")
        .trim()
    )
    .filter(Boolean)
    .slice(0, limit);
}
