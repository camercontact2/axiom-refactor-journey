import { CheckCircle2, Clock, MapPin, Tag } from "lucide-react";

export function ActionIcon({ id }: { id: string }) {
  if (id === "price") return <Tag className="h-4 w-4" />;
  if (id === "availability") return <Clock className="h-4 w-4" />;
  if (id === "location") return <MapPin className="h-4 w-4" />;
  return <CheckCircle2 className="h-4 w-4" />;
}
