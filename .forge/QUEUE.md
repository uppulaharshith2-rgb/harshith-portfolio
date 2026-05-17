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

- [x] `OSS_PR` **BerriAI/litellm #28115** — Databricks Opus 4.7 follow-up to #28113. 4 files, +294/-1, 9 new tests, 81 existing tests still green. Reused fork. Flagged Databricks pricing placeholder proactively. 2026-05-17.

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

### Tier 3 — announcement + extraction posts

- [x] `WRITE_POST` **"Forge: multi-agent dev that adds nothing to my Claude bill"** — full architecture writeup with the DAG, role matrix, budget guard, file-bus design choice, "what Forge is not" anti-section. Aim was HN-grade; shipped 2026-05-17 at /blog/forge-multi-agent-dev-zero-extra-spend (~1100 words).
- [x] `WRITE_POST` **"dbt-eval: making LLM evaluations boring"** — announcement post with the full YAML example, terminal report, all 3 v0 assertions explained, 8-assertion roadmap, "what v0 doesn't do (yet)" honesty, and the "boring is the feature" closer. Shipped 2026-05-17 at /blog/dbt-eval-making-llm-evaluations-boring (~1100 words). → commit 1a7738a (surfacing) + this commit (post).

- [ ] `BUILD_SKILL` **dbt-eval v0.2 — real \`model:\` blocks** — extend the YAML schema to declare a model + prompt template + sampling params; swap `EvalCase.output()` from stub to real Anthropic/OpenAI call. Lift the example to actually invoke Claude Haiku on the support fixtures. Lock the v0 schema first, then add the runtime. Est 4-6h.

- [ ] `BUILD_SKILL` **dbt-eval `cost_per_call` + `latency_p95` assertions** — first two of the eight named-roadmap assertions. Both need the v0.2 runtime to land first. Est 2h after v0.2.

- [ ] `OSS_PR` **dbt-eval to awesome-claude-code / awesome-llm-eval lists** — once v0 has a star or two, file the PR adding dbt-eval to relevant awesome-lists. Free distribution, low effort. Est 30min.

### Tier 1.4 — close the governance-suite narrative with the 4th repo

> Iteration #8 research agent recommendation, score 10/10 across all four axes (coherence, differentiation, build leverage, hiring signal): ship ONE more repo (prompt-lineage) that closes the suite narratively at 4, then PIVOT to a new thesis.

- [ ] `BUILD_SKILL` **prompt-lineage** — `dbt docs` for prompts. Parses `prompts.yml` + dbt-eval suites + prompt-contracts decorators + git history into a lineage graph. CLI emits a static HTML site (dbt-docs aesthetic — searchable table + clickable DAG). GitHub Action posts sticky PR comment: "this PR touches 3 prompts → 7 eval cases → 2 production callers." **Builds the navigation/observability surface that retroactively turns the 3 existing suite repos into a platform.** Subsumes most of golden-diff's value via `lineage diff main..HEAD` subcommand — so remove golden-diff from Tier 1.5 (it's subsumed). 6h target — ship v0 as sortable table + collapsible details, defer the force-directed graph to v0.2. Same v0 discipline as the other three: lock the `lineage.json` schema, defer the engine. Anchor post: "dbt-docs for prompts — the navigation surface that retroactively turns three CLIs into a platform."

### Tier 2 — open the NEXT thesis (iteration #10+)

> After prompt-lineage closes the governance suite, pivot to Great Expectations for LLM training data — a sister thesis with the same shape (3 composable repos, DE mental model port, un-saturated space).

- [ ] `BUILD_SKILL` **llm-expectations** — declarative YAML data quality checks for JSONL training files. Schema drift, label distribution, duplicate prompts, PII, max-token ceilings, language-detect. Same YAML-shape ergonomics as the governance suite. Borrows from Great Expectations. ~8h.
- [ ] `BUILD_SKILL` **corpus-snapshot** — snapshot + diff tool for RAG corpora. `corpus-snapshot diff prod staging` shows added/removed/changed documents with chunk-level hashes. Borrows from dbt snapshots + Datafold's data-diff. ~6h.
- [ ] `BUILD_SKILL` **fixture-lineage** — track which eval fixtures came from which prod traces, with consent + redaction provenance. Composes with prompt-lineage's data model. ~7h.
- **Incumbency check before building**: 30-min sweep of cleanlab, lilac, argilla to confirm the JSONL-native + RAG-corpus-aware + declarative-YAML combination is genuinely un-saturated.

### Tier 1.5 — three-repo dbt-style governance suite for prompts (companion to dbt-eval)

> Research agent's iteration #5 finding: extend dbt-eval into a **coherent governance suite** (define a contract → diff changes in CI → track freshness over time) rather than competing with promptfoo / DeepEval / Phoenix on assertions. The pitch becomes one sentence at every recruiter call: "I'm building the dbt-style governance layer for prompts."

- [x] `BUILD_SKILL` **`prompt-contracts` v0 SHIPPED** — github.com/uppulaharshith2-rgb/prompt-contracts, 19 files, 1,470 LOC, 55 tests passing in 0.23s. v0 ships JSON Schema + Pydantic validators + 3 on_violation modes + coerce + .contract_stats. v0.2 deferred: Airflow operator, SQL quarantine adapter, OTel export, declarative manifest. 2026-05-17.

- [ ] `BUILD_SKILL` **`golden-diff` (score 8/10)** — Visual JSON-output diff bot for prompt PRs. GitHub Action posts a sticky PR comment with structured diff between `main` and PR branch eval results: added keys, removed keys, value drift, count of regressed cases. Severity coloring (green / amber / red). Adapters for dbt-eval, promptfoo, raw JSONL. Worked example: bumping temperature regresses 3/20 cases, bot calls it out. **6-8h. GitHub Marketplace Action + `pip install golden-diff`.** Anchor post: "Prompt PRs need preview comments, not test logs."

- [x] `BUILD_SKILL` **`prompt-freshness` v0 SHIPPED — SUITE COMPLETE** — github.com/uppulaharshith2-rgb/prompt-freshness, 24 files, 2,110 LOC, 57 tests passing in 0.10s, CI green on Python 3.10 / 3.11 / 3.12. Model-alias drift detection working end-to-end, dbt-eval integration shipped (not stubbed). v0.5 deferred: git-aware staleness. Governance suite now 3-of-3 public — 153 combined passing tests. 2026-05-17.

**Why ship all three**: Recruiter call pitch goes from "I built dbt-eval" to "I'm building the dbt-style governance suite for prompts" — coherent three-repo story that mirrors a mental model every analytics engineer already has. None compete with existing eval frameworks (they occupy the un-saturated *governance* layer above eval). All three shippable in 4-12 hours each, so all three could be built in one weekend with the forge loop.

### REMOVED FROM QUEUE (already addressed externally)

- ~~`ADD_PROJECT` Build one fresh micro-tool this week~~ → addressed by dbt-eval (shipped 2026-05-17)
- ~~Airflow Claude operator~~ → **Astronomer Data Agents plugin shipped first-party with Apache 2.0**, crowds out the build. Pivoted to the three-repo governance suite above which occupies less-crowded space.
- [x] `WRITE_POST` **"Research agents that abandon: discipline as a feature"** — shipped 2026-05-17 at /blog/research-agents-that-abandon-discipline-as-a-feature (~1100 words). Walks the 3 abandonments concretely (claude-agent-sdk #899, MCP python-sdk #1933, litellm #28067), explains the 30-second pre-flight that makes the abandon path explicit and rewarded, names the compound-learning-as-team-culture pattern, closes with "if your agent never abandons, your agent is shipping bad work."

- [x] `WRITE_POST` **"Ship the schema before the engine: a v0 discipline"** — shipped 2026-05-17 at /blog/ship-the-schema-before-the-engine (~1200 words). Two data points (dbt-eval stubbed `EvalCase.output()`, prompt-contracts shipped Protocol-only quarantine). Generalizes: the schema is what adopters lock in on, the engine is rewritable. Three concrete behaviors named (ship the call site, stub the engine to a deterministic minimum, name the engine in the roadmap). Closes with the dbt parallel — early dbt shipped the YAML shape with minimal materialization strategies; that's why we still use the same YAML.

- [x] `WRITE_POST` **"Stop competing for first-PR queue spots: what to build instead"** — shipped 2026-05-17 at /blog/stop-competing-for-first-pr-queue-spots (~1100 words). Companion to research-agents-that-abandon. Opens with the data: median time from `good first issue` to first PR is under 6h on popular Anthropic-ecosystem repos. Walks the 3 saturated abandoned targets. Names 4 strategic moves: build new OSS in uncrowded space, extend already-shipped work, OSS_COMMENT instead of OSS_PR, less-trafficked-relevant repos. Uses the governance suite (3 repos in 24h) and litellm #28113 + #28115 (extension move) as concrete proof. Closes: "stop supplying PRs and supply demand instead."
- [x] `WRITE_POST` **"SecondBrain Kit: the vault that compounds"** — shipped 2026-05-17 at /blog/secondbrain-kit-the-vault-that-compounds (~900 words). Karpathy LLM Wiki rule as the load-bearing observation, walks PARA + 9 slash commands + 11 templates + the CLAUDE.md operating manual, names the "folders for what / tags for about" choice, closes with the generalizable lesson: bake the rewrite-don't-append rule into the tool, not into willpower.
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
