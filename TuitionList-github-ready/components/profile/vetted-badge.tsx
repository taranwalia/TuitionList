import { Check } from "lucide-react";
import type { TutorChecks } from "@/types/domain";

export function hasAdminCheckedDetails(checks?: TutorChecks) {
  if (!checks) return false;

  return Boolean(
    checks.id_seen ||
      checks.dbs_seen ||
      checks.qualification_seen ||
      checks.reference_received ||
      checks.insurance_confirmed ||
      checks.safeguarding_seen
  );
}

export function VettedBadge({ checks, size = "md" }: { checks?: TutorChecks; size?: "sm" | "md" | "lg" }) {
  if (!hasAdminCheckedDetails(checks)) return null;

  const sizeClass = size === "lg" ? "size-8" : size === "sm" ? "size-5" : "size-6";
  const iconClass = size === "lg" ? "size-5" : size === "sm" ? "size-3" : "size-4";
  const tooltip =
    "This tutor has had one or more profile checks marked as seen by TuitionList. Check the badges below for details. This does not mean TuitionList recommends or guarantees the tutor.";

  return (
    <span
      className={`inline-grid ${sizeClass} shrink-0 place-items-center bg-[#26a7ee] text-white`}
      style={{
        clipPath:
          "polygon(50% 0%, 59% 9%, 72% 6%, 78% 18%, 91% 20%, 94% 33%, 100% 50%, 91% 61%, 94% 76%, 81% 81%, 76% 94%, 61% 91%, 50% 100%, 39% 91%, 24% 94%, 19% 81%, 6% 76%, 9% 61%, 0% 50%, 9% 39%, 6% 24%, 19% 19%, 24% 6%, 39% 9%)"
      }}
      title={tooltip}
      aria-label="Profile checks completed"
    >
      <Check className={iconClass} strokeWidth={4} aria-hidden />
    </span>
  );
}
