import { describe, expect, it } from 'vitest';
import { createNoDiscoveryMatchesResponse } from '../src/features/discovery/server/no-matches';

describe('empty discovery response', () => {
  it('uses the discovery NDJSON protocol and supplies a helpful message without starting an AI stream', async () => {
    const response = createNoDiscoveryMatchesResponse();
    const events = (await response.text()).trim().split('\n').map((line) => JSON.parse(line));

    expect(response.headers.get('content-type')).toContain('application/x-ndjson');
    expect(response.headers.get('cache-control')).toContain('no-store');
    expect(events).toEqual([
      { type: 'matches', matches: [] },
      { type: 'text', text: 'Aucun résultat pertinent pour cette recherche.' },
      { type: 'done' },
    ]);
  });
});
