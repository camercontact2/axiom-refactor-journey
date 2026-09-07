import { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { SmartCard } from "@/components/ui-kit/SmartCard";

export type GuideAction = {
  label: string;
  to: string;
};

/**
 * Bloc "espace encore vide" : explique ce qui apparaitra ici,
 * donne des pistes concretes et oriente vers l'action utile.
 * A utiliser partout ou une liste reelle est vide (compte connecte).
 */
export function EmptyGuide({
  title,
  description,
  steps,
  actions,
  color = "var(--primary)",
  icon,
}: {
  title: string;
  description: string;
  steps?: string[];
  actions?: GuideAction[];
  color?: string;
  icon?: ReactNode;
}) {
  return (
    <SmartCard className="space-y-4">
      <div className="flex items-start gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl"
          style={{
            background: `color-mix(in oklch, ${color} 16%, transparent)`,
            color,
          }}
          aria-hidden="true"
        >
          {icon ?? <Sparkles className="h-4 w-4" />}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold leading-tight">{title}</h3>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{description}</p>
        </div>
      </div>

      {steps && steps.length > 0 ? (
        <ol className="space-y-2">
          {steps.map((s, i) => (
            <li key={i} className="flex items-start gap-2.5 text-xs text-foreground/85">
              <span
                className="mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold"
                style={{
                  background: `color-mix(in oklch, ${color} 14%, transparent)`,
                  color,
                }}
              >
                {i + 1}
              </span>
              <span className="leading-snug">{s}</span>
            </li>
          ))}
        </ol>
      ) : null}

      {actions && actions.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {actions.map((a) => (
            <Link
              key={a.to + a.label}
              to={a.to}
              className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-[12px] font-medium transition-all hover:-translate-y-0.5 active:scale-[0.98]"
              style={{
                background: `color-mix(in oklch, ${color} 16%, transparent)`,
                color,
                boxShadow: `inset 0 0 0 1px color-mix(in oklch, ${color} 30%, transparent)`,
              }}
            >
              {a.label}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          ))}
        </div>
      ) : null}
    </SmartCard>
  );
}
