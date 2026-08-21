import { SmartCard } from "@/components/ui-kit/SmartCard";
import { Flag, HelpCircle, LifeBuoy, Lock } from "lucide-react";

export function 7SafetySupportSection() {
  return (
    <section className="space-y-3">
      <h3 className="px-1 text-sm font-medium text-muted-foreground">Sécurité & support</h3>
      <SmartCard className="grid grid-cols-2 gap-2">
        {[
          { icon: LifeBuoy, label: "Support" },
          { icon: Flag, label: "Signaler" },
          { icon: HelpCircle, label: "Centre d'aide" },
          { icon: Lock, label: "Confidentialité" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <button
              key={s.label}
              className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2.5 text-left text-sm transition-colors hover:bg-white/10"
            >
              <Icon className="h-4 w-4" style={{ color: "var(--trust)" }} />
              {s.label}
            </button>
          );
        })}
      </SmartCard>
    </section>
  );
}
