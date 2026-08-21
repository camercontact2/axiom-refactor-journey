import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { HubHeader } from "@/components/hub/HubHeader";
import { UserRound } from "lucide-react";
import { HeroSection } from "@/features/profile/sections/HeroSection";
import { OnboardingSection } from "@/features/profile/sections/OnboardingSection";
import { QuickStatsSection } from "@/features/profile/sections/QuickStatsSection";
import { StatusSystemSection } from "@/features/profile/sections/StatusSystemSection";
import { TrustSnapshotSection } from "@/features/profile/sections/TrustSnapshotSection";
import { ActivitySummarySection } from "@/features/profile/sections/ActivitySummarySection";
import { QuickActionsSection } from "@/features/profile/sections/QuickActionsSection";
import { SettingsPreviewSection } from "@/features/profile/sections/SettingsPreviewSection";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profil — VITALA" },
      { name: "description", content: "Votre identité, vos actions, votre confiance." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <HubHeader
          eyebrow="Profil"
          title="Votre espace"
          description="Identité, activité et confiance — en un coup d'œil."
          color="var(--primary)"
          icon={<UserRound className="h-5 w-5" />}
        />

        <HeroSection />
        <OnboardingSection />
        <QuickStatsSection />
        <StatusSystemSection />
        <TrustSnapshotSection />
        <ActivitySummarySection />
        <QuickActionsSection />
        <SettingsPreviewSection />
      </div>
    </AppShell>
  );
}
