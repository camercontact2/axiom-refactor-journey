

export function OptionRow({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass-surface flex items-center gap-3 rounded-xl px-3.5 py-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-muted-foreground">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="truncate text-[11px] text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
}
