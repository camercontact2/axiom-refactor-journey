import { useState } from "react";
import { CONVERSATIONS, HUB_META, HubContext } from "@/lib/messaging";
import { Radar } from "lucide-react";
import { ConvItem } from "./ConvItem";
import { EmptyState } from "./EmptyState";

export function Inbox({ onOpen }: { onOpen: (id: string) => void }) {
  const [filter, setFilter] = useState<"all" | HubContext>("all");

  const filtered = CONVERSATIONS.filter(
    (c) => filter === "all" || c.context === filter,
  );

  const totalUnread = CONVERSATIONS.reduce((n, c) => n + c.unread, 0);

  const FILTERS: Array<{ id: "all" | HubContext; label: string }> = [
    { id: "all", label: "Tous" },
    { id: "flash", label: "Flash" },
    { id: "radar", label: "Radar" },
    { id: "scan", label: "Scan" },
    { id: "trust", label: "Trust" },
  ];

  return (
    <div className="space-y-5 animate-[fade-up_0.5s_var(--ease-smooth)_both]">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Messages</p>
          <h1 className="text-2xl font-semibold tracking-tight">Conversations</h1>
        </div>
        {totalUnread > 0 && (
          <span
            className="flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-semibold"
            style={{ background: "var(--live)", color: "#fff", boxShadow: "0 0 12px var(--live)" }}
          >
            {totalUnread}
          </span>
        )}
      </header>

      {/* Filter chips */}
      <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-2 pb-1">
          {FILTERS.map((f) => {
            const isActive = filter === f.id;
            const meta = f.id !== "all" ? HUB_META[f.id] : null;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className="shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all"
                style={
                  isActive
                    ? {
                        background: meta
                          ? `color-mix(in oklch, ${meta.color} 18%, transparent)`
                          : "var(--surface-3)",
                        color: meta ? meta.color : "var(--foreground)",
                        boxShadow: meta
                          ? `inset 0 0 0 1px color-mix(in oklch, ${meta.color} 40%, transparent)`
                          : "inset 0 0 0 1px var(--glass-border)",
                      }
                    : {
                        background: "var(--glass)",
                        color: "var(--muted-foreground)",
                        boxShadow: "inset 0 0 0 1px var(--glass-border)",
                      }
                }
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-2">
          {filtered.map((conv) => (
            <ConvItem key={conv.id} conv={conv} onOpen={onOpen} />
          ))}
        </div>
      )}
    </div>
  );
}
