import { SmartCard } from "@/components/ui-kit/SmartCard";
import { cn } from "@/lib/utils";
import { ArrowLeft, MapPin, RadarIcon, Sliders } from "lucide-react";

export function ScanConfig({
  radius,
  onRadius,
  cat,
  onCat,
  urgent,
  onUrgent,
  onBack,
  onLaunch,
}: {
  radius: number;
  onRadius: (n: number) => void;
  cat: "all" | "services" | "ventes" | "besoins";
  onCat: (c: "all" | "services" | "ventes" | "besoins") => void;
  urgent: boolean;
  onUrgent: (b: boolean) => void;
  onBack: () => void;
  onLaunch: () => void;
}) {
  const CATS = [
    { id: "all", label: "Tout" },
    { id: "services", label: "Services" },
    { id: "ventes", label: "Ventes" },
    { id: "besoins", label: "Besoins" },
  ] as const;

  return (
    <div className="space-y-6 animate-[fade-up_0.45s_var(--ease-smooth)_both]">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-xl transition hover:bg-white/5"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <p className="ds-eyebrow" style={{ color: "var(--scan)" }}>
            Scanner
          </p>
          <h2 className="ds-display">Configurer le scan</h2>
        </div>
      </div>

      <SmartCard glow="scan" className="space-y-5">
        <div className="space-y-2">
          <div className="flex items-end justify-between">
            <label className="ds-eyebrow flex items-center gap-1.5">
              <MapPin className="h-3 w-3" /> Rayon
            </label>
            <span className="text-sm font-semibold" style={{ color: "var(--scan)" }}>
              {radius} km
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={20}
            step={1}
            value={radius}
            onChange={(e) => onRadius(Number(e.target.value))}
            className="w-full accent-[color:var(--scan)]"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>1 km</span>
            <span>20 km</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="ds-eyebrow flex items-center gap-1.5">
            <Sliders className="h-3 w-3" /> Catégorie
          </label>
          <div className="flex flex-wrap gap-1.5">
            {CATS.map((c) => {
              const active = cat === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => onCat(c.id)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                    active
                      ? "border-transparent text-foreground"
                      : "border-[var(--glass-border)] bg-white/[0.03] text-muted-foreground",
                  )}
                  style={
                    active
                      ? {
                          background: "color-mix(in oklch, var(--scan) 18%, transparent)",
                          boxShadow: "inset 0 0 0 1px var(--scan)",
                          color: "var(--scan)",
                        }
                      : undefined
                  }
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-white/[0.03] px-3.5 py-3">
          <div>
            <p className="text-sm font-medium">Urgences uniquement</p>
            <p className="text-[11px] text-muted-foreground">
              Filtrer les signaux à forte priorité
            </p>
          </div>
          <button
            onClick={() => onUrgent(!urgent)}
            className={cn("relative h-6 w-11 rounded-full transition-all", urgent ? "" : "bg-white/10")}
            style={urgent ? { background: "var(--gradient-scan)" } : undefined}
          >
            <span
              className={cn(
                "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all",
                urgent ? "left-[22px]" : "left-0.5",
              )}
            />
          </button>
        </div>
      </SmartCard>

      <button
        onClick={onLaunch}
        className="flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-[15px] font-semibold text-white transition-all active:scale-[0.98]"
        style={{
          background: "var(--gradient-scan)",
          boxShadow: "0 0 30px -8px var(--scan)",
        }}
      >
        <RadarIcon className="h-4 w-4" /> Lancer le scan
      </button>
      <p className="text-center text-[11px] text-muted-foreground">
        Le scan analyse l'écosystème pendant quelques secondes.
      </p>
    </div>
  );
}
