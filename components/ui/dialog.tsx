"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
        "fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-md dark:bg-black/70",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

type DialogContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  /** Полноэкранная панель (медиа-лайтбокс и т.п.) */
  fullscreen?: boolean;
};

const DialogContent = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, DialogContentProps>(
  ({ className, children, fullscreen, ...props }, ref) => (
    <DialogPortal>
      <DialogOverlay className={fullscreen ? "z-[90] bg-black/80 backdrop-blur-sm dark:bg-black/90" : undefined} />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          fullscreen
            ? "fixed inset-0 z-[100] flex h-[100dvh] max-h-none w-full max-w-none translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden rounded-none border-0 bg-neutral-100 text-foreground shadow-none duration-200 outline-none dark:bg-zinc-950 dark:text-inherit"
            : "fixed left-1/2 top-1/2 z-50 grid w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 gap-4 border border-stone-300/70 bg-card p-6 shadow-2xl backdrop-blur-xl duration-200 dark:border-white/10 dark:bg-background/90 dark:shadow-black/50 sm:rounded-3xl",
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          className={cn(
            "absolute right-4 top-4 z-[110] rounded-full border border-stone-300/70 bg-muted/90 p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground dark:border-white/10 dark:bg-white/5 dark:hover:text-foreground",
            fullscreen &&
              "border-stone-300/80 bg-white/90 text-foreground hover:bg-stone-200 dark:border-white/20 dark:bg-black/50 dark:text-zinc-200 dark:hover:bg-black/70 dark:hover:text-white",
          )}
        >
          <X className="size-4" />
          <span className="sr-only">Закрыть</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  ),
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title ref={ref} className={cn("text-lg font-semibold tracking-tight", className)} {...props} />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

export { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogClose };
