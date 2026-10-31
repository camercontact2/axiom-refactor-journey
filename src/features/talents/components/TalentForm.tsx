import { Camera, Mic, Square, Upload, Send, Save, ArrowLeft } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { TALENT_CATEGORIES, type Talent } from '../model';
import { useTalentEditor } from '../hooks/useTalentEditor';
import { useVoiceTalent } from '../hooks/useVoiceTalent';
import { useTalentMedia } from '../hooks/useTalentData';

export function TalentForm({ existing }: { existing?: Talent | null }) {
  const editor = useTalentEditor(existing);
  const voice = useVoiceTalent(file => editor.choose('audio', file));
  const oldPhoto = useTalentMedia(existing?.photo_path);
  const oldAudio = useTalentMedia(existing?.audio_path);
  const photo = editor.photo ?? oldPhoto.data;
  const audio = editor.audio ?? oldAudio.data;
  const disabled = editor.pending || voice.recording || voice.requesting;
  return (
    <div className="mx-auto w-full max-w-2xl space-y-7 pb-8">
      <Button asChild variant="ghost" size="sm"><Link to="/talents"><ArrowLeft /> Talents</Link></Button>
      <header className="space-y-2"><p className="text-sm font-medium text-trust">Mon savoir-faire</p><h1 className="text-3xl font-semibold">{existing ? 'Ma fiche talent' : 'Créer ma fiche'}</h1><p className="text-sm text-muted-foreground">Votre talent, avec vos mots ou votre voix.</p></header>
      <form className="space-y-7" onSubmit={event => { event.preventDefault(); void editor.submit('published'); }}>
        <fieldset disabled={editor.pending} className="space-y-6 min-w-0">
          <section className="flex items-center gap-5 border-b border-border pb-6">
            <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted">
              {photo ? <img src={photo} alt="Ma photo" className="h-full w-full object-cover" /> : <Camera className="h-9 w-9 text-muted-foreground" aria-hidden="true" />}
            </div>
            <div className="min-w-0 space-y-2"><label htmlFor="talent-photo" className="block text-sm font-medium">Ma photo</label><Input id="talent-photo" type="file" accept="image/jpeg,image/png,image/webp" aria-label="Ajouter ma photo" onChange={e => editor.choose('photo', e.target.files?.[0])} className="h-auto min-h-10 max-w-full text-xs" /><p className="text-xs text-muted-foreground">JPG, PNG ou WebP · 5 Mo max.</p></div>
          </section>
          <div className="space-y-2"><label htmlFor="talent-name" className="text-sm font-medium">Mon nom ou mon talent <span className="text-muted-foreground">*</span></label><Input id="talent-name" required minLength={2} maxLength={100} value={editor.values.name} onChange={e => editor.field('name', e.target.value)} placeholder="Ex. : Amina, couturière" autoComplete="name" /></div>
          <section className="space-y-4 border-y border-border py-6" aria-labelledby="voice-title">
            <div className="flex items-center gap-3"><Mic className="h-6 w-6 text-trust" aria-hidden="true" /><div><h2 id="voice-title" className="text-xl font-semibold">Écoute mon talent</h2><p className="text-sm text-muted-foreground">Racontez ce que vous savez faire. Jusqu’à 2 minutes.</p></div></div>
            <Button type="button" size="lg" variant={voice.recording ? 'destructive' : 'secondary'} className="min-h-14 w-full whitespace-normal" disabled={editor.pending || voice.requesting} onClick={() => voice.recording ? voice.stop() : void voice.start()}>{voice.recording ? <Square /> : <Mic />}{voice.recording ? `Arrêter · ${voice.seconds}s` : voice.requesting ? 'Ouverture du micro…' : audio ? 'Enregistrer à nouveau' : 'Enregistrer ma voix'}</Button>
            {voice.recording && <p role="status" className="text-sm text-destructive">Enregistrement en cours · {voice.seconds}s</p>}
            {audio && <audio aria-label="Écouter mon talent" controls src={audio} className="w-full" />}
            {voice.error && <p role="alert" className="text-sm text-destructive">{voice.error}</p>}
            <details><summary className="cursor-pointer text-sm text-muted-foreground"><Upload className="mr-2 inline h-4 w-4" aria-hidden="true" />Ajouter un audio existant</summary><Input type="file" aria-label="Ajouter un fichier audio" accept="audio/webm,audio/ogg,audio/mp4,audio/wav,audio/mpeg" className="mt-3 h-auto min-h-10" onChange={e => editor.choose('audio', e.target.files?.[0])} /><p className="mt-1 text-xs text-muted-foreground">10 Mo max.</p></details>
          </section>
          <div className="space-y-2"><label htmlFor="talent-bio" className="text-sm font-medium">Quelques mots sur moi</label><Textarea id="talent-bio" rows={4} maxLength={2000} value={editor.values.bio} onChange={e => editor.field('bio', e.target.value)} placeholder="Ce que je fais, ce que j’aime transmettre…" /><p className="text-xs text-muted-foreground">Une présentation écrite ou audio suffit.</p></div>
          <fieldset className="space-y-3"><legend className="mb-3 text-sm font-medium">Mes catégories *</legend><div className="grid grid-cols-2 gap-3">{TALENT_CATEGORIES.map(category => <label key={category} className="flex min-h-12 cursor-pointer items-center gap-3 rounded-md border border-border p-3 text-sm has-[:checked]:border-trust has-[:checked]:bg-trust/10"><input type="checkbox" checked={editor.values.categories.includes(category)} onChange={() => editor.toggleCategory(category)} className="h-4 w-4 shrink-0 accent-current" /><span className="break-words">{category}</span></label>)}</div></fieldset>
          <details className="border-t border-border pt-5"><summary className="cursor-pointer font-medium">Mon parcours <span className="text-sm font-normal text-muted-foreground">· facultatif</span></summary><div className="mt-5 space-y-4">
            <div className="space-y-2"><label htmlFor="talent-skills" className="text-sm">Compétences</label><Input id="talent-skills" defaultValue={existing?.skills.join(', ')} onChange={e => editor.field('skills', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} placeholder="Couture, retouches, broderie" /></div>
            <div className="space-y-2"><label htmlFor="talent-experience" className="text-sm">Expériences</label><Textarea id="talent-experience" value={editor.values.experience} maxLength={5000} onChange={e => editor.field('experience', e.target.value)} placeholder="Mon parcours, mes réalisations…" /></div>
            <div className="space-y-2"><label htmlFor="talent-links" className="text-sm">Mes liens · un par ligne</label><Textarea id="talent-links" defaultValue={existing?.links.join('\n')} onChange={e => editor.field('links', e.target.value.split('\n').map(s => s.trim()).filter(Boolean))} placeholder="https://…" /></div>
            <div className="space-y-2"><label htmlFor="talent-cv" className="text-sm">Mon CV · PDF, 5 Mo max.</label><Input id="talent-cv" type="file" accept="application/pdf" className="h-auto min-h-10" onChange={e => editor.choose('cv', e.target.files?.[0])} />{editor.files.cv && <p className="break-all text-xs text-muted-foreground">{editor.files.cv.name}</p>}</div>
          </div></details>
        </fieldset>
        {editor.error && <p role="alert" className="rounded-md border border-destructive p-3 text-sm text-destructive">{editor.error}</p>}
        <footer className="space-y-3 border-t border-border pt-5"><p className="text-sm text-muted-foreground">Votre fiche sera visible après validation par VITALA.</p><div className="flex flex-wrap gap-3"><Button type="submit" size="lg" disabled={disabled} className="min-h-12"><Send />{editor.pending ? 'Enregistrement…' : 'Publier mon talent'}</Button><Button type="button" variant="outline" size="lg" disabled={disabled} onClick={() => void editor.submit('draft')}><Save />Garder un brouillon</Button></div></footer>
      </form>
    </div>
  );
}