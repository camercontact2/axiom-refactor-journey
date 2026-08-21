import { DetailDialog } from "@/components/ui-kit/DetailDialog";
import { ACCENT, STUDIOS } from "@/features/creation/data";
import { ACCENT, STUDIOS } from "../data";

export function StudiosSection() {
  return (
    <section className="space-y-3" aria-labelledby="studios-heading">
      <div className="flex items-end justify-between gap-2">
        <h3
          id="studios-heading"
          className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
        >
          Studios actifs
        </h3>
        <span className="text-[11px] text-muted-foreground">
          {STUDIOS.reduce((a, s) => a + s.count, 0)} projets en cours
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {STUDIOS.map((s) => (
          <DetailDialog
            key={s.label}
            accent={ACCENT}
            eyebrow="Studio"
            title={s.label}
            summary={s.summary}
            meta={[
              { label: "Projets actifs", value: `${s.count}` },
              { label: "Format", value: s.hint },
              { label: "Tarif", value: "Libre" },
              { label: "Niveau", value: "Tous niveaux" },
            ]}
            steps={s.steps}
            primaryCta={{ label: `Ouvrir ${s.label}` }}
            secondaryCta={{ label: "Fermer" }}
            trigger={
              <button
                type="button"
                className="glass-surface group flex w-full flex-col items-start gap-1.5 rounded-2xl p-3 text-left transition-all hover:-translate-y-0.5"
              >
                <s.icon
                  className="h-4 w-4"
                  style={{ color: ACCENT }}
                  aria-hidden
                />
                <span className="text-sm font-semibold leading-tight">
                  {s.label}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {s.hint}
                </span>
                <span
                  className="mt-1 rounded-full px-2 py-0.5 text-[10px]"
                  style={{
                    background: `color-mix(in oklch, ${ACCENT} 12%, transparent)`,
                    color: ACCENT,
                  }}
                >
                  {s.count} projets
                </span>
              </button>
            }
          />
        ))}
      </div>
    </section>
  );
}
