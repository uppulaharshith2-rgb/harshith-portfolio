---
title: "Portfolio Forge Queue"
type: project
created: 2026-05-16
updated: 2026-05-16
status: active
tags:
  - portfolio
  - forge
  - queue
domain: engineering
related:
  - "[[index]]"
  - "[[FORGE-LOOP]]"
  - "[[COMPOUND]]"
up: "[[index]]"
---

# Portfolio Forge Queue

> Each tick of `/portfolio-tick` drains ONE item from here. Mark completed in-place
> (don't delete — keeps history of what shipped per tick).
> **Karpathy rule**: when adding follow-ups, rewrite related items instead of just
> appending — let the queue stay coherent, not chronological.

## Conventions

- Each item: `- [ ] [TYPE] short imperative — context`
- TYPE = one of: `OSS_PR`, `BUILD_SKILL`, `WRITE_POST`, `ADD_PROJECT`, `POLISH_UI`, `ADD_FEATURE`, `CONTENT_PASS`
- When done: change `[ ]` to `[x]` and append `→ <commit-sha> <one-line outcome>`
- Block one item per tick (keep the loop small + atomic)

## Pending (drained top-down by `/portfolio-tick`)

### High-leverage immediate (do these in the first 5 ticks)

- [ ] `ADD_FEATURE` Add ⌘K command palette — fuzzy search across projects + posts + chat starters. Major UX moat for the chat-first surface.
- [ ] `ADD_FEATURE` OG image generation per project/post via `next/og` — better social sharing.
- [ ] `POLISH_UI` Light-mode visual QA — every page screenshotted in both themes, fix contrast issues.
- [ ] `BUILD_SKILL` Author `secondbrain-skills` repo on GitHub (the 10 vault skills extracted from `~/Documents/SecondBrain/.claude/skills/`). Public, MIT, README with install instructions. Link from `/projects/secondbrain`.
- [ ] `OSS_PR` Identify one real issue on `anthropic-cookbook` or `awesome-claude-code` and file a meaningful PR.

### Content compounding (rotate through these)

- [ ] `WRITE_POST` "Forge: multi-agent dev on Claude Max only, zero extra spend" — full architecture writeup sourced from `~/.claude/projects/-Users-harshithuppula-Documents-PipeCode-Question-Curation/memory/forge_architecture.md`
- [ ] `WRITE_POST` "12 daemon workers, one developer: building Cockpit" — Cockpit architecture deep dive
- [ ] `WRITE_POST` "Karpathy LLM Wiki rule for personal vaults" — sourced from SecondBrain CLAUDE.md
- [ ] `WRITE_POST` "AI builder portfolio: why I made the landing a chat" — meta post about THIS site
- [ ] `WRITE_POST` "Cross-validated pain points — using 5 parallel research agents" — sourced from 2026-05-16 daily note evening session
- [ ] `WRITE_POST` "Memory-as-moat for SaaS — 10 day-1-mediocre/month-6-irreplaceable products"

### UI polish backlog

- [ ] `POLISH_UI` Add subtle motion on hero — text typing-in effect when first message lands
- [ ] `POLISH_UI` Project icons / logos — replace solid color blocks with actual mini-logos per project
- [ ] `ADD_FEATURE` Resume PDF download button on `/about` (link to current resume)
- [ ] `ADD_FEATURE` `/chat/[shareId]` permalink for conversations — visitor can share a specific chat thread
- [ ] `CONTENT_PASS` Sharpen every project oneLiner — should pass the "stranger-on-Twitter" test in 8 seconds
- [ ] `ADD_FEATURE` `sitemap.xml` + `robots.txt` + RSS for blog

### Stretch / experimental

- [ ] `ADD_FEATURE` Voice input on chat — `webkit-speech-recognition` for spoken questions
- [ ] `ADD_FEATURE` Embedded code playground per project (run snippets in browser via WebContainer)
- [ ] `ADD_FEATURE` `/graph` page — force-directed visualization of how projects relate
- [ ] `BUILD_SKILL` `gstack-portfolio-tick` — port this loop to a public gstack skill so other AI builders can use it
- [ ] `ADD_PROJECT` Build one fresh micro-tool this week (e.g., a Claude prompt cost-checker, an MCP debugger, a skill scaffolding CLI) — adds a 7th project entry

## Completed

(empty — first tick hasn't fired yet)

## Notes on prioritization

- **Strong filter**: would a Staff DE hiring manager at Anthropic / OpenAI find this materially more impressive after this tick? If yes, prioritize. If no, defer.
- **OSS_PR and BUILD_SKILL > everything else for the first 10 ticks** — those produce externally-visible artifacts (GitHub stars, repo links, PR history) that work even when the portfolio site isn't open.
- Don't run two ticks in 5 minutes — let each compound to a commit + push before the next.
