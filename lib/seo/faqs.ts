export type SeoFaq = {
  question: string;
  answer: string;
};

export const coreSeoFaqs: SeoFaq[] = [
  {
    question: "Is TuitionList free to use?",
    answer:
      "Yes. Basic tutor profiles are free and parents, carers, and students can send enquiries for free. TuitionList does not charge lesson commission or parent finder fees."
  },
  {
    question: "Is TuitionList a tutoring agency?",
    answer:
      "No. TuitionList is an online directory only. Tutors and tuition providers listed on TuitionList are independent providers and are not employed, managed, supervised, or endorsed by TuitionList."
  },
  {
    question: "Does TuitionList check every tutor?",
    answer:
      "No. Where possible, TuitionList may review certain evidence provided by tutors. Badges, blue ticks, and profile labels show what has been self-declared, seen, or confirmed, but they are not a recommendation or guarantee."
  },
  {
    question: "What should parents check before arranging tuition?",
    answer:
      "Parents, carers, and students should make their own checks, including identity, qualifications, references, DBS certificate details where relevant, safeguarding arrangements, lesson location, online safety, and suitability."
  }
];

export const tutorSignupFaqs: SeoFaq[] = [
  {
    question: "Can tutors create a free listing?",
    answer:
      "Yes. Tutors, teachers, and tuition providers can create a free profile and submit it for admin review before it appears publicly."
  },
  {
    question: "Does TuitionList take commission from lessons?",
    answer:
      "No. TuitionList does not take commission from tutor lesson fees and does not process lesson payments."
  }
];

export function subjectTutorFaqs(subject: string): SeoFaq[] {
  const subjectLower = subject.toLowerCase();
  return [
    {
      question: `How do I find a ${subject} tutor near me?`,
      answer: `Use TuitionList to search for ${subjectLower} tutors by location, level, online availability and tutor profile details.`
    },
    {
      question: `Can I find online ${subject} tutors?`,
      answer:
        "Yes. Many tutors offer online lessons, so you can search beyond your local area and find a tutor who fits your subject and level."
    },
    {
      question: `How much does a ${subject} tutor cost?`,
      answer:
        "Tutor prices vary depending on experience, subject, level and location. Each tutor sets their own rates, which should be shown on their profile."
    },
    {
      question: `What should I look for in a ${subject} tutor?`,
      answer:
        "Look for relevant subject experience, clear profile information, reviews where available, DBS or background-check information, and a teaching style that suits the learner."
    },
    {
      question: "Are tutors on TuitionList employed by TuitionList?",
      answer:
        "No. TuitionList is a directory that helps parents and students discover independent tutors. Arrangements are made directly with the tutor."
    },
    {
      question: "Is TuitionList free?",
      answer: "TuitionList is designed as a free UK tutor directory for parents, students and tutors."
    }
  ];
}

export function levelTutorFaqs(level: string): SeoFaq[] {
  return [
    {
      question: `How do I find a ${level} tutor near me?`,
      answer: `Use TuitionList to search for ${level} tutors by subject, location, online availability and tutor profile details.`
    },
    {
      question: `Can I find online ${level} tutors?`,
      answer:
        "Yes. Many tutors offer online lessons, so you can search beyond your local area and find a tutor who fits the learner's subject and level."
    },
    {
      question: `How much does a ${level} tutor cost?`,
      answer:
        "Tutor prices vary depending on experience, subject, level and location. Each tutor sets their own rates, which should be shown on their profile."
    },
    ...coreSeoFaqs.slice(1, 4)
  ];
}
