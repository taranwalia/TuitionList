import type { Metadata } from "next";
import { StaticPage } from "@/components/static-page";

export const metadata: Metadata = {
  title: "About TuitionList",
  description: "Learn about TuitionList, a free UK tutor directory for independent tutors, teachers, tuition providers, and families.",
  alternates: { canonical: "/about" }
};

export default function AboutPage() {
  return (
    <StaticPage title="About TuitionList">
      <p>
        TuitionList was created to help independent tutors, teachers, and tuition providers stay visible online, while giving parents, carers, and
        students a simple way to find tuition support.
      </p>
      <p>
        The platform is designed as a free UK tutor directory, with no lesson commission, no parent finder fees, and no paid listings.
      </p>
      <p>
        TuitionList is an online directory only. Tutors and tuition providers listed on the platform are independent providers and are not employed,
        managed, supervised, or endorsed by TuitionList.
      </p>
      <p>
        Where possible, TuitionList may review certain information or evidence provided by tutors and tuition providers. Any badges, blue ticks, or
        profile labels are intended to show what information has been self-declared, seen, or confirmed by TuitionList. They do not mean that
        TuitionList recommends, guarantees, supervises, or accepts responsibility for any tutor or tuition provider.
      </p>
    </StaticPage>
  );
}
