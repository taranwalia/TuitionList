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
  return tutors.map((tutor) => {
    const checks = checksByTutor.get(tutor.id);
    return checks ? { ...tutor, checks } : tutor;
  });
}

async function attachAdminBadges(tutors: TutorProfile[]) {
  const userIds = tutors.map((tutor) => tutor.user_id).filter(Boolean) as string[];
  if (userIds.length === 0) return tutors;

  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase.from("profiles").select("auth_user_id, role").in("auth_user_id", userIds);
    if (error) throw error;

    const adminUserIds = new Set(data.filter((profile) => profile.role === "admin").map((profile) => profile.auth_user_id));
    return tutors.map((tutor) => ({
      ...tutor,
      is_platform_admin: tutor.user_id ? adminUserIds.has(tutor.user_id) : false
    }));
  } catch {
    return tutors;
  }
}

async function attachAdminContactDetails(tutors: TutorProfile[]) {
  const userIds = tutors.map((tutor) => tutor.user_id).filter(Boolean) as string[];
  if (userIds.length === 0) return tutors;

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.from("profiles").select("auth_user_id, email").in("auth_user_id", userIds);
    if (error) throw error;

    const emailsByUserId = new Map(data.map((profile) => [profile.auth_user_id, profile.email]));
    return tutors.map((tutor) => ({
      ...tutor,
      admin_email: tutor.user_id ? emailsByUserId.get(tutor.user_id) ?? null : null
    }));
  } catch {
    return tutors;
  }
}

export async function getPublishedTutors(filters: DirectoryFilters = {}) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.from("tutor_profiles").select(profileSelect).eq("status", "published");
    if (error) throw error;
    const tutors = await attachAdminBadges(await attachPublicChecks((data as unknown as RawTutor[]).map(mapRawTutor)));
    return filterTutors(tutors, filters);
  } catch {
    if (!canUseDemoData()) return [];
    return filterTutors(sampleTutors, filters);
  }
}

export async function getTutorBySlug(slug: string) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("tutor_profiles")
      .select(profileSelect)
      .eq("slug", slug)
      .eq("status", "published")
      .single();
    if (error) throw error;
    return (await attachAdminBadges(await attachPublicChecks([mapRawTutor(data as unknown as RawTutor)])))[0];
  } catch {
    if (!canUseDemoData()) return null;
    return sampleTutors.find((tutor) => tutor.slug === slug && tutor.status === "published") ?? null;
  }
}

export async function getAdminTutors() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.from("tutor_profiles").select(profileSelect).order("created_at", { ascending: false });
    if (error) throw error;
    return attachAdminContactDetails((data as unknown as RawTutor[]).map(mapRawTutor));
  } catch {
    if (!canUseDemoData()) return [];
    return [
      ...sampleTutors,
      {
        ...sampleTutors[0],
        id: "sample-pending",
        display_name: "Pending Tutor",
        slug: "pending-tutor-english",
        status: "pending" as const,
        subjects: ["English"],
        levels: ["KS3", "GCSE"]
      }
    ];
  }
}

export async function getAdminTutorById(id: string) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.from("tutor_profiles").select(profileSelect).eq("id", id).single();
    if (error) throw error;
    return (await attachAdminContactDetails([mapRawTutor(data as unknown as RawTutor)]))[0];
  } catch {
    if (!canUseDemoData()) return null;
    return getAdminTutors().then((tutors) => tutors.find((tutor) => tutor.id === id) ?? null);
  }
}

export async function getTutorDashboardProfile(userId: string) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.from("tutor_profiles").select(profileSelect).eq("user_id", userId).maybeSingle();
    if (error) throw error;
    return data ? mapRawTutor(data as unknown as RawTutor) : null;
  } catch {
    return null;
  }
}
