import { Link } from "@tanstack/react-router";
import { SmartCard } from "@/components/ui-kit/SmartCard";
import { DetailDialog } from "@/components/ui-kit/DetailDialog";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, BookOpen, Calendar, MapPin, MessageCircle, Star } from "lucide-react";
import { ACCENT, FEATURED } from "@/features/talents/data";
import { ACCENT, FEATURED } from "../data";

export function FeaturedSection() {
  return (
    <section className="space-y-3" aria-labelledby="featured-heading">
      <div className="flex items-end justify-between gap-2">
        <h3
          id="featured-heading"
          className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
        >
          Frais sortis du quartier
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
        {FEATURED.map((f) => (
          <SmartCard
            key={f.name}
            className="flex flex-col gap-3 transition-all hover:-translate-y-0.5"
          >
            <div className="flex items-start gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={{
                  background: `color-mix(in oklch, ${ACCENT} 18%, transparent)`,
                  color: ACCENT,
                }}
                aria-hidden
              >
                <BookOpen className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{f.name}</p>
                <p className="truncate text-[11px] text-muted-foreground">
                  par {f.by}
                </p>
              </div>
              <span
                className="shrink-0 rounded-full px-2 py-0.5 text-[10px]"
                style={{
                  background: `color-mix(in oklch, ${ACCENT} 12%, transparent)`,
                  color: ACCENT,
                }}
              >
                {f.tag}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {f.city}
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3 w-3" /> {f.when}
              </span>
              <span className="inline-flex items-center gap-1">
                <Star className="h-3 w-3" style={{ color: ACCENT }} />
                {f.rating.toFixed(1)}
              </span>
            </div>
            <div className="flex gap-2">
              <DetailDialog
                accent={ACCENT}
                eyebrow={f.tag}
                title={f.name}
                summary={f.summary}
                meta={[
                  { label: "Hôte", value: f.by },
                  { label: "Ville", value: f.city },
                  { label: "Quand", value: f.when },
                  { label: "Durée", value: f.duration },
                  { label: "Tarif", value: f.price },
                  { label: "Note", value: `${f.rating.toFixed(1)} ★` },
                ]}
                steps={f.steps}
                primaryCta={{ label: "Réserver ma place" }}
                secondaryCta={{ label: "Envoyer un message" }}
                trigger={
                  <Button
                    size="sm"
                    className="flex-1 rounded-xl"
                    style={{ background: ACCENT, color: "var(--background)" }}
                  >
                    Voir & réserver
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
