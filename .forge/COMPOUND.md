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

(none yet — first tick hasn't fired)
