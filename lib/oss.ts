export type Contribution = {
  slug: string;
  kind: "pr" | "repo" | "skill" | "issue";
  title: string;
  repo: string; // e.g. "BerriAI/litellm"
  url: string;
  date: string; // ISO YYYY-MM-DD
  status: "open" | "merged" | "closed" | "draft" | "published";
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
};

export const CONTRIBUTIONS: Contribution[] = [
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
