import { SmartCard } from "@/components/ui-kit/SmartCard";
import { Progress } from "@/components/ui/progress";
import { Sparkles } from "lucide-react";
import { USER } from "@/features/profile/data";
import { USER } from "../data";

export function OnboardingSection() {
  return (
    {USER.completion < 100 && (
      <SmartCard className="border border-[color-mix(in_oklch,var(--primary)_25%,transparent)]">
        <div className="flex items-start gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl"
            style={{ background: "color-mix(in oklch, var(--primary) 18%, transparent)", color: "var(--primary)" }}
          >
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="flex-1 space-y-2">
            <div>
              <p className="text-sm font-medium">Complétez votre profil</p>
              <p className="text-xs text-muted-foreground">
                Débloquez toutes les fonctionnalités VITALA.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Progress value={USER.completion} className="h-1.5 flex-1 bg-white/5" />
              <span className="text-[11px] font-medium" style={{ color: "var(--primary)" }}>
                {USER.completion}%
              </span>
            </div>
          </div>
        </div>
      </SmartCard>
    )}
  );
}
