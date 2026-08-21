import { Button } from "@/components/ui/button";
import { Bookmark, MessageCircle, Share2, ShieldCheck } from "lucide-react";

export function 9TrustActionButtonsSection() {
  return (
    <section className="sticky bottom-24 z-10 grid grid-cols-2 gap-2">
      <Button
        className="h-11 rounded-xl text-sm font-medium"
        style={{
          background: "var(--gradient-trust)",
          color: "oklch(0.15 0.02 270)",
          boxShadow: "var(--shadow-glow-trust)",
        }}
      >
        <MessageCircle className="h-4 w-4" />
        Contacter
      </Button>
      <Button variant="outline" className="h-11 rounded-xl text-sm">
        <ShieldCheck className="h-4 w-4" />
        Vérifier plus
      </Button>
      <button className="glass-surface flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs text-foreground/80">
        <Bookmark className="h-4 w-4" />
        Sauvegarder
      </button>
      <button className="glass-surface flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs text-foreground/80">
        <Share2 className="h-4 w-4" />
        Partager
      </button>
    </section>
  );
}
