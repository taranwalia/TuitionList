import { sampleTutors } from "@/lib/sample-data";
import { canUseDemoData } from "@/lib/demo-mode";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { DirectoryFilters, TutorProfile } from "@/types/domain";
import { filterTutors } from "@/lib/utils";

const profileSelect = `
  id,
  user_id,
  display_name,
  slug,
  town,
  county,
  postcode_area,
  online_available,
  in_person_available,
  willing_to_travel,
  min_rate,
  max_rate,
  short_bio,
  long_bio,
  experience,
  profile_photo_url,
  website_url,
  linkedin_url,
  phone,
  show_phone,
  show_email,
  show_whatsapp,
  status,
  rejection_reason,
  submitted_at,
  approved_at,
  created_at,
  checks (
    id_seen,
    dbs_self_declared,
    dbs_seen,
    dbs_date,
    qualification_seen,
    reference_received,
    insurance_self_declared,
    insurance_confirmed,
    safeguarding_self_declared,
    safeguarding_seen,
    safeguarding_date
  ),
  qualifications (
    id,
    title,
    institution,
    year,
    description,
    admin_checked
  ),
  tutor_subjects ( subjects ( name ) ),
  tutor_levels ( levels ( name ) )
`;

type RawTutor = Omit<TutorProfile, "subjects" | "levels" | "checks" | "qualifications"> & {
  checks?: TutorProfile["checks"][] | TutorProfile["checks"] | null;
  qualifications?: TutorProfile["qualifications"] | null;
  tutor_subjects?: { subjects: { name: string } | { name: string }[] | null }[] | null;
  tutor_levels?: { levels: { name: string } | { name: string }[] | null }[] | null;
};

type PublicCheckRow = NonNullable<TutorProfile["checks"]> & {
  tutor_id: string;
};

function mapRawTutor(row: RawTutor): TutorProfile {
  return {
    ...row,
    checks: Array.isArray(row.checks) ? row.checks[0] : row.checks ?? undefined,
    qualifications: row.qualifications ?? [],
    subjects: row.tutor_subjects?.flatMap((item) => namesFromRelation(item.subjects)) ?? [],
    levels: row.tutor_levels?.flatMap((item) => namesFromRelation(item.levels)) ?? []
  };
}

function namesFromRelation(relation: { name: string } | { name: string }[] | null) {
  if (!relation) return [];
  return Array.isArray(relation) ? relation.map((item) => item.name).filter(Boolean) : [relation.name].filter(Boolean);
}

async function attachPublicChecks(tutors: TutorProfile[]) {
  if (tutors.length === 0) return tutors;

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("public_tutor_checks")
    .select("*")
    .in(
      "tutor_id",
      tutors.map((tutor) => tutor.id)
    );
  if (error) return tutors;

  const checksByTutor = new Map((data as PublicCheckRow[]).map((row) => [row.tutor_id, row]));
