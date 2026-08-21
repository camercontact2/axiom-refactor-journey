import { MapPin, MessageCircle, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { MOCK_RESULTS } from "../data";

export function MatchCard({ match, delay }: { match: (typeof MOCK_RESULTS)[number]; delay: number }) {
  return (
    <div
      className="glass-surface group relative overflow-hidden rounded-2xl p-4 transition-all duration-300 hover:-translate-y-0.5"
      style={{
        animation: `fade-up 0.5s var(--ease-smooth) ${delay}ms both`,
        boxShadow: "var(--shadow-glass)",
      }}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-20 blur-3xl transition-opacity group-hover:opacity-40"
        style={{ background: match.gradient }}
      />

      <div className="relative flex items-start gap-3">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-semibold text-white"
            style={{ background: match.gradient, boxShadow: "0 0 24px -8px var(--radar)" }}
          >
            {match.avatar}
          </div>
          {match.available && (
            <span
              className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background"
              style={{ background: "var(--success)" }}
            />
          )}
        </div>

        {/* Body */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{match.name}</p>
              <p className="truncate text-[11px] text-muted-foreground">{match.role}</p>
            </div>
            <div
              className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold"
              style={{
                background: "color-mix(in oklch, var(--radar) 18%, transparent)",
                color: "var(--radar)",
                boxShadow: "inset 0 0 0 1px color-mix(in oklch, var(--radar) 30%, transparent)",
              }}
            >
              {match.compatibility}% match
            </div>
          </div>

          {/* Meta */}
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {match.location}
            </span>
            <span className="inline-flex items-center gap-1" style={{ color: "var(--trust)" }}>
              <ShieldCheck className="h-3 w-3" /> Trust {match.trust}
            </span>
            <span className="inline-flex items-center gap-1">
              <Zap className="h-3 w-3" style={{ color: match.available ? "var(--success)" : "var(--warning)" }} />
              {match.available ? "Disponible" : "Bientôt"}
            </span>
          </div>

          {/* Tags */}
          <div className="mt-2 flex flex-wrap gap-1">
            {match.tags.map((t) => (
              <span
                key={t}
                className="rounded-full px-2 py-0.5 text-[10px] text-foreground/70"
                style={{
                  background: "var(--surface-2)",
                  boxShadow: "inset 0 0 0 1px oklch(1 0 0 / 0.06)",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* AI note */}
          <p className="mt-2.5 flex items-start gap-1.5 text-[11px] leading-relaxed text-muted-foreground">
            <Sparkles className="mt-0.5 h-3 w-3 shrink-0" style={{ color: "var(--radar)" }} />
            <span className="italic">{match.note}</span>
          </p>

          {/* Action */}
          <button
            className="mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-white transition hover:-translate-y-0.5"
            style={{
              background: "var(--gradient-radar)",
              boxShadow: "0 0 20px -6px var(--radar)",
            }}
          >
            <MessageCircle className="h-3.5 w-3.5" />
            Entrer en contact
          </button>
        </div>
      </div>
    </div>
  );
}
