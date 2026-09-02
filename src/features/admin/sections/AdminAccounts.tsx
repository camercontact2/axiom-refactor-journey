import { SmartCard } from "@/components/ui-kit/SmartCard";
import { useAdminProfiles } from "../hooks/useAdminData";

export function AdminAccounts() {
  const { data, isLoading, error } = useAdminProfiles();

  return (
    <section className="space-y-2">
      <h2 className="px-1 text-sm font-medium text-muted-foreground">
        Comptes & profils {data ? `(${data.length})` : ""}
      </h2>
      {isLoading && <p className="px-1 text-sm text-muted-foreground">Chargement…</p>}
      {error && <p className="px-1 text-sm text-destructive">Lecture impossible.</p>}
      <div className="glass-surface overflow-hidden rounded-2xl">
        {(data ?? []).map((p, i, arr) => (
          <div
            key={p.id}
            className="flex items-center gap-3 px-3 py-2.5"
            style={i < arr.length - 1 ? { borderBottom: "1px solid var(--glass-border)" } : undefined}
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">
                {p.display_name ?? p.username ?? "Sans nom"}
              </p>
              <p className="truncate text-[11px] text-muted-foreground">
                @{p.username ?? "—"} · {p.city ?? "ville inconnue"}
              </p>
            </div>
            <span className="text-[11px] text-muted-foreground">
              {new Date(p.created_at).toLocaleDateString("fr-FR")}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
