import { Link } from '@tanstack/react-router';
import { ArrowLeft, FileText, Mic, Pencil, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useTalent, useTalentMedia } from '../hooks/useTalentData';
import type { Talent } from '../model';

function ProfileContent({ talent }: { talent: Talent }) {
  const { user } = useAuth();
  const photo = useTalentMedia(talent.photo_path);
  const audio = useTalentMedia(talent.audio_path);
  const cv = useTalentMedia(talent.cv_path);
  const own = user?.id === talent.owner_id;
  return <article className="space-y-6">
    <header className="flex flex-wrap items-start gap-5">
      <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted">{photo.data ? <img src={photo.data} alt={talent.name} className="h-full w-full object-cover" /> : <UserRound className="h-12 w-12 text-muted-foreground" />}</div>
      <div className="min-w-0 flex-1 space-y-3"><h1 className="break-words text-3xl font-semibold">{talent.name}</h1><p className="text-sm text-trust">{talent.categories.join(' · ')}</p>{own && <><p role="status" className="text-sm text-muted-foreground">{talent.status === 'draft' ? 'Brouillon · visible seulement par vous et l’équipe de modération' : talent.moderation_status === 'approved' ? 'Fiche publiée' : talent.moderation_status === 'rejected' ? `Fiche refusée : ${talent.moderation_reason ?? 'à revoir'}` : 'Fiche enregistrée · en attente de validation'}</p><Button asChild variant="outline" size="sm"><Link to="/talents/fiche/$talentId/modifier" params={{ talentId: talent.id }}><Pencil />Modifier ma fiche</Link></Button></>}</div>
    </header>
    {talent.audio_path && <section className="space-y-3 border-y border-border py-6"><h2 className="flex items-center gap-2 text-xl font-semibold"><Mic className="text-trust" />Écoute mon talent</h2>{audio.data ? <audio controls src={audio.data} aria-label={`Écouter le talent de ${talent.name}`} className="w-full" /> : <p className="text-sm text-muted-foreground">{audio.error ? 'Audio indisponible.' : 'Chargement de l’audio…'}</p>}</section>}
    {talent.bio && <section className="space-y-2"><h2 className="text-lg font-semibold">À propos de moi</h2><p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-muted-foreground">{talent.bio}</p></section>}
    {talent.skills.length > 0 && <section className="space-y-2"><h2 className="text-lg font-semibold">Compétences</h2><ul className="flex flex-wrap gap-2">{talent.skills.map((skill, i) => <li key={i} className="rounded-md bg-muted px-3 py-2 text-sm">{skill}</li>)}</ul></section>}
    {talent.experience && <section className="space-y-2"><h2 className="text-lg font-semibold">Expériences</h2><p className="whitespace-pre-wrap break-words text-sm text-muted-foreground">{talent.experience}</p></section>}
    {talent.cv_path && <section><h2 className="mb-2 text-lg font-semibold">CV</h2>{cv.data ? <Button asChild variant="outline"><a href={cv.data} target="_blank" rel="noopener noreferrer"><FileText />Ouvrir mon CV</a></Button> : <p className="text-sm text-muted-foreground">{cv.error ? 'CV indisponible.' : 'Chargement du CV…'}</p>}</section>}
    {talent.links.length > 0 && <section className="space-y-2"><h2 className="text-lg font-semibold">Liens</h2><ul className="space-y-2">{talent.links.filter(link => /^https?:\/\//i.test(link)).map((link, i) => <li key={i}><a href={link} target="_blank" rel="noopener noreferrer" className="break-all text-sm text-trust underline underline-offset-4">{link}</a></li>)}</ul></section>}
  </article>;
}
export function TalentProfile({ id }: { id: string }) {
  const query = useTalent(id);
  return <div className="mx-auto w-full max-w-2xl space-y-6 pb-8"><Button asChild variant="ghost" size="sm"><Link to="/talents"><ArrowLeft />Talents</Link></Button>{query.isLoading ? <p role="status">Chargement de la fiche…</p> : query.error ? <p role="alert" className="text-destructive">{query.error.message}</p> : query.data ? <ProfileContent talent={query.data} /> : <p>Cette fiche n’est pas disponible ou vous n’y avez pas accès.</p>}</div>;
}