import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { HubHeader } from "@/components/hub/HubHeader";
import { PageBreadcrumb } from "@/components/ui-kit/PageBreadcrumb";
import { LivePulse } from "@/components/ui-kit/LivePulse";
import { Palette } from "lucide-react";
import { ACCENT, LIVE_ITEMS } from "@/features/creation/data";
import { HeroSection } from "@/features/creation/sections/HeroSection";
import { StudiosSection } from "@/features/creation/sections/StudiosSection";
import { StepsSection } from "@/features/creation/sections/StepsSection";
import { InspirationsCarouselSection } from "@/features/creation/sections/InspirationsCarouselSection";
import { ProjectsSection } from "@/features/creation/sections/ProjectsSection";
import { FaqAccordionSection } from "@/features/creation/sections/FaqAccordionSection";
import { NouveauProjetSection } from "@/features/creation/sections/NouveauProjetSection";
import { ResourcesSection } from "@/features/creation/sections/ResourcesSection";
import { FooterNavSection } from "@/features/creation/sections/FooterNavSection";

export const Route = createFileRoute("/_authenticated/creation")({
  head: () => ({
    meta: [
      { title: "Espace de création — VITALA" },
      {
        name: "description",
        content:
          "L'atelier ouvert du quartier : pose ton idée, monte l'équipe, publie tes étapes. Écriture, musique, photo, vidéo, arts visuels.",
      },
      { property: "og:title", content: "Espace de création — VITALA" },
      {
        property: "og:description",
        content:
          "Sors ton projet du carton, trouve les bonnes mains, fais vivre tes créations.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/creation" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Espace de création — VITALA" },
      {
        name: "twitter:description",
        content:
          "Lance ton projet, recrute ton équipe, montre tes étapes — à ton rythme.",
      },
    ],
    links: [{ rel: "canonical", href: "/creation" }],
  }),
  component: CreationPage,
});

function CreationPage() {
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-3xl space-y-8 motion-safe:animate-fade-in">
        <PageBreadcrumb />
        <HubHeader
          eyebrow="Espace"
          title="Espace de création"
          description="L'atelier ouvert du quartier. Pose ton idée, monte l'équipe, envoie."
          color={ACCENT}
          icon={<Palette className="h-5 w-5" />}
        />

        <LivePulse items={LIVE_ITEMS} accent={ACCENT} label="Ça tourne" />

        <HeroSection />
        <StudiosSection />
        <StepsSection />
        <InspirationsCarouselSection />
        <ProjectsSection />
        <FaqAccordionSection />
        <NouveauProjetSection />
        <ResourcesSection />
        <FooterNavSection />
      </div>
    </AppShell>
  );
}
