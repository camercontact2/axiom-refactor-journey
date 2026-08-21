import { SmartCard } from "@/components/ui-kit/SmartCard";
import { VERIFICATIONS, BADGES } from "../data";

export function VerificationStatusSection() {
  return (
    <section className="space-y-3">
      <h3 className="px-1 text-sm font-medium text-muted-foreground">
        Statut de vérification
      </h3>
      <SmartCard className="space-y-2">
        {VERIFICATIONS.map((v, i) => {
          const Icon = v.icon;
          return (
            <div
              key={i}
              className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2.5"
            >
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4" style={{ color: "var(--trust)" }} />
                <span className="text-sm">{v.label}</span>
              </div>
              <span className="text-[11px]" style={{ color: "var(--trust)" }}>
                Vérifié
              </span>
            </div>
          );
        })}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {BADGES.map((b) => {
            const Icon = b.icon;
            return (
              <span
                key={b.label}
                className="inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[11px]"
                style={{
                  borderColor: "color-mix(in oklch, var(--trust) 35%, transparent)",
                  background: "color-mix(in oklch, var(--trust) 10%, transparent)",
                  color: "var(--trust)",
                }}
              >
                <Icon className="h-3 w-3" />
                {b.label}
              </span>
            );
          })}
        </div>
      </SmartCard>
    </section>
  );
}
