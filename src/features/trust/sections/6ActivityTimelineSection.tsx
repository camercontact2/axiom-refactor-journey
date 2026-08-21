import { SmartCard } from "@/components/ui-kit/SmartCard";
import { TIMELINE } from "@/features/trust/data";
import { TIMELINE } from "../data";

export function 6ActivityTimelineSection() {
  return (
    <section className="space-y-3">
      <h3 className="px-1 text-sm font-medium text-muted-foreground">Activité récente</h3>
      <SmartCard>
        <ol className="relative space-y-3 pl-4">
          <span
            className="absolute left-[5px] top-1 bottom-1 w-px"
            style={{ background: "color-mix(in oklch, var(--trust) 30%, transparent)" }}
          />
          {TIMELINE.map((t, i) => (
            <li key={i} className="relative">
              <span
                className="absolute -left-4 top-1.5 h-2 w-2 rounded-full"
                style={{ background: "var(--trust)" }}
              />
              <p className="text-sm">{t.text}</p>
              <p className="text-[11px] text-muted-foreground">{t.when}</p>
            </li>
          ))}
        </ol>
      </SmartCard>
    </section>
  );
}
