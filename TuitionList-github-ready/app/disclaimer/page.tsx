import type { Metadata } from "next";
import { StaticPage } from "@/components/static-page";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Read the TuitionList directory-only disclaimer for tutors, tuition providers, parents, carers, and students.",
  alternates: { canonical: "/disclaimer" }
};

export default function DisclaimerPage() {
  return (
    <StaticPage title="Disclaimer">
      <p>
        TuitionList is an online directory only. Tutors and tuition providers listed on TuitionList are independent providers and are not employed,
        managed, supervised, or endorsed by TuitionList.
      </p>
      <p>
        Where possible, TuitionList may review certain information or evidence provided by tutors and tuition providers, such as identity, DBS
        certificate details, qualifications, insurance, or safeguarding training. Any badges, blue ticks, or profile labels are intended to show what
        information has been self-declared, seen, or confirmed by TuitionList. They do not mean that TuitionList recommends, guarantees, supervises,
        or accepts responsibility for any tutor or tuition provider.
      </p>
      <p>
        We do not arrange tuition, process lesson payments, supervise lessons, or guarantee the quality, suitability, availability, qualifications,
        DBS status, safeguarding arrangements, availability, enquiries, outcomes, or tutor quality of any tutor or tuition provider listed on the
        platform.
      </p>
      <p>
        Parents, carers, and students are responsible for making their own enquiries and satisfying themselves that a tutor or tuition provider is
        suitable before arranging tuition. This may include checking identity, DBS certificate details where relevant, qualifications, references,
        experience, insurance, safeguarding training, lesson arrangements, online safety measures, and any other information relevant to their needs.
      </p>
      <p>
        TuitionList does not process lesson payments. Any lesson arrangements, fees, cancellations, refunds, safeguarding arrangements, or
        disputes are between the parent, carer, student, tutor, or tuition provider directly.
      </p>
    </StaticPage>
  );
}
