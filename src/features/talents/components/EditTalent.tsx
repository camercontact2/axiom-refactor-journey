import { useAuth } from '@/features/auth/hooks/useAuth';
import { useTalent } from '../hooks/useTalentData';
import { TalentForm } from './TalentForm';

export function EditTalent({ id }: { id: string }) {
  const { user } = useAuth();
  const query = useTalent(id);
  if (query.isLoading) return <p role="status">Chargement de votre fiche…</p>;
  if (query.error) return <p role="alert" className="text-destructive">{query.error.message}</p>;
  if (!query.data || query.data.owner_id !== user?.id) return <p>Vous ne pouvez modifier que votre propre fiche.</p>;
  return <TalentForm existing={query.data} />;
}