import Link from "next/link";

import { profile } from "@/data/profile";
import { socials } from "@/data/socials";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-500/15 bg-background/85 py-10 text-sm text-muted-foreground backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="font-medium text-foreground">{profile.name}</p>
          <p className="mt-1 max-w-md text-xs leading-relaxed sm:text-sm">{profile.tagline}</p>
        </div>
        <div className="flex flex-wrap gap-4 text-xs sm:text-sm">
          {socials.map((social) => {
            const external = social.href.startsWith("http");
            return (
              <Link
                key={social.id}
                href={social.href}
                className="transition hover:text-foreground"
                {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                {social.label}
              </Link>
            );
          })}
        </div>
        <p className="text-xs sm:text-sm">
          © {year} · Сделано на Next.js · Екатеринбург
        </p>
      </div>
    </footer>
  );
}
