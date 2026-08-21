import { createFileRoute } from "@tanstack/react-router";
import { Radar } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { SmartHero } from "@/features/home/components/SmartHero";
import { HubGrid } from "@/features/home/components/HubGrid";
import { LiveStrip } from "@/features/home/components/LiveStrip";
import { SmartSuggestions } from "@/features/home/components/SmartSuggestions";
import { TrustHint } from "@/features/home/components/TrustHint";
import { RecentActivity } from "@/features/home/components/RecentActivity";
import { Opportunities } from "@/features/home/components/Opportunities";
import { HowItWorks } from "@/features/home/components/HowItWorks";
import { CommunityPulse } from "@/features/home/components/CommunityPulse";
import { FinalCTA } from "@/features/home/components/FinalCTA";
import { LivePulse } from "@/components/ui-kit/LivePulse";
import { FeaturesShowcase } from "@/features/home/components/FeaturesShowcase";
import { UseCases } from "@/features/home/components/UseCases";
import { QuickFAQ } from "@/features/home/components/QuickFAQ";
import { CTAJourney } from "@/features/home/components/CTAJourney";
import { Reveal } from "@/features/home/components/Reveal";
import { Testimonials } from "@/features/home/components/Testimonials";
import { track, useScrollDepth, useSectionTime } from "@/lib/analytics";
import { useEffect } from "react";
import { HOME_LIVE } from "@/features/home/data";

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

function Index() {
  useScrollDepth("home");
  useEffect(() => {
    track("page_view", { page: "home" });
  }, []);

  const heroRef = useSectionTime("hero");
  const journeyRef = useSectionTime("cta_journey");
  const featuresRef = useSectionTime("features");
  const testimonialsRef = useSectionTime("testimonials");
  const faqRef = useSectionTime("faq");

  return (
    <AppShell>
      <div className="space-y-7 animate-[fade-up_0.5s_var(--ease-smooth)_both] motion-reduce:animate-none">
        <section ref={heroRef as never}>
          <SmartHero />
        </section>
        <LivePulse items={HOME_LIVE} label="Ça bouge" accent="var(--radar)" />
        <Reveal><HubGrid /></Reveal>
        <section ref={journeyRef as never}>
          <Reveal delay={60}><CTAJourney /></Reveal>
        </section>
        <Reveal><HowItWorks /></Reveal>
        <section ref={featuresRef as never}>
          <Reveal><FeaturesShowcase /></Reveal>
        </section>
        <Reveal><LiveStrip /></Reveal>
        <Reveal><Opportunities /></Reveal>
        <Reveal><UseCases /></Reveal>
        <Reveal><SmartSuggestions /></Reveal>
        <Reveal><CommunityPulse /></Reveal>
        <section ref={testimonialsRef as never}>
          <Reveal><Testimonials /></Reveal>
        </section>
        <section ref={faqRef as never}>
          <Reveal><QuickFAQ /></Reveal>
        </section>
        <Reveal><TrustHint /></Reveal>
        <Reveal><RecentActivity /></Reveal>
        <Reveal><FinalCTA /></Reveal>
      </div>
    </AppShell>
  );
}
