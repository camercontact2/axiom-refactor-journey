import { SmartCard } from "@/components/ui-kit/SmartCard";
import { BadgeCheck } from "lucide-react";
import { FEEDBACKS } from "@/features/trust/data";
import { FEEDBACKS } from "../data";

export function UserFeedbacksSection() {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-sm font-medium text-muted-foreground">Retours modérés</h3>
        <span className="text-[11px] text-muted-foreground">Vérifiés</span>
      </div>
      <div className="space-y-2">
        {FEEDBACKS.map((f, i) => (
          <SmartCard key={i} className="space-y-2">
            <div className="flex items-center gap-2">
              <div
                className="h-7 w-7 rounded-full"
                style={{ background: "var(--gradient-trust)" }}
              />
              <span className="text-xs font-medium">{f.name}</span>
              <BadgeCheck
                className="ml-auto h-3.5 w-3.5"
                style={{ color: "var(--trust)" }}
              />
            </div>
            <p className="text-sm leading-snug text-foreground/85">"{f.text}"</p>
            <div className="flex flex-wrap gap-1">
              {f.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </SmartCard>
        ))}
      </div>
    </section>
  );
}
