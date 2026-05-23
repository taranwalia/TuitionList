alter table public.tutor_profiles
  add column if not exists full_name text;

update public.tutor_profiles
set full_name = display_name
where full_name is null;
