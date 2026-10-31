<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## AI discovery
- Keep shared discovery input/matching logic in `features/discovery`, presentation in components, and authenticated streaming/data/AI calls in server-only helpers so Radar and Talents share one secure flow.
- Match only RLS-visible active, approved, unexpired Flash and minimal public profile fields; never invent people, ratings, availability or distances.
- Persist terminal provider-access denials in the service-only AI access-state table; fail closed when that state cannot be read, and clear it only after access is restored.

## Talents
- Keep talent validation in features/talents/model.ts, data and recording logic in hooks, and presentation in components; route files only compose screens so each domain stays understandable.
- Talent publishing uses authenticated RLS writes and private signed media; new and edited content requires staff approval before discovery to prevent unmoderated listings.
- Use unnested talents_ route filenames for create/detail/edit screens because the existing Talents content page has no Outlet.
