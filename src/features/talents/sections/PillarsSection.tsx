import { SmartCard } from "@/components/ui-kit/SmartCard";
import { DetailDialog } from "@/components/ui-kit/DetailDialog";
import { ArrowUpRight } from "lucide-react";
import { ACCENT, PILLARS } from "@/features/talents/data";
import { ACCENT, PILLARS } from "../data";

export function PillarsSection() {
  return (
    <section className="space-y-3" aria-labelledby="pillars-heading">
      <h3
        id="pillars-heading"
        className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
      >
        3 façons d'y prendre part
      </h3>
      <div className="grid gap-3 sm:grid-cols-3">
        {PILLARS.map((p) => (
          <DetailDialog
            key={p.title}
            accent={ACCENT}
            eyebrow="Mode d'emploi"
            title={p.title}
            summary={p.summary}
            steps={[...p.steps]}
            primaryCta={{ label: p.cta2 }}
            secondaryCta={{ label: "Plus tard" }}
            trigger={
              <button
                type="button"
                className="block w-full text-left rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{ outlineColor: ACCENT }}
              >
                <SmartCard className="flex h-full flex-col gap-3 transition-all hover:-translate-y-0.5">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{
                      background: `color-mix(in oklch, ${ACCENT} 15%, transparent)`,
                      color: ACCENT,
                    }}
                    aria-hidden
                  >
                    <p.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-semibold">{p.title}</p>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {p.desc}
                    </p>
                  </div>
                  <span
                    className="inline-flex items-center gap-1 text-xs font-medium"
                    style={{ color: ACCENT }}
                  >
                    {p.cta} <ArrowUpRight className="h-3 w-3" />
                  </span>
                </SmartCard>
              </button>
            }
          />
        ))}
      </div>
    </section>
  );
}
