import type { Metadata } from "next";
import { StaticPage } from "@/components/static-page";

export const metadata: Metadata = {
  title: "How TuitionList Works",
  description: "Learn how parents, carers, students, tutors, teachers, and tuition providers use TuitionList.",
  alternates: { canonical: "/how-it-works" }
};

export default function HowItWorksPage() {
  return (
    <StaticPage title="How TuitionList works">
      <p>
        Parents, carers, and students can search published tutor and tuition provider profiles by subject, level, location, tuition type, and rate.
      </p>
      <p>
        Tutors and tuition providers can create a free profile and submit it for review. Profiles do not appear publicly until they have been
        reviewed and approved by TuitionList.
      </p>
      <p>
        Where possible, TuitionList may review certain information or evidence provided by tutors and tuition providers, such as identity, DBS
        certificate details, qualifications, insurance, or safeguarding training. Any badges, blue ticks, or profile labels are intended to show what
        information has been self-declared, seen, or confirmed by TuitionList.
      </p>
      <p>
        A badge, blue tick, or profile label does not mean that TuitionList recommends, guarantees, supervises, or accepts responsibility for any
        tutor or tuition provider.
      </p>
      <p>
        TuitionList is an online directory only. Parents, carers, and students contact tutors directly and remain responsible for making their own
        checks before arranging tuition.
      </p>
    </StaticPage>
  );
}
