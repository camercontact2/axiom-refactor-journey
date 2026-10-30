import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "../data";

export function CategoriesSection() {
  return (
    <section
      id="categories"
      className="space-y-3 scroll-mt-20"
      aria-labelledby="categories-heading"
    >
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h3
          id="categories-heading"
          className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
        >
          Ça se passe par catégorie
        </h3>
        <span className="text-[11px] text-muted-foreground">
          {CATEGORIES.some(c => c.count > 0) ? `${CATEGORIES.reduce((a, c) => a + c.count, 0)} talents recensés` : "Soyez parmi les premiers à partager votre savoir-faire"}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {CATEGORIES.map((c) => (
          <Button key={c.label} asChild variant="outline" className="h-auto min-w-0 whitespace-normal rounded-md p-3 text-left">
            <Link to="/radar" className="flex flex-col items-start gap-1.5" aria-label={`Explorer ${c.label} dans Radar`}>
              <c.icon className="h-4 w-4 text-primary" aria-hidden />
              <span className="text-sm font-medium leading-tight">{c.label}</span>
              <span className="text-[11px] text-muted-foreground">{c.count > 0 ? `${c.count} talents` : "À découvrir"}</span>
            </Link>
          </Button>
        ))}
      </div>
    </section>
  );
}
