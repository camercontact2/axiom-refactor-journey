import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { UserRound } from 'lucide-react';
import { usePublishedTalents, useTalentMedia } from '../hooks/useTalentData';
import type { Talent } from '../model';

function TalentTile({ talent }: { talent: Talent }) {
  const photo = useTalentMedia(talent.photo_path);
  return <article className="space-y-3 rounded-lg border border-border p-4"><div className="flex items-center gap-3"><div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted">{photo.data ? <img src={photo.data} alt="" className="h-full w-full object-cover" /> : <UserRound className="text-muted-foreground" />}</div><div className="min-w-0"><h3 className="break-words font-semibold">{talent.name}</h3><p className="text-xs text-trust">{talent.categories.join(' · ')}</p></div></div>{talent.bio && <p className="line-clamp-2 break-words text-sm text-muted-foreground">{talent.bio}</p>}<Button asChild variant="outline" size="sm"><Link to="/talents/fiche/$talentId" params={{ talentId: talent.id }}>{talent.audio_path ? 'Écoute mon talent' : 'Découvrir mon talent'}</Link></Button></article>;
}
export function PublishedTalents() {
  const query = usePublishedTalents();
  return <section className="space-y-4" aria-labelledby="published-heading"><h2 id="published-heading" className="text-lg font-semibold">Talents à découvrir</h2>{query.isLoading && <p role="status" className="text-sm text-muted-foreground">Chargement des talents…</p>}{query.error ? <p role="alert" className="text-sm text-destructive">{query.error.message}</p> : query.data?.length === 0 ? <div className="space-y-3"><p className="text-sm text-muted-foreground">Aucune fiche validée pour le moment. Partagez votre savoir-faire ou décrivez votre besoin dans Radar.</p><div className="flex flex-wrap gap-2"><Button asChild><Link to="/talents/creer">Créer ma fiche</Link></Button><Button asChild variant="outline"><Link to="/radar">Découvrir avec Radar</Link></Button></div></div> : <div className="grid gap-3 sm:grid-cols-2">{query.data?.map(talent => <TalentTile key={talent.id} talent={talent} />)}</div>}</section>;
}