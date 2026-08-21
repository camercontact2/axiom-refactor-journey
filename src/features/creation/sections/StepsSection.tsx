import { SmartCard } from "@/components/ui-kit/SmartCard";
import { DetailDialog } from "@/components/ui-kit/DetailDialog";
import { ACCENT, STEPS } from "../data";

export function StepsSection() {
  return (
    <section className="space-y-3" aria-labelledby="steps-heading">
      <h3
        id="steps-heading"
        className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
      >
        Comment ça se passe
      </h3>
      <div className="grid gap-3 sm:grid-cols-3">
        {STEPS.map((s) => (
          <DetailDialog
            key={s.title}
            accent={ACCENT}
            eyebrow={`Étape ${s.step}`}
            title={s.title}
            summary={s.summary}
            steps={s.detailSteps}
            primaryCta={{ label: "C'est parti" }}
            secondaryCta={{ label: "Fermer" }}
            trigger={
              <button type="button" className="text-left">
                <SmartCard className="flex h-full flex-col gap-3 transition-all hover:-translate-y-0.5">
                  <div className="flex items-center justify-between">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-xl"
                      style={{
                        background: `color-mix(in oklch, ${ACCENT} 15%, transparent)`,
                        color: ACCENT,
                      }}
                      aria-hidden
                    >
                      <s.icon className="h-4 w-4" />
                    </div>
                    <span
                      className="text-[10px] font-mono"
                      style={{ color: ACCENT }}
                    >
                      {s.step}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold">{s.title}</p>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {s.desc}
                    </p>
                  </div>
                </SmartCard>
              </button>
            }
          />
        ))}
      </div>
    </section>
  );
}
