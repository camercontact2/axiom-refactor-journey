import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { HubHeader } from "@/components/hub/HubHeader";
import { SmartCard } from "@/components/ui-kit/SmartCard";
import { TrustBadge, LiveDot } from "@/components/ui-kit/TrustBadge";
import { ArrowUpRight, Clock, Eye, Filter, MapPin, MessageCircle, ScanSearch, Search, Sparkles, TrendingUp, Zap } from "lucide-react";
import { FILTERS, FEED, NEARBY, TRENDING, URGENT, SUGGESTIONS } from "@/features/scan/data";
import { StatusBadge } from "@/features/scan/components/StatusBadge";

export const Route = createFileRoute("/_authenticated/scan")({
  head: () => ({
    meta: [
      { title: "Scan — VITALA" },
      { name: "description", content: "Découvrez opportunités, services et besoins autour de vous." },
    ],
  }),
  component: ScanPage,
});

function ScanPage() {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return FEED.filter((f) => {
      if (active !== "all") {
        if (active === "urgent" && f.status !== "urgent") return false;
        if (active === "trending" && f.status !== "trending") return false;
        if (active === "flash" && f.status !== "flash") return false;
        if (active === "promo" && f.status !== "flash") return false;
        if (["service", "job", "need"].includes(active) && f.cat !== active) return false;
      }
      if (query && !f.title.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [active, query]);

  return (
    <AppShell>
      <div className="space-y-7 animate-[fade-up_0.5s_var(--ease-smooth)_both]">
        {/* HERO */}
        <HubHeader
          eyebrow="Scan"
          title="Explorer autour de vous"
          description="Découvrez des opportunités, services et besoins en temps réel."
          color="var(--scan)"
          icon={<ScanSearch className="h-5 w-5" />}
          live
        />

        {/* Scan search with radar pulse */}
        <SmartCard glow="scan" className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-30 blur-3xl"
            style={{ background: "var(--scan)" }}
          />
          <div className="relative flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl"
              style={{
                background: "color-mix(in oklch, var(--scan) 18%, transparent)",
                color: "var(--scan)",
              }}
            >
              <Search className="h-4 w-4" />
              <span className="absolute inset-0 rounded-2xl animate-pulse-soft"
                style={{ boxShadow: "0 0 0 2px color-mix(in oklch, var(--scan) 40%, transparent)" }}
              />
            </div>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un service, une offre ou une opportunité..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <button className="rounded-xl border border-white/10 bg-white/5 p-2 text-muted-foreground transition hover:text-foreground">
              <Filter className="h-4 w-4" />
            </button>
          </div>
          <div className="relative mt-3 flex items-center gap-2 text-[11px] text-muted-foreground">
            <LiveDot label="Scan actif" />
            <span>·</span>
            <span>{filtered.length} résultats à proximité</span>
          </div>
        </SmartCard>

        {/* FILTER CHIPS */}
        <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-2 pb-1">
            {FILTERS.map((f) => {
              const Icon = f.icon;
              const isActive = active === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setActive(f.id)}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium transition"
                  style={
                    isActive
                      ? {
                          background: "color-mix(in oklch, var(--scan) 18%, transparent)",
                          color: "var(--scan)",
                          boxShadow: "inset 0 0 0 1px color-mix(in oklch, var(--scan) 40%, transparent)",
                        }
                      : {
                          background: "var(--glass)",
                          color: "var(--muted-foreground)",
                          boxShadow: "inset 0 0 0 1px var(--glass-border)",
                        }
                  }
                >
                  <Icon className="h-3.5 w-3.5" />
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* LIVE DISCOVERY FEED */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-medium text-muted-foreground">Découvertes en direct</h2>
            <LiveDot label="Live" />
          </div>

          {filtered.length === 0 ? (
            <SmartCard className="text-center">
              <p className="text-sm font-medium">Aucun résultat pour ce filtre</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Essayez d'élargir la recherche ou changer de catégorie.
              </p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                <button onClick={() => setActive("all")} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">
                  À proximité
                </button>
                <button onClick={() => setActive("trending")} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">
                  Tendances
                </button>
                <button onClick={() => setQuery("")} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">
                  Réinitialiser
                </button>
              </div>
            </SmartCard>
          ) : (
            filtered.map((f) => (
              <SmartCard key={f.id}>
                <div className="flex items-start gap-3">
                  <div
                    className="h-12 w-12 shrink-0 rounded-2xl"
                    style={{ background: "var(--gradient-scan)" }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-semibold leading-tight">{f.title}</span>
                      <TrustBadge score={f.score} />
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] text-muted-foreground">
                      <span>{f.category}</span>
                      <span>·</span>
                      <span className="inline-flex items-center gap-0.5"><MapPin className="h-3 w-3" />{f.distance}</span>
                      <StatusBadge status={f.status} />
                    </div>
                    <p className="mt-1.5 text-xs text-muted-foreground">{f.desc}</p>
                    <div className="mt-3 flex gap-2">
                      <button className="inline-flex items-center gap-1 rounded-lg bg-white/5 px-2.5 py-1.5 text-xs transition hover:bg-white/10">
                        <Eye className="h-3 w-3" /> Voir
                      </button>
                      <button
                        className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition"
                        style={{
                          background: "color-mix(in oklch, var(--scan) 18%, transparent)",
                          color: "var(--scan)",
                        }}
                      >
                        <MessageCircle className="h-3 w-3" /> Contacter
                      </button>
                    </div>
                  </div>
                </div>
              </SmartCard>
            ))
          )}
        </section>

        {/* NEARBY INTELLIGENCE */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-medium text-muted-foreground">Autour de vous</h2>
            <span className="text-[11px] text-muted-foreground">≤ 1 km</span>
          </div>
          <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-3 pb-1">
              {NEARBY.map((n, i) => (
                <SmartCard key={i} className="w-56 shrink-0">
                  <div
                    className="mb-3 h-20 w-full rounded-xl"
                    style={{ background: "var(--gradient-scan)", opacity: 0.85 }}
                  />
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold">{n.title}</p>
                      <p className="text-[11px] text-muted-foreground">{n.tag}</p>
                    </div>
                    <TrustBadge score={n.score} />
                  </div>
                  <p className="mt-2 inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                    <MapPin className="h-3 w-3" /> {n.dist}
                  </p>
                </SmartCard>
              ))}
            </div>
          </div>
        </section>

        {/* TRENDING */}
        <section className="space-y-3">
          <h2 className="px-1 text-sm font-medium text-muted-foreground">En tendance</h2>
          <SmartCard className="divide-y divide-white/5 p-0">
            {TRENDING.map((t, i) => (
              <button key={i} className="flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-white/5">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-xl"
                    style={{
                      background: "color-mix(in oklch, var(--scan) 14%, transparent)",
                      color: "var(--scan)",
                    }}
                  >
                    <TrendingUp className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.title}</p>
                    <p className="text-[11px] text-muted-foreground">{t.count}</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </SmartCard>
        </section>

        {/* URGENT LAYER */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-medium" style={{ color: "var(--live)" }}>
              Urgences détectées
            </h2>
            <LiveDot label="Temps réel" />
          </div>
          {URGENT.map((u, i) => (
            <SmartCard key={i}>
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl"
                  style={{
                    background: "color-mix(in oklch, var(--live) 16%, transparent)",
                    color: "var(--live)",
                    boxShadow: "inset 0 0 0 1px color-mix(in oklch, var(--live) 35%, transparent)",
                  }}
                >
                  <Zap className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{u.title}</p>
                  <p className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-0.5"><MapPin className="h-3 w-3" />{u.dist}</span>
                    <span className="inline-flex items-center gap-0.5"><Clock className="h-3 w-3" />{u.time}</span>
                  </p>
                </div>
                <button
                  className="rounded-lg px-3 py-1.5 text-xs font-medium"
                  style={{
                    background: "color-mix(in oklch, var(--live) 18%, transparent)",
                    color: "var(--live)",
                  }}
                >
                  Répondre
                </button>
              </div>
            </SmartCard>
          ))}
        </section>

        {/* SMART SUGGESTIONS */}
        <section className="space-y-3">
          <h2 className="px-1 text-sm font-medium text-muted-foreground">Suggestions pour vous</h2>
          <SmartCard glow="scan">
            <div className="mb-2 flex items-center gap-1.5 text-xs" style={{ color: "var(--scan)" }}>
              <Sparkles className="h-3.5 w-3.5" /> Curated by VITALA AI
            </div>
            <div className="space-y-1.5">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition hover:bg-white/5"
                >
                  <span>{s}</span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </SmartCard>
        </section>
      </div>
    </AppShell>
  );
}
