import { ChevronRight, Sparkles } from "lucide-react";
import { SUGGESTIONS } from "../data";
import { SectionHeader } from "./SectionHeader";

export function SmartSuggestionsSection({ onPick }: { onPick: (q: string) => void }) {
  return (
    <section className="space-y-2 pb-2">
      <SectionHeader icon={Sparkles} label="SUGGESTIONS" color="var(--radar)" />
      <div className="grid grid-cols-1 gap-1.5">
        {SUGGESTIONS.map((s) => {
          const Icon = s.icon;
          return (
            <button
              key={s.label}
              onClick={() => onPick(s.prompt)}
              className="glass-surface group flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition active:scale-[0.99]"
              style={{
                boxShadow: `inset 0 0 0 1px color-mix(in oklch, ${s.color} 14%, transparent)`,
              }}
            >
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
                style={{
                  background: `color-mix(in oklch, ${s.color} 18%, transparent)`,
                  color: s.color,
                }}
              >
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium leading-tight">{s.label}</p>
                <p className="truncate text-[11px] text-muted-foreground">{s.hint}</p>
              </div>
              <ChevronRight
                className="h-4 w-4 shrink-0 text-muted-foreground/60 transition group-hover:translate-x-0.5"
                style={{ color: "color-mix(in oklch, var(--muted-foreground) 80%, transparent)" }}
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}
