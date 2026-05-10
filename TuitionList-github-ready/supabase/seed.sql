-- Optional demo data. Replace the UUID below with a real auth.users id before running.
with demo_user as (
  select id
  from auth.users
  where id = '00000000-0000-0000-0000-000000000001'
)
insert into public.tutor_profiles (
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
  status,
  approved_at
)
select
  id,
  'Jane Smith',
  'jane-smith-gcse-maths-kent',
  'Maidstone',
  'Kent',
  'ME15',
  true,
  true,
  true,
  32,
  45,
  'Qualified maths teacher supporting GCSE, IGCSE and A-Level students across Kent and online.',
  'I help students build confidence in maths through calm, structured lessons that focus on understanding as well as exam technique.',
  '12 years teaching in UK secondary schools, including GCSE higher and foundation groups.',
  'published',
  now()
from demo_user
on conflict do nothing;
