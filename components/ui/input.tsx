import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, invalid, type, ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    className={cn(
      "flex h-11 w-full rounded-xl border border-stone-300/70 bg-white/95 px-4 py-2 text-sm text-foreground shadow-sm transition placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 dark:border-stone-500/25 dark:bg-stone-950/50",
      invalid && "border-red-500/70 focus-visible:ring-red-500/40",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";

export { Input };
