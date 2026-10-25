import { Link } from '@tanstack/react-router';
import { Search, Sparkles, Square, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDiscovery } from '../hooks/useDiscovery';
import type { DiscoveryMode } from '../contracts';

export function DiscoverySearch({ mode }: { mode: DiscoveryMode }) {
  const discovery = useDiscovery(mode);
  const talents = mode === 'talents';
  return <section className="space-y-5" aria-labelledby={`${mode}-search-heading`}>
    <header className="space-y-2">
      <h2 id={`${mode}-search-heading`} className="text-xl font-semibold">{talents ? 'Quel talent recherchez-vous ?' : 'Décrivez votre intention'}</h2>
      <p className="text-sm text-muted-foreground">{talents ? 'Un savoir-faire, un projet, une catégorie.' : 'Une opportunité, un service, un besoin concret.'}</p>
    </header>
    <form className="space-y-3" onSubmit={event => { event.preventDefault(); void discovery.search(); }}>
      <label htmlFor={`${mode}-query`} className="sr-only">{talents ? 'Talent recherché' : 'Recherche Radar'}</label>
      <textarea id={`${mode}-query`} value={discovery.query} onChange={event => discovery.setQuery(event.target.value)} maxLength={600} rows={3} placeholder={talents ? 'Je cherche un mentor en couture pour apprendre à créer des vêtements…' : 'Je cherche un atelier de couture à Douala…'} className="w-full resize-y rounded-md border border-input bg-background p-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs text-muted-foreground">Lovable AI · Données réelles</span>
        {discovery.loading ? <Button type="button" variant="outline" onClick={discovery.stop}><Square />Arrêter</Button> : <Button type="submit" disabled={discovery.query.trim().length < 4}><Search />{talents ? 'Trouver un talent' : 'Rechercher'}</Button>}
      </div>
    </form>
    {discovery.error && <p role="alert" className="text-sm text-destructive break-words">{discovery.error}</p>}
    {(discovery.loading || discovery.insights) && <div className="space-y-2 border-l-2 border-primary pl-4" aria-live="polite" aria-busy={discovery.loading}>
      <h3 className="flex items-center gap-2 text-sm font-semibold"><Sparkles />{talents ? 'Recommandations' : 'Synthèse & prochaines actions'}</h3>
      {discovery.insights ? <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">{discovery.insights}</p> : <p className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="motion-safe:animate-spin" />Recherche en cours…</p>}
    </div>}
    {discovery.searched && <div className="space-y-3">
      <h3 className="text-sm font-semibold">{discovery.matches.length} {talents ? 'profil(s) correspondant(s)' : 'Flash correspondant(s)'}</h3>
      {discovery.matches.map(match => <article key={match.id} className="rounded-md border border-border p-4 space-y-2">
        <h4 className="font-medium break-words">{match.title}</h4>
        {match.city && <p className="text-xs text-muted-foreground">{match.city}</p>}
        <p className="text-sm text-muted-foreground break-words">{match.description}</p>
        {match.kind === 'flash' && <Button variant="link" asChild className="px-0"><Link to="/flash">Voir les Flash</Link></Button>}
      </article>)}
      {!discovery.matches.length && <p className="text-sm text-muted-foreground">Aucune correspondance publiée pour l’instant. Précisez votre besoin ou <Link to="/flash" className="underline text-primary">publiez un Flash</Link>.</p>}
    </div>}
  </section>;
}