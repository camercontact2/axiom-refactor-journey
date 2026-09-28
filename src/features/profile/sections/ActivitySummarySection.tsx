import { SmartCard } from "@/components/ui-kit/SmartCard";
import { EmptyGuide } from "@/components/ui-kit/EmptyGuide";
import { ACTIVITY } from "../data";

export function ActivitySummarySection() {
  return (
    <section className="space-y-2">
      <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Activité récente
      </h3>
      {ACTIVITY.length === 0 ? (
        <EmptyGuide
          title="Votre histoire commence ici"
          description="Vos publications, échanges et recherches apparaîtront dans ce fil."
          steps={[
            "Complétez votre profil pour inspirer confiance.",
            "Publiez votre premier Flash.",
            "Lancez une recherche Radar.",
          ]}
          actions={[
            { label: "Publier un Flash", to: "/flash" },
            { label: "Explorer avec Scan", to: "/scan" },
          ]}
        />
      ) : (
        <SmartCard className="divide-y divide-white/5 p-0">
          {ACTIVITY.map((a, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3">
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
                style={{
                  background: `color-mix(in oklch, ${a.color} 15%, transparent)`,
                  color: a.color,
                }}
              >
                <a.icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm">{a.title}</p>
                <p className="text-[11px] text-muted-foreground">{a.meta}</p>
              </div>
              <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-muted-foreground">
                {a.tag}
              </span>
            </div>
          ))}
        </SmartCard>
      )}
    </section>
  );
}
