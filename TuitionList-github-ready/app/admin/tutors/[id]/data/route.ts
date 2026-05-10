import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";

function filenameSafe(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { supabase, user: adminUser } = await requireAdmin();
  const { id } = await params;

  const { data: tutorProfile, error: tutorError } = await supabase.from("tutor_profiles").select("*").eq("id", id).single();
  if (tutorError || !tutorProfile) {
    return NextResponse.json({ error: "Tutor profile not found." }, { status: 404 });
  }

  const [
    accountProfile,
    subjectLinks,
    levelLinks,
    qualifications,
    checks,
    enquiries,
    adminNotes,
    uploadedDocuments
  ] = await Promise.all([
    supabase.from("profiles").select("*").eq("auth_user_id", tutorProfile.user_id).maybeSingle(),
    supabase.from("tutor_subjects").select("subjects ( name, slug )").eq("tutor_id", id),
    supabase.from("tutor_levels").select("levels ( name, slug )").eq("tutor_id", id),
    supabase.from("qualifications").select("*").eq("tutor_id", id).order("created_at", { ascending: false }),
    supabase.from("checks").select("*").eq("tutor_id", id).maybeSingle(),
    supabase.from("enquiries").select("*").eq("tutor_id", id).order("created_at", { ascending: false }),
    supabase.from("admin_notes").select("*").eq("tutor_id", id).order("created_at", { ascending: false }),
    supabase.from("uploaded_documents").select("*").eq("tutor_id", id).order("uploaded_at", { ascending: false })
  ]);

  const exportData = {
    export_context: {
      platform: "TuitionList",
      purpose: "Tutor personal data access export",
      generated_at: new Date().toISOString(),
      generated_by_admin_user_id: adminUser.id,
      note:
        "Private verification document file contents are not included in this JSON export. Uploaded document records include metadata and storage paths only."
    },
    account_profile: accountProfile.data,
    tutor_profile: tutorProfile,
    subjects: subjectLinks.data?.map((item) => item.subjects).filter(Boolean) ?? [],
    levels: levelLinks.data?.map((item) => item.levels).filter(Boolean) ?? [],
    qualifications: qualifications.data ?? [],
    checks: checks.data,
    enquiries: enquiries.data ?? [],
    admin_notes: adminNotes.data ?? [],
    uploaded_documents: uploadedDocuments.data ?? []
  };

  const filename = `${filenameSafe(tutorProfile.display_name || "tutor")}-tuitionlist-data.json`;

  return new NextResponse(JSON.stringify(exportData, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store"
    }
  });
}
