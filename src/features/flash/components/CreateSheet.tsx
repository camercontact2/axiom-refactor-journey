import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronLeft, ChevronRight, Clock, Eye, MapPin, Rocket, Tag, Users, X } from "lucide-react";
import { FlashType, Mode, TYPES, DURATIONS } from "../data";
import { toast } from "sonner";
import { useCreateFlash } from "../hooks/useFlashes";
import { Field } from "./Field";
import { MediaUpload } from "./MediaUpload";
import { PreviewCard } from "./PreviewCard";
import { OptionRow } from "./OptionRow";
import { Toggle } from "./Toggle";

export function CreateSheet({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [type, setType] = useState<FlashType>("sale");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("Général");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("Lyon 7");
  const [duration, setDuration] = useState<(typeof DURATIONS)[number]>("24h");
  const [visibility, setVisibility] = useState<"public" | "limited">("public");
  const [boost, setBoost] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const create = useCreateFlash();

  const publish = () => {
    create.mutate(
      { type, title, description: desc, price, city: location, duration },
      {
        onSuccess: () => {
          toast.success("Flash publié");
          onClose();
        },
        onError: (e: unknown) =>
          toast.error(e instanceof Error ? e.message : "Publication impossible"),
      },
    );
  };

  const t = useMemo(() => TYPES.find((x) => x.id === type)!, [type]);
  const canNext = title.trim().length > 1;

  const onUpload = (file?: File) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImage(url);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 backdrop-blur-sm animate-[fade-up_0.25s_var(--ease-smooth)_both]">
      <div
        className="glass-surface relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-3xl p-5 pb-8 animate-[scale-in_0.35s_var(--ease-spring)_both]"
        style={{ boxShadow: "var(--shadow-float)" }}
      >
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {step === 2 && (
              <button
                onClick={() => setStep(1)}
                className="rounded-full p-1.5 hover:bg-white/5"
                aria-label="Back"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            )}
            <div>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                Étape {step} / 2
              </p>
              <h3 className="text-base font-semibold">
                {step === 1 ? "Décris ton Flash" : "Détails & publication"}
              </h3>
            </div>
          </div>
          <button onClick={onClose} className="rounded-full p-1.5 hover:bg-white/5" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Stepper */}
        <div className="mb-5 flex gap-1.5">
          {[1, 2].map((s) => (
            <div
              key={s}
              className={cn(
                "h-1 flex-1 rounded-full transition-all",
                s <= step ? "" : "bg-white/8"
              )}
              style={s <= step ? { background: "var(--gradient-flash)" } : undefined}
            />
          ))}
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-4 animate-[fade-up_0.3s_var(--ease-smooth)_both]">
            <div className="grid grid-cols-5 gap-1.5">
              {TYPES.map((opt) => {
                const active = opt.id === type;
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setType(opt.id)}
                    className={cn(
                      "flex flex-col items-center gap-1 rounded-xl border px-1 py-2 text-[10px] transition-all",
                      active
                        ? "border-transparent text-foreground"
                        : "border-[var(--glass-border)] bg-white/[0.03] text-muted-foreground hover:text-foreground"
                    )}
                    style={
                      active
                        ? {
                            background: `color-mix(in oklch, ${opt.tint} 18%, transparent)`,
                            boxShadow: `0 0 0 1px ${opt.tint} inset`,
                          }
                        : undefined
                    }
                  >
                    <Icon className="h-4 w-4" style={active ? { color: opt.tint } : undefined} />
                    <span className="leading-tight">{opt.label.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>

            <Field label="Titre">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex : Vélo électrique état neuf"
                className="w-full bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
              />
            </Field>

            <Field label="Description courte">
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={3}
                placeholder="Une ligne suffit. Sois clair et direct."
                className="w-full resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </Field>

            <Field label="Catégorie">
              <div className="flex flex-wrap gap-1.5">
                {["Général", "Maison", "Tech", "Mode", "Loisirs", "Pro"].map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs transition-all",
                      category === c
                        ? "border-transparent text-foreground"
                        : "border-[var(--glass-border)] bg-white/[0.03] text-muted-foreground"
                    )}
                    style={
                      category === c
                        ? {
                            background: `color-mix(in oklch, ${t.tint} 18%, transparent)`,
                            boxShadow: `0 0 0 1px ${t.tint} inset`,
                          }
                        : undefined
                    }
                  >
                    {c}
                  </button>
                ))}
              </div>
            </Field>

            <MediaUpload image={image} onUpload={onUpload} onClear={() => setImage(null)} />

            <button
              disabled={!canNext}
              onClick={() => setStep(2)}
              className="flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-[15px] font-semibold text-[oklch(0.18_0.02_60)] transition-all active:scale-[0.98] disabled:opacity-40"
              style={{ background: "var(--gradient-flash)", boxShadow: canNext ? "var(--shadow-glow-flash)" : undefined }}
            >
              Continuer <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-4 animate-[fade-up_0.3s_var(--ease-smooth)_both]">
            <PreviewCard
              type={t}
              title={title || "Ton titre apparaît ici"}
              price={price}
              where={location}
              image={image}
            />

            <div className="grid grid-cols-2 gap-2">
              <Field label="Prix (optionnel)" icon={<Tag className="h-3.5 w-3.5" />}>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="—"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </Field>
              <Field label="Localisation" icon={<MapPin className="h-3.5 w-3.5" />}>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none"
                />
              </Field>
            </div>

            <Field label="Durée de publication" icon={<Clock className="h-3.5 w-3.5" />}>
              <div className="flex gap-1.5 pt-1">
                {DURATIONS.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDuration(d)}
                    className={cn(
                      "flex-1 rounded-xl border px-2 py-2 text-xs font-medium transition-all",
                      duration === d
                        ? "border-transparent text-foreground"
                        : "border-[var(--glass-border)] bg-white/[0.03] text-muted-foreground"
                    )}
                    style={
                      duration === d
                        ? {
                            background: `color-mix(in oklch, ${t.tint} 18%, transparent)`,
                            boxShadow: `0 0 0 1px ${t.tint} inset`,
                          }
                        : undefined
                    }
                  >
                    {d}
                  </button>
                ))}
              </div>
            </Field>

            <div className="space-y-2">
              <OptionRow
                icon={<Eye className="h-4 w-4" />}
                title="Visibilité"
                description={visibility === "public" ? "Visible par tous" : "Cercle limité"}
              >
                <Toggle
                  options={[
                    { id: "public", label: "Public", icon: <Users className="h-3 w-3" /> },
                    { id: "limited", label: "Limité", icon: <Eye className="h-3 w-3" /> },
                  ]}
                  value={visibility}
                  onChange={(v) => setVisibility(v as typeof visibility)}
                  tint={t.tint}
                />
              </OptionRow>

              <OptionRow
                icon={<Rocket className="h-4 w-4" />}
                title="Boost (mock)"
                description={boost ? "Mise en avant 3×" : "Diffusion standard"}
              >
                <button
                  onClick={() => setBoost((b) => !b)}
                  className={cn(
                    "relative h-6 w-11 rounded-full transition-all",
                    boost ? "" : "bg-white/10"
                  )}
                  style={boost ? { background: "var(--gradient-flash)" } : undefined}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all",
                      boost ? "left-[22px]" : "left-0.5"
                    )}
                  />
                </button>
              </OptionRow>
            </div>

            <button
              onClick={publish}
              disabled={create.isPending || title.trim().length < 3}
              className="flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-[15px] font-semibold text-[oklch(0.18_0.02_60)] transition-all active:scale-[0.98] disabled:opacity-50"
              style={{ background: "var(--gradient-flash)", boxShadow: "var(--shadow-glow-flash)" }}
            >
              <Check className="h-4 w-4" aria-hidden="true" />
              {create.isPending ? "Publication…" : "Publier le Flash"}
            </button>
            <p className="text-center text-[11px] text-muted-foreground">
              Ton Flash sera visible immédiatement par la communauté.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
