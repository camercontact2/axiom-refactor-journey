import { FlashType, TYPES } from "../data";

export function QuickTypes({ onPick }: { onPick: (t: FlashType) => void }) {
  return (
    <section className="space-y-2">
      <h3 className="px-1 text-sm font-medium text-muted-foreground">Quel type ?</h3>
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none">
        {TYPES.map((t) => (
          <button
            key={t.id}
            onClick={() => onPick(t.id)}
            className="glass-surface group flex shrink-0 items-center gap-2 rounded-2xl px-3.5 py-2.5 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
          >
            <span
              className="flex h-7 w-7 items-center justify-center rounded-full"
              style={{
                background: `color-mix(in oklch, ${t.tint} 22%, transparent)`,
                color: t.tint,
              }}
            >
              <t.icon className="h-3.5 w-3.5" />
            </span>
            <span className="text-sm font-medium">{t.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
