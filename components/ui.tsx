import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" }) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition",
        variant === "primary" && "bg-navy-800 text-white hover:bg-navy-900",
        variant === "secondary" && "border border-navy-200 bg-white text-navy-900 hover:bg-navy-50",
        variant === "ghost" && "text-navy-800 hover:bg-navy-50",
        className
      )}
      {...props}
    />
  );
}

export function LinkButton({
  href,
  children,
  className,
  variant = "primary"
}: {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
}) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition",
        variant === "primary" && "bg-navy-800 text-white hover:bg-navy-900",
        variant === "secondary" && "border border-navy-200 bg-white text-navy-900 hover:bg-navy-50",
        variant === "ghost" && "text-navy-800 hover:bg-navy-50",
        className
      )}
    >
      {children}
    </a>
  );
}

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-navy-100 bg-navy-50 px-2.5 py-1 text-xs font-medium text-navy-800",
        className
      )}
      {...props}
    />
  );
}

export function Panel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-lg border border-slate-200 bg-white p-5 shadow-soft", className)} {...props} />;
}

export function Field({
  label,
  children,
  hint
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="grid min-w-0 gap-2 text-sm font-medium text-navy-900">
      {label}
      {children}
      {hint ? <span className="text-xs font-normal text-slate-500">{hint}</span> : null}
    </label>
  );
}

export const inputClass =
  "min-h-11 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-navy-900 outline-none transition placeholder:text-slate-400 focus:border-navy-700 focus:ring-2 focus:ring-navy-100";
