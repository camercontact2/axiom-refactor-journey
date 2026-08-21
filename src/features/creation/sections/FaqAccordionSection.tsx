import { SmartCard } from "@/components/ui-kit/SmartCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { ACCENT, FAQ } from "@/features/creation/data";
import { ACCENT, FAQ } from "../data";

export function FaqAccordionSection() {
  return (
    <section className="space-y-3" aria-labelledby="faq-heading">
      <div className="flex items-center gap-2">
        <HelpCircle className="h-4 w-4" style={{ color: ACCENT }} aria-hidden />
        <h3
          id="faq-heading"
          className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
        >
          Questions qu'on nous pose souvent
        </h3>
      </div>
      <SmartCard>
        <Accordion type="single" collapsible className="w-full">
          {FAQ.map((f, i) => (
            <AccordionItem
              key={f.q}
              value={`faq-${i}`}
              className="border-white/10"
            >
              <AccordionTrigger className="text-left text-sm hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-xs leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SmartCard>
    </section>
  );
}
