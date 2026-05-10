import type { ReactNode } from "react";
import { Panel } from "@/components/ui";

export function StaticPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Panel>
          <h1 className="text-4xl font-bold text-navy-900">{title}</h1>
          <div className="mt-6 grid gap-4 leading-7 text-slate-700">{children}</div>
        </Panel>
      </div>
    </section>
  );
}
