import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { HubHeader } from "@/components/hub/HubHeader";
import { ShieldCheck } from "lucide-react";
import { 1TrustHeroSection } from "@/features/trust/sections/1TrustHeroSection";
import { 2VerificationStatusSection } from "@/features/trust/sections/2VerificationStatusSection";
import { 3TrustIndicatorsSection } from "@/features/trust/sections/3TrustIndicatorsSection";
import { 4UserFeedbacksSection } from "@/features/trust/sections/4UserFeedbacksSection";
import { 5ProofsTransparencySection } from "@/features/trust/sections/5ProofsTransparencySection";
import { 6ActivityTimelineSection } from "@/features/trust/sections/6ActivityTimelineSection";
import { 7SafetySupportSection } from "@/features/trust/sections/7SafetySupportSection";
import { 8TransparencyInfoPanelSection } from "@/features/trust/sections/8TransparencyInfoPanelSection";
import { 9TrustActionButtonsSection } from "@/features/trust/sections/9TrustActionButtonsSection";

export const Route = createFileRoute("/trust")({
  head: () => ({
    meta: [
      { title: "Trust — VITALA" },
      { name: "description", content: "Vérifiez la fiabilité d'un service avant d'agir." },
    ],
  }),
  component: TrustPage,
});

function TrustPage() {
  return (
    <AppShell>
      <div className="space-y-6 animate-[fade-up_0.5s_var(--ease-smooth)_both]">
        <HubHeader
          eyebrow="Trust"
          title="Vérifiez en confiance"
          description="Des signaux clairs et calmes pour décider sereinement avant d'agir."
          color="var(--trust)"
          icon={<ShieldCheck className="h-5 w-5" />}
        />

        <1TrustHeroSection />
        <2VerificationStatusSection />
        <3TrustIndicatorsSection />
        <4UserFeedbacksSection />
        <5ProofsTransparencySection />
        <6ActivityTimelineSection />
        <7SafetySupportSection />
        <8TransparencyInfoPanelSection />
        <9TrustActionButtonsSection />
      </div>
    </AppShell>
  );
}
