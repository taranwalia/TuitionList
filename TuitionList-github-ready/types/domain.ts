export type UserRole = "tutor" | "admin";

export type TutorStatus = "draft" | "pending" | "published" | "rejected" | "suspended";

export type TuitionPreference = "online" | "in-person" | "both";

export type ContactPreference = "enquiry_only" | "email_visible" | "phone_visible" | "whatsapp_visible";

export type TutorProfile = {
  id: string;
  user_id?: string;
  display_name: string;
  slug: string;
  town: string;
  county: string;
  postcode_area: string;
  online_available: boolean;
  in_person_available: boolean;
  willing_to_travel: boolean;
  min_rate: number;
  max_rate: number;
  short_bio: string;
  long_bio: string;
  experience: string;
  profile_photo_url?: string | null;
  website_url?: string | null;
  linkedin_url?: string | null;
  phone?: string | null;
  show_phone: boolean;
  show_email: boolean;
  show_whatsapp: boolean;
  status: TutorStatus;
  rejection_reason?: string | null;
  submitted_at?: string | null;
  approved_at?: string | null;
  subjects: string[];
  levels: string[];
  checks?: TutorChecks;
  qualifications?: Qualification[];
  created_at?: string;
  is_platform_admin?: boolean;
  admin_email?: string | null;
};

export type TutorChecks = {
  id_seen: boolean;
  dbs_self_declared: boolean;
  dbs_seen: boolean;
  dbs_date?: string | null;
  qualification_seen: boolean;
  reference_received: boolean;
  insurance_self_declared: boolean;
  insurance_confirmed: boolean;
  safeguarding_self_declared: boolean;
  safeguarding_seen: boolean;
  safeguarding_date?: string | null;
};

export type Qualification = {
  id: string;
  title: string;
  institution?: string | null;
  year?: string | null;
  description?: string | null;
  admin_checked: boolean;
};

export type Enquiry = {
  id: string;
  tutor_id: string;
  parent_name: string;
  parent_email: string;
  parent_phone?: string | null;
  student_year_group: string;
  subject: string;
  level: string;
  tuition_preference: TuitionPreference;
  location?: string | null;
  message: string;
  consent_given: boolean;
  status: "new" | "read" | "archived";
  created_at: string;
};

export type DirectoryFilters = {
  keyword?: string;
  subject?: string;
  level?: string;
  location?: string;
  tuitionPreference?: TuitionPreference | "";
  minRate?: number;
  maxRate?: number;
  dbsOnly?: boolean;
  qtsOnly?: boolean;
  sort?: "relevance" | "newest" | "price_asc" | "price_desc";
};
