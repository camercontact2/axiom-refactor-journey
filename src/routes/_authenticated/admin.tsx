import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { HubHeader } from "@/components/hub/HubHeader";
import { SmartCard } from "@/components/ui-kit/SmartCard";
import { ShieldCheck } from "lucide-react";
import { useRoles } from "@/features/auth/hooks/useRole";
import { AdminAccounts } from "@/features/admin/sections/AdminAccounts";
import { AdminFlashModeration } from "@/features/admin/sections/AdminFlashModeration";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Administration — VITALA" },
      { name: "description", content: "Espace d'administration VITALA : comptes, profils et modération des Flash." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

type Tab = "accounts" | "flash";

function AdminPage() {
  const { isAdmin, isModerator, loading } = useRoles();
  const [tab, setTab] = useState<Tab>("accounts");

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

        <div className="flex gap-2" role="tablist" aria-label="Sections d'administration">
          {([
            { id: "accounts", label: "Comptes & profils" },
            { id: "flash", label: "Modération Flash" },
          ] as const).map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={
                "rounded-full px-3.5 py-1.5 text-sm transition-colors " +
                (tab === t.id
                  ? "bg-foreground text-background"
                  : "glass-surface text-muted-foreground hover:text-foreground")
              }
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "accounts" ? <AdminAccounts /> : <AdminFlashModeration />}
      </div>
    </AppShell>
  );
}
