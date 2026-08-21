import { AlertCircle, BadgeCheck } from "lucide-react";

export function TrustChip({ score, verified }: { score: number; verified: boolean }) {
  const color =
    score >= 85 ? "var(--trust)" : score >= 60 ? "var(--warning)" : "var(--destructive)";
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium"
      style={{
        borderColor: `color-mix(in oklch, ${color} 35%, transparent)`,
        background: `color-mix(in oklch, ${color} 10%, transparent)`,
        color,
      }}
    >
      {verified ? <BadgeCheck className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
      {score}
    </span>
  );
}
