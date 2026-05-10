import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { LinkButton, Panel } from "@/components/ui";

export const metadata: Metadata = {
  title: "Enquiry Submitted | TuitionList",
  description: "Your TuitionList tutor enquiry has been submitted.",
  robots: { index: false, follow: false }
};

export default function EnquirySubmittedPage() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Panel className="text-center">
          <div className="mx-auto grid size-14 place-items-center rounded-full bg-leaf-50 text-leaf-700">
            <CheckCircle2 className="size-8" aria-hidden />
          </div>
          <h1 className="mt-6 text-3xl font-bold text-navy-900">Your enquiry has been submitted</h1>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-700">
            Thanks. Your enquiry has been sent and the tutor should respond to you directly if they are available and able to help.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            TuitionList is a directory only. Please continue to carry out your own checks before arranging tuition.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <LinkButton href="/find-a-tutor">Find another tutor</LinkButton>
            <LinkButton href="/safeguarding" variant="secondary">
              Safeguarding information
            </LinkButton>
          </div>
        </Panel>
      </div>
    </section>
  );
}
