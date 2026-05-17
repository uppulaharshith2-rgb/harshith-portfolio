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
- **`.forge/` lives in the repo, not the vault.** Remote agents can't reach local paths. Canonical queue state in the repo means both local and remote ticks share it.

### Iteration #1 (2026-05-17) — research + implement loop kicked off

Parallel research agents (oss-targets, portfolio-polish, new-builds) → impl agent shipped a quality litellm PR while I shipped auto-stream + metadata + favicon locally.

- **Read prior failed PRs before opening yours.** The litellm impl agent read 2 previously-closed PRs (#26445, #26246) targeting the same bug before writing a single line. #26445 was rejected for over-stripping (treated all reasoning-family models when the deprecation is Opus-4.7-only); #26246 was rejected for over-engineering (256-line TypedDict rewrite when a small filter would do). The new PR (#28113) is tight, scoped to Opus 4.7, and uses the existing helper rather than rewriting plumbing. **Outcome**: PR posted with 976 tests still green and 21 new tests. Without that 10-minute prior-PR review, this would have been the third rejected attempt.
- **Auto-stream is the killer landing move for chat-first portfolios.** A chat landing that doesn't demo itself within 4 seconds reads as static to a 30-second scanner. Adding the 1.6s `setTimeout` → `send("What have you shipped this year?")` with sessionStorage guard turns the page into a self-demonstrating product — the visitor sees Claude streaming an answer with 3 embedded project cards before they touch the keyboard.
- **Defense-in-depth in OSS fixes signals seniority.** The litellm PR didn't just fix `get_supported_openai_params` — it also added guards in `map_openai_params` and set JSON-level flags. Maintainers read multi-layer fixes as "this person understands production failure modes," not "this person changed one line."
- **A `/oss` page is the artifact a hiring manager actually wants.** Embedding contributions in the chat is good; a dedicated public ledger with diff stats / test counts / "why it matters" paragraphs is what gets screenshot and pasted into recruiter Slack channels. Build this BEFORE filing the second OSS PR so each new PR auto-shows up on a credible page.

### Iteration #10 closure — new thesis opens, post-push verification gate works

llm-expectations v0 shipped clean: 78 tests, post-push `gh repo view` verification ran successfully (iteration #9 lesson held — agent pasted the output in its final report, no silent-no-push regression).

- **Lesson: the post-push gh-repo-view verification gate is now standard.** Add to every impl-agent brief that produces a public OSS repo. The iteration #9 silent-no-push failure (prompt-lineage built locally but never pushed) did not recur in iteration #10, suggesting the gate works as designed. Keep it.
- **Lesson: five v0s, five honest design trade-offs documented.** dbt-eval (faithful-mock scoring), prompt-contracts (coerce-counter), prompt-freshness (binary model-alias check), prompt-lineage (body-string heuristic for contract→prompt linkage), llm-expectations (mask PII in PII reports). Each agent shipped one specific honest constraint in the v0 README that turned an obvious-feature-cut into a documented engineering decision. The pattern is reproducible — make "name one unexpected design trade-off" a required field in every impl-agent's final report.
- **Lesson: the second thesis opens cleanly after the first closes.** Closing the governance suite at 4 (not 5) and immediately pivoting to a new coherent thesis (training-data quality) preserved narrative momentum. The /about bullet now lists "four repos, governance suite closed" + "new thesis, llm-expectations + corpus-snapshot incoming" — two coherent stories side by side, instead of seven scattered repos.

### Iteration #10 (2026-05-17) — incumbency-check pattern compounds, OSS landscape audit ships

By iteration #10, the 30-min incumbency check before every Tier 1 BUILD_SKILL is no longer an experimental discipline — it's a hard rule with three concrete examples backing it:

- **iteration #5 check**: Lilac dead via Databricks acquisition (March 2024); Argilla in HF maintenance (original authors moved on); Cleanlab adjacent (Python-imperative + ML-label classical, not declarative-YAML-LLM)
- **iteration #9 check**: confirmed the same findings against fresh 2026 data; flagged Astronomer's first-party Apache-2.0 Data Agents shipping in Q1 2026 (kills the queued airflow-claude-operator)
- **iteration #10 check**: corpus-snapshot niche genuinely un-saturated; Datafold data-diff is SQL-only, no vector-store-diff tools on PyPI, LangChain/LlamaIndex don't ship corpus-diff, observability tools (Langfuse/Phoenix/Helicone/TruLens) are trace-level not corpus-level

Three lessons compounding from this pattern:
- **Lesson: name the wedge in one sentence before committing to a build.** "git status for your RAG corpus" is the corpus-snapshot wedge. "dbt-test for your finetune.jsonl" is the llm-expectations wedge. "dbt-docs for prompts" was prompt-lineage's. A one-sentence wedge that ports a known mental model is the differentiator vs the dozen unfocused tools competing in adjacent space.
- **Lesson: hot OSS LLM tools have a predictable ~12-month acquisition timeline.** Lilac and Argilla both went hot-project → acquired → public-repo-slows → effectively-dead inside a year. Don't build on top of a thriving OSS LLM project without a structural fallback. Don't compete with one unless your structural advantage is durable (un-saturated niche, stable schema).
- **Lesson: the audit + recalibration cycle is the highest-leverage process I've adopted.** A 30-min incumbency check before a 4-12h build is a 5% time tax that saved committing to 2 of 3 originally-planned next-thesis repos last week. The OSS landscape audit post (/blog/oss-llm-tooling-landscape-audit-may-2026) is the artifact that distills these into a single-read reference for any data engineer doing similar planning.

### Iteration #9 (2026-05-17) — suite CLOSED at 4 + agent-post-flight gap

The 4th and final governance-suite member shipped: prompt-lineage v0 with 78 passing tests (largest in the suite). Governance suite total now **231 combined passing tests across 4 coherent v0 releases in one weekend**.

- **Lesson: a navigation surface is what retroactively makes a collection of CLIs feel like a platform.** Before dbt-docs, dbt was a command-line tool that compiled SQL. After dbt-docs, dbt was the modern data stack. The CLIs hadn't changed; the navigation surface had. prompt-lineage is that same move applied to the prompt-governance suite — the 3 prior repos didn't get more capable when prompt-lineage shipped, they got more *legible* to a stranger.
- **Lesson: the suite closes at 4, not 5.** The research agent that recommended prompt-lineage explicitly said "stop at 4 — adding a fifth would dilute the story without filling a missing capability." That discipline preserved is the difference between a coherent platform pitch and "I just kept building."
- **Lesson: incumbency check before BUILD_SKILL is now standard.** Iteration #10's thesis (Great Expectations for LLM training data) ran a 30-min sweep across cleanlab / lilac / argilla / GE / MLflow / DeepChecks BEFORE the build agent dispatched. Verdict: BUILD but narrow to llm-expectations only (Lilac is dead via Databricks acquisition; Argilla is in HF maintenance; nobody owns the JSONL+YAML+CI niche). The 30 minutes the check cost saved committing to 2 of 3 planned repos that would have overlapped with adjacent incumbents. Adopt as a hard rule for every future Tier 1 build proposal.
- **Lesson: impl-agent post-flight needs an explicit git-state check.** The prompt-lineage impl agent built the full v0 locally (30 files, 78 passing tests, rendered HTML output) but never completed the git init → commit → `gh repo create --push` workflow. The agent's auto-notification fired anyway. I caught it by checking `gh repo view <expected-name>` returned 404 while the local dir existed. Recovery was 90 seconds (`git init` + commit + push), but the failure mode is silent — without the post-flight check the work would have stayed local indefinitely. Fix the impl-agent brief template to require a post-push `gh repo view` confirmation step in the report.

### Iteration #7 (2026-05-17) — suite-complete moment, 153 tests across 24h

Three governance-suite v0s shipped inside a single 24-hour window: dbt-eval (41 tests) + prompt-contracts (55 tests) + prompt-freshness (57 tests). 153 combined passing tests across three public Python packages that cite each other in their READMEs. The "I'm building the dbt-style governance suite for prompts" pitch went from one shipped artifact + a roadmap to *three shipped artifacts*.

- **Lesson: a coherent thesis is the multiplier on individual shipments.** Three repos shipping in the same week without a thesis = three scattered tools. Three repos shipping with one thesis = "this person sees ahead." The work is the same; the framing is what compounds in a recruiter scan.
- **Lesson: v0-discipline scales.** The same "ship the surface, defer the engine, name it in the roadmap honestly" pattern produced clean v0s across three different domains (eval, runtime enforcement, staleness). Each agent named one intentional scope cut + one honest design trade-off + roadmap items. The discipline transferred without needing per-repo customization.
- **Lesson: the third repo is when the suite becomes the artifact.** Two of three governance-suite members was "promising start"; three is "suite-complete." There's a non-linear narrative gain at the third repo that the second doesn't unlock. Implication: when shipping coherent multi-repo initiatives, the third release matters disproportionately — don't stop at two.
- **Lesson: surfaces auto-grow when collections are first-class data.** The /projects collection banner I shipped during iteration #7 was coded `PROJECTS.filter(p => p.collection === "governance-suite")` so when prompt-freshness was added to lib/projects.ts with `collection: "governance-suite"`, the banner went from 2 rows to 3 rows automatically. The /oss page's grouped sections did the same. Designing surfaces around the *collection* abstraction, not the *count*, means suite-completion ships with one PR instead of three.
- **Lesson: cross-citation in READMEs matters.** Each of the three repos' READMEs has a "the suite" section that names the other two with cross-links. This converts "stranger lands on dbt-eval" into "stranger discovers prompt-contracts + prompt-freshness within 30 seconds." Repo-level SEO + narrative coherence in one pattern.

### Iteration #6 toolchain gotcha — bash pipe swallows build exit code

The `bun run build 2>&1 | tail -4 && git commit ... && git push` chain ran the commit and push EVEN WHEN THE BUILD FAILED, because `tail` always exits 0 regardless of upstream. Result: a broken commit (078f02d) landed in git and the deploy failed remotely.

- **Lesson: never put a pipe between build and the commit/push chain.** Use either `bun run build && ...` with no pipe, or check `${PIPESTATUS[0]}` explicitly after the pipe.
- **Lesson: catch this with a pre-commit check.** Future ticks should run `bun run build` standalone, look at the exit code, THEN commit — not chain it through a pipe to tail.
- **Recovery cost was 90 seconds**: build → fail → fix backtick escape on one line → rebuild → commit → push → redeploy. Easy because each commit is atomic and the source of truth (the actual prompt-contracts shipment) was solid. Atomic commits saved this.

### Iteration #6 (2026-05-17) — extension PRs as the recalibration win

The OSS-landscape recalibration in iteration #3 named "extend already-shipped work" as a strategic alternative to chasing fresh-issue PR queue duplicates. Iteration #6 demonstrated it concretely: the Databricks follow-up PR to litellm #28113 became [#28115](https://github.com/BerriAI/litellm/pull/28115) — 4 files, +294/-1, 9 new tests, 81 existing still green, zero regressions.

- **Lesson: extension PRs are almost-always unclaimed.** Fresh issues attract 5-10 contributors within hours; an *adjacent provider adapter for an already-merged fix* attracts zero. The competitive surface is the fresh issue, not the follow-up. Same-author, same-shape, same-week follow-ups are also the *easiest* PRs for maintainers to review — they pattern-match instantly off the prior one.
- **Lesson: reuse the fork.** The impl agent reused `~/Documents/oss-prs/litellm` from #28113, branching fresh off `upstream/main` rather than re-forking. Saved 30 seconds of setup and avoided the "second fork from same identity" GitHub warning.
- **Lesson: flag pricing placeholders honestly.** When the Databricks Opus 4.7 JSON entry didn't exist, the agent priced it from `databricks-claude-opus-4-5` and explicitly flagged it as placeholder in both `metadata.notes` and the PR body. This converts "potential maintainer pushback" into "low-effort maintainer correction" — they edit a number, they don't bounce the PR.
- **Lesson: parallel impl + main-thread post writing is the right shape.** Iteration #6 ran the prompt-contracts impl agent in background, ran a portfolio polish/content research agent in parallel, AND wrote the SecondBrain Kit announcement post in the main thread. Three tracks completing concurrently is the throughput multiplier — but only because each track touches a different file set (impl agent: external repo at `~/Documents/prompt-contracts/`; research agent: read-only; main thread: `lib/posts.ts`). Non-overlapping work is the precondition for parallelism.

### Iteration #5 (2026-05-17) — coherent-suite framing > scattered tools

After dbt-eval v0 shipped, the iteration #5 research agent surfaced three NEW build candidates and (more importantly) noticed they form a **coherent three-repo governance suite** that extends dbt-eval rather than scattering attention across unrelated tools.

- **The framing flip:** "I built dbt-eval" is a single-artifact pitch. "I'm building the dbt-style governance suite for prompts (eval + contracts + diff + freshness)" is a *thesis* pitch that mirrors a mental model every analytics engineer already has. Three repos that tell one story beat seven repos that tell seven stories — for recruiter calls, blog posts, and SEO.
- **Lesson: research agents should ask "do these picks compose?" not just "are each high-leverage?"** The iteration #5 agent rejected the queued `airflow-claude-operator` (Astronomer just shipped Apache-2.0 first-party tooling for this) and replaced it with `prompt-contracts` / `golden-diff` / `prompt-freshness` — each individually 4-12h, all three pointing at the same un-saturated *governance* layer above existing eval frameworks. The composition is the moat.
- **Lesson: removed-from-queue items deserve explicit notes.** Adding `~~strikethrough~~ + reason` to the queue (e.g., "Airflow Claude operator → Astronomer shipped first-party") is cheaper than silently dropping items. Future research agents reading the queue learn what the loop has explicitly chosen NOT to do, and why — same compound-learning pattern as the OSS abandonment log.
- **Lesson: external-incumbency check belongs in every BUILD_SKILL research.** A 2-minute "has $vendor shipped this?" sweep saves 8-10 hours of building something already eaten by a first-party tool. Add to the research agent persona as a hard rule.

### Iteration #4 (2026-05-17) — first OSS BUILD post-recalibration

After three OSS_PR ticks correctly abandoned in iteration #3, pivoted to *building* in uncrowded space. dbt-eval v0 shipped within 6 hours of the recalibration decision. Lessons:

- **Ship the API surface before the engine.** The dbt-eval v0 example uses the `expected` block as the model's "output" instead of calling a real LLM — deliberately. The YAML schema is the part adopters lock in on; if the schema is wrong, every line of runtime is wasted. v0.2 swaps one function (`EvalCase.output()`) from `return stub` to `call model`. Half the package is reusable across runtime variants.
- **Naming the unbuilt is part of v0.** The README's 8-assertion roadmap (cosine_similarity, tool_call_shape, latency_p95, cost_per_call, no_pii, factual_consistency_v2, length_constraint, accepted_values) does as much work as the 3 shipped assertions. Adopters see the destination, which signals taste and reduces FUD about a v0 release.
- **Mock-judge scoring needs a real reasoning model.** First pass of `faithful` used naive Jaccard, gave 0.43 / 0.45 on aligned cases — both below threshold. Switched to `0.5 * coverage + 0.5 * jaccard` which rewards short focused rationales that quote the input. This is also closer to how a real LLM judge thinks, so the mock teaches the right pattern.
- **Build agents need explicit anti-scope rules.** The agent's brief named the THREE assertions and ONE example for v0; the agent shipped exactly that with a 1,229-LOC overrun honestly reported and justified ("the extra is mostly assertion config validation and the two output formats; trimming would mean shipping silent failures"). Explicit scope produces trustworthy overruns; vague scope produces silent scope creep.
- **Strategic recalibration → first artifact in hours, not weeks.** Iteration #3 ended with a written "stop chasing PR queue duplicates, build in uncrowded space" decision. Iteration #4 produced dbt-eval — a real public OSS package with passing tests. The recalibration → execution cycle should always be this fast; if a written strategy doesn't produce a shipped artifact inside a session, the strategy is probably wrong.

### Iteration #2 (2026-05-17) — duplicate-PR discipline + production deploy gotcha

- **Vercel git auto-deploy is NOT wired on this project.** Every push to `main` requires a manual `vercel --prod` from the repo root to actually go live. The polish-v2 research agent caught this when it hit production `/oss` and got a 404 while local code was correct — Vercel still showed the 46-min-old initial deployment because no auto-deploy hook fired. Until git integration is wired (queued as Tier 2 ADD_FEATURE), the impl agent / forge tick MUST run `vercel --prod` after every push.
- **Always `gh pr list --state open --search "<keyword>"` BEFORE forking.** Two consecutive impl agents (claude-agent-sdk-python #899, MCP python-sdk #1933) correctly abandoned because the target issues each had 2+ and 7+ open PRs respectively. The 30-second check is the difference between a candidacy-grade contribution and spam.
- **Read PR REVIEWS, not just PR diffs, to learn maintainer preference.** On MCP #1933, the maintainer (@maxisbey) explicitly preferred `open(sys.stdin.fileno(), "rb", closefd=False)` over `os.dup()` because the former has no fd to clean up. Three closed PRs used `os.dup()` and were not merged — the pattern lives in PR review comments, not in the diffs. Future OSS_PR ticks should `gh pr view <closed-PR> --comments` to extract maintainer preferences before writing code.
- **Falsifiable claims beat adjectives, every time.** "Practitioner credibility" / "Velocity" / "AI-native operating model" read as table stakes to a hiring panel. "Filed a 6-file +346/−0 PR to litellm with 21 new tests and zero regressions across 976 existing — [PR #28113](url)" reads as a specification a stranger can verify. Replaced the entire `/about` "What makes me different" section with linked, checkable claims.
- **Project taglines are 8-second elevator pitches.** "Curated registry of Claude tools for data teams" tells you nothing concrete. "181 hand-curated Claude resources across 8 types. AI search via Haiku. Three full UI iterations in one session." gives a stranger four falsifiable facts in one line. Rewrote all 5 project taglines on this principle.

### Operating principles (refined this iteration)

- **Atomic ticks.** One action → one commit → one push. Bundling hides what compounded vs noise.
- **Source from the vault and the repo before the web.** Most material exists; rewriting is faster and more accurate than searching.
- **Build green before commit.** Red builds are worse than no tick.
- **Push + deploy.** `git push` is NOT sufficient — run `vercel --prod` after every push until git integration is wired.
- **Pre-check duplicates.** `gh pr list --state open --search "<keyword>"` BEFORE any OSS fork. Read closed prior PRs' REVIEW comments, not just diffs.
- **Quality bar: Anthropic / OpenAI hiring panel.** If the diff is sloppy, the tests are weak, or the prose has marketing fluff, downgrade or abandon — never ship low quality.
- **Falsifiable claims, never adjectives.** Every line on the portfolio should be checkable in 30 seconds.
