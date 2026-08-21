import { SmartCard } from "@/components/ui-kit/SmartCard";
import { ChevronRight, MapPin, Tag } from "lucide-react";
import { TYPES, RECENT } from "../data";

export function RecentFlashes() {
  const lookup = (k: string) => TYPES.find((t) => t.id === k)!;
  return (
    <section className="space-y-2">
      <div className="flex items-end justify-between px-1">
        <h3 className="text-sm font-medium text-muted-foreground">Inspiration récente</h3>
        <span className="text-[11px] text-muted-foreground/70">Mises à jour live</span>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {RECENT.map((r, i) => {
          const t = lookup(r.type);
          const Icon = t.icon;
          return (
            <SmartCard key={i} className="p-3.5">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{
                    background: `color-mix(in oklch, ${t.tint} 22%, transparent)`,
                    color: t.tint,
                  }}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="rounded-full px-1.5 py-0.5 text-[10px] font-medium"
                      style={{
                        background: `color-mix(in oklch, ${t.tint} 16%, transparent)`,
                        color: t.tint,
                      }}
                    >
                      {t.label}
                    </span>
                    <span className="text-[11px] text-muted-foreground">{r.time}</span>
                  </div>
                  <p className="truncate text-sm font-medium">{r.title}</p>
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{r.where}</span>
                    {r.price !== "—" && (
                      <span className="inline-flex items-center gap-1"><Tag className="h-3 w-3" />{r.price}</span>
                    )}
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </SmartCard>
          );
        })}
      </div>
    </section>
  );
}
