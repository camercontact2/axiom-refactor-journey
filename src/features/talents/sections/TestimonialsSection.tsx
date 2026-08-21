import { SmartCard } from "@/components/ui-kit/SmartCard";
import { TESTIMONIALS } from "../data";

export function TestimonialsSection() {
  return (
    <section className="space-y-3" aria-labelledby="voices-heading">
      <h3
        id="voices-heading"
        className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
      >
        Ils en parlent mieux que nous
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {TESTIMONIALS.map((t) => (
          <SmartCard key={t.author} className="space-y-2">
            <p className="text-sm italic leading-relaxed">“{t.quote}”</p>
            <p className="text-[11px] text-muted-foreground">— {t.author}</p>
          </SmartCard>
        ))}
      </div>
    </section>
  );
}
