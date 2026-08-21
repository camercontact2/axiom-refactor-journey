import { DetailDialog } from "@/components/ui-kit/DetailDialog";
import { ACCENT, CATEGORIES } from "../data";

export function CategoriesSection() {
  return (
    <section
      id="categories"
      className="space-y-3 scroll-mt-20"
      aria-labelledby="categories-heading"
    >
      <div className="flex items-end justify-between gap-2">
        <h3
          id="categories-heading"
          className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
        >
          Ça se passe par catégorie
        </h3>
        <span className="text-[11px] text-muted-foreground">
          {CATEGORIES.reduce((a, c) => a + c.count, 0)} talents recensés
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {CATEGORIES.map((c) => (
          <DetailDialog
            key={c.label}
            accent={ACCENT}
            eyebrow="Catégorie"
            title={c.label}
            summary={c.hint}
            meta={[
              { label: "Talents actifs", value: `${c.count}` },
              { label: "Format", value: "Atelier · 1-3h" },
              { label: "Tarif", value: "Libre / solidaire" },
              { label: "Près de chez toi", value: "Activé" },
            ]}
            steps={[
              "Explore les talents de cette catégorie autour de toi.",
              "Discute en DM avec celui ou celle qui te parle.",
              "Réserve ta première session — ça démarre comme ça.",
            ]}
            primaryCta={{ label: `Voir les ${c.label.toLowerCase()}` }}
            secondaryCta={{ label: "Fermer" }}
            trigger={
              <button
                type="button"
                className="glass-surface group flex w-full flex-col items-start gap-1.5 rounded-2xl p-3 text-left transition-all hover:-translate-y-0.5"
              >
                <c.icon
                  className="h-4 w-4"
                  style={{ color: ACCENT }}
                  aria-hidden
                />
                <span className="text-sm font-medium leading-tight">
                  {c.label}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {c.count} talents
                </span>
              </button>
            }
          />
        ))}
      </div>
    </section>
  );
}
