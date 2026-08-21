import { useState, useRef, useEffect } from "react";
import { CONVERSATIONS, Conversation, HUB_META, QUICK_REPLIES, SMART_ACTIONS } from "@/lib/messaging";
import { cn } from "@/lib/utils";
import { AlertCircle, ArrowLeft, BadgeCheck, CheckCircle2, Info, Send, X, Zap } from "lucide-react";
import { ActionIcon } from "./ActionIcon";
import { ContextBadge } from "./ContextBadge";
import { TrustChip } from "./TrustChip";
import { ReadIcon } from "./ReadIcon";
import { ContextPanel } from "./ContextPanel";

export function ChatScreen({ convId, onBack }: { convId: string; onBack: () => void }) {
  const [conv, setConv] = useState(() => CONVERSATIONS.find((c) => c.id === convId)!);
  const [input, setInput] = useState("");
  const [showActions, setShowActions] = useState(false);
  const [showContext, setShowContext] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const meta = HUB_META[conv.context];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conv.messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const newMsg = {
      id: `m${Date.now()}`,
      senderId: "me",
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
      status: "sent" as const,
    };
    setConv((prev) => ({ ...prev, messages: [...prev.messages, newMsg] }));
    setInput("");
    setShowActions(false);
  };

  const triggerAction = (label: string) => {
    setActionFeedback(label);
    setTimeout(() => setActionFeedback(null), 2000);
    sendMessage(`[Action] ${label}`);
  };

  const resolveConv = () => {
    setConv((prev) => ({ ...prev, status: "resolved" }));
    const sysMsg = {
      id: `m${Date.now()}`,
      senderId: "system",
      text: "Conversation marquée comme résolue.",
      timestamp: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
      status: "read" as const,
      type: "system" as const,
    };
    setConv((prev) => ({ ...prev, messages: [...prev.messages, sysMsg], status: "resolved" }));
  };

  return (
    <div className="flex h-[100dvh] flex-col bg-background animate-[fade-up_0.3s_var(--ease-smooth)_both]">
      {/* ── Top bar ── */}
      <div
        className="glass-surface sticky top-0 z-20 shrink-0 border-b border-white/5 px-4 py-3"
        style={{ backdropFilter: "blur(24px) saturate(150%)" }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition hover:bg-white/8"
            aria-label="Retour"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          {/* Avatar */}
          <div className="relative shrink-0">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold"
              style={{
                background: `color-mix(in oklch, ${meta.color} 22%, var(--surface-2))`,
                color: meta.color,
              }}
            >
              {conv.contact.avatarInitials}
            </div>
            {conv.contact.verified && (
              <span
                className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full"
                style={{ background: "var(--trust)", boxShadow: "0 0 0 1.5px var(--background)" }}
              >
                <BadgeCheck className="h-2 w-2 text-background" />
              </span>
            )}
          </div>

          {/* Name + context */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="truncate text-sm font-semibold">{conv.contact.name}</span>
              <TrustChip score={conv.contact.trustScore} verified={conv.contact.verified} />
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <ContextBadge context={conv.context} small />
              {conv.status === "resolved" && (
                <span className="text-[10px] text-muted-foreground font-medium">· Résolu</span>
              )}
            </div>
          </div>

          {/* Info / context toggle */}
          <button
            onClick={() => setShowContext((v) => !v)}
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition",
              showContext ? "bg-white/10" : "hover:bg-white/8",
            )}
            aria-label="Contexte"
          >
            <Info className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* Context panel (collapsible) */}
        {showContext && (
          <ContextPanel conv={conv} onClose={() => setShowContext(false)} />
        )}
      </div>

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
        {conv.messages.map((msg, i) => {
          const isMe = msg.senderId === "me";
          const isSystem = msg.type === "system";
          const prevSenderId = i > 0 ? conv.messages[i - 1].senderId : null;
          const isFirst = prevSenderId !== msg.senderId;

          if (isSystem) {
            return (
              <div key={msg.id} className="flex justify-center py-2">
                <span className="rounded-full bg-white/5 px-3 py-1 text-[11px] text-muted-foreground">
                  {msg.text}
                </span>
              </div>
            );
          }

          return (
            <div
              key={msg.id}
              className={cn("flex", isMe ? "justify-end" : "justify-start", isFirst ? "mt-3" : "mt-1")}
            >
              {/* Contact avatar for first in group */}
              {!isMe && isFirst && (
                <div
                  className="mr-2 mt-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-full self-end text-[10px] font-semibold"
                  style={{
                    background: `color-mix(in oklch, ${meta.color} 18%, var(--surface-2))`,
                    color: meta.color,
                  }}
                >
                  {conv.contact.avatarInitials}
                </div>
              )}
              {!isMe && !isFirst && <div className="mr-2 w-7 shrink-0" />}

              <div className={cn("flex flex-col max-w-[75%]", isMe ? "items-end" : "items-start")}>
                <div
                  className={cn(
                    "rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                    isMe
                      ? "rounded-br-md text-foreground"
                      : "rounded-bl-md bg-white/8 text-foreground/90",
                  )}
                  style={
                    isMe
                      ? {
                          background: `color-mix(in oklch, ${meta.color} 24%, var(--surface-3))`,
                          boxShadow: `inset 0 0 0 1px color-mix(in oklch, ${meta.color} 25%, transparent)`,
                        }
                      : undefined
                  }
                >
                  {msg.text.startsWith("[Action] ") ? (
                    <span className="flex items-center gap-1.5 text-[12px] font-medium" style={{ color: meta.color }}>
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {msg.text.replace("[Action] ", "")}
                    </span>
                  ) : (
                    msg.text
                  )}
                </div>
                <div className="mt-0.5 flex items-center gap-1 px-1">
                  <span className="text-[10px] text-muted-foreground">{msg.timestamp}</span>
                  {isMe && <ReadIcon status={msg.status} />}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* ── Quick replies ── */}
      {conv.status !== "resolved" && (
        <div className="-mx-0 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden shrink-0">
          <div className="flex gap-2 pt-1">
            {QUICK_REPLIES.map((r) => (
              <button
                key={r}
                onClick={() => sendMessage(r)}
                className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-foreground/80 transition hover:bg-white/10 hover:text-foreground"
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Smart actions ── */}
      {showActions && conv.status !== "resolved" && (
        <div
          className="glass-surface mx-4 mb-2 overflow-hidden rounded-2xl border border-white/8 animate-[scale-in_0.2s_var(--ease-spring)_both] shrink-0"
          style={{ boxShadow: `0 0 32px -12px ${meta.color}` }}
        >
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
            <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Actions rapides
            </span>
            <button onClick={() => setShowActions(false)} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-px bg-white/5">
            {SMART_ACTIONS.map((a) => (
              <button
                key={a.id}
                onClick={() => a.id === "resolve" ? resolveConv() : triggerAction(a.label)}
                className={cn(
                  "flex items-center gap-2.5 bg-[var(--background)] px-4 py-3 text-left text-sm transition hover:bg-white/5",
                  a.id === "resolve" && "text-[var(--success)]",
                )}
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                  style={{
                    background: `color-mix(in oklch, ${a.id === "resolve" ? "var(--success)" : meta.color} 14%, transparent)`,
                    color: a.id === "resolve" ? "var(--success)" : meta.color,
                  }}
                >
                  <ActionIcon id={a.id} />
                </span>
                <span className="leading-tight text-xs font-medium">{a.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Input bar ── */}
      {conv.status === "resolved" ? (
        <div className="glass-surface mx-4 mb-6 rounded-2xl px-4 py-3 text-center text-sm text-muted-foreground shrink-0">
          Conversation résolue · <button className="underline" onClick={onBack}>Retour</button>
        </div>
      ) : (
        <div className="shrink-0 px-4 pb-6 pt-1">
          <div
            className="glass-surface flex items-end gap-2 rounded-2xl px-3 py-2"
            style={{ boxShadow: "var(--shadow-glass)" }}
          >
            {/* Action toggle */}
            <button
              onClick={() => setShowActions((v) => !v)}
              className={cn(
                "mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all",
                showActions ? "scale-95" : "hover:bg-white/8",
              )}
              style={
                showActions
                  ? { background: `color-mix(in oklch, ${meta.color} 18%, transparent)`, color: meta.color }
                  : { color: "var(--muted-foreground)" }
              }
              aria-label="Actions"
            >
              <Zap className="h-4 w-4" />
            </button>

            {/* Text input */}
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
              placeholder="Écrire un message…"
              className="flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
            />

            {/* Send */}
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all disabled:opacity-30"
              style={{
                background: input.trim()
                  ? `color-mix(in oklch, ${meta.color} 22%, var(--surface-3))`
                  : "transparent",
                color: input.trim() ? meta.color : "var(--muted-foreground)",
                boxShadow: input.trim()
                  ? `inset 0 0 0 1px color-mix(in oklch, ${meta.color} 35%, transparent)`
                  : undefined,
              }}
              aria-label="Envoyer"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>

          {/* Unverified warning */}
          {!conv.contact.verified && (
            <p className="mt-2 text-center text-[11px] text-muted-foreground">
              <AlertCircle className="inline h-3 w-3 mr-1 text-[var(--warning)]" />
              Profil non vérifié — échangez avec prudence.
            </p>
          )}
        </div>
      )}

      {/* Action feedback toast */}
      {actionFeedback && (
        <div
          className="fixed bottom-32 left-1/2 -translate-x-1/2 rounded-full px-4 py-2 text-sm font-medium text-foreground animate-[scale-in_0.2s_var(--ease-spring)_both]"
          style={{ background: meta.color, color: "oklch(0.15 0.02 270)", zIndex: 99 }}
        >
          {actionFeedback}
        </div>
      )}
    </div>
  );
}
