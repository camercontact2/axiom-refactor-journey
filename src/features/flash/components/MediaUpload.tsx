import { ImagePlus, X } from "lucide-react";

export function MediaUpload({
  image,
  onUpload,
  onClear,
}: {
  image: string | null;
  onUpload: (f?: File) => void;
  onClear: () => void;
}) {
  return (
    <div>
      <div className="mb-1.5 px-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Média (optionnel)
      </div>
      {image ? (
        <div className="relative overflow-hidden rounded-xl border border-[var(--glass-border)]">
          <img src={image} alt="preview" className="h-40 w-full object-cover" />
          <button
            onClick={onClear}
            className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 backdrop-blur"
            aria-label="Remove image"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <label className="glass-surface flex h-28 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-dashed text-muted-foreground transition-colors hover:text-foreground">
          <ImagePlus className="h-5 w-5" />
          <span className="text-xs">Glisse une image ou tape pour choisir</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onUpload(e.target.files?.[0])}
          />
        </label>
      )}
    </div>
  );
}
