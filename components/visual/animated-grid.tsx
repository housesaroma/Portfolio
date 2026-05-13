"use client";

export function AnimatedGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 opacity-[0.22] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]"
    >
      <div
        className="absolute inset-0 animate-[grid-drift_52s_linear_infinite] bg-[linear-gradient(to_right,color-mix(in_oklch,var(--foreground)_7%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--foreground)_7%,transparent)_1px,transparent_1px)] bg-[size:72px_72px]"
      />
    </div>
  );
}
