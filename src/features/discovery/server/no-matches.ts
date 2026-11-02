const NO_MATCHES_MESSAGE = 'Aucun résultat pertinent pour cette recherche.';

/** Return an empty discovery result using the same NDJSON protocol as streamed searches. */
export function createNoDiscoveryMatchesResponse(): Response {
  const encoder = new TextEncoder();
  const events = [
    { type: 'matches', matches: [] },
    { type: 'text', text: NO_MATCHES_MESSAGE },
    { type: 'done' },
  ];
  const body = events.map((event) => JSON.stringify(event)).join('\n') + '\n';

  return new Response(encoder.encode(body), {
    headers: {
      'Content-Type': 'application/x-ndjson',
      'Cache-Control': 'no-store, no-transform',
    },
  });
}
