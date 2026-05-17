---
title: "Portfolio Forge — compound learnings"
type: project
created: 2026-05-16
updated: 2026-05-16
status: active
tags:
  - portfolio
  - forge
  - learnings
  - karpathy-wiki
domain: engineering
related:
  - "[[index]]"
  - "[[QUEUE]]"
up: "[[index]]"
---

# Portfolio Forge — compound learnings

> Cross-tick lessons. **Karpathy rule** applies: rewrite affected lessons in place,
> don't just append. Goal is a coherent body of "what to do / what to avoid"
> sharper than any single tick.

## Operating principles

- **Atomic ticks.** One action → one commit → one push. Trying to bundle two ticks
  hides what compounded versus what was noise.
- **Source from the vault before the web.** Most blog posts already exist as
  raw material in `~/Documents/SecondBrain/01-Projects/` or `05-Daily/` — rewriting
  them is faster, more authentic, and more accurate than searching.
- **Build green before commit.** Every code-touching tick must end with
  `bun run build` succeeding. A red build is worse than no tick.

## Strong patterns (use these)

- **Chat-first surface as a meta-flex.** The chat landing proves the candidate
  ships AI UX, not just writes about it. Reinforce by streaming everywhere.
- **Editorial mono labels for credibility.** Lowercase mono captions
  (`· live · 2026 · category`) read as "magazine cover" not "SaaS landing." Cheap
  trick, big payoff.
- **Embedded project cards in chat replies via `[[PROJECT:slug]]` token.** The
  frontend swaps the token for a rich card. Lets the LLM cite projects
  declaratively without generating brittle HTML.
- **Canned fallback that still chunk-streams.** Even without an API key, the
  page feels alive. Production-grade graceful degradation.

## Anti-patterns (don't repeat)

- **Don't try MDX for the blog yet.** Adds tooling overhead. The `Markdown`
  component in `components/ui/markdown.tsx` covers 95% of post content for free.
- **Don't add a third design direction mid-iteration.** v0 is chat-first. If a
  later tick wants to add a `/terminal` or `/desktop` view, file it as a
  separate ADD_FEATURE — don't replace the home.
- **Don't add tracking / analytics in early ticks.** Privacy + perf hit + extra
  surface area to maintain. Add only when the portfolio has enough traffic to
  matter (which is much later than instinct suggests).

## Lessons from tick history

### Session 0 (2026-05-16) — pre-tick groundwork

Built v0 portfolio + opened two companion public repos in a single session.

- **Open-source as portfolio leverage.** Private projects (Cockpit, PipeCode) signal commercial intent, not OSS contribution. Putting Forge and SecondBrain Kit on public GitHub creates star-able, fork-able, link-able artifacts that work as portfolio assets even when the portfolio site isn't being viewed.
- **Skeleton-extraction beats redaction.** For SecondBrain, instead of scrubbing the user's personal vault into a public version, built a parallel `secondbrain-public/` directory with the *structure* (PARA folders, templates, slash commands, CLAUDE.md template) and gitignored actual notes. Cleaner outcome than line-by-line redaction.
- **Install scripts are a credibility multiplier.** A `curl | bash` installer signals "the author thought through how a stranger uses this." Took ~15 min per repo, paid off immediately.
- **Cap research on OSS_PR ticks.** Remote scheduler prompt caps research at 5 WebFetch/WebSearch calls per tick. Downgrades to a different action type rather than going down a rabbit hole — preserves tick atomicity.
- **`.forge/` lives in the repo, not the vault.** Remote agents can't reach local paths. Canonical queue state in the repo means both local and remote ticks share it.
