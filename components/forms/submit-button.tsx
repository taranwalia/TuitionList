"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui";

export function SubmitButton({
  children,
  pendingChildren = "Saving...",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  pendingChildren?: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
}) {
  const { pending } = useFormStatus();

  return (
    <Button {...props} disabled={pending || props.disabled} className={props.className}>
      {pending ? pendingChildren : children}
    </Button>
  );
}
