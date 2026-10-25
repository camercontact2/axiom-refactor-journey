import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { discoveryInput, type DiscoveryMatch, type DiscoveryMode } from '../contracts';

export function useDiscovery(mode: DiscoveryMode) {
  const [query, setQuery] = useState('');
  const [matches, setMatches] = useState<DiscoveryMatch[]>([]);
  const [insights, setInsights] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const active = useRef<AbortController | null>(null);
  useEffect(() => () => active.current?.abort(), []);
  const stop = () => { active.current?.abort(); setLoading(false); };
  const search = async () => {
    const parsed = discoveryInput.safeParse({ query, mode });
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? 'Recherche invalide.'); return; }
    active.current?.abort();
    const controller = new AbortController();
    active.current = controller;
    setError(''); setInsights(''); setMatches([]); setLoading(true); setSearched(false);
    try {
      const { data } = await supabase.auth.getSession();
      if (!data.session) throw new Error('Connectez-vous pour rechercher.');
      const response = await fetch('/api/discovery', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${data.session.access_token}` }, body: JSON.stringify(parsed.data), signal: controller.signal });
      if (!response.ok) { const body = await response.json(); throw new Error(body.error ?? 'Recherche indisponible.'); }
      const reader = response.body?.getReader();
      if (!reader) throw new Error('La réponse IA est vide.');
      const decoder = new TextDecoder();
      let pending = '';
      while (true) {
        const { done, value } = await reader.read();
        pending += decoder.decode(value, { stream: !done });
        const lines = pending.split('\n'); pending = lines.pop() ?? '';
        for (const line of lines) {
          if (!line.trim() || active.current !== controller) continue;
          const event = JSON.parse(line);
          if (event.type === 'matches') { setMatches(event.matches); setSearched(true); }
          if (event.type === 'text') setInsights(text => text + event.text);
          if (event.type === 'error') throw new Error(event.message);
        }
        if (done) break;
      }
    } catch (e) {
      if (!controller.signal.aborted && active.current === controller) setError(e instanceof Error ? e.message : 'Recherche indisponible.');
    } finally { if (active.current === controller) setLoading(false); }
  };
  return { query, setQuery, matches, insights, error, loading, searched, search, stop };
}