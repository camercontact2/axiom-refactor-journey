import { HubContext } from "@/lib/messaging";
import { Radar, ScanSearch, ShieldCheck, Zap } from "lucide-react";

export function HubIcon({ context, size = 14 }: { context: HubContext; size?: number }) {
  const props = { style: { width: size, height: size } };
  if (context === "flash") return <Zap {...props} />;
  if (context === "radar") return <Radar {...props} />;
  if (context === "scan") return <ScanSearch {...props} />;
  return <ShieldCheck {...props} />;
}
