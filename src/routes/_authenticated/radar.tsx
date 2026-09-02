import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { ScanWaves } from "@/components/scan/ScanWaves";
import { ScanReady } from "@/components/scan/ScanReady";
import { cn } from "@/lib/utils";
import { ChevronRight, MapPin, Mic, Radar, Radio, ShieldCheck, Sliders } from "lucide-react";
import { RadarState, PLACEHOLDER_PROMPTS, SMART_EXAMPLES, ANALYSIS_STEPS, MOCK_RESULTS } from "@/features/radar/data";
import { ActiveVeilles } from "@/features/radar/components/ActiveVeilles";
import { RadarSettingsSheet } from "@/features/radar/components/RadarSettingsSheet";
import { RecentSearches } from "@/features/radar/components/RecentSearches";
import { ResultsView } from "@/features/radar/components/ResultsView";
import { SmartSuggestionsSection } from "@/features/radar/components/SmartSuggestionsSection";

export const Route = createFileRoute("/_authenticated/radar")({
  head: () => ({
    meta: [
      { title: "Radar — Intelligence · VITALA" },
      {
        name: "description",
        content: "Describe your intention. RADAR searches intelligently.",
      },
    ],
  }),
  component: RadarPage,
});

function RadarPage() {
  const [state, setState] = useState<RadarState>("express");
  const [need, setNeed] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [voiceActive, setVoiceActive] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [veilleOn, setVeilleOn] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [params, setParams] = useState({
    radius: 10,
    depth: "balanced" as "fast" | "balanced" | "deep",
    trustMin: 70,
    availableOnly: true,
    scope: "all" as "all" | "humans" | "collectifs" | "services",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % PLACEHOLDER_PROMPTS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Animate analyzing steps
  useEffect(() => {
    if (state !== "analyzing") return;
    setAnalysisStep(0);
    const id = setInterval(() => {
      setAnalysisStep((s) => {
        if (s >= ANALYSIS_STEPS.length - 1) {
          clearInterval(id);
          setTimeout(() => setState("results"), 700);
          return s;
        }
        return s + 1;
      });
    }, 700);
    return () => clearInterval(id);
  }, [state]);

  const ready = need.trim().length > 3;

  const handleLaunch = () => {
    if (!ready) return;
    setState("analyzing");
  };

  const resetToExpress = () => {
    setState("express");
    setVeilleOn(false);
  };

  return (
    <AppShell>
      {state === "express" && (
        <div className="space-y-6 animate-[fade-up_0.6s_var(--ease-smooth)_both]">
          {/* Compact header */}
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-2xl"
                style={{
                  background: "color-mix(in oklch, var(--radar) 18%, transparent)",
                  boxShadow:
                    "inset 0 0 0 1px color-mix(in oklch, var(--radar) 35%, transparent), 0 0 24px -8px var(--radar)",
                  color: "var(--radar)",
                }}
              >
                <Radar className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--radar)" }}>
                  Radar
                </p>
                <h1 className="text-xl font-semibold leading-tight tracking-tight">
                  Décrivez votre intention
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="hidden xs:inline-flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-[var(--radar)] animate-pulse-soft" />
                  <span className="relative h-2 w-2 rounded-full bg-[var(--radar)]" />
                </span>
                <span className="text-[10px] text-muted-foreground opacity-60">Listening</span>
              </span>
              <button
                onClick={() => setSettingsOpen(true)}
                className="relative flex h-9 w-9 items-center justify-center rounded-xl transition-all hover:bg-white/5"
                aria-label="Paramètres du radar"
                style={{
                  boxShadow:
                    "inset 0 0 0 1px color-mix(in oklch, var(--radar) 22%, transparent)",
                }}
              >
                <Sliders className="h-4 w-4" style={{ color: "var(--radar)" }} />
              </button>
            </div>
          </header>

          {/* Composer — compact (half height) */}
          <section>
            <div
              className="glass-surface relative overflow-hidden rounded-3xl p-4 transition-all duration-500"
              style={{
                boxShadow: isFocused
                  ? "var(--shadow-glass), 0 0 60px -20px var(--radar), inset 0 0 0 1px color-mix(in oklch, var(--radar) 25%, transparent)"
                  : "var(--shadow-glass), 0 0 30px -20px var(--radar)",
              }}
            >
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full blur-3xl transition-opacity duration-500"
                style={{ background: "var(--gradient-radar)", opacity: isFocused ? 0.3 : 0.12 }}
              />

              <textarea
                value={need}
                onChange={(e) => setNeed(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={PLACEHOLDER_PROMPTS[currentPlaceholder]}
                rows={2}
                className="relative w-full resize-none bg-transparent text-base leading-relaxed text-foreground placeholder:text-muted-foreground/40 focus:outline-none font-light tracking-tight"
              />

              <div className="relative mt-2 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground/70">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {params.radius} km
                  </span>
                  <span className="opacity-30">·</span>
                  <span className="inline-flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" /> Trust ≥ {params.trustMin}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setVoiceActive(!voiceActive)}
                    aria-label="Saisie vocale"
                    className={cn(
                      "relative flex h-9 w-9 items-center justify-center rounded-full transition-all",
                      voiceActive && "scale-110",
                    )}
                    style={{
                      background: voiceActive
                        ? "var(--gradient-radar)"
                        : "color-mix(in oklch, var(--radar) 16%, transparent)",
                      boxShadow: voiceActive
                        ? "0 0 24px -6px var(--radar)"
                        : "inset 0 0 0 1px color-mix(in oklch, var(--radar) 30%, transparent)",
                    }}
                  >
                    <Mic
                      className={cn("h-4 w-4", voiceActive ? "text-white" : "text-[var(--radar)]")}
                    />
                  </button>
                  <button
                    onClick={handleLaunch}
                    disabled={!ready}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-white transition-all",
                      ready ? "active:scale-95" : "opacity-40 cursor-not-allowed",
                    )}
                    style={{
                      background: "var(--gradient-radar)",
                      boxShadow: ready ? "0 0 24px -6px var(--radar)" : "none",
                    }}
                  >
                    <Radio className="h-3.5 w-3.5" />
                    Lancer
                  </button>
                </div>
              </div>
            </div>

            {voiceActive && (
              <p className="mt-2 text-center text-[11px] text-muted-foreground animate-[fade-up_0.3s_var(--ease-smooth)_both]">
                <span style={{ color: "var(--radar)" }}>●</span> Enregistrement…
              </p>
            )}
          </section>

          {/* Quick examples */}
          <section className="space-y-2">
            <p className="px-1 text-[11px] uppercase tracking-[0.15em] text-muted-foreground/60">
              Suggestions
            </p>
            <div className="grid grid-cols-2 gap-2">
              {SMART_EXAMPLES.map((example, i) => (
                <button
                  key={i}
                  onClick={() => setNeed(example.text)}
                  className="glass-surface group relative overflow-hidden rounded-2xl px-3 py-2.5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_30px_-10px_var(--radar)]"
                >
                  <div className="relative flex items-center gap-2">
                    <span className="text-base">{example.icon}</span>
                    <p className="text-xs font-medium text-foreground/80">{example.text}</p>
                  </div>
                  <ChevronRight className="absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground/30 transition-all group-hover:translate-x-0.5" />
                </button>
              ))}
            </div>
          </section>

          <ActiveVeilles />
          <RecentSearches onPick={setNeed} />
          <SmartSuggestionsSection onPick={setNeed} />
        </div>
      )}

      {state === "analyzing" && (
        <ScanWaves
          color="var(--radar)"
          title="Scan en cours…"
          subtitle={`« ${need} »`}
          duration={3800}
          onComplete={() => setState("ready")}
        />
      )}

      {state === "ready" && (
        <ScanReady
          color="var(--radar)"
          count={MOCK_RESULTS.length}
          onView={() => setState("results")}
        />
      )}

      {state === "results" && (
        <ResultsView
          need={need}
          veilleOn={veilleOn}
          onToggleVeille={() => setVeilleOn((v) => !v)}
          onBack={resetToExpress}
        />
      )}

      {settingsOpen && (
        <RadarSettingsSheet
          params={params}
          onChange={setParams}
          onClose={() => setSettingsOpen(false)}
        />
      )}
    </AppShell>
  );
}
