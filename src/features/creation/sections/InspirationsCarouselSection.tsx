import { SmartCard } from "@/components/ui-kit/SmartCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ACCENT, INSPIRATIONS } from "@/features/creation/data";
import { ACCENT, INSPIRATIONS } from "../data";

export function InspirationsCarouselSection() {
  return (
    <section className="space-y-3" aria-labelledby="inspi-heading">
      <div className="flex items-end justify-between gap-2">
        <h3
          id="inspi-heading"
          className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
        >
          Inspirations du quartier
        </h3>
        <span className="text-[11px] text-muted-foreground">
          Glisse →
        </span>
      </div>
      <Carousel opts={{ align: "start", loop: true }} className="w-full">
        <CarouselContent className="-ml-2">
          {INSPIRATIONS.map((i) => (
            <CarouselItem
              key={i.title}
              className="basis-4/5 pl-2 sm:basis-1/2 md:basis-1/3"
            >
              <SmartCard className="flex h-full flex-col gap-2">
                <span
                  className="w-fit rounded-full px-2 py-0.5 text-[10px]"
                  style={{
                    background: `color-mix(in oklch, ${ACCENT} 14%, transparent)`,
                    color: ACCENT,
                  }}
                >
                  {i.tag}
                </span>
                <p className="text-sm font-semibold leading-snug">
                  {i.title}
                </p>
                <p className="text-[11px] text-muted-foreground">{i.by}</p>
                <p className="mt-1 text-xs italic leading-relaxed">
                  “{i.quote}”
                </p>
              </SmartCard>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </section>
  );
}
