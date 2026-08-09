import type { SupabaseClient } from "@supabase/supabase-js";
import { slugify } from "@/lib/utils";

type LookupTable = "subjects" | "levels";
type LookupRow = {
  id: string;
  name: string;
  slug: string;
};

export async function getOrCreateLookupRows(supabase: SupabaseClient, table: LookupTable, names: string[]) {
  const uniqueNames = Array.from(new Set(names.map((name) => name.trim()).filter(Boolean)));
  if (uniqueNames.length === 0) return [];

  const desiredRows = uniqueNames.map((name) => ({
    name,
    slug: slugify(name)
  }));
  const desiredSlugs = desiredRows.map((row) => row.slug);

  const [{ data: rowsByName, error: nameError }, { data: rowsBySlug, error: slugError }] = await Promise.all([
    supabase.from(table).select("id,name,slug").in("name", uniqueNames),
    supabase.from(table).select("id,name,slug").in("slug", desiredSlugs)
  ]);
  if (nameError) throw nameError;
  if (slugError) throw slugError;

  const existingRowsById = new Map<string, LookupRow>();
  for (const row of [...((rowsByName as LookupRow[] | null) ?? []), ...((rowsBySlug as LookupRow[] | null) ?? [])]) {
    existingRowsById.set(row.id, row);
  }
  const existingRows = Array.from(existingRowsById.values());

  const existingNames = new Set(existingRows.map((row) => row.name));
  const existingSlugs = new Set(existingRows.map((row) => row.slug));
  const missingRows = desiredRows.filter((row) => !existingNames.has(row.name) && !existingSlugs.has(row.slug));

  if (missingRows.length > 0) {
    const { error: insertError } = await supabase.from(table).upsert(missingRows, { onConflict: "slug" });
    if (insertError) throw insertError;
  }

  const rowsToRename = existingRows.filter((row) => {
    const desired = desiredRows.find((item) => item.slug === row.slug);
    return desired && desired.name !== row.name;
  });

  for (const row of rowsToRename) {
    const desired = desiredRows.find((item) => item.slug === row.slug);
    if (!desired) continue;
    const { error: renameError } = await supabase.from(table).update({ name: desired.name }).eq("id", row.id);
    if (renameError) throw renameError;
  }

  const { data: rows, error } = await supabase.from(table).select("id,name,slug").in("name", uniqueNames);
  if (error) throw error;

  return (rows as LookupRow[] | null) ?? [];
}
