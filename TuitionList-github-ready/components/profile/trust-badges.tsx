import { ShieldCheck, ShieldQuestion } from "lucide-react";
import { Badge } from "@/components/ui";
import type { TutorChecks } from "@/types/domain";

export function TrustBadges({ checks }: { checks?: TutorChecks }) {
  if (!checks) return null;

  const badges = [
    checks.dbs_seen ? "DBS seen by TuitionList" : checks.dbs_self_declared ? "DBS self-declared" : null,
    checks.qualification_seen ? "Qualification seen by TuitionList" : null,
    checks.id_seen ? "ID seen by TuitionList" : null,
    checks.reference_received ? "Reference received by TuitionList" : null,
    checks.insurance_confirmed
      ? "Insurance confirmed by TuitionList"
      : checks.insurance_self_declared
        ? "Insurance self-declared"
        : null,
    checks.safeguarding_seen
      ? "Safeguarding training seen by TuitionList"
      : checks.safeguarding_self_declared
        ? "Safeguarding training self-declared"
        : null
  ].filter(Boolean);

  if (badges.length === 0) {
    return (
      <Badge className="gap-1 border-slate-200 bg-slate-50 text-slate-600">
        <ShieldQuestion className="size-3.5" aria-hidden />
        Checks not shown
      </Badge>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((badge) => (
        <Badge
          key={badge}
          className={
            badge?.includes("by TuitionList") || badge?.includes("confirmed")
              ? "gap-1 border-leaf-100 bg-leaf-50 text-leaf-700"
              : "gap-1 border-slate-200 bg-slate-50 text-slate-700"
          }
        >
          <ShieldCheck className="size-3.5" aria-hidden />
          {badge}
        </Badge>
      ))}
    </div>
  );
}
