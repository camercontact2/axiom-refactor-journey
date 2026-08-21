import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { HubHeader } from "@/components/hub/HubHeader";
import { SmartCard } from "@/components/ui-kit/SmartCard";
import { PageBreadcrumb } from "@/components/ui-kit/PageBreadcrumb";
import { LivePulse } from "@/components/ui-kit/LivePulse";
import { DetailDialog } from "@/components/ui-kit/DetailDialog";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, BookOpen, Calendar, Compass, GraduationCap, Heart, MapPin, MessageCircle, Search, ShieldCheck, Sparkles, Star } from "lucide-react";
import { ACCENT, PILLARS, LIVE_ITEMS, CATEGORIES, FEATURED, TESTIMONIALS } from "@/features/talents/data";

export const Route = createFileRoute("/talents")({
  head: () => ({
    meta: [
      { title: "Talents & Savoir Vivant — VITALA" },
      {
        name: "description",
        content:
          "Apprends, transmets, célèbre les savoir-faire du quartier. Ateliers, mentors et rencontres près de chez toi.",
      },
      { property: "og:title", content: "Talents & Savoir Vivant — VITALA" },
      {
        property: "og:description",
        content:
          "Le quartier a du talent. Viens l'apprendre, le transmettre, le célébrer.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/talents" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Talents & Savoir Vivant — VITALA" },
      {
        name: "twitter:description",
        content:
          "Apprendre, transmettre, rencontrer : la carte vivante des talents près de chez toi.",
      },
    ],
    links: [{ rel: "canonical", href: "/talents" }],
  }),
  component: TalentsPage,
});

function TalentsPage() {
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-3xl space-y-8 motion-safe:animate-fade-in">
        <PageBreadcrumb />
        <HubHeader
          eyebrow="Espace"
          title="Talents & Savoir Vivant"
          description="Le quartier a du talent. Viens l'apprendre, le transmettre, le célébrer."
          color={ACCENT}
          icon={<GraduationCap className="h-5 w-5" />}
        />

        <LivePulse items={LIVE_ITEMS} accent={ACCENT} label="Ça bouge" />

        {/* HERO */}
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

        {/* PILLARS */}
        <section className="space-y-3" aria-labelledby="pillars-heading">
          <h3
            id="pillars-heading"
            className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
          >
            3 façons d'y prendre part
          </h3>
          <div className="grid gap-3 sm:grid-cols-3">
            {PILLARS.map((p) => (
              <DetailDialog
                key={p.title}
                accent={ACCENT}
                eyebrow="Mode d'emploi"
                title={p.title}
                summary={p.summary}
                steps={[...p.steps]}
                primaryCta={{ label: p.cta2 }}
                secondaryCta={{ label: "Plus tard" }}
                trigger={
                  <button
                    type="button"
                    className="block w-full text-left rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                    style={{ outlineColor: ACCENT }}
                  >
                    <SmartCard className="flex h-full flex-col gap-3 transition-all hover:-translate-y-0.5">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{
                          background: `color-mix(in oklch, ${ACCENT} 15%, transparent)`,
                          color: ACCENT,
                        }}
                        aria-hidden
                      >
                        <p.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-semibold">{p.title}</p>
                        <p className="text-xs leading-relaxed text-muted-foreground">
                          {p.desc}
                        </p>
                      </div>
                      <span
                        className="inline-flex items-center gap-1 text-xs font-medium"
                        style={{ color: ACCENT }}
                      >
                        {p.cta} <ArrowUpRight className="h-3 w-3" />
                      </span>
                    </SmartCard>
                  </button>
                }
              />
            ))}
          </div>
        </section>

        {/* CATEGORIES */}
        <section
          id="categories"
          className="space-y-3 scroll-mt-20"
          aria-labelledby="categories-heading"
        >
          <div className="flex items-end justify-between gap-2">
            <h3
              id="categories-heading"
              className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
            >
              Ça se passe par catégorie
            </h3>
            <span className="text-[11px] text-muted-foreground">
              {CATEGORIES.reduce((a, c) => a + c.count, 0)} talents recensés
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {CATEGORIES.map((c) => (
              <DetailDialog
                key={c.label}
                accent={ACCENT}
                eyebrow="Catégorie"
                title={c.label}
                summary={c.hint}
                meta={[
                  { label: "Talents actifs", value: `${c.count}` },
                  { label: "Format", value: "Atelier · 1-3h" },
                  { label: "Tarif", value: "Libre / solidaire" },
                  { label: "Près de chez toi", value: "Activé" },
                ]}
                steps={[
                  "Explore les talents de cette catégorie autour de toi.",
                  "Discute en DM avec celui ou celle qui te parle.",
                  "Réserve ta première session — ça démarre comme ça.",
                ]}
                primaryCta={{ label: `Voir les ${c.label.toLowerCase()}` }}
                secondaryCta={{ label: "Fermer" }}
                trigger={
                  <button
                    type="button"
                    className="glass-surface group flex w-full flex-col items-start gap-1.5 rounded-2xl p-3 text-left transition-all hover:-translate-y-0.5"
                  >
                    <c.icon
                      className="h-4 w-4"
                      style={{ color: ACCENT }}
                      aria-hidden
                    />
                    <span className="text-sm font-medium leading-tight">
                      {c.label}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {c.count} talents
                    </span>
                  </button>
                }
              />
            ))}
          </div>
        </section>

        {/* FEATURED */}
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

        {/* PARTAGER */}
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

        {/* TESTIMONIALS */}
        <section className="space-y-3" aria-labelledby="voices-heading">
          <h3
            id="voices-heading"
            className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
          >
            Ils en parlent mieux que nous
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {TESTIMONIALS.map((t) => (
              <SmartCard key={t.author} className="space-y-2">
                <p className="text-sm italic leading-relaxed">“{t.quote}”</p>
                <p className="text-[11px] text-muted-foreground">— {t.author}</p>
              </SmartCard>
            ))}
          </div>
        </section>

        {/* FOOTER NAV */}
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
      </div>
    </AppShell>
  );
}
