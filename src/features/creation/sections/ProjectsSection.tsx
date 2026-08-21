import { Link } from "@tanstack/react-router";
import { SmartCard } from "@/components/ui-kit/SmartCard";
import { DetailDialog } from "@/components/ui-kit/DetailDialog";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { ACCENT, PROJECTS } from "@/features/creation/data";
import { ACCENT, PROJECTS } from "../data";

export function ProjectsSection() {
  return (
    <section
      id="projets"
      className="space-y-3 scroll-mt-20"
      aria-labelledby="projects-heading"
    >
      <div className="flex items-end justify-between gap-2">
        <h3
          id="projects-heading"
          className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
        >
          Projets qui bougent maintenant
        </h3>
        <Link
          to="/radar"
          className="inline-flex items-center gap-1 text-[11px] font-medium"
          style={{ color: ACCENT }}
        >
          Voir tout <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {PROJECTS.map((p) => (
          <SmartCard
            key={p.title}
            className="flex flex-col gap-3 transition-all hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-snug">
                  {p.title}
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {p.by} · {p.members} contributeurs
                </p>
              </div>
              <span
                className="shrink-0 rounded-full px-2 py-0.5 text-[10px]"
                style={{
                  background: `color-mix(in oklch, ${ACCENT} 12%, transparent)`,
                  color: ACCENT,
                }}
              >
                {p.status}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {p.needs.map((n) => (
                <span
                  key={n}
                  className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-muted-foreground"
                >
                  cherche · {n}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <DetailDialog
                accent={ACCENT}
                eyebrow={p.status}
                title={p.title}
                summary={p.summary}
                meta={[
                  { label: "Porté par", value: p.by },
                  { label: "Équipe", value: `${p.members} pers.` },
                  { label: "Cherche", value: p.needs.join(", ") },
                  { label: "Statut", value: p.status },
                ]}
                steps={p.steps}
                primaryCta={{ label: "Rejoindre l'équipe" }}
                secondaryCta={{ label: "Envoyer un message" }}
                trigger={
                  <Button
                    size="sm"
                    className="flex-1 rounded-xl"
                    style={{ background: ACCENT, color: "var(--background)" }}
                  >
                    Voir le projet
                  </Button>
                }
              />
              <Button
                asChild
                size="sm"
                variant="outline"
                className="rounded-xl border-white/10"
              >
                <Link to="/messages">
                  <MessageCircle className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </SmartCard>
        ))}
      </div>
    </section>
  );
}
