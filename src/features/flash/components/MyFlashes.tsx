import { Eye, Trash2 } from "lucide-react";
import { TYPES } from "../data";
import { useDeleteFlash, useMyFlashes } from "../hooks/useFlashes";

const STATUS_LABEL: Record<string, { label: string; color: string }> = {
  approved: { label: "Actif", color: "var(--success)" },
  pending: { label: "En moderation", color: "var(--warning)" },
  rejected: { label: "Refuse", color: "var(--muted-foreground)" },
};

export function MyFlashes() {
  const { data, isLoading } = useMyFlashes();
  const remove = useDeleteFlash();
  const lookup = (k: string) => TYPES.find((t) => t.id === k) ?? TYPES[0];

  return (
    <section className="space-y-2">
      <div className="flex items-end justify-between px-1">
        <h3 className="text-sm font-medium text-muted-foreground">Mes flashs</h3>
      </div>
      <div className="glass-surface overflow-hidden rounded-2xl">
        {isLoading && (
          <p className="px-3 py-4 text-sm text-muted-foreground">Chargement…</p>
        )}
        {!isLoading && (data?.length ?? 0) === 0 && (
          <p className="px-3 py-4 text-sm text-muted-foreground">
            Tu n'as pas encore publié de Flash.
          </p>
        )}
        {(data ?? []).map((m, i, arr) => {
          const t = lookup(m.type);
          const Icon = t.icon;
          const st = STATUS_LABEL[m.moderation_status] ?? STATUS_LABEL.pending;
          return (
            <div
              key={m.id}
              className="flex items-center gap-3 px-3 py-2.5"
              style={i < arr.length - 1 ? { borderBottom: "1px solid var(--glass-border)" } : undefined}
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                style={{
                  background: `color-mix(in oklch, ${t.tint} 18%, transparent)`,
                  color: t.tint,
                }}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{m.title}</p>
                <div className="mt-0.5 flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span style={{ color: st.color }}>● {st.label}</span>
                  <span className="inline-flex items-center gap-1">
                    <Eye className="h-3 w-3" aria-hidden="true" />
                    {m.views}
                  </span>
                  <span className="ml-auto">{new Date(m.created_at).toLocaleDateString("fr-FR")}</span>
                </div>
              </div>
              <button
                onClick={() => remove.mutate(m.id)}
                aria-label={`Supprimer ${m.title}`}
                className="rounded-full p-1.5 text-muted-foreground hover:text-foreground"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
