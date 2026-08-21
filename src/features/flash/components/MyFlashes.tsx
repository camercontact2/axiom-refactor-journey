import { ChevronRight, Eye, Users } from "lucide-react";
import { TYPES, MINE } from "../data";

export function MyFlashes() {
  const lookup = (k: string) => TYPES.find((t) => t.id === k)!;
  return (
    <section className="space-y-2">
      <div className="flex items-end justify-between px-1">
        <h3 className="text-sm font-medium text-muted-foreground">Mes flashs</h3>
        <button className="text-[11px] text-muted-foreground hover:text-foreground">Tout voir</button>
      </div>
      <div className="glass-surface overflow-hidden rounded-2xl">
        {MINE.map((m, i) => {
          const t = lookup(m.type);
          const Icon = t.icon;
          return (
            <div
              key={i}
              className="flex items-center gap-3 px-3 py-2.5"
              style={i < MINE.length - 1 ? { borderBottom: "1px solid var(--glass-border)" } : undefined}
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                style={{
                  background: `color-mix(in oklch, ${t.tint} 18%, transparent)`,
                  color: t.tint,
                }}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{m.title}</p>
                <div className="mt-0.5 flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span style={{ color: m.color }}>● {m.status}</span>
                  <span className="inline-flex items-center gap-1"><Eye className="h-3 w-3" />{m.views}</span>
                  <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" />{m.msgs}</span>
                  <span className="ml-auto">{m.time}</span>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
