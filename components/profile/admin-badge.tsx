import { Shield } from "lucide-react";

export function AdminBadge({ isAdmin }: { isAdmin?: boolean }) {
  if (!isAdmin) return null;

  return (
    <span
      className="inline-flex items-center gap-1 rounded-full border border-navy-100 bg-navy-50 px-2.5 py-1 text-xs font-bold uppercase text-navy-800"
      title="TuitionList admin account"
      aria-label="TuitionList admin account"
    >
      <Shield className="size-3.5" aria-hidden />
      Admin
    </span>
  );
}
