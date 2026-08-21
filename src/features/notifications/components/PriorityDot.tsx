import { Notification } from "@/lib/notifications";

export function PriorityDot({ priority }: { priority: Notification["priority"] }) {
  const colors: Record<string, string> = {
    urgent: "var(--destructive)",
    important: "var(--live)",
    normal: "transparent",
    info: "transparent",
  };
  const color = colors[priority];
  if (!color || color === "transparent") return null;
  return (
    <span
      className="h-2.5 w-2.5 rounded-full shrink-0"
      style={{ background: color, boxShadow: `0 0 6px ${color}` }}
    />
  );
}
