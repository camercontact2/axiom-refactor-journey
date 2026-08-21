import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { ChatScreen } from "@/features/messages/components/ChatScreen";
import { Inbox } from "@/features/messages/components/Inbox";

export const Route = createFileRoute("/messages")({
  head: () => ({
    meta: [
      { title: "Messages — VITALA" },
      { name: "description", content: "Conversations orientées action sur VITALA." },
    ],
  }),
  component: MessagesPage,
});

function MessagesPage() {
  const [openConvId, setOpenConvId] = useState<string | null>(null);

  if (openConvId) {
    return (
      <ChatScreen
        convId={openConvId}
        onBack={() => setOpenConvId(null)}
      />
    );
  }

  return (
    <AppShell>
      <Inbox onOpen={setOpenConvId} />
    </AppShell>
  );
}
