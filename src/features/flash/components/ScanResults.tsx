import { SmartCard } from "@/components/ui-kit/SmartCard";
import { ArrowLeft, MapPin, MessageCircle, RadarIcon, Sparkles } from "lucide-react";
import { SCAN_RESULTS } from "../data";

export function ScanResults({
  radius,
  onBack,
  onRescan,
}: {
  radius: number;
  onBack: () => void;
  onRescan: () => void;
}) {
  return (
    <div className="space-y-5 animate-[fade-up_0.5s_var(--ease-smooth)_both]">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-xl transition hover:bg-white/5"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="flex-1">
          <p className="ds-eyebrow" style={{ color: "var(--scan)" }}>
            Scan terminé
          </p>
          <h2 className="ds-display">{SCAN_RESULTS.length} signaux détectés</h2>
        </div>
        <button
          onClick={onRescan}
          className="rounded-full px-3 py-1.5 text-xs font-medium"
          style={{
            background: "color-mix(in oklch, var(--scan) 18%, transparent)",
            color: "var(--scan)",
            boxShadow: "inset 0 0 0 1px color-mix(in oklch, var(--scan) 35%, transparent)",
          }}
        >
          Rescanner
        </button>
      </div>

      <div
        className="glass-surface flex items-center gap-3 rounded-2xl p-3.5"
        style={{ boxShadow: "var(--shadow-glass), 0 0 32px -16px var(--scan)" }}
      >
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl"
          style={{
            background: "color-mix(in oklch, var(--scan) 18%, transparent)",
            color: "var(--scan)",
          }}
        >
          <Sparkles className="h-4 w-4" />
        </div>
        <div className="flex-1 text-xs">
          <p className="font-medium">Rayon analysé : {radius} km</p>
          <p className="text-muted-foreground">
            Classés par proximité et fraîcheur.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {SCAN_RESULTS.map((r, i) => (
          <div
            key={i}
            style={{ animation: `fade-up 0.4s var(--ease-smooth) ${i * 70}ms both` }}
          >
            <SmartCard className="p-3.5">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
                  style={{
                    background: `color-mix(in oklch, ${r.tint} 18%, transparent)`,
                    color: r.tint,
                    boxShadow: `inset 0 0 0 1px color-mix(in oklch, ${r.tint} 30%, transparent)`,
                  }}
                >
                  <RadarIcon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold"
                      style={{
                        background: `color-mix(in oklch, ${r.tint} 18%, transparent)`,
                        color: r.tint,
                      }}
                    >
                      {r.tag}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {r.time}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-sm font-semibold">
                    {r.title}
                  </p>
                  <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <MapPin className="h-3 w-3" /> {r.dist}
                  </p>
                </div>
                <button
                  className="rounded-lg p-2 transition hover:bg-white/5"
                  aria-label="Contacter"
                >
                  <MessageCircle className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </SmartCard>
          </div>
        ))}
      </div>
    </div>
  );
}
