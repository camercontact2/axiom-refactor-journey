import { Check, CheckCheck } from "lucide-react";

export function ReadIcon({ status }: { status: string }) {
  if (status === "read") return <CheckCheck className="h-3 w-3 text-[var(--scan)]" />;
  if (status === "delivered") return <CheckCheck className="h-3 w-3 text-muted-foreground" />;
  return <Check className="h-3 w-3 text-muted-foreground" />;
}
