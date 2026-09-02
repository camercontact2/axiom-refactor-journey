import { SmartCard } from "@/components/ui-kit/SmartCard";
import { MapPin, Tag } from "lucide-react";
import { TYPES } from "../data";
import { useRecentFlashes } from "../hooks/useFlashes";

function ago(iso: string) {
  const min = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (min < 60) return `il y a ${min} min`;
  const h = Math.round(min / 60);
  if (h < 24) return `il y a ${h} h`;
  return `il y a ${Math.round(h / 24)} j`;
}

export function RecentFlashes() {
  const { data, isLoading } = useRecentFlashes();
  const lookup = (k: string) => TYPES.find((t) => t.id === k) ?? TYPES[0];

  return (
    <section className="space-y-2">
      <div className="flex items-end justify-between px-1">
        <h3 className="text-sm font-medium text-muted-foreground">Flashs récents</h3>
        <span className="text-[11px] text-muted-foreground/70">Mises à jour live</span>
      </div>

      {isLoading && <p className="px-1 text-sm text-muted-foreground">Chargement…</p>}
      {!isLoading && (data?.length ?? 0) === 0 && (
        <SmartCard className="p-4">
          <p className="text-sm text-muted-foreground">
            Aucun Flash pour le moment. Publie le premier !
          </p>
        </SmartCard>
      )}

      <div className="grid grid-cols-1 gap-2">
        {(data ?? []).map((r) => {
          const t = lookup(r.type);
          const Icon = t.icon;
          return (
            <SmartCard key={r.id} className="p-3.5">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{
                    background: `color-mix(in oklch, ${t.tint} 22%, transparent)`,
                    color: t.tint,
                  }}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
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
                    <span className="text-[11px] text-muted-foreground">{ago(r.created_at)}</span>
                  </div>
                  <p className="truncate text-sm font-medium">{r.title}</p>
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                    {r.city && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3" aria-hidden="true" />
                        {r.city}
                      </span>
                    )}
                    {r.price && (
                      <span className="inline-flex items-center gap-1">
                        <Tag className="h-3 w-3" aria-hidden="true" />
                        {r.price}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </SmartCard>
          );
        })}
      </div>
    </section>
  );
}
