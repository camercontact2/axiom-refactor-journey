import { createFileRoute } from '@tanstack/react-router';
import { AppShell } from '@/components/layout/AppShell';
import { TalentProfile } from '@/features/talents/components/TalentProfile';

export const Route = createFileRoute('/_authenticated/talents_/fiche/$talentId')({
  head: () => ({ meta: [{ title: 'Fiche talent — VITALA' }, { name: 'description', content: 'Découvrez un savoir-faire, son parcours et sa présentation audio sur VITALA.' }, { property: 'og:title', content: 'Fiche talent — VITALA' }, { property: 'og:description', content: 'Écoute mon talent : savoir-faire, compétences et expériences.' }, { property: 'og:type', content: 'profile' }, { name: 'twitter:card', content: 'summary' }] }),
  component: TalentPage,
});
function TalentPage() { const { talentId } = Route.useParams(); return <AppShell><TalentProfile id={talentId} /></AppShell>; }