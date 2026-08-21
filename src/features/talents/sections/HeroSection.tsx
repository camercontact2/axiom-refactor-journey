import { SmartCard } from "@/components/ui-kit/SmartCard";
import { Button } from "@/components/ui/button";
import { Search, Sparkles } from "lucide-react";
import { ACCENT } from "@/features/talents/data";
import { ACCENT } from "../data";

export function HeroSection() {
  return (
    <SmartCard className="space-y-5">
      <div className="flex items-start gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl"
          style={{
            background: `color-mix(in oklch, ${ACCENT} 18%, transparent)`,
            color: ACCENT,
          }}
          aria-hidden
        >
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="flex-1 space-y-1">
          <h2 className="text-base font-semibold leading-snug">
            Ce que tu sais faire, ça vaut de l'or.
          </h2>
          <p className="text-xs leading-relaxed text-muted-foreground">
            VITALA, c'est le mégaphone des talents discrets : artisans,
            mentors, anciens, voisins qui assurent. Trouve les tiens,
            propose les tiens — gratos et près de chez toi.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Button
          size="sm"
          className="w-full rounded-xl"
          style={{ background: ACCENT, color: "var(--background)" }}
          asChild
        >
          <a href="#partager">
            <Sparkles className="h-3.5 w-3.5" /> Partager un talent
          </a>
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="w-full rounded-xl border-white/10"
          asChild
        >
          <a href="#categories">
            <Search className="h-3.5 w-3.5" /> Explorer les catégories
          </a>
        </Button>
      </div>
    </SmartCard>
  );
}
