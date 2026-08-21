import { cn } from "@/lib/utils";
import { Brain, Check, Radar } from "lucide-react";
import { ANALYSIS_STEPS } from "../data";

export function AnalyzingView({ need, step }: { need: string; step: number }) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 animate-[fade-up_0.5s_var(--ease-smooth)_both]">
      {/* Radar waves */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 160,
              height: 160,
              border: "1px solid color-mix(in oklch, var(--radar) 40%, transparent)",
              animation: `pulse-ring 3s ease-out infinite ${i * 0.7}s`,
            }}
          />
        ))}
        <div
          className="absolute h-72 w-72 rounded-full blur-3xl opacity-40"
          style={{ background: "var(--gradient-radar)" }}
        />
      </div>

      {/* Core orb */}
      <div className="relative mb-10">
        <div
          className="flex h-28 w-28 items-center justify-center rounded-full"
          style={{
            background: "var(--gradient-radar)",
            boxShadow: "0 0 80px -10px var(--radar), inset 0 1px 0 0 oklch(1 0 0 / 0.2)",
            animation: "breathing 2.5s ease-in-out infinite",
          }}
        >
          <Brain className="h-10 w-10 text-white" />
        </div>
      </div>

      <p className="relative max-w-sm text-center text-sm text-muted-foreground italic mb-2">
        « {need} »
      </p>
      <h2 className="relative text-xl font-light tracking-tight mb-8 text-center">
        L'écosystème vous comprend…
      </h2>

      {/* Steps */}
      <div className="relative w-full max-w-md space-y-2">
        {ANALYSIS_STEPS.map((s, i) => {
          const Icon = s.icon;
          const active = i === step;
          const done = i < step;
          return (
            <div
              key={i}
              className="glass-surface flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-500"
              style={{
                opacity: i > step ? 0.3 : 1,
                transform: active ? "scale(1.02)" : "scale(1)",
                boxShadow: active
                  ? "var(--shadow-glass), 0 0 30px -10px var(--radar)"
                  : "var(--shadow-glass)",
              }}
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                style={{
                  background: done || active ? "color-mix(in oklch, var(--radar) 20%, transparent)" : "var(--surface-2)",
                  color: done || active ? "var(--radar)" : "var(--muted-foreground)",
                }}
              >
                {done ? <Check className="h-4 w-4" /> : <Icon className={cn("h-4 w-4", active && "animate-pulse")} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-tight">{s.label}</p>
                <p className="text-[11px] text-muted-foreground">{s.hint}</p>
              </div>
              {active && (
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-[var(--radar)] animate-ping" />
                  <span className="relative h-2 w-2 rounded-full bg-[var(--radar)]" />
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
