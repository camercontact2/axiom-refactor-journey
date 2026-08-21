import { Link } from "@tanstack/react-router";
import { SmartCard } from "@/components/ui-kit/SmartCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { USER, TRUST_ITEMS } from "../data";

export function TrustSnapshotSection() {
  return (
    <section className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Aperçu Trust
        </h3>
        <Link to="/trust" className="text-[11px] font-medium" style={{ color: "var(--trust)" }}>
          Voir tout →
        </Link>
      </div>
      <SmartCard glow="trust" className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl"
              style={{
                background: "color-mix(in oklch, var(--trust) 18%, transparent)",
                color: "var(--trust)",
              }}
            >
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium">Confiance générale</p>
              <p className="text-[11px] text-muted-foreground">Profil vérifié & transparent</p>
            </div>
          </div>
          <span className="text-2xl font-semibold" style={{ color: "var(--trust)" }}>
            {USER.trust}
          </span>
        </div>
        <div className="space-y-2">
          {TRUST_ITEMS.map((t) => (
            <div key={t.label} className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-muted-foreground">{t.label}</span>
                <span className="font-medium">{t.value}%</span>
              </div>
              <Progress value={t.value} className="h-1 bg-white/5" />
            </div>
          ))}
        </div>
        <Button asChild variant="outline" size="sm" className="w-full rounded-xl border-white/10">
          <Link to="/trust">
            Voir Trust Hub complet <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </SmartCard>
    </section>
  );
}
