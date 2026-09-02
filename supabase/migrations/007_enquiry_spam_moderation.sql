alter table public.enquiries
  add column if not exists withheld_from_tutor boolean not null default false,
  add column if not exists spam_score integer not null default 0,
  add column if not exists moderation_reason text;

drop policy if exists "Tutors read own enquiries and admins read all" on public.enquiries;
create policy "Tutors read delivered enquiries and admins read all"
on public.enquiries
for select
using (
  (
    withheld_from_tutor = false
    and exists (
      select 1
      from public.tutor_profiles tp
      where tp.id = tutor_id
        and tp.user_id = auth.uid()
    )
  )
  or public.is_admin()
);

create index if not exists enquiries_withheld_from_tutor_idx
on public.enquiries(withheld_from_tutor, created_at desc);
