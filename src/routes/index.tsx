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
      <div className="space-y-12 pb-4 animate-[fade-up_0.5s_var(--ease-smooth)_both] motion-reduce:animate-none">
        <section ref={heroRef as never}>
          <SmartHero />
        </section>

        <section ref={hubsRef as never}>
          <Reveal>
            <HubGrid />
          </Reveal>
        </section>

        <Reveal delay={60}>
          <HowItWorks />
        </Reveal>

        <Reveal delay={60}>
          <LiveStrip />
        </Reveal>

        <Reveal>
          <TrustHint />
        </Reveal>

        <section ref={ctaRef as never}>
          <Reveal>
            <FinalCTA />
          </Reveal>
        </section>
      </div>
    </AppShell>
  );
}
