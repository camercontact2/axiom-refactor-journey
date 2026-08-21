import { SmartCard } from "@/components/ui-kit/SmartCard";
import { USER, LEVELS } from "../data";

export function StatusSystemSection() {
  return (
    <section className="space-y-2">
      <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Statut utilisateur
      </h3>
      <SmartCard className="space-y-3">
        <div className="grid grid-cols-4 gap-1.5">
          {LEVELS.map((lvl, i) => {
            const active = lvl.label === USER.status;
            const reached = i <= LEVELS.findIndex((l) => l.label === USER.status);
            return (
              <div
                key={lvl.key}
                className="flex flex-col items-center gap-1.5 text-center"
              >
                <div
                  className="h-1 w-full rounded-full"
                  style={{
                    background: reached
                      ? "var(--trust)"
                      : "color-mix(in oklch, var(--foreground) 10%, transparent)",
                  }}
                />
                <span
                  className={`text-[10px] font-medium ${active ? "" : "text-muted-foreground"}`}
                  style={active ? { color: "var(--trust)" } : undefined}
                >
                  {lvl.label}
                </span>
              </div>
            );
          })}
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">Confirmé</span> — Identité vérifiée.
          Continuez à publier régulièrement pour passer au statut Pro.
        </p>
      </SmartCard>
    </section>
  );
}
