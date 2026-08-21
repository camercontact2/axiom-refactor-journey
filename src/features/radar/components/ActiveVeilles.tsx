import { BellRing, ChevronRight, Clock } from "lucide-react";
import { VEILLES } from "../data";
import { SectionHeader } from "./SectionHeader";

export function ActiveVeilles() {
  return (
    <section className="space-y-2">
      <SectionHeader icon={BellRing} label="MES VEILLES" color="var(--radar)" action="Tout voir" />
      <div className="glass-surface overflow-hidden rounded-2xl">
        {VEILLES.map((v, i) => (
          <button
            key={v.id}
            type="button"
            className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition active:bg-white/[0.04]"
            style={i < VEILLES.length - 1 ? { borderBottom: "1px solid var(--glass-border)" } : undefined}
          >
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
              style={{
                background: `color-mix(in oklch, ${v.color} 18%, transparent)`,
                color: v.color,
                boxShadow: `inset 0 0 0 1px color-mix(in oklch, ${v.color} 30%, transparent)`,
              }}
            >
              <BellRing className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-medium leading-tight">{v.label}</p>
              <div className="mt-0.5 flex items-center gap-2 text-[10.5px] text-muted-foreground">
                <span
                  className="rounded-full px-1.5 py-px text-[10px] font-semibold"
                  style={{
                    background: `color-mix(in oklch, ${v.color} 18%, transparent)`,
                    color: v.color,
                  }}
                >
                  +{v.matches}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {v.fresh}
                </span>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/60" />
          </button>
        ))}
      </div>
    </section>
  );
}
