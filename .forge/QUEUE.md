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

### Tier 1 — bar-raising signal for Anthropic / OpenAI hiring panels (do these FIRST)

> Research-grade specificity. Each item names exact files, repos, issues, or design briefs. No vague "improve the UI."

- [ ] `OSS_PR` **anthropics/claude-agent-sdk-python #899** — subprocess CLI rejects list-form `system_prompt` (API supports it). First-party Anthropic repo = single highest hiring signal. Fix in `src/claude_agent_sdk/_internal/transport/subprocess_cli.py` L209-220 + pytest cases for str / dict-file / dict-preset / list forms. Est 2.5h.

- [ ] `BUILD_SKILL` **dbt-eval** — `dbt test` syntax for LLM outputs. Public OSS repo + PyPI. 8 assertions: `regex_match`, `json_schema`, `cosine_similarity`, `factual_consistency`, `tool_call_shape`, `latency_p95`, `cost_per_call`, `no_pii`. HTML report mirroring dbt-docs. GitHub Action for PR diffs ("prompt v3→v4 regressed 2 assertions"). 10-12h. Pitch: "I made LLM eval boring like dbt tests." Becomes a blog post + portfolio entry.

- [ ] `BUILD_SKILL` **claude-warehouse-mcp** — one MCP, four warehouses (Snowflake/BigQuery/Databricks/DuckDB), governed SQL. Tools: `list_tables`, `describe`, `sample`, `query`, `estimate_cost`, `lineage_for_column`. Per-warehouse adapters, read-only enforcement, LIMIT injection, scanned-bytes ceiling, `claude_warehouse.yml` policy. Demo notebook: "Claude analyzes 1TB BigQuery for $0.14." 10-12h. Fills the governed-multi-warehouse-MCP gap.

- [x] `OSS_PR` **BerriAI/litellm #26444** — drop unsupported `temperature` param for Claude Opus 4.7 → https://github.com/BerriAI/litellm/pull/28113 (6 files, +346/−0, 21 new tests, 976 existing tests still green). Read 2 prior closed PRs first to understand maintainer rejection patterns. 2026-05-17.

- [ ] `OSS_PR` **BerriAI/litellm Databricks follow-up** — mirror the Opus 4.7 fix into `DatabricksConfig.get_supported_openai_params` and add the JSON flags on `databricks-claude-opus-4-7` entries. Same shape as #28113, smaller scope. Per @Kontinuation's comment on the original issue. ~2h.

- [ ] `OSS_PR` **BerriAI/litellm #28067** — Anthropic streaming `KeyError: 'text'` on `content_block_start` when upstream omits optional field. `chunk["text"]` → `chunk.get("text", "")` in `litellm/llms/anthropic/chat/handler.py:789` + streaming test. 1.5h. Filed yesterday, zero comments = wide open.

- [ ] `OSS_PR` **BerriAI/litellm #27944** — Anthropic batch costs always 0; `transform_file_content_request` routes `msgbatch_*` IDs to wrong endpoint. Branch on `file_id` prefix in `litellm/llms/anthropic/files/transformation.py`. 4h. Cost-tracking bug = DE-adjacent signal.

- [ ] `OSS_PR` **modelcontextprotocol/python-sdk #1933** — stdio transport closes real fds, `ValueError` after server exits. Wrap stdio takeover in context that restores `os.dup`'d copies on exit. 3h. Canonical MCP repo (23k stars), labeled `good first issue`+`bug`+`P3`.

### Tier 2 — portfolio polish (Anthropic-grade taste signals)

- [ ] `POLISH_UI` **Monogram project tiles** — replace solid-color squares with brand-color gradient tiles containing the project name's first 1-2 chars in Geist Mono. Bump to 28×28, `border-radius: 6px`, white 600 mono at 11px. `app/page.tsx:94-104` + `components/projects/project-card.tsx`. Visually differentiates the 4 live cards. 25min.
- [ ] `POLISH_UI` **Stagger prompt chips on first paint** — `animation-delay: calc(var(--i) * 60ms)` via inline `style={{ "--i": i }}`. New `@keyframes chipPop { from { opacity: 0; transform: translateY(6px) scale(0.96); } to { opacity: 1; transform: none; } }` on `.prompt-chip`. 360ms total stagger. `components/chat/chat.tsx:280-291` + `app/globals.css:268-287`. 15min.
- [ ] `CONTENT_PASS` **Sharpen the CTA card** — replace "Hiring for AI infra, data, or eval?" with `"7 shipped projects. 12 weeks of nights. Available Monday."` and subhead with `"Senior/Staff data eng. Currently shipping multi-agent infra solo on the Claude Max plan. Avg response < 6h."`. `app/page.tsx:164-186`. 8min. Specific numbers + Monday-availability hook out-perform generic hiring copy.
- [ ] `ADD_FEATURE` **Static `og.png` (1200×630)** — design in Figma: "Hi, I'm Harshith." + accent underline on "shipped" + status dot + 4 small project monograms. Place at `public/og.png`. Wire into `metadata.openGraph.images`. 45min.
- [ ] `ADD_FEATURE` **⌘K command palette** — fuzzy search across projects + posts + chat starters via Fuse.js. Major UX moat for the chat-first surface. 90min.
- [ ] `ADD_FEATURE` **OG image generation** via `next/og` — per project/post dynamic OG with project name + accent + tagline. 60min.
- [ ] `POLISH_UI` **Light-mode visual QA** — screenshot every page in both themes; fix contrast issues. The `html.light` vars exist but no live verification yet. 45min.
- [ ] `ADD_FEATURE` **`/oss` page** — public ledger of every OSS contribution shipped through this portfolio (PRs filed + merged, OSS repos published, skills released). Tracks the actual hiring artifact. 60min once first PR lands.

### Tier 3 — announcement posts (write only AFTER each ships)

- [ ] `WRITE_POST` **"Forge: multi-agent dev on Claude Max only"** — full architecture writeup with the DAG diagram, complexity rubric, role matrix, budget guard explanation, real numbers from RUN_1. Sourced from github.com/uppulaharshith2-rgb/forge README + ~/forge/RUN_1_COMPLETE.md. 1000-1200 words. Aim: HN/r/programming front page.
- [ ] `WRITE_POST` **"SecondBrain Kit: the vault that compounds"** — Karpathy LLM Wiki rule explained, PARA structure for AI-native work, why "rewrite-don't-append" is the unlock. Source from public repo README. 800 words.
- [ ] `WRITE_POST` **"Why my portfolio is a chat (and what it taught me about AI UX)"** — meta post about THIS site, with the streaming-first-message decision, the embedded-cards token pattern, the canned-fallback graceful degradation. Honest about what didn't work. 900 words.

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
