import { SmartCard } from "@/components/ui-kit/SmartCard";
import { Calendar } from "lucide-react";
import { TRANSPARENCY } from "@/features/trust/data";
import { TRANSPARENCY } from "../data";

export function 8TransparencyInfoPanelSection() {
  return (
    <section className="space-y-3">
      <h3 className="px-1 text-sm font-medium text-muted-foreground">Informations</h3>
      <SmartCard className="space-y-2">
        {TRANSPARENCY.map((t) => (
          <div
            key={t.label}
            className="flex items-center justify-between border-b border-white/5 py-2 last:border-0"
          >
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              {t.label}
            </div>
            <span className="text-sm">{t.value}</span>
          </div>
        ))}
        <button className="mt-1 w-full text-left text-[11px] text-muted-foreground underline-offset-4 hover:underline">
          Voir les conditions générales
        </button>
      </SmartCard>
    </section>
  );
}
