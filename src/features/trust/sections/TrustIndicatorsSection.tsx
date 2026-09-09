import { SmartCard } from "@/components/ui-kit/SmartCard";
import { Gauge } from "lucide-react";
import { EmptyGuide } from "@/components/ui-kit/EmptyGuide";
import { INDICATORS } from "../data";

export function TrustIndicatorsSection() {
  return (
    <section className="space-y-3">
      <h3 className="px-1 text-sm font-medium text-muted-foreground">Indicateurs</h3>
      {INDICATORS.length === 0 ? (
        <EmptyGuide
          color="var(--trust)"
          icon={<Gauge className="h-4 w-4" />}
          title="Indicateurs en attente de données"
          description="Temps de réponse, satisfaction et régularité se calculent à partir de vos échanges réels."
          steps={[
            "Répondez à vos premiers messages.",
            "Terminez au moins un échange.",
            "Les mesures se remplissent automatiquement ici.",
          ]}
          actions={[{ label: "Voir mes messages", to: "/messages" }]}
        />
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {INDICATORS.map((ind) => {
            const Icon = ind.icon;
            return (
              <SmartCard key={ind.label} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Icon className="h-4 w-4" style={{ color: "var(--trust)" }} />
                  <span className="text-[11px] text-muted-foreground">{ind.value}</span>
                </div>
                <p className="text-xs text-foreground/80">{ind.label}</p>
                <div className="h-1 w-full overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${ind.pct}%`, background: "var(--gradient-trust)" }}
                  />
                </div>
              </SmartCard>
            );
          })}
        </div>
      )}
    </section>
  );
}
