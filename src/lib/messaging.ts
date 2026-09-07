export type HubContext = "flash" | "radar" | "scan" | "trust";
export type ConvStatus = "new" | "active" | "resolved" | "unread";
export type MsgStatus = "sent" | "delivered" | "read";

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  status: MsgStatus;
  type?: "text" | "action" | "system";
  actionLabel?: string;
}

export interface Conversation {
  id: string;
  contact: {
    id: string;
    name: string;
    handle: string;
    trustScore: number;
    verified: boolean;
    avatarInitials: string;
  };
  context: HubContext;
  contextTitle: string;
  contextSummary: string;
  status: ConvStatus;
  lastMessage: string;
  lastTs: string;
  unread: number;
  messages: Message[];
}

const ME = "me";

/** Conversations reelles de l'utilisateur. Aucune donnee de demonstration. */
export const CONVERSATIONS: Conversation[] = [];

export const HUB_META: Record<HubContext, { label: string; color: string; gradient: string }> = {
  flash: { label: "Flash", color: "var(--flash)", gradient: "var(--gradient-flash)" },
  radar: { label: "Radar", color: "var(--radar)", gradient: "var(--gradient-radar)" },
  scan: { label: "Scan", color: "var(--scan)", gradient: "var(--gradient-scan)" },
  trust: { label: "Trust", color: "var(--trust)", gradient: "var(--gradient-trust)" },
};

export const QUICK_REPLIES = [
  "Je suis intéressé",
  "Est-ce toujours disponible ?",
  "Pouvez-vous préciser ?",
  "Je confirme",
  "Quel est votre tarif ?",
  "Quand êtes-vous disponible ?",
];

export const SMART_ACTIONS = [
  { id: "price", label: "Proposer un prix", icon: "tag" },
  { id: "availability", label: "Demander disponibilité", icon: "clock" },
  { id: "location", label: "Partager localisation", icon: "map-pin" },
  { id: "resolve", label: "Marquer comme résolu", icon: "check-circle" },
];
