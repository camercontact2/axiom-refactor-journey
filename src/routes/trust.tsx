import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { HubHeader } from "@/components/hub/HubHeader";
import { ShieldCheck } from "lucide-react";
import { TrustHeroSection } from "@/features/trust/sections/TrustHeroSection";
import { VerificationStatusSection } from "@/features/trust/sections/VerificationStatusSection";
import { TrustIndicatorsSection } from "@/features/trust/sections/TrustIndicatorsSection";
import { UserFeedbacksSection } from "@/features/trust/sections/UserFeedbacksSection";
import { ProofsTransparencySection } from "@/features/trust/sections/ProofsTransparencySection";
import { ActivityTimelineSection } from "@/features/trust/sections/ActivityTimelineSection";
import { SafetySupportSection } from "@/features/trust/sections/SafetySupportSection";
import { TransparencyInfoPanelSection } from "@/features/trust/sections/TransparencyInfoPanelSection";
import { TrustActionButtonsSection } from "@/features/trust/sections/TrustActionButtonsSection";

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

        <TrustHeroSection />
        <VerificationStatusSection />
        <TrustIndicatorsSection />
        <UserFeedbacksSection />
        <ProofsTransparencySection />
        <ActivityTimelineSection />
        <SafetySupportSection />
        <TransparencyInfoPanelSection />
        <TrustActionButtonsSection />
      </div>
    </AppShell>
  );
}
