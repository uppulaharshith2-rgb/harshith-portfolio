# OSS contribution plan — Claude ecosystem

> 10 prioritized PR targets in the Anthropic / Claude / MCP ecosystem.
> Each `OSS_PR` queue item should pull from this list. Update with outcomes
> as PRs land. **Karpathy rule** — rewrite stale entries, don't append duplicates.

## Prioritization rubric

For each target, score 1-3 on each axis:
- **Visibility** — how many devs will see the PR?
- **Effort** — how many hours to produce a quality PR? (lower = better)
- **Relevance** — how directly does it signal Senior/Staff AI DE candidacy?

Priority = Visibility + Relevance - Effort.

## Tier 1 — high-leverage, ship first

### 1. `anthropic-cookbook` — add a data-engineering example
- Repo: github.com/anthropics/anthropic-cookbook
- Pitch: add a notebook showing Claude orchestrating a real DE pipeline (e.g., dbt model generation from a sample schema, or PySpark UDF synthesis from a natural-language spec).
- Why: huge official-Anthropic visibility. Direct DE relevance.
- Effort: ~6h (notebook + writeup + PR description)
- Score: V3 + R3 − E2 = **4**

### 2. `awesome-claude-code` — add Forge + SecondBrain + portfolio entries
- Repo: github.com/awesome-claude-code/awesome-claude-code (or similar awesome-list)
- Pitch: PR adding entries for Forge (multi-agent orchestrator), SecondBrain (vault skills), and the chat-first portfolio pattern.
- Why: SEO + discovery for the user's own OSS projects.
- Effort: ~1h
- Score: V2 + R2 − E1 = **3**

### 3. `mcp-server-*` — pick a popular MCP server and add a real bug fix or feature
- Repo: scan github.com/modelcontextprotocol/servers issues
- Pitch: pick the most-starred MCP server with a beginner-friendly open issue.
- Why: MCP is hot, contributions read as "I understand the protocol."
- Effort: ~4h (depends on the issue)
- Score: V3 + R3 − E2 = **4**

## Tier 2 — medium leverage

### 4. `claude-code` repo — doc fix or example
- Repo: github.com/anthropics/claude-code
- Pitch: find a doc with a stale model name, broken example, or unclear edge case. Fix it.
- Why: official-Anthropic visibility, low effort.
- Effort: ~2h
- Score: V3 + R2 − E1 = **4**

### 5. `langchain-anthropic` integration — add tool use example
- Repo: github.com/langchain-ai/langchain (in `libs/partners/anthropic/`)
- Pitch: add a clean tool-use example showing Claude calling typed tools end-to-end.
- Why: LangChain has massive audience.
- Effort: ~3h
- Score: V3 + R2 − E2 = **3**

### 6. `dbt-claude` or similar AI×DE OSS — start one if missing
- Pitch: if a Claude×dbt integration doesn't exist as an OSS plugin, create the seed.
- Why: at the intersection of AI + DE — the candidate's exact specialty.
- Effort: ~10h (full new project)
- Score: V2 + R3 − E3 = **2** (high effort but high signal)

### 7. `prefect`, `dagster`, or `airflow` — add a Claude task type / operator
- Pitch: contribute a `ClaudeOperator` for one of the orchestration tools.
- Why: bridges classic DE infra with AI — exact candidacy fit.
- Effort: ~5h
- Score: V2 + R3 − E2 = **3**

### 8. `litellm` or similar router — add or improve Claude routing logic
- Repo: github.com/BerriAI/litellm
- Pitch: find an open issue about Claude routing, fix it.
- Why: actively maintained, lots of devs use it.
- Effort: ~3h
- Score: V2 + R2 − E2 = **2**

## Tier 3 — opportunistic

### 9. A small Claude SDK PR in any popular dev-tool repo
- Pitch: find a dev tool (Zed, Cursor, Continue, Aider) where Claude support has a gap. File a fix.
- Why: developer-tool ecosystem visibility.
- Effort: variable
- Score: opportunistic

### 10. Write a Claude skill, publish to a public-skills repo
- Pitch: extract one of the SecondBrain skills (`/research-deep`, `/process-inbox`) and contribute it to a public skills marketplace if one exists.
- Why: cross-pollinates with the SecondBrain repo.
- Effort: ~2h
- Score: V2 + R2 − E1 = **3**

## Execution notes

- One PR per `OSS_PR` tick. The nightly tick picks the highest-priority unstarted item.
- Each PR should follow the target repo's CONTRIBUTING.md — read it first.
- Open a draft PR first if the change is non-trivial — solicit maintainer feedback before sinking 8 hours.
- Commit as `uppula.harshith2@gmail.com` so author attribution flows back to the portfolio profile.

## Completed

### 2026-05-17 — litellm Opus 4.7 temperature drop_params fix

- **PR**: https://github.com/BerriAI/litellm/pull/28113 (status: open)
- **Stats**: 6 files, +346/−0, 21 new tests, 976 existing tests still green
- **Issue**: BerriAI/litellm#26444
- **Approach delta from prior closed PRs**: #26445 over-stripped (treated all reasoning-family models — Anthropic's deprecation is Opus-4.7-only per migration docs). #26246 had right gating but bloated 256 lines with a `ProviderSpecificModelInfo` TypedDict rewrite that was unnecessary. This PR uses the existing `_is_explicitly_disabled_factory` helper, scopes strictly to Opus 4.7, mirrors into Bedrock Converse, sets JSON flags on all 10 Opus 4.7 model entries, and adds defense-in-depth in `map_openai_params`.
- **Coverage gap noted**: Same bug exists in `DatabricksConfig.get_supported_openai_params` per @Kontinuation's comment on the original issue. Filed as follow-up queue item.

### 2026-05-17 — Forge public release
- **Repo**: https://github.com/uppulaharshith2-rgb/forge (MIT)
- Multi-agent dev orchestrator on Claude Code Max. 11 personas, 6 GSD templates, file bus, budget guard, install script.

### 2026-05-17 — SecondBrain Kit public release
- **Repo**: https://github.com/uppulaharshith2-rgb/secondbrain (MIT)
- PARA vault skeleton + 9 custom Claude slash commands + 11 templates + pre-written CLAUDE.md operating manual.

### 2026-05-17 — dbt-eval v0 public release
- **Repo**: https://github.com/uppulaharshith2-rgb/dbt-eval (MIT)
- **Stats**: 19 files, ~1,229 LOC, **41 tests passing in 0.51s**, working example suite (3 cases · 9 assertions · 8 passed · 1 failed by design)
- **Pitch**: `dbt test` syntax for LLM outputs. Declarative YAML assertions for prompts. v0 ships 3 working assertions (`regex_match`, `json_schema`, `faithful`); roadmap names 8 more. The thesis is that LLM eval is broken because it's *exciting* and the fix is to make it boring like dbt tests.
- **Why this matters for the candidacy**: lives at the intersection of data engineering (the entire YAML shape mirrors `dbt schema.yml`) and AI infra (LLM-as-judge with offline mock for CI). Exact "AI Data Engineer" pitch the role bands at top labs are asking for.
- **Strategic note**: this is the FIRST result of the OSS-landscape recalibration that said "stop competing for PR queue spots, build in uncrowded space." Within 6 hours of the recalibration, a real public artifact landed. Pattern confirmed.

### 2026-05-17 — fixture-lineage v0 public release (training-data-quality, 3rd / THESIS CLOSED)

- **Repo**: https://github.com/uppulaharshith2-rgb/fixture-lineage (MIT)
- **Stats**: 32 files, 2575 LOC (1500 src + 1075 test + 356-line README), **64 tests passing in 0.09s**, CI matrix on Python 3.10/3.11/3.12
- **Pitch**: Chain-of-custody for LLM eval fixtures. Ed25519-signed manifest tying every fixture to its source trace, redaction pipeline output, consent policy reference, and parent fixture hash. Append-only JSONL store, git-mergeable, independently verifiable. Tamper-test included.
- **Thesis-closing moment**: Training-data-quality thesis now CLOSED at 3 (llm-expectations + corpus-snapshot + fixture-lineage = ~197 combined tests). Mirrors governance-suite-closes-at-4 discipline. **Two theses, 7 v0s, 7 documented honest design trade-offs, ~430 combined tests across 9 public OSS repos in 6 days.**
- **Honest design trade-off #7**: keys-on-disk in v0 with loud README warning + `Signer` boundary structured for future KMS/HSM plug-in. Same dev-surface-first pattern cosign + sops followed early. Interactive password prompt would block the 30-second example flow; stub KmsSigner alongside disk would violate the no-stubs-in-shipped-code rule.
- **Post-push verification gate now battle-tested 4-for-4**. Caught one silent-no-push (prompt-lineage), held clean across llm-expectations + corpus-snapshot + fixture-lineage. Will codify as mandatory in every future impl-agent brief.

### 2026-05-17 — corpus-snapshot v0 public release (training-data-quality, 2nd repo)

- **Repo**: https://github.com/uppulaharshith2-rgb/corpus-snapshot (MIT)
- **Stats**: 24 files, 1964 LOC (1031 src + 687 tests + 246-line README), **55 tests passing in 0.10s**
- **Pitch**: `git status` for your RAG corpus. Content-addresses source documents into `.corpus-snapshot/state.json`; diffs two snapshots into markdown / JSON of added / removed / modified chunks with preview-diff fragments.
- **Honest design trade-off (6th in 6 days)**: markdown chunker caps splits at H1/H2 (not H1-H6) for chunk-id stability under copy edits — same shape as `git diff` ignoring whitespace by default. Lower granularity in exchange for less noise on cosmetic changes.
- **Composes end-to-end with llm-expectations**: `corpus-snapshot diff v1 v2 --json | jq '.modified[].path'` → list of changed files → `llm-expectations check` for surgical validation. Two repos, one workflow demonstrated.
- **Post-push gh-repo-view verification ran for the third repo in a row** (after prompt-lineage which silently failed, then llm-expectations which passed cleanly, now corpus-snapshot which also passed). Gate is now battle-tested.
- **Suite progress**: training-data-quality thesis is now 2-of-3 public. fixture-lineage (incumbency-confirmed BUILD/narrow) is queued for iteration #12, then thesis closes at 3 mirroring the governance-suite-closes-at-4 discipline.

### 2026-05-17 — llm-expectations v0 public release (NEW THESIS, 1st repo)

- **Repo**: https://github.com/uppulaharshith2-rgb/llm-expectations (MIT)
- **Stats**: 25 files, ~2,591 LOC (1,669 src + 922 tests + 223-line README), **78 tests passing in 0.15s**
- **Pitch**: `dbt-test` for your `finetune.jsonl`. Declarative YAML data quality checks for LLM training files. 9 expectation types: schema, type, required, in-set, distribution, duplicates, PII (regex), token-count (char/4 approx), language-detect.
- **New thesis opened**: training-data quality (Great Expectations port). Sister to the governance suite for prompts, same DE-mental-model-port shape, different un-saturated niche. corpus-snapshot ("git status for your RAG corpus") is incumbency-confirmed and queued as repo #2.
- **Honest design trade-off — PII output doesn't itself leak PII**: matched values are masked (`j***@example.com`, `***66`) before they hit terminal or JSON output. The report is safe to paste in Slack / CI / email. This is the v0 analog of dbt-eval's faithful-scoring, prompt-contracts' coerce-counter, prompt-freshness' binary-alias-check, prompt-lineage's body-string heuristic — five v0 releases in one week, five honest design trade-offs documented.
- **Iteration #9 lesson applied successfully**: brief explicitly required a post-push `gh repo view` verification step. Agent ran it, pasted the output in the final report ("name: uppulaharshith2-rgb/llm-expectations… default_branch=main, html_url=…"), and confirmed the silent-no-push failure mode (which broke prompt-lineage's flow) did not recur. The lesson held.

### 2026-05-17 — prompt-lineage v0 public release (4th / SUITE CLOSED)

- **Repo**: https://github.com/uppulaharshith2-rgb/prompt-lineage (MIT)
- **Stats**: 30 files, **78 tests passing in 0.93s** (largest test count in the governance suite)
- **Pitch**: dbt-docs for prompts. Walks the project, parses prompts.yml + dbt-eval YAMLs + `@prompt_contract` decorator usage + prompt-freshness state, emits `lineage.json` + a static HTML site (dbt-docs aesthetic, vanilla JS for sort/filter, no framework). `diff main..HEAD` subcommand subsumes the queued golden-diff Marketplace Action.
- **Suite-closing moment**: governance suite is now **4 of 4 public, 231 combined passing tests**: dbt-eval (41) + prompt-contracts (55) + prompt-freshness (57) + prompt-lineage (78). Before dbt-docs, dbt was a CLI; after dbt-docs, dbt was a platform. Same move here.
- **v0-discipline notes**: schema-first — `lineage.json` is the part that locks in, HTML rendering is in the deferred-engine bucket (v0.2 adds the force-directed graph + dbt-style column lineage). Scanner is grep-based for decorator detection (AST is v0.2 polish). Same honest-trade-off pattern as the prior three suite members.
- **Loop note worth recording**: the impl agent built the full v0 locally (30 files, 78 passing tests, rendered HTML site) but never completed the git init + commit + push workflow. I completed those steps myself (90s recovery, no quality compromise). Implication for future impl-agent briefs: explicitly check the agent's git state in the post-flight, not just the local build artifact.

### 2026-05-17 — OSS_COMMENT on modelcontextprotocol/python-sdk #2040 (first comment-pattern shipment)

- **Comment**: https://github.com/modelcontextprotocol/python-sdk/pull/2040#issuecomment-4469902482
- **Observation**: the new `closefd=False` cleanup path isn't shielded against anyio cancellation, so `TextIOWrapper`s leak on cancelled scopes and trigger `ResourceWarning` on GC — defeating the cleanup the change was meant to enable
- **Technical fact**: cited `_core/_fileio.py:116-117` showing `to_thread.run_sync` checks the cancel scope before scheduling; the new regression test (`test_1933_stdio_close.py`) only exercises happy-path EOF, not cancellation mid-write
- **Proposed fix**: `anyio.CancelScope(shield=True)` around the two `aclose` calls + a cancellation-mid-iteration test; offered to draft the test
- **Strategic shape**: First concrete shipment of the OSS_COMMENT action type the recalibration named. Filed on a saturated-PR-queue issue (7+ open PRs for #1933) where filing an 8th PR would be spam — but maintainer @maxisbey sees the GitHub handle from a substantive technical comment instead

### 2026-05-17 — prompt-freshness v0 public release (3rd / SUITE COMPLETE)

- **Repo**: https://github.com/uppulaharshith2-rgb/prompt-freshness (MIT)
- **Stats**: 24 files, ~2,110 LOC, **57 tests passing in 0.10s, CI green on Python 3.10 / 3.11 / 3.12**
- **Pitch**: `dbt source freshness` for prompt templates. Per-(prompt, model) staleness — re-eval only counts against the *current* model alias, so a `claude-sonnet-4-6 → 4-7` bump flips evaluations to STALE with an explicit drift reason even when wall-clock time is short. dbt-eval integration shipped end-to-end (not stubbed).
- **Suite-complete moment**: governance suite is now 3-of-3 public. **dbt-eval + prompt-contracts + prompt-freshness = 153 combined passing tests** across three coherent v0 releases in a single 24-hour window. The "I'm building the dbt-style governance suite for prompts" pitch now has three live links.
- **v0-discipline notes**: no git-aware staleness in v0 (a real git dep + ambiguous "is this a meaningful prompt edit or just reformatting" semantics); listed v0.5. Model-alias check is binary, not semantic — the user owns the alias string by design rather than a normalizer that would be subtly wrong in both directions. Same honest-trade-off pattern as dbt-eval's faithful-scoring + prompt-contracts' coerce-counter.

### 2026-05-17 — prompt-contracts v0 public release (2nd governance-suite member)

- **Repo**: https://github.com/uppulaharshith2-rgb/prompt-contracts (MIT)
- **Stats**: 19 files, ~1,470 LOC, **55 tests passing in 0.23s**, working quickstart (3 inputs → 2 passed including 1 via coerce, 1 quarantined)
- **Pitch**: Companion to dbt-eval. Runtime contract enforcement for LLM JSON outputs. `@prompt_contract` decorator with raise/drop/quarantine modes + best-effort coerce + per-function `.contract_stats`.
- **Suite progress**: governance suite now has 2 of 3 public members. `dbt-eval` (dev-time eval) + `prompt-contracts` (runtime enforcement) + `prompt-freshness` (queued, source-freshness for prompts). The "I'm building the dbt-style governance suite for prompts" pitch now has TWO live links instead of one.
- **Honest scope discipline noted in PR/README**: SQL quarantine adapter deferred to v0.2 as a Protocol-only stub (clean drop-in, no refactor required). Coerce mode tracked via separate `coerced` counter so coercions don't silently hide violations from dashboards.

### 2026-05-17 — litellm Databricks Opus 4.7 temperature follow-up

- **PR**: https://github.com/BerriAI/litellm/pull/28115 (status: open)
- **Stats**: 4 files, +294/-1, 9 new tests, 81 existing tests still green (13 skipped, credential-gated)
- **Issue**: BerriAI/litellm#26444 (the same issue #28113 addressed for the Anthropic + Bedrock adapters; @Kontinuation noted the Databricks gap in a comment)
- **Approach**: mirrored #28113 exactly — helper-based filter on the Opus 4.7 family, defense-in-depth guard in `map_openai_params`, new `databricks-claude-opus-4-7` JSON entry with `supports_temperature: false` / `supports_top_p: false` in both the main and backup files to satisfy `check_files_match.py`. Pricing placeholder honestly flagged in `metadata.notes` and the PR body.
- **Pattern**: the **"extension of shipped work"** move the recalibration named — rather than chasing fresh-issue PR queue spots (duplicate-saturated), extend already-shipped fixes into adjacent provider adapters where the work is almost certainly unclaimed. Same author identity, two PRs that compose, one coherent story for a hiring panel.
- **Fork reuse**: same `~/Documents/oss-prs/litellm` fork from #28113, fresh branch off `upstream/main`.

## Skipped — duplicate work avoided

### 2026-05-17 — anthropics/claude-agent-sdk-python #899 (list-form system_prompt)
- **Skipped because**: two viable PRs already open: [#900 by zion-off](https://github.com/anthropics/claude-agent-sdk-python/pull/900) (104 lines, transport+types+tests, most thorough) and [#947 by zuhabul](https://github.com/anthropics/claude-agent-sdk-python/pull/947) (22 lines, transport-only). Both use the JSON-temp-file approach.
- **Higher-value alternative**: file a thoughtful technical comment on #900 (e.g., does it handle the argv-limit edge case? does cleanup-on-error cover SIGKILL?) — gets the GitHub handle in front of the same maintainer-reviewer pair without adding duplicate-PR noise. Queued as `OSS_COMMENT`.

### 2026-05-17 — modelcontextprotocol/python-sdk #1933 (stdio fd leak)
- **Skipped because**: **seven** open PRs already address this — #2040 (most advanced, maintainer-reviewed by @maxisbey, author applied requested change), plus #2391, #2505, #2528, #2538, #2568. Three more closed (#2244, #2172, #2142) used `os.dup()` and were rejected.
- **Critical lesson captured**: maintainer @maxisbey explicitly prefers `open(sys.stdin.fileno(), "rb", closefd=False)` over `os.dup()` because there's no fd to clean up. Pattern lives in PR review comments, not in the diffs themselves. Future OSS_PR ticks should read closed-PR review comments to extract maintainer preferences.
- **Higher-value alternative**: comment on #2040 once it rebases — small technical observation gets visibility.

### 2026-05-17 — BerriAI/litellm #28067 (Anthropic streaming KeyError)
- **Skipped because**: two PRs filed yesterday by other contributors — [#28068](https://github.com/BerriAI/litellm/pull/28068) (+33/-1, under Copilot review) and [#28069](https://github.com/BerriAI/litellm/pull/28069) (+26/-1, uses exact `.get("text", "")` shape, regression test included). Both pre-date my impl-agent dispatch by a day.
- **Higher-value alternative**: tool_use content-block hardening (the broader generalization #28069 didn't cover) — if both upstream PRs stall, revisit with that wider scope.

## Strategic recalibration (2026-05-17)

After 1 PR successfully landed and 3 correctly abandoned as duplicates, the picture is clear: **easy first-PR targets in popular Anthropic-ecosystem repos are mostly claimed within hours of issue filing**. Maintainer review bandwidth is the bottleneck, not contributor supply. New strategy:

1. **Build new OSS, don't compete for PR queue spots.** Ship `dbt-eval` (Tier 1 BUILD_SKILL item) as a new public repo — uncrowded space, full ownership, becomes its own portfolio anchor + blog post + future Claude skill.
2. **Databricks follow-up to litellm #28113** — natural extension of the work already shipped, almost certainly unclaimed, leverages prior context. Quick win.
3. **Thoughtful technical comments on the open PRs** above (`OSS_COMMENT` action type) — same maintainer eyeballs without PR queue noise.
4. **Less-trafficked repos with real bugs**: Anthropic-adjacent but not first-party — `langchain-anthropic`, `BerriAI/litellm` cost-tracking issues, MCP servers other than the reference SDK.

Don't add new Tier 1 `OSS_PR` items targeting big-name Anthropic-org repos without pre-checking the open-PR queue first. Confirmation rule: `gh pr list --state open --search "<issue keyword>"` returns ≤ 0 open PRs.
