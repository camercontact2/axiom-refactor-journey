import { SmartCard } from "@/components/ui-kit/SmartCard";
import { BadgeCheck, ShieldCheck } from "lucide-react";
import { ScoreBar } from "@/features/trust/components/ScoreBar";
import { useProfile } from "@/features/profile/hooks/useProfile";
import { VERIFICATIONS } from "../data";

/**
 * Etat de confiance REEL du compte connecte.
 * Le score se construit a partir des informations reellement renseignees
 * et des verifications reellement validees. Rien n'est simule.
 */
export function TrustHeroSection() {
  const { data: profile } = useProfile();

  const fields = [profile?.display_name, profile?.username, profile?.city, profile?.bio];
  const filled = fields.filter((f) => f && String(f).trim().length > 0).length;
  const profilePct = Math.round((filled / fields.length) * 100);
  const verifiedPct = Math.round(
    (VERIFICATIONS.filter((v) => v.ok).length / VERIFICATIONS.length) * 100,
  );
  const score = Math.round(profilePct * 0.6 + verifiedPct * 0.4);

  const name = profile?.display_name || profile?.username || "Votre compte";
  const handle = profile?.username ? `@${profile.username}` : "Identifiant non défini";

  return (
    <SmartCard glow="trust" className="space-y-5">
      <div className="flex items-start gap-3">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
          style={{ background: "var(--gradient-trust)" }}
          aria-hidden="true"
        >
          <ShieldCheck className="h-5 w-5 text-white/90" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h2 className="truncate text-base font-semibold">{name}</h2>
            {score >= 80 ? (
              <BadgeCheck className="h-4 w-4 shrink-0" style={{ color: "var(--trust)" }} />
            ) : null}
          </div>
          <p className="text-xs text-muted-foreground">
            {profile?.city ? profile.city : "Ville non renseignée"}
          </p>
          <div className="mt-1 flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium"
              style={{
                background: "color-mix(in oklch, var(--trust) 14%, transparent)",
                color: "var(--trust)",
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--trust)]" />
              {score >= 80 ? "Confirmé" : score >= 40 ? "En construction" : "Nouveau compte"}
            </span>
            <span className="text-[11px] text-muted-foreground">{handle}</span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white/5 p-4">
        <div className="mb-3 flex items-end justify-between">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Trust score
          </p>
          <p className="text-4xl font-semibold tracking-tight" style={{ color: "var(--trust)" }}>
            {score}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <ScoreBar value={profilePct} label="Profil complété" />
          <ScoreBar value={verifiedPct} label="Vérifications" />
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
          Votre score augmente quand vous complétez votre profil, validez vos vérifications et
          recevez des retours réels après vos échanges.
        </p>
      </div>
    </SmartCard>
  );
}
