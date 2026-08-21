import { Link } from "@tanstack/react-router";
import { SmartCard } from "@/components/ui-kit/SmartCard";
import { ArrowUpRight } from "lucide-react";
import { ACCENT, RESOURCES } from "@/features/creation/data";
import { ACCENT, RESOURCES } from "../data";

export function ResourcesSection() {
  return (
    <section className="space-y-3" aria-labelledby="resources-heading">
      <h3
        id="resources-heading"
        className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
      >
        Pour aller plus loin
      </h3>
      <div className="grid gap-3 sm:grid-cols-3">
        {RESOURCES.map((r) => (
          <Link
            key={r.title}
            to={r.to}
            className="block rounded-2xl focus:outline-none"
          >
            <SmartCard className="flex h-full flex-col gap-2 transition-all hover:-translate-y-0.5">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl"
                style={{
                  background: `color-mix(in oklch, ${ACCENT} 15%, transparent)`,
                  color: ACCENT,
                }}
                aria-hidden
              >
                <r.icon className="h-4 w-4" />
              </div>
              <p className="text-sm font-semibold">{r.title}</p>
              <p className="flex-1 text-xs leading-relaxed text-muted-foreground">
                {r.desc}
              </p>
              <span
                className="inline-flex items-center gap-1 text-xs font-medium"
                style={{ color: ACCENT }}
              >
                {r.label} <ArrowUpRight className="h-3 w-3" />
              </span>
            </SmartCard>
          </Link>
        ))}
      </div>
    </section>
  );
}
