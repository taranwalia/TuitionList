import type { Metadata } from "next";
import { StaticPage } from "@/components/static-page";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Read the TuitionList terms and conditions for using the UK tutor directory.",
  alternates: { canonical: "/terms" }
};

export default function TermsPage() {
  return (
    <StaticPage title="Terms and Conditions">
      <p>
        TuitionList provides an online directory service for independent tutors, teachers, and tuition providers. TuitionList is not a tutoring
        agency and does not employ, manage, supervise, or endorse tutors or tuition providers listed on the platform.
      </p>
      <p>
        Tutors and tuition providers are responsible for ensuring that the information they provide is accurate, lawful, current, and not misleading.
        This includes details relating to qualifications, experience, DBS status, safeguarding training, insurance, rates, availability, and lesson
        arrangements.
      </p>
      <p>
        Where possible, TuitionList may review certain information or evidence provided by tutors and tuition providers. Any badges, blue ticks, or
        profile labels are intended to show what information has been self-declared, seen, or confirmed by TuitionList. They do not mean that
        TuitionList recommends, guarantees, supervises, or accepts responsibility for any tutor or tuition provider.
      </p>
      <p>
        Parents, carers, and students are responsible for making their own enquiries and satisfying themselves that a tutor or tuition provider is
        suitable before arranging tuition. TuitionList does not guarantee the quality, suitability, availability, qualifications, DBS status,
        safeguarding arrangements, outcomes, or conduct of any tutor or tuition provider.
      </p>
      <p>
        TuitionList does not arrange tuition, process lesson payments, supervise lessons, handle cancellations or refunds, or become a party to any
        agreement made between parents, students, tutors, or tuition providers.
      </p>
      <p>
        Users must not use TuitionList for unlawful, misleading, abusive, discriminatory, unsafe, or fraudulent activity. TuitionList may remove,
        reject, suspend, or edit profiles, listings, enquiries, or accounts where we believe this is necessary to protect users, maintain platform
        standards, comply with the law, or reduce risk.
      </p>
      <p>
        Basic tutor profiles and parent enquiries are free. TuitionList does not charge commission, parent finder fees, or paid listing fees.
      </p>
    </StaticPage>
  );
}
