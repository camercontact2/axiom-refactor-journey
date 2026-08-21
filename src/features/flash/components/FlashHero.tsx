import { SmartCard } from "@/components/ui-kit/SmartCard";
import { Sparkles, Zap } from "lucide-react";

export function FlashHero({ onCreate }: { onCreate: () => void }) {
  return (
    <SmartCard glow="flash" className="relative overflow-hidden p-6">
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full opacity-40 blur-2xl"
        style={{ background: "var(--gradient-flash)" }}
      />
      <div className="relative space-y-4">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--glass-border)] bg-white/5 px-2.5 py-1 text-[11px] text-muted-foreground">
          <Sparkles className="h-3 w-3" style={{ color: "var(--flash)" }} />
          ~10 secondes pour publier
        </div>
        <h2 className="text-2xl font-semibold leading-tight">
          Créer une publication <span className="text-gradient-primary">Flash</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          Publiez une offre, un service ou une urgence en quelques secondes.
        </p>
        <button
          onClick={onCreate}
          className="flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-[15px] font-semibold text-[oklch(0.18_0.02_60)] transition-transform active:scale-[0.98]"
          style={{ background: "var(--gradient-flash)", boxShadow: "var(--shadow-glow-flash)" }}
        >
          <Zap className="h-4 w-4" /> Créer un Flash
        </button>
      </div>
    </SmartCard>
  );
}
