import { SmartCard } from "@/components/ui-kit/SmartCard";
import { MapPin } from "lucide-react";
import { TYPES } from "../data";

export function PreviewCard({
  type,
  title,
  price,
  where,
  image,
}: {
  type: (typeof TYPES)[number];
  title: string;
  price: string;
  where: string;
  image: string | null;
}) {
  const Icon = type.icon;
  return (
    <div className="space-y-1.5">
      <div className="px-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Aperçu live
      </div>
      <SmartCard className="overflow-hidden p-0">
        {image && <img src={image} alt="" className="h-32 w-full object-cover" />}
        <div className="space-y-2 p-3.5">
          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
              style={{
                background: `color-mix(in oklch, ${type.tint} 22%, transparent)`,
                color: type.tint,
              }}
            >
              <Icon className="h-3 w-3" /> {type.label}
            </span>
            <span className="text-[11px] text-muted-foreground">à l'instant</span>
          </div>
          <p className="line-clamp-2 text-[15px] font-semibold leading-snug">{title}</p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{where}</span>
            {price && (
              <span className="font-semibold text-foreground">{price}{/[€$£]/.test(price) ? "" : " €"}</span>
            )}
          </div>
        </div>
      </SmartCard>
    </div>
  );
}
