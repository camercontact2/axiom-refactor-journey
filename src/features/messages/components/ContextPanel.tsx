import { Conversation, HUB_META } from "@/lib/messaging";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { HubIcon } from "./HubIcon";
import { ContextBadge } from "./ContextBadge";

export function ContextPanel({ conv, onClose }: { conv: Conversation; onClose: () => void }) {
  const meta = HUB_META[conv.context];
  return (
    <div
      className="mt-3 rounded-2xl border border-white/8 overflow-hidden animate-[fade-up_0.25s_var(--ease-smooth)_both]"
      style={{
        background: `color-mix(in oklch, ${meta.color} 6%, var(--surface-1))`,
        boxShadow: `0 0 24px -10px ${meta.color}`,
      }}
    >
      <div className="flex items-start gap-3 px-4 py-3">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
          style={{ background: `color-mix(in oklch, ${meta.color} 18%, transparent)`, color: meta.color }}
        >
          <HubIcon context={conv.context} size={16} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <ContextBadge context={conv.context} small />
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-medium",
                conv.status === "resolved"
                  ? "bg-white/5 text-muted-foreground"
                  : "text-[var(--success)]",
              )}
              style={
                conv.status !== "resolved"
                  ? { background: "color-mix(in oklch, var(--success) 14%, transparent)" }
                  : undefined
              }
            >
              {conv.status === "resolved" ? "Résolu" : "En cours"}
            </span>
          </div>
          <p className="mt-1 text-sm font-semibold leading-tight">{conv.contextTitle}</p>
          <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{conv.contextSummary}</p>
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground shrink-0 mt-0.5">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
