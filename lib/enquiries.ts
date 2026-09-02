import { sampleEnquiries } from "@/lib/sample-data";
import { canUseDemoData } from "@/lib/demo-mode";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Enquiry } from "@/types/domain";

type EnquiryRow = {
  id: string;
  tutor_id: string;
  parent_name: string;
  parent_email: string;
  parent_phone?: string | null;
  student_year_group: string;
  subject: string;
  level: string;
  tuition_preference: "online" | "in-person" | "both";
  location?: string | null;
  message: string;
  consent_given: boolean;
  status: "new" | "read" | "archived";
  withheld_from_tutor?: boolean;
  spam_score?: number;
  moderation_reason?: string | null;
  created_at: string;
};

function mapEnquiry(row: EnquiryRow): Enquiry {
  return row;
}

export async function getTutorEnquiries(userId: string) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: profile, error: profileError } = await supabase.from("tutor_profiles").select("id").eq("user_id", userId).single();
    if (profileError) throw profileError;

    const { data, error } = await supabase
      .from("enquiries")
      .select("*")
      .eq("tutor_id", profile.id)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data as EnquiryRow[])
      .filter((enquiry) => !enquiry.withheld_from_tutor && enquiry.status !== "archived")
      .map(mapEnquiry);
  } catch {
    return canUseDemoData() ? sampleEnquiries : [];
  }
}

export async function getAdminEnquiries() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.from("enquiries").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return (data as EnquiryRow[]).map(mapEnquiry);
  } catch {
    return canUseDemoData() ? sampleEnquiries : [];
  }
}
