create extension if not exists "pgcrypto";

create type public.user_role as enum ('tutor', 'admin');
create type public.tutor_status as enum ('draft', 'pending', 'published', 'rejected', 'suspended');
create type public.enquiry_status as enum ('new', 'read', 'archived');
create type public.document_status as enum ('uploaded', 'reviewed', 'rejected');

create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid not null unique references auth.users(id) on delete cascade,
  role public.user_role not null default 'tutor',
  email text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.tutor_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  full_name text,
  display_name text not null,
  slug text not null unique,
  phone text,
  show_phone boolean not null default false,
  show_email boolean not null default false,
  show_whatsapp boolean not null default false,
  town text not null,
  county text not null,
  postcode_area text not null,
  latitude numeric,
  longitude numeric,
  online_available boolean not null default false,
  in_person_available boolean not null default false,
  willing_to_travel boolean not null default false,
  min_rate integer not null check (min_rate >= 0),
  max_rate integer not null check (max_rate >= min_rate),
  short_bio text not null,
  long_bio text not null,
  experience text not null,
  profile_photo_url text,
  website_url text,
  linkedin_url text,
  status public.tutor_status not null default 'draft',
  rejection_reason text,
  submitted_at timestamptz,
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.subjects (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique
);

create table public.levels (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique
);

create table public.tutor_subjects (
  tutor_id uuid not null references public.tutor_profiles(id) on delete cascade,
  subject_id uuid not null references public.subjects(id) on delete restrict,
  primary key (tutor_id, subject_id)
);

create table public.tutor_levels (
  tutor_id uuid not null references public.tutor_profiles(id) on delete cascade,
  level_id uuid not null references public.levels(id) on delete restrict,
  primary key (tutor_id, level_id)
);

create table public.qualifications (
  id uuid primary key default gen_random_uuid(),
  tutor_id uuid not null references public.tutor_profiles(id) on delete cascade,
  title text not null,
  institution text,
  year text,
  description text,
  admin_checked boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.checks (
  id uuid primary key default gen_random_uuid(),
  tutor_id uuid not null unique references public.tutor_profiles(id) on delete cascade,
  id_seen boolean not null default false,
  dbs_self_declared boolean not null default false,
  dbs_seen boolean not null default false,
  dbs_date date,
  qualification_seen boolean not null default false,
  reference_received boolean not null default false,
  insurance_self_declared boolean not null default false,
  insurance_confirmed boolean not null default false,
  safeguarding_self_declared boolean not null default false,
  safeguarding_seen boolean not null default false,
  safeguarding_date date,
  notes text,
  updated_by uuid references auth.users(id),
  updated_at timestamptz not null default now()
);

create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  tutor_id uuid not null references public.tutor_profiles(id) on delete cascade,
  parent_name text not null,
  parent_email text not null,
  parent_phone text,
  student_year_group text not null,
  subject text not null,
  level text not null,
  tuition_preference text not null check (tuition_preference in ('online', 'in-person', 'both')),
  location text,
  message text not null,
  consent_given boolean not null default false,
  status public.enquiry_status not null default 'new',
  created_at timestamptz not null default now()
);

create table public.admin_notes (
  id uuid primary key default gen_random_uuid(),
  tutor_id uuid not null references public.tutor_profiles(id) on delete cascade,
  admin_id uuid not null references auth.users(id) on delete cascade,
  note text not null,
  created_at timestamptz not null default now()
);

create table public.uploaded_documents (
  id uuid primary key default gen_random_uuid(),
  tutor_id uuid not null references public.tutor_profiles(id) on delete cascade,
  document_type text not null,
  storage_path text not null,
  status public.document_status not null default 'uploaded',
  uploaded_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id)
);

create index tutor_profiles_status_idx on public.tutor_profiles(status);
create index tutor_profiles_slug_idx on public.tutor_profiles(slug);
create index tutor_profiles_location_idx on public.tutor_profiles(town, county, postcode_area);
create index enquiries_tutor_id_idx on public.enquiries(tutor_id);

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where auth_user_id = auth.uid()
    and role = 'admin'
  );
$$;

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (auth_user_id, email, role)
  values (new.id, coalesce(new.email, ''), 'tutor')
  on conflict (auth_user_id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create trigger profiles_touch_updated_at before update on public.profiles
for each row execute function public.touch_updated_at();

create trigger tutor_profiles_touch_updated_at before update on public.tutor_profiles
for each row execute function public.touch_updated_at();

alter table public.profiles enable row level security;
alter table public.tutor_profiles enable row level security;
alter table public.subjects enable row level security;
alter table public.levels enable row level security;
alter table public.tutor_subjects enable row level security;
alter table public.tutor_levels enable row level security;
alter table public.qualifications enable row level security;
alter table public.checks enable row level security;
alter table public.enquiries enable row level security;
alter table public.admin_notes enable row level security;
alter table public.uploaded_documents enable row level security;

create policy "Users read own profile and admins read all" on public.profiles
for select using (auth_user_id = auth.uid() or public.is_admin());

create policy "Users create own tutor profile" on public.profiles
for insert with check (auth_user_id = auth.uid() and role = 'tutor');

create policy "Users update own tutor profile" on public.profiles
for update using (auth_user_id = auth.uid() and role = 'tutor')
with check (auth_user_id = auth.uid() and role = 'tutor');

create policy "Admins manage all profiles" on public.profiles
for all using (public.is_admin()) with check (public.is_admin());

create policy "Public reads published tutor profiles" on public.tutor_profiles
for select using (status = 'published' or user_id = auth.uid() or public.is_admin());

create policy "Tutors insert own profile" on public.tutor_profiles
for insert with check (user_id = auth.uid());

create policy "Tutors update own unpublished profile" on public.tutor_profiles
for update using (user_id = auth.uid() or public.is_admin())
with check ((user_id = auth.uid() and status in ('draft', 'pending', 'rejected')) or public.is_admin());

create policy "Subjects public read" on public.subjects for select using (true);
create policy "Levels public read" on public.levels for select using (true);

create policy "Tutor subjects public read when profile visible" on public.tutor_subjects
for select using (
  exists (
    select 1 from public.tutor_profiles tp
    where tp.id = tutor_id
    and (tp.status = 'published' or tp.user_id = auth.uid() or public.is_admin())
  )
);

create policy "Tutor levels public read when profile visible" on public.tutor_levels
for select using (
  exists (
    select 1 from public.tutor_profiles tp
    where tp.id = tutor_id
    and (tp.status = 'published' or tp.user_id = auth.uid() or public.is_admin())
  )
);

create policy "Tutors manage own subject links" on public.tutor_subjects
for all using (
  exists (select 1 from public.tutor_profiles tp where tp.id = tutor_id and tp.user_id = auth.uid())
  or public.is_admin()
)
with check (
  exists (select 1 from public.tutor_profiles tp where tp.id = tutor_id and tp.user_id = auth.uid())
  or public.is_admin()
);

create policy "Tutors manage own level links" on public.tutor_levels
for all using (
  exists (select 1 from public.tutor_profiles tp where tp.id = tutor_id and tp.user_id = auth.uid())
  or public.is_admin()
)
with check (
  exists (select 1 from public.tutor_profiles tp where tp.id = tutor_id and tp.user_id = auth.uid())
  or public.is_admin()
);

create policy "Qualifications visible with tutor profile" on public.qualifications
for select using (
  exists (
    select 1 from public.tutor_profiles tp
    where tp.id = tutor_id
    and (tp.status = 'published' or tp.user_id = auth.uid() or public.is_admin())
  )
);

create policy "Tutors and admins manage qualifications" on public.qualifications
for all using (
  exists (select 1 from public.tutor_profiles tp where tp.id = tutor_id and tp.user_id = auth.uid())
  or public.is_admin()
)
with check (
  exists (select 1 from public.tutor_profiles tp where tp.id = tutor_id and tp.user_id = auth.uid())
  or public.is_admin()
);

create policy "Tutors and admins read checks" on public.checks
for select using (
  exists (
    select 1 from public.tutor_profiles tp
    where tp.id = tutor_id
    and (tp.user_id = auth.uid() or public.is_admin())
  )
);

create policy "Admins manage checks" on public.checks
for all using (public.is_admin()) with check (public.is_admin());

create view public.public_tutor_checks as
select
  c.tutor_id,
  c.id_seen,
  c.dbs_self_declared,
  c.dbs_seen,
  c.dbs_date,
  c.qualification_seen,
  c.reference_received,
  c.insurance_self_declared,
  c.insurance_confirmed,
  c.safeguarding_self_declared,
  c.safeguarding_seen,
  c.safeguarding_date
from public.checks c
join public.tutor_profiles tp on tp.id = c.tutor_id
where tp.status = 'published';

grant select on public.public_tutor_checks to anon, authenticated;

create policy "Parents can create enquiries for published tutors" on public.enquiries
for insert with check (
  consent_given = true
  and exists (select 1 from public.tutor_profiles tp where tp.id = tutor_id and tp.status = 'published')
);

create policy "Tutors read own enquiries and admins read all" on public.enquiries
for select using (
  exists (select 1 from public.tutor_profiles tp where tp.id = tutor_id and tp.user_id = auth.uid())
  or public.is_admin()
);

create policy "Tutors update own enquiry status and admins update all" on public.enquiries
for update using (
  exists (select 1 from public.tutor_profiles tp where tp.id = tutor_id and tp.user_id = auth.uid())
  or public.is_admin()
);

create policy "Admins manage notes" on public.admin_notes
for all using (public.is_admin()) with check (public.is_admin());

create policy "Tutors read own documents and admins read all" on public.uploaded_documents
for select using (
  exists (select 1 from public.tutor_profiles tp where tp.id = tutor_id and tp.user_id = auth.uid())
  or public.is_admin()
);

create policy "Tutors upload own documents" on public.uploaded_documents
for insert with check (
  exists (select 1 from public.tutor_profiles tp where tp.id = tutor_id and tp.user_id = auth.uid())
  and storage_path like tutor_id::text || '/%'
);

create policy "Admins review documents" on public.uploaded_documents
for update using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'profile-photos',
  'profile-photos',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = true,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'verification-documents',
  'verification-documents',
  false,
  10485760,
  array['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = false,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Public reads profile photos" on storage.objects
for select
using (bucket_id = 'profile-photos');

create policy "Users upload own profile photos" on storage.objects
for insert to authenticated
with check (
  bucket_id = 'profile-photos'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Users update own profile photos" on storage.objects
for update to authenticated
using (
  bucket_id = 'profile-photos'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'profile-photos'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Users delete own profile photos" on storage.objects
for delete to authenticated
using (
  bucket_id = 'profile-photos'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Tutors upload own verification documents" on storage.objects
for insert to authenticated
with check (
  bucket_id = 'verification-documents'
  and exists (
    select 1
    from public.tutor_profiles tp
    where tp.id::text = (storage.foldername(name))[1]
    and tp.user_id = auth.uid()
  )
);

create policy "Tutors read own verification documents" on storage.objects
for select to authenticated
using (
  bucket_id = 'verification-documents'
  and (
    public.is_admin()
    or exists (
      select 1
      from public.tutor_profiles tp
      where tp.id::text = (storage.foldername(name))[1]
      and tp.user_id = auth.uid()
    )
  )
);

create policy "Tutors update own verification documents" on storage.objects
for update to authenticated
using (
  bucket_id = 'verification-documents'
  and exists (
    select 1
    from public.tutor_profiles tp
    where tp.id::text = (storage.foldername(name))[1]
    and tp.user_id = auth.uid()
  )
)
with check (
  bucket_id = 'verification-documents'
  and exists (
    select 1
    from public.tutor_profiles tp
    where tp.id::text = (storage.foldername(name))[1]
    and tp.user_id = auth.uid()
  )
);

create policy "Admins manage verification documents" on storage.objects
for all to authenticated
using (bucket_id = 'verification-documents' and public.is_admin())
with check (bucket_id = 'verification-documents' and public.is_admin());

insert into public.subjects (name, slug) values
('Maths', 'maths'),
('English', 'english'),
('Science', 'science'),
('Biology', 'biology'),
('Chemistry', 'chemistry'),
('Physics', 'physics'),
('11 Plus', '11-plus'),
('Verbal Reasoning', 'verbal-reasoning'),
('Non-Verbal Reasoning', 'non-verbal-reasoning'),
('Reading', 'reading'),
('Writing', 'writing'),
('Computer Science', 'computer-science'),
('History', 'history'),
('Geography', 'geography'),
('French', 'french'),
('Spanish', 'spanish'),
('German', 'german'),
('Business Studies', 'business-studies'),
('Economics', 'economics'),
('Politics', 'politics'),
('Psychology', 'psychology'),
('Sociology', 'sociology'),
('Religious Studies', 'religious-studies'),
('Art', 'art'),
('Music', 'music'),
('Primary', 'primary'),
('SATs', 'sats'),
('GCSE', 'gcse'),
('A-Level', 'a-level')
on conflict do nothing;

insert into public.levels (name, slug) values
('EYFS', 'eyfs'),
('KS1', 'ks1'),
('KS2', 'ks2'),
('11 Plus', '11-plus'),
('SATs', 'sats'),
('KS3', 'ks3'),
('GCSE', 'gcse'),
('IGCSE', 'igcse'),
('A-Level', 'a-level'),
('University', 'university'),
('Adult Learner', 'adult-learner'),
('Degree Level', 'degree-level'),
('Adult learning', 'adult-learning'),
('Functional Skills', 'functional-skills'),
('SEN support', 'sen-support')
on conflict do nothing;

-- Store files under verification-documents/{tutor_profile_id}/filename.
-- The bucket is private; generate signed URLs only for tutors who own the file and admins.
