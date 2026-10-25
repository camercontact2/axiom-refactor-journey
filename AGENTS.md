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
