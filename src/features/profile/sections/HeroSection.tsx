import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { SmartCard } from "@/components/ui-kit/SmartCard";
import { TrustBadge } from "@/components/ui-kit/TrustBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BadgeCheck, LogOut, Pencil, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useProfile, useUpdateProfile } from "../hooks/useProfile";
import { USER } from "../data";

/** Carte d'identite du profil : donnees reelles du compte connecte. */
export function HeroSection() {
  const { data: profile, isPending } = useProfile();
  const update = useUpdateProfile();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ display_name: "", username: "", city: "", bio: "" });

  useEffect(() => {
    if (!profile) return;
    setForm({
      display_name: profile.display_name ?? "",
      username: profile.username ?? "",
      city: profile.city ?? "",
      bio: profile.bio ?? "",
    });
  }, [profile]);

  const name = profile?.display_name || profile?.username || "Nouveau membre";
  const handle = profile?.username ? `@${profile.username}` : "@—";
  const city = profile?.city || "Ville non renseignée";
  const initials = name.slice(0, 2).toUpperCase();

  const filled = [profile?.display_name, profile?.username, profile?.city, profile?.bio].filter(
    Boolean,
  ).length;
  const completion = Math.round((filled / 4) * 100);

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  async function handleSave() {
    try {
      await update.mutateAsync({
        display_name: form.display_name.trim() || null,
        username: form.username.trim() || null,
        city: form.city.trim() || null,
        bio: form.bio.trim() || null,
      });
      toast.success("Profil mis à jour");
      setOpen(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Impossible d'enregistrer le profil");
    }
  }

  if (isPending) {
    return (
      <SmartCard className="space-y-4">
        <div className="flex items-start gap-3">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <Skeleton className="h-1.5 w-full" />
      </SmartCard>
    );
  }

  return (
    <SmartCard className="space-y-4">
      <div className="flex items-start gap-3">
        <div className="relative">
          <Avatar className="h-16 w-16 ring-2 ring-[color-mix(in_oklch,var(--primary)_40%,transparent)]">
            <AvatarImage src={profile?.avatar_url ?? ""} alt={name} />
            <AvatarFallback className="bg-gradient-to-br from-[var(--primary)]/40 to-[var(--scan)]/40 text-base font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--trust)] ring-2 ring-background">
            <BadgeCheck className="h-3 w-3 text-background" aria-hidden="true" />
          </span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold leading-tight">{name}</h2>
            <TrustBadge score={USER.trust} />
          </div>
          <p className="text-xs text-muted-foreground">
            {handle} · {city}
          </p>
          {profile?.bio ? (
            <p className="mt-1.5 text-xs text-muted-foreground/90">{profile.bio}</p>
          ) : null}
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span>Profil complété</span>
          <span className="font-medium text-foreground">{completion}%</span>
        </div>
        <Progress value={completion} className="h-1.5 bg-white/5" />
      </div>

      <div className="flex gap-2">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="flex-1 rounded-xl">
              <Pencil className="h-3.5 w-3.5" aria-hidden="true" /> Modifier profil
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>Modifier mon profil</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="display_name">Nom affiché</Label>
                <Input
                  id="display_name"
                  value={form.display_name}
                  onChange={(e) => setForm((f) => ({ ...f, display_name: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="username">Identifiant</Label>
                <Input
                  id="username"
                  value={form.username}
                  onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="city">Ville</Label>
                <Input
                  id="city"
                  value={form.city}
                  onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  rows={3}
                  value={form.bio}
                  onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSave} disabled={update.isPending} className="w-full rounded-xl">
                {update.isPending ? "Enregistrement…" : "Enregistrer"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button asChild size="sm" variant="outline" className="flex-1 rounded-xl border-white/10">
          <Link to="/trust">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" /> Trust Space
          </Link>
        </Button>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleSignOut}
        className="w-full rounded-xl text-muted-foreground"
      >
        <LogOut className="h-3.5 w-3.5" aria-hidden="true" /> Se déconnecter
      </Button>
    </SmartCard>
  );
}
