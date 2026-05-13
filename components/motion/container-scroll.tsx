"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reduced-motion";

export interface ContainerScrollProps {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
  /** Extra height multiplier for scroll runway (default 1.6) */
  scrollMultiplier?: number;
  /** Optional gradient wash behind the framed content */
  tintClassName?: string;
  /** Parallax intensity for pointer (0 disables) */
  parallaxStrength?: number;
  className?: string;
  frameClassName?: string;
}

function useSmoothPointerMotion(strength: number, reducedMotion: boolean) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8 * strength, -8 * strength]), {
    stiffness: 120,
    damping: 18,
    mass: 0.35,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10 * strength, 10 * strength]), {
    stiffness: 120,
    damping: 18,
    mass: 0.35,
  });

  const spotlightX = useSpring(mouseX, { stiffness: 90, damping: 22, mass: 0.45 });
  const spotlightY = useSpring(mouseY, { stiffness: 90, damping: 22, mass: 0.45 });

  const bind = React.useCallback(
    (rect: DOMRect, clientX: number, clientY: number) => {
      if (reducedMotion || strength <= 0) return;
      const nx = (clientX - rect.left) / rect.width - 0.5;
      const ny = (clientY - rect.top) / rect.height - 0.5;
      mouseX.set(Math.max(-0.5, Math.min(0.5, nx)));
      mouseY.set(Math.max(-0.5, Math.min(0.5, ny)));
    },
    [mouseX, mouseY, reducedMotion, strength],
  );

  const reset = React.useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return { rotateX, rotateY, spotlightX, spotlightY, bind, reset };
}

function DynamicLighting({
  rotateX,
  rotateY,
  spotlightX,
  spotlightY,
}: {
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  spotlightX: MotionValue<number>;
  spotlightY: MotionValue<number>;
}) {
  const x = useTransform(spotlightX, (v) => `${(v + 0.5) * 100}%`);
  const y = useTransform(spotlightY, (v) => `${(v + 0.5) * 100}%`);
  const background = useMotionTemplate`radial-gradient(120% 120% at ${x} ${y}, color-mix(in oklch, var(--primary) 35%, transparent), transparent 65%)`;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-70 mix-blend-soft-light"
      style={{ rotateX, rotateY, background }}
    />
  );
}

export function ContainerScroll({
  titleComponent,
  children,
  scrollMultiplier = 1.65,
  tintClassName,
  parallaxStrength = 1,
  className,
  frameClassName,
}: ContainerScrollProps) {
  const reducedMotion = usePrefersReducedMotion();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const frameRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: reducedMotion ? 300 : 120,
    damping: reducedMotion ? 40 : 26,
    mass: 0.35,
  });

  const rotateX = useTransform(progress, [0, 0.45, 1], reducedMotion ? [0, 0, 0] : [18, 6, 0]);
  const rotateZ = useTransform(progress, [0, 1], reducedMotion ? [0, 0] : [-1.2, 0]);
  const translateY = useTransform(progress, [0, 1], reducedMotion ? [0, 0] : [-40, 72]);
  const scale = useTransform(progress, [0, 0.55, 1], reducedMotion ? [1, 1, 1] : [0.92, 1, 1.02]);
  const opacity = useTransform(progress, [0, 0.2, 0.85, 1], [0.35, 1, 1, 0.92]);

  const pointer = useSmoothPointerMotion(reducedMotion ? 0 : parallaxStrength, reducedMotion);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = frameRef.current;
    if (!el) return;
    pointer.bind(el.getBoundingClientRect(), e.clientX, e.clientY);
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative flex min-h-[140vh] justify-center py-24 sm:py-32", className)}
      style={{ height: `${scrollMultiplier * 100}vh` }}
    >
      <div className="sticky top-0 mx-auto flex h-screen w-full max-w-6xl items-center px-4 sm:px-6 lg:px-8">
        <div className="relative w-full [perspective:1400px]">
          <Header translate={translateY} titleComponent={titleComponent} />

          <motion.div
            style={{
              rotateX,
              rotateZ,
              scale,
              y: translateY,
              opacity,
              transformStyle: "preserve-3d",
            }}
            className="relative w-full [transform-style:preserve-3d]"
          >
            <div
              className={cn(
                "relative rounded-[32px] border border-stone-500/20 bg-gradient-to-b from-stone-400/10 via-stone-900/20 to-transparent p-[1px] shadow-[0_40px_100px_-50px_rgba(40,25,15,0.65)] backdrop-blur-xl",
                tintClassName,
              )}
            >
              <div
                ref={frameRef}
                onMouseMove={handleMove}
                onMouseLeave={pointer.reset}
                className={cn(
                  "relative overflow-hidden rounded-[30px] border border-stone-500/15 bg-card/50 shadow-inner",
                  frameClassName,
                )}
              >
                {!reducedMotion && (
                  <DynamicLighting
                    rotateX={pointer.rotateX}
                    rotateY={pointer.rotateY}
                    spotlightX={pointer.spotlightX}
                    spotlightY={pointer.spotlightY}
                  />
                )}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_color-mix(in_oklch,var(--primary)_22%,transparent),transparent_55%)] opacity-90" />
                <div className="pointer-events-none absolute inset-0 grain mix-blend-soft-light opacity-[0.18]" />
                <div className="relative z-10">{children}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export const ContainerScrollTitle = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: string | React.ReactNode;
}) => {
  return (
    <motion.div style={{ y: translate }} className="mx-auto mb-10 max-w-4xl text-center">
      {typeof titleComponent === "string" ? (
        <h3 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          {titleComponent}
        </h3>
      ) : (
        titleComponent
      )}
    </motion.div>
  );
};

export const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: string | React.ReactNode;
}) => {
  return <ContainerScrollTitle translate={translate} titleComponent={titleComponent} />;
};
