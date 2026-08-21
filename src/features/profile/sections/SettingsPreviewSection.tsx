import { SmartCard } from "@/components/ui-kit/SmartCard";
import { ChevronRight } from "lucide-react";
import { SETTINGS } from "../data";

export function SettingsPreviewSection() {
  return (
    <section className="space-y-2">
      <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Paramètres
      </h3>
      <SmartCard className="divide-y divide-white/5 p-0">
        {SETTINGS.map((s) => (
          <button
            key={s.label}
            className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-white/5"
          >
            <s.icon className="h-4 w-4 text-muted-foreground" />
            <span className="flex-1 text-sm">{s.label}</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
      </SmartCard>
    </section>
  );
}
