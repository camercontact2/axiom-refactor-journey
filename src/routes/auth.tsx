import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { AuthCard } from "@/features/auth/components/AuthCard";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Connexion — VITALA" },
      {
        name: "description",
        content: "Connecte-toi à VITALA pour publier tes Flash, activer ton Radar et bâtir ta confiance.",
      },
      { property: "og:title", content: "Connexion — VITALA" },
      {
        property: "og:description",
        content: "Rejoins VITALA : Flash, Radar, Scan et Trust dans une seule application.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Connexion — VITALA" },
      {
        name: "twitter:description",
        content: "Rejoins VITALA : Flash, Radar, Scan et Trust dans une seule application.",
      },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  return (
    <AppShell>
      <div className="py-8">
        <AuthCard />
      </div>
    </AppShell>
  );
}
