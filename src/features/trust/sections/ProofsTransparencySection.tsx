import { SmartCard } from "@/components/ui-kit/SmartCard";
import { BadgeCheck, FileCheck } from "lucide-react";
import { EmptyGuide } from "@/components/ui-kit/EmptyGuide";
import { PROOFS } from "../data";

export function ProofsTransparencySection() {
  return (
    <section className="space-y-3">
      <h3 className="px-1 text-sm font-medium text-muted-foreground">Preuves & transparence</h3>
      {PROOFS.length === 0 ? (
        <EmptyGuide
          color="var(--trust)"
          icon={<FileCheck className="h-4 w-4" />}
          title="Aucune preuve déposée"
          description="Les documents et photos que vous ajoutez rassurent les personnes avant un échange."
          steps={[
            "Complétez d'abord votre profil (nom, ville, présentation).",
            "Ajoutez une pièce d'identité ou une certification.",
            "Ajoutez une photo de votre activité ou de votre atelier.",
          ]}
          actions={[{ label: "Compléter mon profil", to: "/profile" }]}
        />
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {PROOFS.map((p) => {
            const Icon = p.icon;
            return (
              <SmartCard key={p.label} className="space-y-2">
                <div
                  className="flex h-20 items-center justify-center rounded-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, color-mix(in oklch, var(--trust) 14%, transparent), transparent)",
                  }}
                >
                  <Icon className="h-6 w-6" style={{ color: "var(--trust)" }} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="truncate text-xs">{p.label}</span>
                  <BadgeCheck className="h-3.5 w-3.5" style={{ color: "var(--trust)" }} />
                </div>
              </SmartCard>
            );
          })}
        </div>
      )}
    </section>
  );
}
