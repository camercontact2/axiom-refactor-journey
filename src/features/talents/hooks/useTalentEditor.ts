import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { blankTalent, type MediaKind, type Talent, type TalentFiles, type TalentValues, validateMedia } from '../model';
import { useSaveTalent } from './useTalentData';

export function useTalentEditor(existing?: Talent | null) {
  const [values, setValues] = useState<TalentValues>(existing ?? blankTalent);
  const [files, setFiles] = useState<TalentFiles>({});
  const [error, setError] = useState('');
  const [photo, setPhoto] = useState<string>();
  const [audio, setAudio] = useState<string>();
  const save = useSaveTalent();
  const navigate = useNavigate();
  useEffect(() => { if (!files.photo) return; const url = URL.createObjectURL(files.photo); setPhoto(url); return () => URL.revokeObjectURL(url); }, [files.photo]);
  useEffect(() => { if (!files.audio) return; const url = URL.createObjectURL(files.audio); setAudio(url); return () => URL.revokeObjectURL(url); }, [files.audio]);
  const field = <K extends keyof TalentValues>(key: K, value: TalentValues[K]) => setValues(old => ({ ...old, [key]: value }));
  const choose = (kind: MediaKind, file: File | undefined) => {
    if (!file) return;
    try { validateMedia(file, kind); setFiles(old => ({ ...old, [kind]: file })); setError(''); }
    catch (e) { setError(e instanceof Error ? e.message : 'Fichier invalide.'); }
  };
  const toggleCategory = (category: TalentValues['categories'][number]) => field('categories', values.categories.includes(category) ? values.categories.filter(c => c !== category) : [...values.categories, category]);
  const submit = async (status: 'draft' | 'published') => {
    setError('');
    try {
      const talent = await save.mutateAsync({ values, files, status, existing });
      await navigate({ to: '/talents/fiche/$talentId', params: { talentId: talent.id } });
    } catch (e) {
      setError(e instanceof Error ? ('issues' in e ? 'Vérifiez le nom, les catégories et les liens de votre fiche.' : e.message) : 'La fiche n’a pas été enregistrée.');
    }
  };
  return { values, files, photo, audio, error, pending: save.isPending, field, choose, toggleCategory, submit };
}