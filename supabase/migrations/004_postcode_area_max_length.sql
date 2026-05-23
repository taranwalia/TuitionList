-- Store only outward postcode areas, e.g. ME5, B13, SW1A or OX13.
update public.tutor_profiles
set postcode_area = left(upper(regexp_replace(trim(postcode_area), '\s+', '', 'g')), 4)
where postcode_area is not null;

alter table public.tutor_profiles
  add constraint tutor_profiles_postcode_area_max_length
  check (char_length(postcode_area) <= 4);
