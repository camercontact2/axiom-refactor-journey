import { HUB_META, HubContext } from "@/lib/messaging";
import { cn } from "@/lib/utils";
import { HubIcon } from "./HubIcon";

export function ContextBadge({ context, small }: { context: HubContext; small?: boolean }) {
  const meta = HUB_META[context];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-medium",
        small ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-0.5 text-[11px]",
      )}
      style={{
        background: `color-mix(in oklch, ${meta.color} 16%, transparent)`,
        color: meta.color,
        boxShadow: `inset 0 0 0 1px color-mix(in oklch, ${meta.color} 30%, transparent)`,
      }}
    >
      <HubIcon context={context} size={small ? 10 : 12} />
      {meta.label}
    </span>
  );
}
