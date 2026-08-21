import { BellRing } from "lucide-react";

export function SectionHeader({
  icon: Icon,
  label,
  color = "var(--muted-foreground)",
  action,
  onAction,
}: {
  icon: typeof BellRing;
  label: string;
  color?: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex items-center justify-between px-1">
      <div className="flex items-center gap-1.5">
        <Icon className="h-3.5 w-3.5" style={{ color }} />
        <h3 className="ds-eyebrow !text-[10px]" style={{ color: "var(--muted-foreground)" }}>
          {label}
        </h3>
      </div>
      {action && (
        <button
          onClick={onAction}
          className="text-[11px] font-medium text-muted-foreground transition hover:text-foreground"
        >
          {action}
        </button>
      )}
    </div>
  );
}
