import { createFileRoute } from '@tanstack/react-router';
import { AppShell } from '@/components/layout/AppShell';
import { EditTalent } from '@/features/talents/components/EditTalent';

export const Route = createFileRoute('/_authenticated/talents_/fiche/$talentId_/modifier')({
  head: () => ({ meta: [{ title: 'Modifier ma fiche talent — VITALA' }, { name: 'description', content: 'Mettez à jour votre fiche talent, votre photo et votre présentation audio.' }, { property: 'og:title', content: 'Modifier ma fiche talent — VITALA' }, { property: 'og:description', content: 'Actualisez votre savoir-faire et votre parcours sur VITALA.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' }] }),
  component: EditTalentPage,
});
function EditTalentPage() { const { talentId } = Route.useParams(); return <AppShell><EditTalent id={talentId} /></AppShell>; }