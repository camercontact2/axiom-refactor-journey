import { ChevronRight, MessageCircle, Radar, ScanSearch, Zap } from "lucide-react";

export function EmptyState() {
  return (
    <div className="glass-surface rounded-2xl px-6 py-10 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/5">
        <MessageCircle className="h-7 w-7 text-muted-foreground" />
      </div>
      <h3 className="text-base font-semibold">Aucune conversation</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Contactez un service, répondez à une offre ou exprimez un besoin.
      </p>
      <div className="mt-5 flex flex-col gap-2">
        {[
          { label: "Explorer via Scan", color: "var(--scan)", icon: ScanSearch },
          { label: "Publier sur Flash", color: "var(--flash)", icon: Zap },
          { label: "Créer un besoin Radar", color: "var(--radar)", icon: Radar },
        ].map((s) => (
          <button
            key={s.label}
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm transition hover:bg-white/5"
            style={{ color: s.color }}
          >
            <s.icon className="h-4 w-4" />
            {s.label}
            <ChevronRight className="ml-auto h-4 w-4 opacity-50" />
          </button>
        ))}
      </div>
    </div>
  );
}
