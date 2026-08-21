import { cn } from "@/lib/utils";
import { ArrowLeft, Bell, BellRing, Eye, Plus, Sparkles } from "lucide-react";
import { MOCK_RESULTS, ASSISTANT_HINTS } from "../data";
import { MatchCard } from "./MatchCard";

export function ResultsView({
  need,
  veilleOn,
  onToggleVeille,
  onBack,
}: {
  need: string;
  veilleOn: boolean;
  onToggleVeille: () => void;
  onBack: () => void;
}) {
  return (
    <div className="min-h-screen pb-12 animate-[fade-up_0.5s_var(--ease-smooth)_both]">
      {/* Header */}
      <header className="sticky top-0 z-10 -mx-4 mb-4 backdrop-blur-xl bg-background/70 px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-muted/50 transition"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Votre intention</p>
            <p className="truncate text-sm font-medium">« {need} »</p>
          </div>
          <button
            onClick={onToggleVeille}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all",
              veilleOn
                ? "text-white shadow-[0_0_20px_-6px_var(--radar)]"
                : "bg-muted/40 text-muted-foreground hover:bg-muted/60"
            )}
            style={veilleOn ? { background: "var(--gradient-radar)" } : undefined}
          >
            {veilleOn ? <BellRing className="h-3.5 w-3.5" /> : <Bell className="h-3.5 w-3.5" />}
            <span>{veilleOn ? "Veille active" : "Activer la veille"}</span>
          </button>
        </div>
      </header>

      {/* Summary */}
      <section className="mb-5">
        <div
          className="glass-surface relative overflow-hidden rounded-2xl p-4"
          style={{ boxShadow: "var(--shadow-glass), 0 0 40px -20px var(--radar)" }}
        >
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-30 blur-3xl" style={{ background: "var(--gradient-radar)" }} />
          <div className="relative flex items-start gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl"
              style={{
                background: "color-mix(in oklch, var(--radar) 18%, transparent)",
                color: "var(--radar)",
              }}
            >
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm leading-relaxed">
                J'ai exploré l'écosystème et identifié <span className="font-semibold" style={{ color: "var(--radar)" }}>3 humains compatibles</span> avec votre intention.
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Classés par compatibilité, confiance et disponibilité.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Veille confirmation */}
      {veilleOn && (
        <div
          className="glass-surface mb-5 flex items-center gap-3 rounded-2xl p-3 animate-[fade-up_0.3s_var(--ease-smooth)_both]"
          style={{ boxShadow: "0 0 24px -10px var(--radar)" }}
        >
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl"
            style={{ background: "color-mix(in oklch, var(--radar) 20%, transparent)", color: "var(--radar)" }}
          >
            <Eye className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">L'écosystème continue de chercher pour vous</p>
            <p className="text-[11px] text-muted-foreground">Notifications calmes dès qu'une opportunité émerge.</p>
          </div>
        </div>
      )}

      {/* Results */}
      <section className="space-y-3">
        <p className="px-1 text-xs uppercase tracking-[0.15em] text-muted-foreground/60">
          Humains compatibles
        </p>
        {MOCK_RESULTS.map((r, i) => (
          <MatchCard key={r.id} match={r} delay={i * 80} />
        ))}
      </section>

      {/* Assistant hints */}
      <section className="mt-8 space-y-3">
        <p className="px-1 text-xs uppercase tracking-[0.15em] text-muted-foreground/60">
          Affiner avec l'assistant
        </p>
        <div className="flex flex-wrap gap-2">
          {ASSISTANT_HINTS.map((h, i) => (
            <button
              key={i}
              className="glass-surface flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-foreground/80 transition hover:-translate-y-0.5 hover:text-foreground"
              style={{ boxShadow: "inset 0 0 0 1px color-mix(in oklch, var(--radar) 20%, transparent)" }}
            >
              <Plus className="h-3 w-3" style={{ color: "var(--radar)" }} />
              {h}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
