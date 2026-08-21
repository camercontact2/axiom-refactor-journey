

export function ScoreBar({ value, label }: { value: number; label: string }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
        <span>{label}</span>
        <span style={{ color: "var(--trust)" }}>{value}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${value}%`, background: "var(--gradient-trust)" }}
        />
      </div>
    </div>
  );
}
