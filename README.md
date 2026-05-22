# TuitionList

TuitionList is a free UK tutor directory MVP. It helps independent tutors, teachers and tuition providers create searchable online profiles so parents can find and contact them.

TuitionList is a directory, not a tutoring agency. It does not employ tutors, take commission, charge parent finder fees or process lesson payments.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth, Postgres, Row Level Security and Storage
- Resend for transactional email
- Vercel deployment

## Local Setup

Use Node.js 20.18 or newer on Windows.

```bash
npm install
npm run dev
```

Create `.env.local` from `.env.example`:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
RESEND_API_KEY=...
EMAIL_FROM="TuitionList <hello@tuitionlist.co.uk>"
ADMIN_EMAIL=admin@example.com
NEXT_PUBLIC_ENABLE_DEMO_DATA=false
```

Set `NEXT_PUBLIC_ENABLE_DEMO_DATA=true` only for local UI review without Supabase. Demo data is disabled by default and should remain `false` in production.

## Supabase Setup

1. Create a Supabase project.
2. Run `supabase/migrations/001_initial_schema.sql` in the SQL editor or through Supabase CLI.
3. For existing Supabase projects that already ran the first migration before profile photos were added, also run `supabase/migrations/002_profile_photos_storage.sql`.
4. For existing Supabase projects that already ran the first migrations before email logs were added, also run `supabase/migrations/003_email_logs.sql`.
5. Confirm that the migration created a public Storage bucket named `profile-photos`.
6. Confirm that the migration created a private Storage bucket named `verification-documents`.
7. Confirm that the migration created an admin-only `email_logs` table.
8. Store public tutor photos under `profile-photos/{auth_user_id}/filename`.
9. Store private verification files under `verification-documents/{tutor_profile_id}/filename`.
10. Keep verification document URLs out of public pages. Generate signed URLs only for the owning tutor and admins.
11. Add the environment variables above to Vercel.

The migration creates RLS policies for:

- Public visitors reading only `published` tutor profiles.
- Tutors reading and editing only their own profile data.
- Tutors reading only enquiries sent to their profile.
- Admins managing all tutor profiles, checks, documents and enquiries.
- Public profile photo reads from `profile-photos`.
- Private verification documents in Supabase Storage.

## First Admin User

1. Sign up using Supabase Auth.
2. Find the new user id in `auth.users`.
3. Insert or update the matching profile:

```sql
insert into public.profiles (auth_user_id, role, email)
values ('USER_ID_HERE', 'admin', 'admin@example.com')
on conflict (auth_user_id)
do update set role = 'admin', email = excluded.email;
```

## Main Flows

- Tutors create a profile in `/tutor-dashboard/profile`.
- Tutors can upload a public profile photo from `/tutor-dashboard/profile`.
- Submitted profiles are set to `pending`.
- Public directory pages only show `published` profiles.
- Admins approve, reject or suspend profiles in `/admin/tutors`.
- Admins can view transactional email attempts in `/admin/email-logs`.
- Parents submit enquiries on `/tutor/[slug]`.
- Enquiries are stored in Supabase and copied to email where Resend is configured.

## Safety Positioning

The site deliberately avoids misleading verification language. Badge labels distinguish self-declared items from items seen by TuitionList admins. Parents must complete their own checks before hiring a tutor.

The blue tick badge means `Profile checks completed` and should only appear when an admin has marked at least one actual check as completed. It must not be described as "verified tutor", "safeguarding approved", or a guarantee of safety. Its tooltip explains that one or more checks have been marked as seen by TuitionList and that parents should read the individual badges for details.

The public `Admin` badge means the tutor profile belongs to a TuitionList admin account. It does not imply tutor quality or safeguarding suitability.

## SEO Positioning

TuitionList is a national UK tutor directory. Public copy, metadata, internal links and SEO pages should describe the platform as helping parents, carers and students find independent tutors, teachers and tuition providers across the UK.

Important public SEO routes include:

- `/tutors`
- `/tutors/[subject]`
- `/tutors/[location]`
- `/tutors/[location]/[subject]`
- `/tutors/[location]/[subject]/[level]`
- `/tutors/[subject]/[level]`
- `/tutors/[level]/[subject]`
- `/tutors/[location]/[level]/[subject]`
- `/online-tutors`
- `/online-tutors/[subject]`
- `/online-tutors/[subject]/[level]`
- `/private-tutors`
- `/tutor-directory-uk`
- `/free-tutor-directory`
- `/free-tutor-directory-uk`
- `/free-tutor-listing-uk`
- `/advertise-as-a-tutor`
- `/advertise-tutoring-services`
- `/advertise-as-a-private-tutor`
- `/advertise-tutoring-online`
- `/advertise-tuition-services`
- `/free-tutor-advertising`
- `/free-tutor-listing`
- `/free-tutor-profile`
- `/list-as-a-tutor-for-free`
- `/promote-my-tutoring-services`
- `/get-tutoring-students`
- `/find-tutoring-students`
- `/private-tutor-leads`
- `/tutor-leads-uk`
- `/online-tutor-leads`
- `/how-to-get-more-tutoring-clients`
- `/how-to-advertise-tutoring-business`
- `/best-place-to-advertise-tutoring`
- `/where-to-advertise-as-a-tutor`
- `/tutor-marketplace-uk`
- `/tutor-platform-uk`
- `/no-subscription-tutor-platform`
- `/superprof-alternative-for-tutors`
- `/tutorful-alternative-for-tutors`
- `/tutor-hunt-alternative-for-tutors`
- `/first-tutors-alternative-for-tutors`
- `/for-tutors`
- `/for-parents`
- `/pricing`
- `/local-tutors-uk`
- `/independent-tutors-uk`
- `/no-commission-tutor-platform`
- `/subjects`
- `/locations`
- `/guides`
- `/guides/how-to-choose-a-tutor`
- `/guides/online-vs-in-person-tutoring`
- `/guides/how-much-does-a-tutor-cost`
- `/guides/what-to-ask-a-tutor`
- `/guides/dbs-checks-for-private-tutors`
- `/guides/how-to-check-a-tutor-before-booking`
- `/profile-checks`
- `/dbs-checks`
- `/dbs-checked-tutors`
- `/background-checked-tutors`
- `/verified-tutors`
- `/dbs-verified-tutors`
- `/identity-verified-tutors`
- `/safe-tutor-directory`
- `/find-a-safe-tutor`
- `/tutor-dbs-check`
- `/enhanced-dbs-tutor`
- `/dbs-update-service-tutor`
- `/tutor-background-check`
- `/private-tutor-safety`
- `/child-safeguarding-tutor`
- `/safe-online-tutoring`
- `/parent-guide-to-hiring-a-tutor`
- `/check-tutor-qualifications`
- `/qualified-tutors`
- `/qts-tutors`
- `/teacher-tutors`
- `/experienced-tutors`
- `/tutor-references`
- `/tutor-reviews`
- `/safeguarding-for-tutors`
- `/private-tutor-safeguarding`
- `/identity-checks`
- `/qualification-checks`
- `/safeguarding-checks`
- `/exam-boards`
- `/exam-boards/aqa`
- `/exam-boards/edexcel`
- `/exam-boards/ocr`
- `/exam-boards/eduqas`
- `/exam-boards/ccea`
- `/exam-boards/sqa`
- `/how-tutor-listings-rank`
- `/tutor-directory-comparison`
- `/first-tutors-alternative`
- `/superprof-alternative`
- `/tutorful-alternative`
- `/mytutor-alternative`
- `/tutorhunt-alternative`
- `/tutorperch-alternative`
- `/best-tutor-websites-uk`
- `/tutors-near-me`
- `/homeschooling-tutors`
- `/gcse-english-tutors`
- `/gcse-science-tutors`
- `/a-level-maths-tutors`
- `/a-level-english-tutors`
- `/a-level-science-tutors`
- `/ks2-maths-tutors`
- `/ks2-english-tutors`
- `/subjects/[subject]`
- `/locations/[location]`
- `/[subject]-tutors`
- `/[subject]-tutors/[location]`
- `/online-[subject]-tutors`
- `/[level]-[subject]-tutors`
- `/[level]-[subject]-tutors/[location]`

Avoid creating thin duplicated location or subject pages. Unknown or unsupported dynamic SEO pages should be `noindex` unless they contain substantial useful content or real approved tutor results.

The sitemap should include public pages, useful SEO pages and approved tutor profiles only. It should exclude admin pages, tutor dashboard pages, login/signup pages, settings, enquiries, unpublished tutor profiles and demo/sample profiles.

Reusable SEO data and templates live in `lib/seo/`:

- `subjects.ts`
- `levels.ts`
- `locations.ts`
- `examBoards.ts`
- `seoTemplates.ts`
- `faqs.ts`
- `internalLinks.ts`

The SEO system generates metadata, canonical URLs, Open Graph/Twitter metadata, breadcrumb schema, FAQ schema, CollectionPage schema, capped sitemap entries, and related internal links for priority pages. It deliberately avoids generating millions of thin pages at launch.

Subject, level, location, subject + level, subject + location, and subject + level + location pages are generated from the reusable data files in `lib/seo/`. Subject pages link to online, GCSE, A-Level, location, related subject, and tutor sign-up pages. Location pages link to core subject pages for that area, online tutors, and nearby towns. Blog-style guide pages use Article schema where appropriate.

## Storage

- `profile-photos`: public bucket for tutor profile images. These images may appear on public tutor cards and profile pages.
- `verification-documents`: private bucket for DBS, ID, qualification, insurance, safeguarding, and other review documents. These must never be public.

If photo uploads show `Bucket not found`, run:

```text
supabase/migrations/002_profile_photos_storage.sql
```

in Supabase SQL Editor, then restart the dev server.

## Tests

```bash
npm run lint
npm run build
npm run test
```

The initial test coverage focuses on slugging and directory filtering, where hidden profile visibility matters most.

## Windows Validation Checklist

From `C:\Users\taran\OneDrive\Desktop\TuitionList`:

```powershell
node --version
npm --version
npm install
npm run lint
npm run build
npm run test
npm run dev
```

Then open `http://localhost:3000`.

## Production Notes

- Do not enable demo data in Vercel.
- Keep `profile-photos` public only for profile images.
- Do not make the `verification-documents` bucket public.
- Do not show tutor email, phone or WhatsApp unless the tutor has explicitly chosen that option.
- Do not describe tutors as verified or safe unless the relevant admin check field supports the exact badge wording shown.
