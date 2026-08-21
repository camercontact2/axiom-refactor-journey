import { Status } from "../data";

export function StatusBadge({ status }: { status: Status }) {
  const map: Record<Status, { label: string; color: string }> = {
    urgent: { label: "Urgent", color: "var(--live)" },
    flash: { label: "Flash", color: "var(--flash)" },
    trending: { label: "Tendance", color: "var(--scan)" },
    normal: { label: "Normal", color: "var(--muted-foreground)" },
  };
  const { label, color } = map[status];
  return (
    <span
      className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium"
      style={{
        background: `color-mix(in oklch, ${color} 14%, transparent)`,
        color,
        boxShadow: `inset 0 0 0 1px color-mix(in oklch, ${color} 35%, transparent)`,
      }}
    >
      {label}
    </span>
  );
}
