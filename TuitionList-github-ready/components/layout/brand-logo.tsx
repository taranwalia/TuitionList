import { cn } from "@/lib/utils";

export function BrandLogo({ className, imageClassName }: { className?: string; imageClassName?: string }) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      {/* The supplied logo has its own dark backdrop, so keep it in a fixed frame. */}
      <img
        src="/brand/tuitionlist-logo.png"
        alt="TuitionList"
        className={cn("h-10 w-40 rounded-md object-cover object-center", imageClassName)}
      />
    </span>
  );
}
