import type { Metadata } from "next";
import { StaticPage } from "@/components/static-page";

export const metadata: Metadata = {
  title: "Safeguarding and Tutor Checks | TuitionList",
  description: "Learn how TuitionList supports safer tutor discovery through profile information, DBS details and parent guidance.",
  alternates: { canonical: "/safeguarding" }
};

export default function SafeguardingPage() {
  return (
    <StaticPage title="Safeguarding on TuitionList">
      <p>
        TuitionList is an online directory only. Tutors and tuition providers listed on TuitionList are independent providers and are not employed,
        managed, supervised, or endorsed by TuitionList.
      </p>
      <p>
        We do not arrange tuition, process lesson payments, supervise lessons, or guarantee the quality, suitability, availability, qualifications,
        DBS status, safeguarding arrangements, or outcomes of any tutor or tuition provider listed on the platform.
      </p>
      <p>
        Where possible, TuitionList may review certain information or evidence provided by tutors and tuition providers. This may include identity,
        DBS certificate details, qualifications, references, insurance, or safeguarding training. Where information has been reviewed, this may be
        shown on the tutor's profile using a badge or profile label.
      </p>
      <p>
        Profile badges are intended to help parents and carers understand what information has been provided or reviewed. Some information may be
        self-declared by the tutor, while other items may be marked as "seen" or "confirmed" by TuitionList where evidence has been reviewed.
      </p>
      <p>
        A blue tick or "profile checks completed" label means that one or more profile checks have been marked as seen or confirmed by TuitionList.
        It does not mean that every possible check has been completed, and it does not mean that TuitionList recommends, guarantees, employs,
        supervises, or accepts responsibility for that tutor or tuition provider. Parents and carers should always read the individual badges to
        understand what has been checked.
      </p>
      <p>
        Before arranging tuition, parents and carers should make their own enquiries and satisfy themselves that the tutor or tuition provider is
        suitable. This may include checking identity, DBS certificate details where relevant, qualifications, references, experience, insurance,
        safeguarding training, lesson arrangements, supervision, online safety measures, and any other information relevant to their child's needs.
      </p>
      <p>
        Where tuition is for a child or young person, parents and carers should consider the safeguarding guidance published by the Department for
        Education for out-of-school settings, including tuition and community activities. If a parent, carer, student, or tutor has a safeguarding
        concern, they should contact the appropriate safeguarding authority, local authority children's services, the police, or emergency services
        where there is an immediate risk of harm.
      </p>
      <p>
        TuitionList does not guarantee that a tutor is legally required to hold a particular DBS check in every circumstance. DBS eligibility can
        depend on the nature, frequency, location, and supervision of the work. Parents and tutors should seek appropriate guidance where they are
        unsure.
      </p>
    </StaticPage>
  );
}
