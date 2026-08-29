import { Link } from "@tanstack/react-router";
import { Zap, Radar, ScanSearch, ShieldCheck, ArrowUpRight } from "lucide-react";

const hubs = [
  {
    to: "/flash",
    label: "Flash",
    desc: "Publier vite",
    icon: Zap,
    color: "var(--flash)",
    gradient: "var(--gradient-flash)",
  },
  {
    to: "/radar",
    label: "Radar",
    desc: "Exprimer un besoin",
    icon: Radar,
    color: "var(--radar)",
    gradient: "var(--gradient-radar)",
  },
  {
    to: "/scan",
    label: "Scan",
    desc: "Découvrir autour",
    icon: ScanSearch,
    color: "var(--scan)",
    gradient: "var(--gradient-scan)",
  },
  {
    to: "/trust",
    label: "Trust",
    desc: "Vérifier la fiabilité",
    icon: ShieldCheck,
    color: "var(--trust)",
    gradient: "var(--gradient-trust)",
  },
] as const;

export function HubGrid() {
  return (
    <section className="home-section">
      <div className="home-section-head">
        <h2 className="home-section-title">Quick actions</h2>
        <span className="home-meta">4 hubs</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {hubs.map((h) => {
          const Icon = h.icon;
          return (
            <Link
              key={h.to}
              to={h.to}
              aria-label={`${h.label} — ${h.desc}`}
              className="glass-surface group relative overflow-hidden home-card p-4 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <div
                className="absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-30 blur-2xl transition-opacity group-hover:opacity-70"
                style={{ background: h.gradient }}
              />
              <div className="relative flex flex-col gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform group-hover:scale-105"
                  style={{
                    background: `color-mix(in oklch, ${h.color} 18%, transparent)`,
                    boxShadow: `inset 0 0 0 1px color-mix(in oklch, ${h.color} 30%, transparent)`,
                  }}
                >
                  <Icon aria-hidden="true" className="h-5 w-5" style={{ color: h.color }} strokeWidth={2.2} />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold tracking-tight">{h.label}</span>
                    <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                  <p className="home-meta mt-0.5">{h.desc}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
