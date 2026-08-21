import { Link } from "@tanstack/react-router";
import { SmartCard } from "@/components/ui-kit/SmartCard";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Compass } from "lucide-react";
import { ACCENT } from "../data";

export function FooterNavSection() {
  return (
    <SmartCard className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
      <div className="flex items-center gap-3">
        <Compass className="h-5 w-5" style={{ color: ACCENT }} />
        <div>
          <p className="text-sm font-medium">Continuer l'exploration</p>
          <p className="text-[11px] text-muted-foreground">
            Espace de création, Radar local et plus
          </p>
        </div>
      </div>
      <div className="flex w-full gap-2 sm:w-auto">
        <Button
          asChild
          size="sm"
          variant="outline"
          className="flex-1 rounded-xl border-white/10 sm:flex-none"
        >
          <Link to="/creation">
            Création <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
        <Button
          asChild
          size="sm"
          variant="outline"
          className="flex-1 rounded-xl border-white/10 sm:flex-none"
        >
          <Link to="/">Accueil</Link>
        </Button>
      </div>
    </SmartCard>
  );
}
