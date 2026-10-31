import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { HubHeader } from "@/components/hub/HubHeader";
import { SmartCard } from "@/components/ui-kit/SmartCard";
import { ShieldCheck } from "lucide-react";
import { useRoles } from "@/features/auth/hooks/useRole";
import { AdminAccounts } from "@/features/admin/sections/AdminAccounts";
import { AdminFlashModeration } from "@/features/admin/sections/AdminFlashModeration";
import { AdminTalentModeration } from "@/features/admin/sections/AdminTalentModeration";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Administration — VITALA" },
      { name: "description", content: "Espace d'administration VITALA : comptes, profils, modération des Flash et talents." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Administration — VITALA" },
      { property: "og:description", content: "Gestion des comptes et modération des Flash et talents VITALA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

type Tab = "accounts" | "flash" | "talents";

function AdminPage() {
  const { isAdmin, isModerator, loading } = useRoles();
  const [tab, setTab] = useState<Tab>("talents");

  if (loading) {
    return (
      <AppShell>
        <p className="p-6 text-sm text-muted-foreground">Vérification des droits…</p>
      </AppShell>
    );
  }

  if (!isAdmin && !isModerator) {
    return (
      <AppShell>
        <SmartCard className="p-6">
          <h1 className="text-lg font-semibold">Accès réservé</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Cet espace est réservé aux administrateurs et modérateurs de VITALA.
          </p>
        </SmartCard>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-5">
        <HubHeader
          eyebrow="Administration"
          title="Pilotage de VITALA"
          description="Comptes, profils et modération des contenus."
          color="var(--trust)"
          icon={<ShieldCheck className="h-5 w-5" aria-hidden="true" />}
        />

        <div className="flex flex-wrap gap-2" aria-label="Sections d'administration">
          {([
            { id: "accounts", label: "Comptes & profils" },
            { id: "flash", label: "Modération Flash" },
            { id: "talents", label: "Modération Talents" },
          ] as const).map((t) => (
            <Button
              key={t.id}
              aria-pressed={tab === t.id}
              onClick={() => setTab(t.id)}
              className={
                "rounded-full px-3.5 py-1.5 text-sm transition-colors " +
                (tab === t.id
                  ? "bg-foreground text-background"
                  : "glass-surface text-muted-foreground hover:text-foreground")
              }
            >
              {t.label}
            </Button>
          ))}
        </div>

        {tab === "accounts" ? <AdminAccounts /> : tab === "flash" ? <AdminFlashModeration /> : <AdminTalentModeration />}
      </div>
    </AppShell>
  );
}
