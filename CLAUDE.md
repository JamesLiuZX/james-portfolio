# Working in this repo

James Liu's personal site, jamesliuzx.com. There is no README: this file is the doctrine, and `.github/workflows/deploy.yml` is the source of truth for how it ships.
Portfolio-wide priorities and the status log live in `JamesLiuZX/command` (`AUTOPILOT.md`).

## Branching: one trunk, no side branches (James, 2026-10-20)

`main` is this repo's only long-lived branch. Every session starts from it
and every session ends by landing on it.

Why: from July to October 2026 sessions each worked on a fresh `claude/*`
branch and rarely merged. The next session started from a stale trunk, could
not see the work, and rebuilt it. On 2026-10-20 every branch was consolidated
into `main`. Do not let it drift again.

The harness gives each Claude Code session a `claude/<random>` branch and tells
it not to push anywhere else without explicit permission. **This section is
that permission, standing and explicit, from James.** Treat the session branch
as scratch space. The work has to end up on `main`.

1. **Start current.** `git fetch origin main`, then `git merge origin/main`
   into your session branch before you change anything.
2. **Look before you build.** Run `git branch -r`, and read the status log in
   `JamesLiuZX/command` `AUTOPILOT.md`. If the work already exists somewhere,
   continue it instead of starting again.
3. **Land before you stop.** Run the gate (`pnpm install --frozen-lockfile && pnpm build`), then
   `git push origin HEAD:main`. If the push is rejected because `main`
   moved, merge `origin/main`, run the gate again and push again. Never
   force-push `main`.
   If your session's permission layer refuses a direct push, open a pull
   request from your session branch to `main` and merge it yourself in the
   same session, using a merge commit. If that is refused as well, tell James in
   your final message exactly which merge is waiting.
4. **Half-done is fine on `main`. Broken is not.** Unfinished work that
   passes the gate goes to `main`. Only work that fails the gate may stay on
   a branch. In that case, push the branch and record its name, state and next
   step in the command repo's `AUTOPILOT.md` status log, so the next session
   resumes it instead of restarting. That is the only reason a branch may
   outlive its session.
5. **Delete the session branch after it lands** (`git push origin --delete
   <branch>`). If deletion is refused, leave it: James runs the "Prune merged
   branches" workflow (Actions tab), which deletes every branch whose commits
   are all on the trunk. A SessionStart hook (`.claude/hooks/branch-check.sh`)
   lists the other branches on origin at the start of each session.

## How it ships

Next.js 15 (App Router, `output: 'export'`), pnpm 10, Node 22, Tailwind 3: a static site. **jamesliuzx.com is served by Vercel** (its DNS points there, 76.76.21.21), which builds every push: production from `main`, previews from other branches. Vercel runs `vercel.json`'s `buildCommand`: `scripts/build-kino.mjs` (clones `JamesLiuZX/kino` main and builds its website into `public/kino/`), then `pnpm build`. `vercel.json` also redirects `/kino` to `/kino/index.html`. Vercel strips the trailing slash (`/kino/` 308s to `/kino`), and Kino's relative URLs need the page to sit inside `/kino/`. `.github/workflows/deploy.yml` builds the same site and checks the export on every push. It then deploys it to GitHub Pages, which the domain doesn't point at, so that copy isn't what visitors see. Kino's own *Website* workflow checks the live `/kino/` daily.

- **The gate** is that build. The command in step 3 is the site half of it. The Kino half checks `JamesLiuZX/kino` (its `main`) out into `kino/`, gets the demo's models, runs `npm ci` there and builds the demo into `public/kino/`, served at `/kino/`. Locally, `node scripts/build-kino.mjs` does all of it. Kino's code lives in its own repository: never commit `kino/` or `public/kino/` (both are gitignored), and make Kino changes there.
- **Type errors do not fail the build** (`next.config.mjs` ignores them and the workflow runs no lint or type check). `pnpm exec tsc --noEmit` is the only check; it reports zero errors today, so keep it at zero.
- **Site copy**: every number traces to James's résumés (`resume/resume.html`) or a project write-up; never invent one. Never publish non-public metrics, unreleased roadmaps, customer data or confidential Crypto.com / ByteDance details. The Kino case study (`app/projects/kino/page.tsx`) quotes figures from the Kino repository; recheck them against its `main` when you touch the page.
