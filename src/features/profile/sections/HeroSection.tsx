import { Link } from "@tanstack/react-router";
import { SmartCard } from "@/components/ui-kit/SmartCard";
import { TrustBadge } from "@/components/ui-kit/TrustBadge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BadgeCheck, Pencil, ShieldCheck } from "lucide-react";
import { USER } from "@/features/profile/data";
import { USER } from "../data";

export function HeroSection() {
  return (
    <SmartCard className="space-y-4">
      <div className="flex items-start gap-3">
        <div className="relative">
          <Avatar className="h-16 w-16 ring-2 ring-[color-mix(in_oklch,var(--primary)_40%,transparent)]">
            <AvatarImage src="" alt={USER.name} />
            <AvatarFallback className="bg-gradient-to-br from-[var(--primary)]/40 to-[var(--scan)]/40 text-base font-semibold">
              SL
            </AvatarFallback>
          </Avatar>
          <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--trust)] ring-2 ring-background">
            <BadgeCheck className="h-3 w-3 text-background" />
          </span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold leading-tight">{USER.name}</h2>
            <TrustBadge score={USER.trust} />
          </div>
          <p className="text-xs text-muted-foreground">
            {USER.handle} · {USER.city}
          </p>
          <span
            className="mt-1.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium"
            style={{
              background: "color-mix(in oklch, var(--trust) 15%, transparent)",
              color: "var(--trust)",
              border: "1px solid color-mix(in oklch, var(--trust) 30%, transparent)",
            }}
          >
            <BadgeCheck className="h-3 w-3" /> {USER.status}
          </span>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span>Niveau d'activité</span>
          <span className="font-medium text-foreground">{USER.activity}%</span>
        </div>
        <Progress value={USER.activity} className="h-1.5 bg-white/5" />
      </div>

      <div className="flex gap-2">
        <Button size="sm" className="flex-1 rounded-xl">
          <Pencil className="h-3.5 w-3.5" /> Modifier profil
        </Button>
        <Button asChild size="sm" variant="outline" className="flex-1 rounded-xl border-white/10">
          <Link to="/trust">
            <ShieldCheck className="h-3.5 w-3.5" /> Trust Space
          </Link>
        </Button>
      </div>
    </SmartCard>
  );
}
