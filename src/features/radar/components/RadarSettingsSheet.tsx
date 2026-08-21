import { cn } from "@/lib/utils";
import { Check, Layers, MapPin, ShieldCheck, Users, X } from "lucide-react";
import { RadarParams } from "../data";

export function RadarSettingsSheet({
  params,
  onChange,
  onClose,
}: {
  params: RadarParams;
  onChange: (p: RadarParams) => void;
  onClose: () => void;
}) {
  const DEPTHS = [
    { id: "fast", label: "Rapide", hint: "~3s" },
    { id: "balanced", label: "Équilibré", hint: "~6s" },
    { id: "deep", label: "Profond", hint: "~12s" },
  ] as const;

  const SCOPES = [
    { id: "all", label: "Tout" },
    { id: "humans", label: "Humains" },
    { id: "collectifs", label: "Collectifs" },
    { id: "services", label: "Services" },
  ] as const;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 backdrop-blur-sm animate-[fade-up_0.25s_var(--ease-smooth)_both]"
      onClick={onClose}
    >
      <div
        className="glass-surface relative max-h-[88vh] w-full max-w-md overflow-y-auto rounded-t-3xl p-5 pb-8 animate-[scale-in_0.35s_var(--ease-spring)_both]"
        style={{ boxShadow: "var(--shadow-float)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-wider" style={{ color: "var(--radar)" }}>
              Paramètres
            </p>
            <h2 className="text-lg font-semibold">Calibrer le radar</h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-white/5"
            aria-label="Fermer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-5">
          {/* Rayon */}
          <div className="space-y-2">
            <div className="flex items-end justify-between">
              <label className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground inline-flex items-center gap-1.5">
                <MapPin className="h-3 w-3" /> Rayon de recherche
              </label>
              <span className="text-sm font-semibold" style={{ color: "var(--radar)" }}>
                {params.radius} km
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={50}
              step={1}
              value={params.radius}
              onChange={(e) => onChange({ ...params, radius: Number(e.target.value) })}
              className="w-full accent-[color:var(--radar)]"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>1 km</span>
              <span>50 km</span>
            </div>
          </div>

          {/* Profondeur */}
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground inline-flex items-center gap-1.5">
              <Layers className="h-3 w-3" /> Profondeur d'analyse
            </label>
            <div className="grid grid-cols-3 gap-2">
              {DEPTHS.map((d) => {
                const active = params.depth === d.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => onChange({ ...params, depth: d.id })}
                    className={cn(
                      "rounded-xl border px-3 py-2.5 text-center transition-all",
                      active ? "border-transparent" : "border-[var(--glass-border)] bg-white/[0.03]",
                    )}
                    style={
                      active
                        ? {
                            background: "color-mix(in oklch, var(--radar) 18%, transparent)",
                            boxShadow: "inset 0 0 0 1px var(--radar)",
                            color: "var(--radar)",
                          }
                        : undefined
                    }
                  >
                    <p className="text-xs font-semibold">{d.label}</p>
                    <p className="text-[10px] text-muted-foreground">{d.hint}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Trust min */}
          <div className="space-y-2">
            <div className="flex items-end justify-between">
              <label className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3 w-3" /> Confiance minimale
              </label>
              <span className="text-sm font-semibold" style={{ color: "var(--trust)" }}>
                {params.trustMin}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={params.trustMin}
              onChange={(e) => onChange({ ...params, trustMin: Number(e.target.value) })}
              className="w-full accent-[color:var(--trust)]"
            />
          </div>

          {/* Scope */}
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground inline-flex items-center gap-1.5">
              <Users className="h-3 w-3" /> Cible
            </label>
            <div className="flex flex-wrap gap-1.5">
              {SCOPES.map((s) => {
                const active = params.scope === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => onChange({ ...params, scope: s.id })}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                      active ? "border-transparent" : "border-[var(--glass-border)] bg-white/[0.03] text-muted-foreground",
                    )}
                    style={
                      active
                        ? {
                            background: "color-mix(in oklch, var(--radar) 18%, transparent)",
                            boxShadow: "inset 0 0 0 1px var(--radar)",
                            color: "var(--radar)",
                          }
                        : undefined
                    }
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Disponibles */}
          <div className="flex items-center justify-between rounded-xl bg-white/[0.03] px-3.5 py-3">
            <div>
              <p className="text-sm font-medium">Disponibles uniquement</p>
              <p className="text-[11px] text-muted-foreground">
                Filtrer les profils en veille ou indisponibles
              </p>
            </div>
            <button
              onClick={() => onChange({ ...params, availableOnly: !params.availableOnly })}
              className={cn(
                "relative h-6 w-11 rounded-full transition-all",
                !params.availableOnly && "bg-white/10",
              )}
              style={params.availableOnly ? { background: "var(--gradient-radar)" } : undefined}
              aria-label="Basculer disponibles uniquement"
            >
              <span
                className={cn(
                  "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all",
                  params.availableOnly ? "left-[22px]" : "left-0.5",
                )}
              />
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-semibold text-white transition active:scale-[0.98]"
          style={{
            background: "var(--gradient-radar)",
            boxShadow: "0 0 30px -8px var(--radar)",
          }}
        >
          <Check className="h-4 w-4" /> Appliquer
        </button>
      </div>
    </div>
  );
}
