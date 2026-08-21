import { SmartCard } from "@/components/ui-kit/SmartCard";
import { Button } from "@/components/ui/button";
import { Plus, Rocket, Users } from "lucide-react";
import { ACCENT } from "@/features/creation/data";
import { ACCENT } from "../data";

export function HeroSection() {
  return (
    <SmartCard glow="flash" className="space-y-5">
      <div className="flex items-start gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl"
          style={{
            background: `color-mix(in oklch, ${ACCENT} 18%, transparent)`,
            color: ACCENT,
          }}
          aria-hidden
        >
          <Rocket className="h-5 w-5" />
        </div>
        <div className="flex-1 space-y-1">
          <h2 className="text-base font-semibold leading-snug">
            Sors ton projet du carton. À ton rythme.
          </h2>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Que tu écrives, dessines, filmes ou bidouilles — ici c'est un
            cadre vivant pour avancer en équipe, trouver les bonnes
            personnes et publier tes étapes sans pression.
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
          <a href="#nouveau">
            <Plus className="h-3.5 w-3.5" /> Je lance mon projet
          </a>
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="w-full rounded-xl border-white/10"
          asChild
        >
          <a href="#projets">
            <Users className="h-3.5 w-3.5" /> Rejoindre une équipe
          </a>
        </Button>
      </div>
    </SmartCard>
  );
}
