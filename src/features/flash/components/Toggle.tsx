import { cn } from "@/lib/utils";

export function Toggle({
  options,
  value,
  onChange,
  tint,
}: {
  options: { id: string; label: string; icon?: React.ReactNode }[];
  value: string;
  onChange: (v: string) => void;
  tint: string;
}) {
  return (
    <div className="flex rounded-full bg-white/5 p-0.5">
      {options.map((o) => {
        const active = o.id === value;
        return (
          <button
            key={o.id}
            onClick={() => onChange(o.id)}
            className={cn(
              "flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium transition-all",
              active ? "text-foreground" : "text-muted-foreground"
            )}
            style={
              active
                ? {
                    background: `color-mix(in oklch, ${tint} 22%, transparent)`,
                    boxShadow: `0 0 0 1px ${tint} inset`,
                  }
                : undefined
            }
          >
            {o.icon}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
