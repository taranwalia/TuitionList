# TuitionList Agent Instructions

## Project summary

TuitionList is a free UK tutor directory. It helps independent tutors, teachers, and tuition providers create searchable online profiles so parents can find and contact them.

TuitionList is a directory only. It is not a tutoring agency, does not employ tutors, does not process lesson payments, and does not guarantee tutor quality, suitability, safeguarding arrangements, or results.

## Current MVP scope

The MVP should focus on:

- Tutor registration and login
- Tutor profile creation and editing
- Public tutor profile photos
- Admin approval before profiles go live
- Public tutor search and filtering
- Individual tutor profile pages
- Parent enquiry forms
- Email notifications
- Admin dashboard
- Safeguarding and directory-only disclaimers
- SEO-friendly public pages

Do not expand the MVP beyond this unless specifically instructed.

## Do not add yet

Do not add the following features unless explicitly requested:

- Payments
- Commission system
- Parent finder fees
- Booking calendar
- Video lessons
- Parent accounts
- Reviews
- Paid featured listings
- Subscriptions
- In-platform messaging
- AI tutor matching
- Mobile app
- Complex CRM features

## Business rules

- Basic tutor profiles are free at launch.
- Parent enquiries are free at launch.
- TuitionList does not charge commission.
- TuitionList does not charge parent finder's fees.
- Tutor profiles must be approved by admin before appearing publicly.
- Tutors can only edit their own profiles.
- Tutors can only view their own enquiries.
- Admins can manage all tutor profiles and enquiries.
- Public users can only view published tutor profiles.
- Profile photos are public assets and may appear on tutor cards and profile pages.
- Uploaded verification documents must remain private.

## Trust and safeguarding wording

Always be careful with wording around trust, safeguarding, DBS, and verification.

Avoid saying:

- "All tutors are verified"
- "Fully verified tutors"
- "Safeguarding approved"
- "DBS verified"
- "Guaranteed results"
- "Trusted tutors" without qualification
- "We ensure all tutors are safe"

Prefer wording such as:

- "Self-declared by tutor"
- "Document seen by TuitionList"
- "DBS self-declared"
- "DBS seen by TuitionList"
- "Qualification seen by TuitionList"
- "Profile checks completed"
- "Parents should carry out their own checks"
- "Directory only"
- "Independent tutors and tuition providers"

## Badges

- The blue tick may be shown only when at least one real admin check is completed, such as ID seen, DBS seen, qualification seen, reference received, insurance confirmed, or safeguarding training seen.
- The blue tick label must be "Profile checks completed", not "verified tutor".
- The blue tick tooltip must explain that one or more profile checks have been marked as seen by TuitionList, that parents should check the badges below for details, and that TuitionList does not recommend or guarantee the tutor.
- The public Admin badge may be shown on tutor profiles owned by a user with `profiles.role = 'admin'`.
- The Admin badge means "TuitionList admin account" only. It must not imply the tutor is safer, better, or fully verified.

## Mandatory disclaimer

Public tutor profile pages and relevant enquiry pages should include a clear disclaimer:

"TuitionList is a directory only. Tutors and tuition providers listed on TuitionList are independent and are not employed by TuitionList. We do not guarantee the quality, suitability, availability, qualifications, DBS status, safeguarding arrangements, or outcomes of any tutor. Parents and students are responsible for carrying out their own checks before arranging tuition."

## Design principles

The design should be:

- Minimalist
- Professional
- Parent-friendly
- Tutor-friendly
- Clean and modern
- Mobile responsive
- UK education focused

Brand style:

- Name: TuitionList
- Primary colour: dark navy or blue, especially `#0b2545`
- Accent colour: green
- Background: clean white or very light neutral
- Typography: modern sans-serif
- Tone: trustworthy, helpful, clear, and honest

## Technical stack

Use:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase
- Supabase Row Level Security
- Supabase Storage for public profile photos
- Supabase Storage for private verification documents
- Resend for transactional emails
- Vercel deployment

## Coding standards

- Use TypeScript throughout.
- Keep components reusable and clean.
- Keep business logic readable.
- Validate forms properly.
- Use accessible form labels.
- Add loading states.
- Add error states.
- Add empty states.
- Add success states.
- Keep public pages SEO-friendly.
- Do not expose private user data.
- Do not make verification documents public.
- Keep the MVP simple and maintainable.

## Database and security

Always respect Supabase RLS policies.

Rules:

- Tutors can only access their own profile data.
- Tutors can only access enquiries sent to them.
- Admins can access all tutor and enquiry data.
- Visitors can only access published tutor profiles.
- Profile photos live in the public `profile-photos` bucket and are suitable for public display.
- Verification documents live in the private `verification-documents` bucket.
- Parent enquiry details are private and should only be visible to the relevant tutor and admins.

## SEO rules

Use clean URLs and metadata.

Important URL patterns:

- /
- /find-a-tutor
- /become-a-tutor
- /tutor/[slug]
- /tutors/[subject]
- /tutors/[location]
- /tutors/[subject]/[location]

Important title examples:

- TuitionList | Free UK Tutor Directory
- Find a Tutor for Free | TuitionList
- Create a Free Tutor Profile | TuitionList

## Copywriting tone

Use clear UK English.

The tone should be:

- Clear
- Professional
- Warm
- Honest
- Practical

Avoid overpromising. Do not imply TuitionList has personally checked every tutor unless the database field confirms a check has been completed.

## Testing and validation

When making changes:

- Run build checks if package management is available.
- Run tests if available.
- Check TypeScript errors.
- Check obvious route errors.
- Check Supabase schema changes carefully.
- Update README if setup steps change.
- Keep `.env.example` updated.
