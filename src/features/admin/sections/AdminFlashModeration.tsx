import { SmartCard } from "@/components/ui-kit/SmartCard";
import { toast } from "sonner";
import { useAllFlashes, useModerateFlash, useDeleteFlash } from "@/features/flash/hooks/useFlashes";

export function AdminFlashModeration() {
  const { data, isLoading, error } = useAllFlashes();
  const moderate = useModerateFlash();
  const remove = useDeleteFlash();

  return (
    <section className="space-y-2">
      <h2 className="px-1 text-sm font-medium text-muted-foreground">
        Modération Flash {data ? `(${data.length})` : ""}
      </h2>
      {isLoading && <p className="px-1 text-sm text-muted-foreground">Chargement…</p>}
      {error && <p className="px-1 text-sm text-destructive">Lecture impossible.</p>}
      {!isLoading && (data?.length ?? 0) === 0 && (
        <SmartCard className="p-4">
          <p className="text-sm text-muted-foreground">Aucun Flash à modérer.</p>
        </SmartCard>
      )}

      <div className="space-y-2">
        {(data ?? []).map((f) => (
          <SmartCard key={f.id} className="space-y-2 p-3.5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{f.title}</p>
                <p className="text-[11px] text-muted-foreground">
                  {f.type} · {f.city ?? "—"} · {new Date(f.created_at).toLocaleString("fr-FR")}
                </p>
              </div>
              <span className="shrink-0 text-[11px] text-muted-foreground">{f.moderation_status}</span>
            </div>
            {f.description && (
              <p className="line-clamp-2 text-xs text-muted-foreground">{f.description}</p>
            )}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() =>
                  moderate.mutate(
                    { id: f.id, moderation_status: "approved" },
                    { onSuccess: () => toast.success("Flash approuvé") },
                  )
                }
                className="rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background"
              >
                Approuver
              </button>
              <button
                onClick={() =>
                  moderate.mutate(
                    { id: f.id, moderation_status: "rejected", reason: "Non conforme" },
                    { onSuccess: () => toast.success("Flash refusé") },
                  )
                }
                className="glass-surface rounded-full px-3 py-1 text-xs"
              >
                Refuser
              </button>
              <button
                onClick={() =>
                  remove.mutate(f.id, { onSuccess: () => toast.success("Flash supprimé") })
                }
                className="glass-surface rounded-full px-3 py-1 text-xs text-destructive"
              >
                Supprimer
              </button>
            </div>
          </SmartCard>
        ))}
      </div>
    </section>
  );
}
