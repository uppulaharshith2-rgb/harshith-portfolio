---
title: "Portfolio Forge — loop runtime"
type: project
created: 2026-05-16
updated: 2026-05-16
status: active
tags:
  - portfolio
  - forge
  - automation
domain: engineering
related:
  - "[[index]]"
  - "[[QUEUE]]"
  - "[[COMPOUND]]"
up: "[[index]]"
---

# Portfolio Forge — loop runtime

> How to actually fire the loop that keeps the portfolio compounding.

## The tick command

`/portfolio-tick` is a custom Claude Code slash command at
`~/.claude/commands/portfolio-tick.md`. It runs **one iteration** of the Forge
Leader loop on `~/Documents/harshith-portfolio`:

1. Reads [[QUEUE]] + [[COMPOUND]]
2. Picks one action by type priority
3. Executes it (writes code, prose, or commits an OSS PR)
4. Runs `bun run build` to verify
5. Commits atomically with a clear message
6. Pushes (if remote exists)
7. Updates QUEUE.md + COMPOUND.md + this project's [[index]] build log
8. Reports a one-paragraph summary
9. Exits

It does NOT loop itself. The wrapper handles re-firing.

## Three ways to wrap the loop

### A) Manual (interactive, on-demand)

Just invoke `/portfolio-tick` whenever you want one compounding action shipped.
Best when you want to watch and approve each step.

```
/portfolio-tick
```

### B) `/loop` (self-paced or fixed-interval, within a Claude Code session)

Runs ticks back-to-back in the **current** session, until you stop it. Good for
batch work — knock out 5-10 actions in one sitting.

```
/loop /portfolio-tick                 # self-paced; Claude picks delay
/loop 15m /portfolio-tick             # every 15 minutes
/loop 1h /portfolio-tick              # every hour
```

Stop with Ctrl+C or by closing the session.

### C) `/schedule` (remote, autonomous, cron-style)

Runs ticks as **remote agents** on a recurring schedule. Does NOT need a local
Claude Code session open. Burns separate credits — confirm cost before enabling.

```
/schedule create "portfolio compounding" "0 6 * * *" "/portfolio-tick"
                                        # ↑ every day at 6am
/schedule list                          # see active schedules
/schedule delete <id>                   # stop a schedule
```

Recommended schedule for serious compounding while applying to jobs:
**daily 6am tick** (one new artifact per day → 30 artifacts in a month).

## Setup checklist (run once)

- [x] Portfolio repo exists locally at `~/Documents/harshith-portfolio`
- [ ] Remote GitHub repo created + linked (`gh repo create uppulaharshith2-rgb/harshith-portfolio --public --source=. --remote=origin --push`)
- [ ] Vercel project linked + first prod deploy (`vercel --prod`)
- [ ] `ANTHROPIC_API_KEY` set in Vercel env (chat falls back to canned if missing — OK to defer)
- [ ] `/schedule` enabled if you want autonomous nightly ticks

## Troubleshooting

- **Tick fails on `bun run build`** → fix the build before committing. Roll back the in-progress change rather than committing red code.
- **Queue empty** → tick will generate 2-3 new candidate items before exiting. Review them before the next tick fires.
- **Wrong commit author** → ensure `git config user.email` in the portfolio repo is `uppula.harshith2@gmail.com` (see vault memory `feedback_git_author.md`).
- **OSS_PR tick can't find a real issue** → it'll downgrade to a BUILD_SKILL or WRITE_POST instead, rather than spamming low-quality PRs.

## Related

- The original Forge architecture: `~/forge/` (more general, multi-repo). This
  portfolio loop is a single-task subset of that pattern.
- See [[01-Projects/data-eng-claude-tools/index]] for Claude Hub's iteration
  cadence — analogous "keep building until told to stop" loop.
