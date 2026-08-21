import { History } from "lucide-react";
import { RECENT_SEARCHES } from "../data";
import { SectionHeader } from "./SectionHeader";

export function RecentSearches({ onPick }: { onPick: (q: string) => void }) {
  return (
    <section className="space-y-2">
      <SectionHeader icon={History} label="RECHERCHES RÉCENTES" />
      <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {RECENT_SEARCHES.map((q) => (
          <button
            key={q}
            onClick={() => onPick(q)}
            className="glass-surface group inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[11.5px] text-foreground/80 transition active:scale-95"
          >
            <History className="h-3 w-3 text-muted-foreground/60 transition group-hover:text-[color:var(--radar)]" />
            <span className="max-w-[180px] truncate">{q}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
