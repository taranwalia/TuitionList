export const SUBJECTS = [
  "Maths",
  "English",
  "Science",
  "Biology",
  "Chemistry",
  "Physics",
  "11 Plus",
  "Verbal Reasoning",
  "Non-Verbal Reasoning",
  "Reading",
  "Writing",
  "Computer Science",
  "History",
  "Geography",
  "French",
  "Spanish",
  "German",
  "Business Studies",
  "Economics",
  "Psychology",
  "Sociology",
  "Religious Studies",
  "Art",
  "Music",
  "Primary",
  "SATs",
  "GCSE",
  "A-Level"
] as const;

export const LEVELS = [
  "EYFS",
  "KS1",
  "KS2",
  "11 Plus",
  "SATs",
  "KS3",
  "GCSE",
  "IGCSE",
  "A-Level",
  "University",
  "Adult learning",
  "Functional Skills",
  "SEN support"
] as const;

export const DIRECTORY_DISCLAIMER =
  "TuitionList is a directory only. Tutors and tuition providers listed on TuitionList are independent and are not employed by TuitionList. We do not guarantee the quality, suitability, availability, qualifications, DBS status, safeguarding arrangements, or outcomes of any tutor. Parents, carers, and students are responsible for carrying out their own checks before arranging tuition.";

export const PROFILE_DISCLAIMER =
  "TuitionList is a directory only. Tutors and tuition providers listed on TuitionList are independent and are not employed by TuitionList. We do not guarantee the quality, suitability, availability, qualifications, DBS status, safeguarding arrangements, or outcomes of any tutor. Parents, carers, and students are responsible for carrying out their own checks before arranging tuition.";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
