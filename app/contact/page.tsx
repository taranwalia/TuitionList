import { Mail } from "lucide-react";
import { StaticPage } from "@/components/static-page";

export default function ContactPage() {
  return (
    <StaticPage title="Contact TuitionList">
      <p>
        For launch enquiries, tutor support, profile review questions, or safeguarding concerns relating to the TuitionList platform, please contact
        the TuitionList team.
      </p>
      <p className="inline-flex items-center gap-2 font-semibold text-navy-900">
        <Mail className="size-4" aria-hidden />
        hello@tuitionlist.co.uk
      </p>
      <p>
        If you have an immediate concern about the safety or welfare of a child, young person, or vulnerable person, please contact the police,
        emergency services, your local authority children's services, or the relevant safeguarding authority directly.
      </p>
      <p>
        TuitionList is an online directory only and does not arrange, manage, supervise, or monitor tuition lessons between parents, students, tutors,
        or tuition providers.
      </p>
    </StaticPage>
  );
}
