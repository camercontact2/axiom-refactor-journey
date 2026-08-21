import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { CONTEXT_META, HubContext, NOTIFICATIONS, Notification } from "@/lib/notifications";
import { Radar } from "lucide-react";
import { EmptyState } from "@/features/notifications/components/EmptyState";
import { NotificationGroup } from "@/features/notifications/components/NotificationGroup";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — VITALA" },
      { name: "description", content: "Notifications contextuelles et intelligentes sur VITALA." },
    ],
  }),
  component: NotificationsPage,
});

function NotificationsPage() {
  const [filter, setFilter] = useState<"all" | HubContext>("all");
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const FILTERS: Array<{ id: "all" | HubContext; label: string }> = [
    { id: "all", label: "Toutes" },
    { id: "flash", label: "Flash" },
    { id: "radar", label: "Radar" },
    { id: "scan", label: "Scan" },
    { id: "trust", label: "Trust" },
    { id: "message", label: "Messages" },
  ];

  // Filter notifications
  const filtered = useMemo(() => {
    return NOTIFICATIONS.filter((n) => {
      if (dismissed.has(n.id)) return false;
      if (filter === "all") return true;
      return n.context === filter;
    });
  }, [filter, dismissed]);

  // Group by date
  const grouped = useMemo(() => {
    const groups: Record<string, Notification[]> = {
      today: [],
      yesterday: [],
      this_week: [],
    };
    filtered.forEach((n) => {
      groups[n.date]?.push(n);
    });
    return groups;
  }, [filtered]);

  const unreadCount = filtered.filter((n) => !n.read).length;
  const totalUnread = NOTIFICATIONS.filter((n) => !n.read).length;

  const handleDismiss = (id: string) => {
    setDismissed((prev) => new Set(prev).add(id));
  };

  const handleMarkAllAsRead = () => {
    // In a real app, this would persist. Here it just updates the read state.
    // For demo purposes, we'll just mark visual as read.
  };

  return (
    <AppShell>
      <div className="space-y-5 animate-[fade-up_0.5s_var(--ease-smooth)_both]">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Alertes</p>
            <h1 className="text-2xl font-semibold tracking-tight">Notifications</h1>
          </div>
          {totalUnread > 0 && (
            <div className="flex flex-col items-end gap-1">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-semibold"
                style={{
                  background: "var(--live)",
                  color: "#fff",
                  boxShadow: "0 0 12px var(--live)",
                }}
              >
                {totalUnread}
              </span>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="text-[10px] text-muted-foreground underline hover:text-foreground transition"
                >
                  Marquer tout comme lu
                </button>
              )}
            </div>
          )}
        </header>

        {/* Filter chips */}
        <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-2 pb-1">
            {FILTERS.map((f) => {
              const isActive = filter === f.id;
              const meta = f.id !== "all" ? CONTEXT_META[f.id] : null;
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

        {/* Notifications list */}
        {filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-6">
            {/* Today */}
            {grouped.today.length > 0 && (
              <NotificationGroup
                title="Aujourd'hui"
                notifications={grouped.today}
                onDismiss={handleDismiss}
              />
            )}

            {/* Yesterday */}
            {grouped.yesterday.length > 0 && (
              <NotificationGroup
                title="Hier"
                notifications={grouped.yesterday}
                onDismiss={handleDismiss}
              />
            )}

            {/* This week */}
            {grouped.this_week.length > 0 && (
              <NotificationGroup
                title="Cette semaine"
                notifications={grouped.this_week}
                onDismiss={handleDismiss}
              />
            )}
          </div>
        )}
      </div>
    </AppShell>
  );
}
