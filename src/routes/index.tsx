import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { SmartHero } from "@/features/home/components/SmartHero";
import { HubGrid } from "@/features/home/components/HubGrid";
import { LazyBlock } from "@/features/home/components/LazyBlock";
import { Reveal } from "@/features/home/components/Reveal";
import { track, useScrollDepth, useSectionTime } from "@/lib/analytics";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VITALA — Publie, demande, découvre, vérifie" },
      {
        name: "description",
        content:
          "VITALA — l'app intelligente qui connecte ta communauté : publie un flash, exprime un besoin, découvre les bons profils et vérifie leur fiabilité, au même endroit.",
      },
      { property: "og:title", content: "VITALA — Une app, mille possibilités" },
      {
        property: "og:description",
        content:
          "Flash, Radar, Scan, Trust : 4 hubs pour bouger vite et bien dans ta ville.",
      },
    ],
  }),
  component: Index,
});

/**
 * Page d'accueil : version epuree.
 * 5 blocs seulement — accroche, les 4 hubs, comment ca marche, ce qui bouge, appel a l'action.
 * Les autres blocs restent disponibles dans src/features/home/components/ si besoin.
 */
function Index() {
  useScrollDepth("home");
  useEffect(() => {
    track("page_view", { page: "home" });
  }, []);

  const heroRef = useSectionTime("hero");
  const hubsRef = useSectionTime("hubs");
  const ctaRef = useSectionTime("final_cta");

  return (
    <AppShell>
      <div className="home-sections pb-4 animate-[fade-up_0.5s_var(--ease-smooth)_both] motion-reduce:animate-none">
        <section ref={heroRef as never} aria-label="Accueil VITALA">
          <SmartHero />
        </section>

        <section ref={hubsRef as never} aria-label="Les 4 hubs">
          <Reveal>
            <HubGrid />
          </Reveal>
        </section>

        <section aria-label="Comment ça marche">
          <Reveal delay={60}>
            <LazyBlock
              label="Comment ça marche"
              minHeight={260}
              load={() =>
                import("@/features/home/components/HowItWorks").then((m) => ({
                  default: m.HowItWorks,
                }))
              }
            />
          </Reveal>
        </section>

        <section aria-label="En direct autour de toi">
          <Reveal delay={60}>
            <LazyBlock
              label="En direct autour de toi"
              minHeight={120}
              load={() =>
                import("@/features/home/components/LiveStrip").then((m) => ({
                  default: m.LiveStrip,
                }))
              }
            />
          </Reveal>
        </section>

        <section aria-label="Confiance et sécurité">
          <Reveal>
            <LazyBlock
              label="Confiance et sécurité"
              minHeight={96}
              load={() =>
                import("@/features/home/components/TrustHint").then((m) => ({
                  default: m.TrustHint,
                }))
              }
            />
          </Reveal>
        </section>

        <section ref={ctaRef as never} aria-label="Rejoindre VITALA">
          <Reveal>
            <LazyBlock
              label="Rejoindre VITALA"
              minHeight={220}
              load={() =>
                import("@/features/home/components/FinalCTA").then((m) => ({
                  default: m.FinalCTA,
                }))
              }
            />
          </Reveal>
        </section>
      </div>
    </AppShell>
  );

}
