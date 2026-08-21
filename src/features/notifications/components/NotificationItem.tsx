import { useState } from "react";
import { CONTEXT_META, Notification, PRIORITY_META } from "@/lib/notifications";
import { cn } from "@/lib/utils";
import { Check, ChevronRight, X } from "lucide-react";
import { ContextIcon } from "./ContextIcon";
import { PriorityDot } from "./PriorityDot";
import { ContextBadge } from "./ContextBadge";

export function NotificationItem({
  notification,
  onDismiss,
  delay,
}: {
  notification: Notification;
  onDismiss: (id: string) => void;
  delay?: number;
}) {
  const [showActions, setShowActions] = useState(false);
  const meta = CONTEXT_META[notification.context];
  const priorityMeta = PRIORITY_META[notification.priority];
  const isUnread = !notification.read;

  const animationStyle = delay ? { animationDelay: `${delay}ms` } : undefined;

  return (
    <div
      className="animate-[fade-up_0.4s_var(--ease-smooth)_both]"
      style={animationStyle}
    >
      <button
        onClick={() => setShowActions((v) => !v)}
        className={cn(
          "glass-surface group w-full rounded-2xl px-4 py-3 text-left transition-all duration-200 hover:-translate-y-0.5",
          isUnread && "ring-1",
        )}
        style={
          isUnread
            ? { boxShadow: `0 0 0 1px color-mix(in oklch, ${meta.color} 25%, transparent), var(--shadow-glass)` }
            : undefined
        }
      >
        <div className="flex items-start gap-3">
          {/* Avatar or icon */}
          {notification.avatarInitials ? (
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
              style={{
                background: `color-mix(in oklch, ${meta.color} 20%, var(--surface-2))`,
                color: meta.color,
              }}
            >
              {notification.avatarInitials}
            </div>
          ) : (
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
              style={{
                background: `color-mix(in oklch, ${meta.color} 16%, transparent)`,
                color: meta.color,
              }}
            >
              <ContextIcon context={notification.context} size={18} />
            </div>
          )}

          {/* Content */}
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={cn(
                      "text-sm font-semibold leading-snug",
                      isUnread ? "text-foreground" : "text-foreground/80",
                    )}
                  >
                    {notification.title}
                  </span>
                  <ContextBadge context={notification.context} small />
                  {notification.priority !== "normal" && notification.priority !== "info" && (
                    <span
                      className="text-[10px] font-medium rounded-full px-1.5 py-0.5"
                      style={{
                        background: priorityMeta.bgColor,
                        color: priorityMeta.color,
                      }}
                    >
                      {priorityMeta.label}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-muted-foreground/80 leading-relaxed">
                  {notification.description}
                </p>
              </div>

              {/* Timestamp + close */}
              <div className="flex shrink-0 flex-col items-end gap-1">
                <span className="text-[10px] text-muted-foreground">{notification.timestamp}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDismiss(notification.id);
                  }}
                  className="text-muted-foreground hover:text-foreground transition opacity-0 group-hover:opacity-100"
                  aria-label="Fermer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Priority indicator */}
            {notification.priority !== "normal" && notification.priority !== "info" && (
              <div className="mt-2 flex items-center gap-1">
                <PriorityDot priority={notification.priority} />
                {notification.priority === "urgent" && (
                  <span className="text-[10px] text-destructive font-medium">Action requise</span>
                )}
                {notification.priority === "important" && (
                  <span className="text-[10px] text-live font-medium">À voir rapidement</span>
                )}
              </div>
            )}

            {/* Actions (expanded) */}
            {showActions && notification.actions && (
              <div className="mt-3 flex flex-wrap gap-2 pt-3 border-t border-white/5">
                {notification.actions.map((action) => (
                  <button
                    key={action.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (action.id === "ignore" || action.id === "close") {
                        onDismiss(notification.id);
                      }
                      setShowActions(false);
                    }}
                    className={cn(
                      "flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all",
                      action.type === "primary"
                        ? "hover:scale-105"
                        : "hover:bg-white/5",
                    )}
                    style={
                      action.type === "primary"
                        ? {
                            background: `color-mix(in oklch, ${meta.color} 20%, var(--surface-2))`,
                            color: meta.color,
                          }
                        : {
                            background: "transparent",
                            color: "var(--muted-foreground)",
                          }
                    }
                  >
                    {action.id === "view" || action.id === "explore" || action.id === "reply" ? (
                      <ChevronRight className="h-3 w-3" />
                    ) : (
                      <Check className="h-3 w-3" />
                    )}
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Unread indicator */}
          {isUnread && (
            <span
              className="h-2 w-2 rounded-full shrink-0 mt-1"
              style={{ background: meta.color, boxShadow: `0 0 6px ${meta.color}` }}
            />
          )}
        </div>
      </button>
    </div>
  );
}
