import { ChevronRight, ScanSearch, Zap } from "lucide-react";

export function IntentCards({ onCreate, onScan }: { onCreate: () => void; onScan: () => void }) {
  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <button
        onClick={onCreate}
        className="group relative overflow-hidden rounded-3xl p-5 text-left transition-all duration-300 hover:-translate-y-1 active:scale-[0.98]"
        style={{
          background: "color-mix(in oklch, var(--flash) 12%, var(--surface-1))",
          boxShadow:
            "inset 0 0 0 1px color-mix(in oklch, var(--flash) 30%, transparent), 0 0 32px -12px var(--flash)",
        }}
      >
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-50 blur-2xl"
          style={{ background: "var(--gradient-flash)" }}
        />
        <div
          className="relative mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl"
          style={{
            background: "color-mix(in oklch, var(--flash) 22%, transparent)",
            color: "var(--flash)",
          }}
        >
          <Zap className="h-5 w-5" />
        </div>
        <p className="ds-eyebrow" style={{ color: "var(--flash)" }}>
          Publier
        </p>
        <h3 className="ds-title mt-1">Créer un Flash</h3>
        <p className="ds-body mt-1.5">
          Vente, service, urgence — en 2 étapes simples.
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium" style={{ color: "var(--flash)" }}>
          Commencer <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </button>

      <button
        onClick={onScan}
        className="group relative overflow-hidden rounded-3xl p-5 text-left transition-all duration-300 hover:-translate-y-1 active:scale-[0.98]"
        style={{
          background: "color-mix(in oklch, var(--scan) 12%, var(--surface-1))",
          boxShadow:
            "inset 0 0 0 1px color-mix(in oklch, var(--scan) 30%, transparent), 0 0 32px -12px var(--scan)",
        }}
      >
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-50 blur-2xl"
          style={{ background: "var(--gradient-scan)" }}
        />
        <div
          className="relative mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl"
          style={{
            background: "color-mix(in oklch, var(--scan) 22%, transparent)",
            color: "var(--scan)",
          }}
        >
          <ScanSearch className="h-5 w-5" />
        </div>
        <p className="ds-eyebrow" style={{ color: "var(--scan)" }}>
          Explorer
        </p>
        <h3 className="ds-title mt-1">Scanner autour de vous</h3>
        <p className="ds-body mt-1.5">
          Détectez les opportunités live dans votre périmètre.
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium" style={{ color: "var(--scan)" }}>
          Lancer un scan <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </button>
    </section>
  );
}
