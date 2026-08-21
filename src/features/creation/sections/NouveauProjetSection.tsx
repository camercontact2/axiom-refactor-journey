import { Link } from "@tanstack/react-router";
import { SmartCard } from "@/components/ui-kit/SmartCard";
import { DetailDialog } from "@/components/ui-kit/DetailDialog";
import { Button } from "@/components/ui/button";
import { GraduationCap, Plus, Sparkles } from "lucide-react";
import { ACCENT } from "@/features/creation/data";
import { ACCENT } from "../data";

export function NouveauProjetSection() {
  return (
    <section id="nouveau" className="scroll-mt-20">
      <SmartCard glow="flash" className="space-y-4">
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
            <h3 className="text-base font-semibold">
              Prêt à lancer ton truc ?
            </h3>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Un titre, une intention, deux mots sur qui tu cherches —
              c'est suffisant pour démarrer. T'enrichis la fiche plus
              tard, t'inquiète.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <DetailDialog
            accent={ACCENT}
            eyebrow="Nouveau projet"
            title="Je crée mon projet"
            summary="On t'aide à poser ton projet en une fiche claire, ouverte à la collab et facile à faire vivre."
            steps={[
              "Titre + intention en 2 lignes.",
              "Coche les rôles que tu cherches.",
              "Publie ta fiche et reçois les premiers messages.",
            ]}
            meta={[
              { label: "Temps", value: "≈ 4 minutes" },
              { label: "Coût", value: "Gratuit" },
              { label: "Modification", value: "À tout moment" },
              { label: "Visibilité", value: "Tu choisis" },
            ]}
            primaryCta={{ label: "Démarrer mon projet" }}
            secondaryCta={{ label: "Plus tard" }}
            trigger={
              <Button
                size="sm"
                className="w-full rounded-xl"
                style={{ background: ACCENT, color: "var(--background)" }}
              >
                <Plus className="h-3.5 w-3.5" /> Je crée mon projet
              </Button>
            }
          />
          <Button
            asChild
            size="sm"
            variant="outline"
            className="w-full rounded-xl border-white/10"
          >
            <Link to="/talents">
              <GraduationCap className="h-3.5 w-3.5" /> Trouver un mentor
            </Link>
          </Button>
        </div>
      </SmartCard>
    </section>
  );
}
