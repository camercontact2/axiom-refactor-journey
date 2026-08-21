import { Conversation, HUB_META } from "@/lib/messaging";
import { cn } from "@/lib/utils";
import { BadgeCheck } from "lucide-react";
import { StatusDot } from "./StatusDot";
import { ContextBadge } from "./ContextBadge";

export function ConvItem({ conv, onOpen }: { conv: Conversation; onOpen: (id: string) => void }) {
  const meta = HUB_META[conv.context];
  const isUnread = conv.unread > 0;

  return (
    <button
      onClick={() => onOpen(conv.id)}
      className="glass-surface group w-full overflow-hidden rounded-2xl px-4 py-3.5 text-left transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.99]"
      style={
        isUnread
          ? { boxShadow: `0 0 0 1px color-mix(in oklch, ${meta.color} 25%, transparent), var(--shadow-glass)` }
          : undefined
      }
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold"
            style={{
              background: `color-mix(in oklch, ${meta.color} 20%, var(--surface-2))`,
              color: meta.color,
              boxShadow: `inset 0 0 0 1.5px color-mix(in oklch, ${meta.color} 35%, transparent)`,
            }}
          >
            {conv.contact.avatarInitials}
          </div>
          {conv.contact.verified && (
            <span
              className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full"
              style={{ background: "var(--trust)", boxShadow: "0 0 0 2px var(--background)" }}
            >
              <BadgeCheck className="h-2.5 w-2.5 text-background" />
            </span>
          )}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className={cn("truncate text-sm font-semibold", isUnread && "text-foreground")}>
                {conv.contact.name}
              </span>
              <ContextBadge context={conv.context} small />
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              <span className="text-[11px] text-muted-foreground">{conv.lastTs}</span>
              {isUnread && (
                <span
                  className="flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-semibold text-white"
                  style={{ background: meta.color }}
                >
                  {conv.unread}
                </span>
              )}
            </div>
          </div>

          <p className="mt-0.5 text-xs text-muted-foreground/80 truncate">{conv.contextTitle}</p>

          <div className="mt-1 flex items-center gap-1.5">
            <StatusDot status={conv.status} />
            <p
              className={cn(
                "flex-1 truncate text-sm leading-snug",
                isUnread ? "font-medium text-foreground/90" : "text-muted-foreground",
              )}
            >
              {conv.lastMessage}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}
