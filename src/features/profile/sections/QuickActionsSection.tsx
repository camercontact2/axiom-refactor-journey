import { Link } from "@tanstack/react-router";
import { QUICK_ACTIONS } from "@/features/profile/data";
import { QUICK_ACTIONS } from "../data";

export function QuickActionsSection() {
  return (
    <section className="space-y-2">
      <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Actions rapides
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {QUICK_ACTIONS.map((a) => (
          <Link
            key={a.to}
            to={a.to}
            className="glass-surface group flex items-center gap-2.5 rounded-2xl p-3 transition-all hover:-translate-y-0.5"
          >
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl"
              style={{
                background: `color-mix(in oklch, ${a.color} 18%, transparent)`,
                color: a.color,
              }}
            >
              <a.icon className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium">{a.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
