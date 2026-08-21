import { SmartCard } from "@/components/ui-kit/SmartCard";
import { TrustBadge } from "@/components/ui-kit/TrustBadge";
import { BadgeCheck } from "lucide-react";
import { ScoreBar } from "@/features/trust/components/ScoreBar";
import { PROFILE, SCORES } from "../data";

export function TrustHeroSection() {
  return (
    <SmartCard glow="trust" className="space-y-5">
      <div className="flex items-start gap-3">
        <div
          className="h-12 w-12 shrink-0 rounded-2xl"
          style={{ background: "var(--gradient-trust)" }}
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h2 className="truncate text-base font-semibold">{PROFILE.name}</h2>
            <BadgeCheck className="h-4 w-4 shrink-0" style={{ color: "var(--trust)" }} />
          </div>
          <p className="text-xs text-muted-foreground">{PROFILE.role}</p>
          <div className="mt-1 flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium"
              style={{
                background: "color-mix(in oklch, var(--trust) 14%, transparent)",
                color: "var(--trust)",
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--trust)]" />
              {PROFILE.status}
            </span>
            <span className="text-[11px] text-muted-foreground">{PROFILE.handle}</span>
          </div>
        </div>
        <TrustBadge score={PROFILE.score} />
      </div>

      <div className="rounded-2xl bg-white/5 p-4">
        <div className="mb-3 flex items-end justify-between">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Trust score
          </p>
          <p
            className="text-4xl font-semibold tracking-tight"
            style={{ color: "var(--trust)" }}
          >
            {PROFILE.score}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          {SCORES.map((s) => (
            <ScoreBar key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </div>
    </SmartCard>
  );
}
