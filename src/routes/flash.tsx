import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { HubHeader } from "@/components/hub/HubHeader";
import { ScanWaves } from "@/components/scan/ScanWaves";
import { ScanReady } from "@/components/scan/ScanReady";
import { cn } from "@/lib/utils";
import { Zap } from "lucide-react";
import { Mode, SCAN_RESULTS } from "@/features/flash/data";
import { CreateSheet } from "@/features/flash/components/CreateSheet";
import { IntentCards } from "@/features/flash/components/IntentCards";
import { MyFlashes } from "@/features/flash/components/MyFlashes";
import { RecentFlashes } from "@/features/flash/components/RecentFlashes";
import { ScanConfig } from "@/features/flash/components/ScanConfig";
import { ScanResults } from "@/features/flash/components/ScanResults";

export const Route = createFileRoute("/flash")({
  head: () => ({ meta: [{ title: "Flash — Publish in seconds" }] }),
  component: FlashPage,
});

function FlashPage() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("home");
  const [exiting, setExiting] = useState(false);
  const [scanRadius, setScanRadius] = useState(2);
  const [scanCat, setScanCat] = useState<"all" | "services" | "ventes" | "besoins">("all");
  const [urgent, setUrgent] = useState(false);

  const goScanConfig = () => {
    setExiting(true);
    setTimeout(() => {
      setMode("scan-config");
      setExiting(false);
    }, 380);
  };

  const launchScan = () => setMode("scanning");

  if (mode === "scanning") {
    return (
      <ScanWaves
        color="var(--scan)"
        title="Scan en cours…"
        subtitle={`Analyse des signaux dans un rayon de ${scanRadius} km`}
        onComplete={() => setMode("scan-ready")}
      />
    );
  }

  if (mode === "scan-ready") {
    return (
      <ScanReady
        color="var(--scan)"
        count={SCAN_RESULTS.length}
        subtitle={`${SCAN_RESULTS.length} opportunités détectées dans ${scanRadius} km.`}
        onView={() => setMode("scan-results")}
      />
    );
  }

  return (
    <AppShell>
      <div
        className={cn(
          "transition-all duration-300",
          exiting && "opacity-0 blur-sm scale-[0.98]",
        )}
      >
        {mode === "home" && (
          <div className="space-y-6 animate-[fade-up_0.5s_var(--ease-smooth)_both]">
            <HubHeader
              eyebrow="Flash"
              title="Publiez ou explorez en quelques secondes"
              description="Créez un Flash ou scannez les opportunités autour de vous."
              color="var(--flash)"
              icon={<Zap className="h-5 w-5" />}
            />

            <IntentCards onCreate={() => setOpen(true)} onScan={goScanConfig} />

            <MyFlashes />

            <RecentFlashes />
          </div>
        )}

        {mode === "scan-config" && (
          <ScanConfig
            radius={scanRadius}
            onRadius={setScanRadius}
            cat={scanCat}
            onCat={setScanCat}
            urgent={urgent}
            onUrgent={setUrgent}
            onBack={() => setMode("home")}
            onLaunch={launchScan}
          />
        )}

        {mode === "scan-results" && (
          <ScanResults
            radius={scanRadius}
            onBack={() => setMode("home")}
            onRescan={() => setMode("scan-config")}
          />
        )}
      </div>

      {open && <CreateSheet onClose={() => setOpen(false)} />}
    </AppShell>
  );
}
