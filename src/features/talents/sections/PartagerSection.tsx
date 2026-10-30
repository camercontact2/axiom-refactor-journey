import { Link } from "@tanstack/react-router";
import { SmartCard } from "@/components/ui-kit/SmartCard";
import { Button } from "@/components/ui/button";
import { Heart, ShieldCheck } from "lucide-react";
import { ACCENT } from "../data";

export function PartagerSection() {
  return (
    <section
      id="partager"
      className="scroll-mt-20"
      aria-labelledby="share-heading"
    >
      <SmartCard glow="radar" className="space-y-4">
        <div className="flex items-start gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl"
            style={{
              background: `color-mix(in oklch, ${ACCENT} 18%, transparent)`,
              color: ACCENT,
            }}
            aria-hidden
          >
            <Heart className="h-5 w-5" />
          </div>
          <div className="flex-1 space-y-1">
            <h3 id="share-heading" className="text-base font-semibold">
              T'as un truc à transmettre ? Lance-toi.
            </h3>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Présentez votre savoir-faire dans votre profil : une courte
              description et votre ville pour commencer.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <Button asChild size="sm" className="w-full rounded-md">
            <Link to="/profile">Je crée ma fiche talent</Link>
          </Button>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="w-full rounded-xl border-white/10"
          >
            <Link to="/trust">
              <ShieldCheck className="h-3.5 w-3.5" /> Comprendre la confiance
            </Link>
          </Button>
        </div>
      </SmartCard>
    </section>
  );
}
