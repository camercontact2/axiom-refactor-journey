import { Link } from "@tanstack/react-router";
import { SmartCard } from "@/components/ui-kit/SmartCard";
import { DetailDialog } from "@/components/ui-kit/DetailDialog";
import { Button } from "@/components/ui/button";
import { Heart, ShieldCheck } from "lucide-react";
import { ACCENT } from "@/features/talents/data";
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
              3 minutes chrono : un titre, deux lignes, tes dispos. On
              s'occupe du reste et on t'accompagne pour tes premières
              rencontres. Promis, ça fait pas mal.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <DetailDialog
            accent={ACCENT}
            eyebrow="Créer ma fiche"
            title="Je crée ma fiche talent"
            summary="On t'aide à présenter ton savoir-faire en une fiche claire, humaine et trouvable par les voisins."
            steps={[
              "Titre + 2 lignes pour dire ce que tu transmets.",
              "Tes dispos (jours/heures) et ton coin.",
              "Une photo, un prix libre — et c'est en ligne.",
            ]}
            meta={[
              { label: "Temps", value: "≈ 3 minutes" },
              { label: "Coût", value: "Gratuit" },
              { label: "Modération", value: "Humaine" },
              { label: "Visibilité", value: "Quartier d'abord" },
            ]}
            primaryCta={{ label: "Démarrer ma fiche" }}
            secondaryCta={{ label: "Plus tard" }}
            trigger={
              <Button
                size="sm"
                className="w-full rounded-xl"
                style={{ background: ACCENT, color: "var(--background)" }}
              >
                Je crée ma fiche talent
              </Button>
            }
          />
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
