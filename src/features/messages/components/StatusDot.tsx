import { Conversation } from "@/lib/messaging";

export function StatusDot({ status }: { status: Conversation["status"] }) {
  if (status === "resolved") return null;
  const color =
    status === "new" || status === "unread" ? "var(--live)" : "var(--success)";
  return (
    <span
      className="h-2 w-2 rounded-full shrink-0"
      style={{ background: color, boxShadow: `0 0 6px ${color}` }}
    />
  );
}
