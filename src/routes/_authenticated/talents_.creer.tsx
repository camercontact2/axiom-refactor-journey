import { createFileRoute } from '@tanstack/react-router';
import { AppShell } from '@/components/layout/AppShell';
import { TalentForm } from '@/features/talents/components/TalentForm';

export const Route = createFileRoute('/_authenticated/talents_/creer')({
  head: () => ({ meta: [{ title: 'Créer ma fiche talent — VITALA' }, { name: 'description', content: 'Présentez votre talent avec une photo, votre voix et vos catégories sur VITALA.' }, { property: 'og:title', content: 'Créer ma fiche talent — VITALA' }, { property: 'og:description', content: 'Votre savoir-faire, avec vos mots ou votre voix.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' }] }),
  component: CreateTalentPage,
});
function CreateTalentPage() { return <AppShell><TalentForm /></AppShell>; }