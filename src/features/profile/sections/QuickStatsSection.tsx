import { STATS } from "../data";

export function QuickStatsSection() {
  return (
    <section className="space-y-2">
      <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Aperçu
      </h3>
      <div className="grid grid-cols-4 gap-2">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="glass-surface flex flex-col items-center gap-1 rounded-2xl p-3"
          >
            <s.icon className="h-4 w-4" style={{ color: s.color }} />
            <span className="text-base font-semibold leading-none">{s.value}</span>
            <span className="text-[10px] text-muted-foreground">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
