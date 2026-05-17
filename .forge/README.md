# `.forge/` — portfolio compounding loop state

Canonical home for the **Forge Leader** state that drives this portfolio's continuous
improvement. The slash command `/portfolio-tick` (local) and the daily remote
schedule both read from here.

## Files

- **`QUEUE.md`** — pending compounding actions. Each tick drains ONE item from the
  top. Action types: `OSS_PR`, `BUILD_SKILL`, `WRITE_POST`, `ADD_PROJECT`,
  `POLISH_UI`, `ADD_FEATURE`, `CONTENT_PASS`.
- **`COMPOUND.md`** — cross-tick lessons. Karpathy rule: rewrite affected
  entries, don't just append.
- **`FORGE-LOOP.md`** — runtime documentation. How to wrap the tick manually
  (`/portfolio-tick`), in-session batch (`/loop`), or autonomously (`/schedule`
  remote cron).

## Why these live in the repo (not the vault)

The remote `/schedule` agent runs in Anthropic's cloud and clones the repo —
it has no access to the user's local filesystem. Keeping queue state in the
repo means both local and remote ticks read the same file.

The user's vault at `~/Documents/SecondBrain/01-Projects/portfolio/` keeps a
mirror `index.md` for project tracking, but the operational state lives here.

## How a tick uses these files

1. Read `QUEUE.md` → pick next `[ ]` item (top-down, honoring `[priority]` tags)
2. Read `COMPOUND.md` → check for prior lessons that affect the action
3. Execute the action — write code, prose, or file an external PR
4. Run `bun run build` — must be green before commit
5. Mark item `[x]` in `QUEUE.md` with commit SHA + outcome
6. If new lessons learned, **rewrite** the affected `COMPOUND.md` section (not append)
7. Atomic commit with message format: `<TYPE>: <one-line gain>`
8. Push to `main` — Vercel auto-deploys via git integration
