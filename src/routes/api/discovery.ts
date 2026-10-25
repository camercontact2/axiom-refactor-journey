import { createFileRoute } from '@tanstack/react-router';
import { handleDiscovery } from '@/features/discovery/server/search.server';

export const Route = createFileRoute('/api/discovery')({
  server: { handlers: { POST: ({ request }) => handleDiscovery(request) } },
});