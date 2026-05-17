export type Contribution = {
  slug: string;
  kind: "pr" | "repo" | "skill" | "issue" | "comment";
  title: string;
  repo: string; // e.g. "BerriAI/litellm"
  url: string;
  date: string; // ISO YYYY-MM-DD
  status: "open" | "merged" | "closed" | "draft" | "published" | "filed";
  summary: string; // one-paragraph, technical, no marketing fluff
  stats?: {
    additions?: number;
    deletions?: number;
    files?: number;
    tests?: number;
  };
  highlights: string[];
  whyItMatters: string;
  tags: string[];
  collection?: "governance-suite" | "orchestration" | "upstream-prs" | "vault";
};

export const COLLECTION_LABELS: Record<NonNullable<Contribution["collection"]>, { label: string; tagline: string }> = {
  "governance-suite": {
    label: "dbt-style governance suite for prompts",
    tagline: "Eval + contracts + diff + freshness. The thesis: port the dbt mental model to LLM outputs.",
  },
  orchestration: {
    label: "Multi-agent orchestration",
    tagline: "Tools for running Claude Code as a team.",
  },
  "upstream-prs": {
    label: "Upstream contributions",
    tagline: "PRs and technical reviews on repos I depend on.",
  },
  vault: {
    label: "Personal knowledge tooling",
    tagline: "PARA + Claude skills + the operating manual that makes a vault compound.",
  },
};

export const CONTRIBUTIONS: Contribution[] = [
  {
    slug: "mcp-python-sdk-2040-comment",
    kind: "comment",
    title: "Technical review on modelcontextprotocol/python-sdk #2040 (stdio fd cleanup)",
    repo: "modelcontextprotocol/python-sdk",
    url: "https://github.com/modelcontextprotocol/python-sdk/pull/2040#issuecomment-4469902482",
    date: "2026-05-17",
    status: "filed",
    summary:
      "Filed a technical observation on the most-advanced PR (#2040) for the stdio-transport fd-leak issue (#1933, 7+ open PRs). The new `closefd=False` cleanup path isn't shielded against anyio cancellation, so on a cancelled surrounding scope the `TextIOWrapper`s leak and trigger `ResourceWarning` on GC — defeating the cleanup the change was meant to enable. The comment suggests `anyio.CancelScope(shield=True)` around the two `aclose` calls and proposes a cancellation-mid-iteration test the existing regression test doesn't cover. Low-stakes offer to draft the test attached.",
    highlights: [
      "Cites the specific anyio source line (`_core/_fileio.py:116-117`) that proves `to_thread.run_sync` checks the cancel scope before scheduling",
      "Identifies the exact edge case the new regression test (`test_1933_stdio_close.py`) misses — happy-path EOF only, no cancellation mid-write",
      "Proposes a concrete fix (`anyio.CancelScope(shield=True)`) with a specific test path, not vague feedback",
      "Forge loop's OSS_COMMENT pattern in action — same maintainer eyeballs as a PR, without adding an 8th duplicate-PR to a 7-PR queue",
    ],
    whyItMatters:
      "Strategic move from the OSS-landscape recalibration: when a PR queue is saturated and you have a real technical observation, comment carefully on an existing open PR. Maintainer @maxisbey is the same person reviewing future MCP submissions; surfacing the GitHub handle here via substantive technical contribution is the lower-risk version of filing a duplicate PR. The asymmetry is favorable — a good comment costs 30 minutes of careful reading and produces a long tail of maintainer recognition.",
    tags: ["mcp", "anyio", "code-review", "oss-comment-pattern", "first-party-anthropic"],
    collection: "upstream-prs",
  },
  {
    slug: "litellm-28115",
    kind: "pr",
    title: "fix(databricks): drop unsupported temperature param for Claude Opus 4.7",
    repo: "BerriAI/litellm",
    url: "https://github.com/BerriAI/litellm/pull/28115",
    date: "2026-05-17",
    status: "open",
    summary:
      "Companion to PR #28113. Same root cause — Anthropic's Messages API rejects `temperature` for Claude Opus 4.7 — applied to the Databricks adapter (`DatabricksConfig`). Mirrors the #28113 pattern exactly: helper-based filter on the canonical / dated / vendor-prefixed Opus 4.7 family, defense-in-depth guard in `map_openai_params`, and `supports_temperature: false` / `supports_top_p: false` flags on a new `databricks-claude-opus-4-7` entry in both `model_prices_and_context_window.json` and the backup file (satisfying `ci_cd/check_files_match.py`). Surfaces a pricing placeholder honestly in the PR body inviting maintainer correction. Reported by @Kontinuation in the original issue thread (#26444).",
    stats: { additions: 294, deletions: 1, files: 4, tests: 9 },
    highlights: [
      "Mirrors the #28113 pattern exactly so maintainers can review side-by-side without context switching",
      "9 new unit tests covering canonical / dated / vendor-prefixed Opus 4.7, family fallback for unreleased snapshots, defense-in-depth `map_openai_params(drop_params=False)`, and end-to-end shape via `litellm.get_supported_openai_params`",
      "81 existing tests passed in `tests/test_litellm/llms/databricks` (13 skipped, credential-gated), zero regressions",
      "Added new `databricks/databricks-claude-opus-4-7` JSON entry (didn't exist on main); priced from `databricks-claude-opus-4-5` and flagged as placeholder in `metadata.notes` so maintainers can correct",
      "Reused the existing fork from #28113 — fresh branch off `upstream/main`, no force-pushes, clean diff",
    ],
    whyItMatters:
      "Two PRs to the same 47k-star repo in the same week from the same identity, mirroring each other in shape. This is the 'extension of shipped work' move the OSS-landscape recalibration named: rather than competing for fresh-issue PR queue spots (the duplicate-saturated bucket), extend an already-shipped fix into adjacent provider adapters where the work is almost certainly unclaimed. Two PRs that compose tell a stronger candidacy story than two PRs that don't.",
    tags: ["anthropic", "databricks", "litellm", "model-router", "follow-up", "bug-fix"],
    collection: "upstream-prs",
  },
  {
    slug: "litellm-28113",
    kind: "pr",
    title: "fix(anthropic): drop unsupported temperature param for Claude Opus 4.7",
    repo: "BerriAI/litellm",
    url: "https://github.com/BerriAI/litellm/pull/28113",
    date: "2026-05-17",
    status: "open",
    summary:
      "Anthropic's Messages API rejects `temperature` for Claude Opus 4.7 (it accepts only `top_p` for sampling control). litellm was still listing `temperature` in the supported-params response, so `drop_params=True` silently failed and end users hit hard API errors. This PR filters the param out at the family level, mirrors the fix into the Bedrock Converse adapter, sets `supports_temperature: false` / `supports_top_p: false` on 10 Opus 4.7 model entries (Anthropic direct + 5 Bedrock variants + Azure AI + 2 Vertex AI), and adds defense-in-depth guards in `map_openai_params`.",
    stats: { additions: 346, deletions: 0, files: 6, tests: 21 },
    highlights: [
      "Read the two prior closed PRs (#26445, #26246) before opening this one — #26445 over-stripped (treated all reasoning-family models), #26246 had right gating but bloated 256 lines with a TypedDict rewrite",
      "Scoped strictly to the Opus 4.7 family, matching Anthropic's migration docs — Sonnet 4.6 / Haiku 4.5 / Opus 4.6 / 3.5 / 3.7 untouched and regression-tested",
      "13 new unit tests on Anthropic transformation (parametrized supported-params, family-fallback, regression matrix, end-to-end drop_params shape) + 8 on Bedrock Converse",
      "976 existing tests still pass, zero regressions",
      "Documented 3 concrete maintainer pushback points proactively in the PR body (backup-file drift, JSON-flag vs static-fallback rationale, Databricks follow-up)",
    ],
    whyItMatters:
      "litellm is the de-facto OSS router for LLM apps (47k stars, multiple new external PRs merged daily). This bug bricks `drop_params=True` for anyone routing through Opus 4.7 — the model I personally use most. The PR is small in spirit (one config bug) but the diff demonstrates the production rigor maintainers actually want: read prior attempts, scope tightly, regression-test the matrix, anticipate pushback.",
    tags: ["anthropic", "litellm", "model-router", "first-party-claude", "bug-fix"],
    collection: "upstream-prs",
  },
  {
    slug: "prompt-lineage-v0",
    kind: "repo",
    title: "prompt-lineage — dbt-docs for prompts (v0, suite-closer)",
    repo: "uppulaharshith2-rgb/prompt-lineage",
    url: "https://github.com/uppulaharshith2-rgb/prompt-lineage",
    date: "2026-05-17",
    status: "published",
    summary:
      "The 4th and final member of the dbt-style governance suite for prompts. Walks a project directory and parses prompts.yml + dbt-eval suites + prompt-contracts decorator usage + prompt-freshness state into a structured lineage graph. CLI emits `lineage.json` (the schema that locks in — adopters parse this into CI dashboards and compliance audits) + a static HTML site in the dbt-docs aesthetic. Vanilla JS for sort/filter, no framework, opens in any browser. `prompt-lineage diff main..HEAD` subcommand subsumes most of the value of the queued golden-diff GitHub Marketplace Action — one repo does both navigation AND PR review.",
    stats: { additions: 0, files: 30, tests: 78 },
    highlights: [
      "78 tests passing in 0.93s — largest test count in the governance suite",
      "Schema-first v0 — `lineage.json` shape is locked, HTML rendering is in the deferred-engine bucket (v0.2 adds the force-directed graph)",
      "diff subcommand subsumes golden-diff — one repo does navigation + PR review, removes a queued item by absorbing its value",
      "Zero JS framework, vanilla <script> for sort/filter (≤100 lines inline), static HTML opens in any browser without a build step",
      "Closes the suite at 4 — the navigation surface that retroactively makes three CLIs feel like a platform",
    ],
    whyItMatters:
      "Before dbt-docs, dbt was a command-line tool that compiled SQL. After dbt-docs, dbt was a data platform. The CLIs hadn't changed — the navigation surface had. prompt-lineage is that same move for the governance suite: the day it shipped, the prior three repos stopped feeling like a collection of CLIs and started feeling like a platform. Suite-completing.",
    tags: ["dbt-docs", "lineage", "navigation", "python", "ai-data-engineering", "open-source-release", "suite-closer"],
    collection: "governance-suite",
  },
  {
    slug: "prompt-freshness-v0",
    kind: "repo",
    title: "prompt-freshness — `dbt source freshness` for prompts (v0)",
    repo: "uppulaharshith2-rgb/prompt-freshness",
    url: "https://github.com/uppulaharshith2-rgb/prompt-freshness",
    date: "2026-05-17",
    status: "published",
    summary:
      "New public Python package. Third and final member of the dbt-style governance suite for prompts. CLI reads a `prompts.yml` manifest with per-prompt `warn_after` / `error_after` thresholds, checks the last-evaluated timestamp against the *current* model alias declared in the manifest. The headline feature is model-alias drift detection: bumping `claude-sonnet-4-6 → claude-sonnet-4-7` in the manifest flips every prior evaluation to STALE with an explicit `model alias drifted:` reason, even if the wall-clock time hasn't elapsed. dbt-eval integration shipped end-to-end. GitHub Action workflow opens an issue when a prompt is stale.",
    stats: { additions: 2110, files: 24, tests: 57 },
    highlights: [
      "57 tests passing in 0.10s — CI green across Python 3.10 / 3.11 / 3.12 in the shipped GitHub Actions workflow",
      "Model-alias drift is the unique value over a naive 'X days ago' check — analytics engineers immediately get it from `dbt source freshness`",
      "dbt-eval integration is real, not stubbed — `mark-evaluated --suite ./examples/` parses dbt-eval YAML and updates state on passing runs",
      "Scope discipline: no git-aware staleness in v0 (a real git dependency + ambiguous 'is this a meaningful edit or just reformatting' semantics); listed v0.5",
      "Design trade-off: model-alias check is binary, not semantic — user owns the alias string by design rather than a normalizer that's subtly wrong in both directions",
    ],
    whyItMatters:
      "Third and final v0 in the suite. With this, the governance-suite story is complete: **dbt-eval** (declare what good output looks like) + **prompt-contracts** (enforce it at runtime) + **prompt-freshness** (keep both honest as models shift). Three repos that cite each other in their READMEs. Recruiter pitch fits in a single sentence and links to three shipped public artifacts with 153 combined passing tests.",
    tags: ["llm-governance", "dbt", "source-freshness", "python", "ai-data-engineering", "open-source-release"],
    collection: "governance-suite",
  },
  {
    slug: "prompt-contracts-v0",
    kind: "repo",
    title: "prompt-contracts — dbt contracts for LLM JSON outputs (v0)",
    repo: "uppulaharshith2-rgb/prompt-contracts",
    url: "https://github.com/uppulaharshith2-rgb/prompt-contracts",
    date: "2026-05-17",
    status: "published",
    summary:
      "New public Python package. The runtime half of the governance suite — dbt-eval scores prompts in dev, prompt-contracts blocks bad outputs at runtime. `@prompt_contract` decorator wraps any LLM call: declare the expected output schema (JSON Schema or Pydantic), validate at runtime, choose what to do on violation (`raise` / `drop` / `quarantine`). Best-effort `coerce` mode handles trivially-fixable outputs without hiding violations from dashboards (tracked via a separate `coerced` counter). Every decorated function gains a `.contract_stats` attribute for end-of-pipeline introspection.",
    stats: { additions: 1470, files: 19, tests: 55 },
    highlights: [
      "55 tests passing in 0.23s — full suite runs offline with the included stub model",
      "Three on-violation modes shipped end-to-end: raise (fail the DAG), drop (skip + log + counter), quarantine (write to JSONL you can replay)",
      "Honest scope discipline — `QuarantineStore` Protocol exists in the API; only the JSONL implementation ships, SQL adapter deferred so v0.2 is a drop-in, not a refactor",
      "Honest design trade-off documented — coerce mode could hide violations from dashboards, so coercions count as `passed` but also bump a separate `coerced` counter for discoverability",
      "Comparison table in README addresses overlap with instructor + guardrails head-on (differentiator: on_violation choreography + quarantine pattern)",
    ],
    whyItMatters:
      "Companion to dbt-eval — the runtime enforcement layer above eval frameworks. The governance suite's pitch becomes one sentence at a recruiter call: 'I'm building the dbt-style governance suite for prompts — eval in dev (dbt-eval), contracts at runtime (prompt-contracts), source-freshness for prompt templates (prompt-freshness, next).' Composes; doesn't compete with promptfoo / DeepEval / Phoenix.",
    tags: ["llm-runtime", "json-schema", "pydantic", "python", "ai-data-engineering", "open-source-release"],
    collection: "governance-suite",
  },
  {
    slug: "dbt-eval-v0",
    kind: "repo",
    title: "dbt-eval — `dbt test` syntax for LLM outputs (v0)",
    repo: "uppulaharshith2-rgb/dbt-eval",
    url: "https://github.com/uppulaharshith2-rgb/dbt-eval",
    date: "2026-05-17",
    status: "published",
    summary:
      "New public Python package. CLI runs YAML-defined eval suites with JSONL fixtures and reports pass/fail/skip per assertion in a dbt-style terminal grid. v0 ships three working assertions — `regex_match` (pure-Python regex), `json_schema` (full JSON Schema validation), and `faithful` (LLM-as-judge via Claude Haiku 4.5 with a deterministic offline mock for CI). The thesis: LLM evaluation is broken because it's exciting; the fix is to copy the most boring, most-successful pattern in data engineering — `dbt test`. Same YAML shape, same severities, same ergonomics every analytics engineer already knows.",
    stats: { additions: 1229, files: 19, tests: 41 },
    highlights: [
      "41 tests passing in 0.51s — entire suite runs offline via `DBT_EVAL_MOCK=1`",
      "Three assertions in v0; roadmap names 8 more (cosine_similarity, tool_call_shape, latency_p95, cost_per_call, no_pii, factual_consistency_v2, length_constraint, accepted_values)",
      "Honest v0 scope discipline — no real LLM call in the example pipeline yet; seam pre-built at `EvalCase.output()` so v0.2 swaps one function from `return stub` to `call model`",
      "Faithful-mock scoring uses `0.5 * coverage + 0.5 * jaccard` after Jaccard-only gave false negatives — rewards short focused rationales that quote the input, mirroring how a real LLM judge would think",
      "MIT-licensed, public, MIT license, install with `pip install -e .` (PyPI publish queued)",
    ],
    whyItMatters:
      "Every other LLM eval framework I looked at (Promptfoo, DeepEval, Phoenix, Ragas) invents new vocabulary — trace, span, judge, rubric, metric. Data engineers already have all of this and call it `dbt test`. Porting that mental model means analytics engineers can adopt LLM eval the day they read the README, because the YAML is already familiar. This is a shape-of-the-pitch decision more than a technical one.",
    tags: ["llm-eval", "dbt", "python", "ai-data-engineering", "open-source-release"],
    collection: "governance-suite",
  },
  {
    slug: "forge-public",
    kind: "repo",
    title: "Forge — multi-agent dev orchestrator on Claude Code Max",
    repo: "uppulaharshith2-rgb/forge",
    url: "https://github.com/uppulaharshith2-rgb/forge",
    date: "2026-05-17",
    status: "published",
    summary:
      "Open-source release of the multi-agent dev system I use locally. Leader (Opus 4.7) routes work to role-specific subagents (11 personas: Builder, Critic, CSO, QA, Designer, Eng Manager, Investigator, Innovator, Bug Hunter, Doc Engineer + Leader), each task gets its own GSD project structure, executed with Superpowers TDD methodology, file-based message bus, budget guard. Runs on the Claude Max plan only — no extra spend.",
    highlights: [
      "11 role personas + 6 GSD templates + complexity rubric + budget guard",
      "Project-agnostic CLI: `forge run <repo> <goal>`",
      "One-liner install: `curl -fsSL .../forge/install.sh | bash`",
      "MIT license, conventional bash + git only — no exotic runtime",
    ],
    whyItMatters:
      "Most multi-agent frameworks either lock you to a specific runtime (Devin, OpenHands) or add token costs on top of what you already pay. Forge is the smallest interesting version: file-system message bus, git worktree isolation, role-personas as markdown, all running on the Claude Code subscription you already have.",
    tags: ["multi-agent", "claude-code", "orchestration", "open-source-release"],
    collection: "orchestration",
  },
  {
    slug: "secondbrain-kit",
    kind: "repo",
    title: "SecondBrain Kit — PARA vault + Claude skills, installable",
    repo: "uppulaharshith2-rgb/secondbrain",
    url: "https://github.com/uppulaharshith2-rgb/secondbrain",
    date: "2026-05-17",
    status: "published",
    summary:
      "Open-source skeleton of the personal knowledge vault that powers everything else I build. PARA folder structure (Inbox / Projects / Areas / Resources / Archive / Daily / Templates / Attachments) plus a `.claude/` directory with 9 custom slash commands and 11 starter templates. Pre-written `CLAUDE.md` operating manual that Claude reads at session start — drop in your identity, that's the only required customization.",
    highlights: [
      "9 custom slash commands (`/today`, `/weekly-review`, `/process-inbox`, `/research-deep`, `/spark`, `/vault-health`, `/capture`, `/context` + README)",
      "11 starter templates (daily, weekly, monthly, project, concept, person, company, book, article, meeting, MOC)",
      "Karpathy LLM Wiki rule baked into the operating manual — every ingest rewrites 5-15 pages, never just appends",
      "Compatible with Obsidian, plain Markdown editors, and Claude Code out of the box",
    ],
    whyItMatters:
      "Most 'personal knowledge management' systems are templates without behavior. This kit's value is the *operating manual* — the CLAUDE.md that gives Claude a coherent picture of what to do with the vault, how to file things, when to update existing notes instead of creating new ones. Templates fade; an opinionated operating contract compounds.",
    tags: ["personal-knowledge", "obsidian", "claude-code", "open-source-release"],
    collection: "vault",
  },
];

export function getContribution(slug: string): Contribution | undefined {
  return CONTRIBUTIONS.find((c) => c.slug === slug);
}

export function listContributions(): Contribution[] {
  return [...CONTRIBUTIONS].sort((a, b) => b.date.localeCompare(a.date));
}

export function contributionStats() {
  return {
    total: CONTRIBUTIONS.length,
    prs: CONTRIBUTIONS.filter((c) => c.kind === "pr").length,
    repos: CONTRIBUTIONS.filter((c) => c.kind === "repo").length,
    merged: CONTRIBUTIONS.filter((c) => c.status === "merged").length,
    open: CONTRIBUTIONS.filter((c) => c.status === "open").length,
  };
}

const COLLECTION_ORDER: NonNullable<Contribution["collection"]>[] = [
  "upstream-prs",
  "governance-suite",
  "orchestration",
  "vault",
];

export function contributionsByCollection(): Array<{
  collection: NonNullable<Contribution["collection"]>;
  label: string;
  tagline: string;
  items: Contribution[];
}> {
  const sorted = listContributions();
  return COLLECTION_ORDER.map((collection) => {
    const items = sorted.filter((c) => c.collection === collection);
    if (items.length === 0) return null;
    return {
      collection,
      label: COLLECTION_LABELS[collection].label,
      tagline: COLLECTION_LABELS[collection].tagline,
      items,
    };
  }).filter((g): g is NonNullable<typeof g> => g !== null);
}
