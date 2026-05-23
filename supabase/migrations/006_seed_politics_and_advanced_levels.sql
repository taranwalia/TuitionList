insert into public.subjects (name, slug) values
('Politics', 'politics')
on conflict do nothing;

insert into public.levels (name, slug) values
('Adult Learner', 'adult-learner'),
('Degree Level', 'degree-level')
on conflict do nothing;
