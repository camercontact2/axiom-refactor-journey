import { HubContext } from "@/lib/notifications";
import { MessageCircle, Radar, ScanSearch, ShieldCheck, Zap } from "lucide-react";

export function ContextIcon({ context, size = 14 }: { context: HubContext; size?: number }) {
  const props = { style: { width: size, height: size } };
  if (context === "flash") return <Zap {...props} />;
  if (context === "radar") return <Radar {...props} />;
  if (context === "scan") return <ScanSearch {...props} />;
  if (context === "trust") return <ShieldCheck {...props} />;
  return <MessageCircle {...props} />;
}
