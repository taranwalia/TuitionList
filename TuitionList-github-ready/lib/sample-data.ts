import type { Enquiry, TutorProfile } from "@/types/domain";

export const sampleTutors: TutorProfile[] = [
  {
    id: "sample-1",
    display_name: "Jane Smith",
    slug: "jane-smith-gcse-maths-london",
    town: "London",
    county: "Greater London",
    postcode_area: "SW1",
    online_available: true,
    in_person_available: true,
    willing_to_travel: true,
    min_rate: 32,
    max_rate: 45,
    short_bio: "Qualified maths teacher supporting GCSE, IGCSE and A-Level students across London and online.",
    long_bio:
      "I help students build confidence in maths through calm, structured lessons that focus on understanding as well as exam technique.",
    experience: "12 years teaching in UK secondary schools, including GCSE higher and foundation groups.",
    profile_photo_url: null,
    website_url: "https://example.com",
    linkedin_url: null,
    phone: null,
    show_phone: false,
    show_email: false,
    show_whatsapp: false,
    status: "published",
    approved_at: "2026-04-18T10:00:00.000Z",
    subjects: ["Maths"],
    levels: ["GCSE", "IGCSE", "A-Level"],
    checks: {
      id_seen: true,
      dbs_self_declared: true,
      dbs_seen: true,
      dbs_date: "2025-09-01",
      qualification_seen: true,
      reference_received: true,
      insurance_self_declared: true,
      insurance_confirmed: false,
      safeguarding_self_declared: true,
      safeguarding_seen: true,
      safeguarding_date: "2025-10-12"
    },
    qualifications: [
      {
        id: "q1",
        title: "PGCE Secondary Mathematics",
        institution: "University of Leeds",
        year: "2013",
        description: "Qualified Teacher Status route.",
        admin_checked: true
      }
    ],
    created_at: "2026-04-18T10:00:00.000Z"
  },
  {
    id: "sample-2",
    display_name: "Ahmed Khan",
    slug: "ahmed-khan-11-plus-manchester",
    town: "Manchester",
    county: "Greater Manchester",
    postcode_area: "M1",
    online_available: true,
    in_person_available: false,
    willing_to_travel: false,
    min_rate: 25,
    max_rate: 35,
    short_bio: "Online 11 Plus tutor covering verbal reasoning, non-verbal reasoning, English and maths.",
    long_bio:
      "My lessons are planned around local grammar school entrance preparation, with careful attention to pace and parent feedback.",
    experience: "Eight years of small-group and one-to-one 11 Plus tuition.",
    profile_photo_url: null,
    website_url: null,
    linkedin_url: null,
    phone: null,
    show_phone: false,
    show_email: false,
    show_whatsapp: false,
    status: "published",
    approved_at: "2026-04-20T10:00:00.000Z",
    subjects: ["11 Plus", "Verbal Reasoning", "Non-Verbal Reasoning", "English", "Maths"],
    levels: ["11 Plus", "KS2"],
    checks: {
      id_seen: false,
      dbs_self_declared: true,
      dbs_seen: false,
      dbs_date: "2025-05-20",
      qualification_seen: false,
      reference_received: false,
      insurance_self_declared: true,
      insurance_confirmed: false,
      safeguarding_self_declared: true,
      safeguarding_seen: false,
      safeguarding_date: null
    },
    qualifications: [],
    created_at: "2026-04-20T10:00:00.000Z"
  },
  {
    id: "sample-3",
    display_name: "Priya Patel",
    slug: "priya-patel-science-gcse-online",
    town: "Birmingham",
    county: "West Midlands",
    postcode_area: "B13",
    online_available: true,
    in_person_available: true,
    willing_to_travel: false,
    min_rate: 28,
    max_rate: 40,
    short_bio: "Science specialist teaching biology, chemistry and physics from KS3 to GCSE.",
    long_bio:
      "I focus on clear explanations, retrieval practice and exam-style questions so students can see progress lesson by lesson.",
    experience: "Former science department lead with experience across AQA, Edexcel and OCR.",
    profile_photo_url: null,
    website_url: null,
    linkedin_url: null,
    phone: null,
    show_phone: false,
    show_email: false,
    show_whatsapp: false,
    status: "published",
    approved_at: "2026-04-22T10:00:00.000Z",
    subjects: ["Science", "Biology", "Chemistry", "Physics"],
    levels: ["KS3", "GCSE"],
    checks: {
      id_seen: true,
      dbs_self_declared: true,
      dbs_seen: true,
      dbs_date: "2026-01-10",
      qualification_seen: true,
      reference_received: false,
      insurance_self_declared: false,
      insurance_confirmed: false,
      safeguarding_self_declared: true,
      safeguarding_seen: true,
      safeguarding_date: "2026-01-15"
    },
    qualifications: [
      {
        id: "q2",
        title: "BSc Biology",
        institution: "University of Birmingham",
        year: "2011",
        description: null,
        admin_checked: true
      }
    ],
    created_at: "2026-04-22T10:00:00.000Z"
  }
];

export const sampleEnquiries: Enquiry[] = [
  {
    id: "enq-1",
    tutor_id: "sample-1",
    parent_name: "Sarah Wilson",
    parent_email: "sarah@example.com",
    parent_phone: "07123456789",
    student_year_group: "Year 10",
    subject: "Maths",
    level: "GCSE",
    tuition_preference: "both",
    location: "London",
    message: "We are looking for weekly GCSE maths support from June.",
    consent_given: true,
    status: "new",
    created_at: "2026-05-01T09:30:00.000Z"
  }
];
