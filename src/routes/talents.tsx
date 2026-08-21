import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { HubHeader } from "@/components/hub/HubHeader";
import { PageBreadcrumb } from "@/components/ui-kit/PageBreadcrumb";
import { LivePulse } from "@/components/ui-kit/LivePulse";
import { GraduationCap } from "lucide-react";
import { ACCENT, LIVE_ITEMS } from "@/features/talents/data";
import { HeroSection } from "@/features/talents/sections/HeroSection";
import { PillarsSection } from "@/features/talents/sections/PillarsSection";
import { CategoriesSection } from "@/features/talents/sections/CategoriesSection";
import { FeaturedSection } from "@/features/talents/sections/FeaturedSection";
import { PartagerSection } from "@/features/talents/sections/PartagerSection";
import { TestimonialsSection } from "@/features/talents/sections/TestimonialsSection";
import { FooterNavSection } from "@/features/talents/sections/FooterNavSection";

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

        <HeroSection />
        <PillarsSection />
        <CategoriesSection />
        <FeaturedSection />
        <PartagerSection />
        <TestimonialsSection />
        <FooterNavSection />
      </div>
    </AppShell>
  );
}
