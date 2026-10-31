import { Link } from '@tanstack/react-router';
import { Check, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useModerateTalent, useTalentsForModeration } from '@/features/talents/hooks/useTalentData';
import type { Talent } from '@/features/talents/model';

function ReviewTalent({ talent }: { talent: Talent }) {
  const [reason, setReason] = useState('');
  const mutation = useModerateTalent();
  const decide = (decision: 'approved' | 'rejected') => mutation.mutate({ id: talent.id, decision, reason: reason.trim() }, { onSuccess: () => toast.success(decision === 'approved' ? 'Talent approuvé' : 'Talent refusé'), onError: error => toast.error(error.message) });
  return <article className="space-y-3 rounded-lg border border-border p-4"><div className="flex flex-wrap items-center justify-between gap-2"><h3 className="break-words font-medium">{talent.name}</h3><span className="text-xs text-muted-foreground">{talent.moderation_status === 'pending' ? 'En attente' : talent.moderation_status === 'approved' ? 'Approuvé' : 'Refusé'}</span></div><p className="text-xs text-trust">{talent.categories.join(' · ')}</p>{talent.bio && <p className="line-clamp-3 break-words text-sm text-muted-foreground">{talent.bio}</p>}<Button asChild variant="outline" size="sm"><Link to="/talents/fiche/$talentId" params={{ talentId: talent.id }}>Voir la fiche et écouter l’audio</Link></Button><Input aria-label={`Motif du refus pour ${talent.name}`} placeholder="Motif du refus" maxLength={1000} value={reason} onChange={e => setReason(e.target.value)} /><div className="flex flex-wrap gap-2"><Button size="sm" disabled={mutation.isPending || talent.moderation_status === 'approved'} onClick={() => decide('approved')}><Check />Approuver</Button><Button size="sm" variant="destructive" disabled={mutation.isPending || !reason.trim()} onClick={() => decide('rejected')}><X />Refuser</Button></div></article>;
}
export function AdminTalentModeration() {
  const query = useTalentsForModeration();
  return <section className="space-y-4"><h2 className="text-lg font-semibold">Modération des talents</h2>{query.isLoading && <p role="status">Chargement…</p>}{query.error ? <p role="alert" className="text-destructive">{query.error.message}</p> : query.data?.length === 0 ? <p className="text-sm text-muted-foreground">Aucun talent à modérer.</p> : query.data?.map(talent => <ReviewTalent key={talent.id} talent={talent} />)}</section>;
}