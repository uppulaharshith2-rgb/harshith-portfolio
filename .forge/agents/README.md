# `.forge/agents/` — research + implementation pattern

The portfolio compounding loop is **two-stage**: research agents scout opportunities, implementation agents ship them. This directory holds the personas.

## Why two stages

Single-agent loops conflate scouting and execution — agents get tunnel vision on the first idea they have. Splitting roles forces a ranked candidate list before any commit, and lets multiple scouts run in parallel while one implementer ships.

## How they wire together

```
                     ┌──────────────┐
                     │   LEADER     │  (you, or /portfolio-tick, or the nightly schedule)
                     └──────┬───────┘
                            │
              ┌─────────────┼──────────────┐
              ▼             ▼              ▼
       ┌──────────┐  ┌──────────┐  ┌──────────┐
       │ research │  │ research │  │ research │   ← parallel, each picks a mode
       │  oss     │  │ polish   │  │ new-bld  │     (oss-targets, portfolio-polish,
       └────┬─────┘  └────┬─────┘  └────┬─────┘      new-builds, content-topics)
            │             │             │
            └─────────────┴─────────────┘
                          │
                          ▼
                  ranked findings (top 2 each)
                          │
                          ▼
                 ┌─────────────────┐
                 │  LEADER picks   │   one finding becomes the spawn brief
                 └────────┬────────┘
                          │
                          ▼
                  ┌──────────────┐
                  │ implementation│  ← ships ONE artifact, commits, pushes
                  └──────┬───────┘
                          │
                          ▼
                  Vercel auto-deploys
```

## Files

- `research.md` — persona for research agents. Modes: `oss-targets`, `portfolio-polish`, `new-builds`, `content-topics`.
- `implementation.md` — persona for implementation agents. Always commits.

## How to use locally

```
# Manual: invoke /portfolio-tick (it knows about these personas)
/portfolio-tick

# Batch in-session: self-paced loop
/loop /portfolio-tick

# Self-paced research-then-implement cycle (recommended for active sessions):
# 1. Spawn 2-3 research agents in parallel with different modes
# 2. Read their ranked outputs
# 3. Spawn 1-2 implementation agents with the top picks as briefs
# 4. Repeat
```

## How the nightly remote schedule uses them

The remote tick (`trig_01Xq1E1FCDDUMXFomkTijwd3`, fires daily 6am PDT) acts as a combined Leader+Implementation agent. It reads `.forge/QUEUE.md` (which has been pre-stocked by prior research) and ships one artifact. Pure research-only ticks don't fire remotely — research is done interactively or batched ahead.

## Hard architectural rules

- Research agents NEVER write code or commit. Output is markdown only.
- Implementation agents ALWAYS commit + push. No "draft" implementations.
- One artifact per spawn. Atomic.
- Both read `.forge/QUEUE.md` and `.forge/COMPOUND.md` before starting. No surprise duplicates.
