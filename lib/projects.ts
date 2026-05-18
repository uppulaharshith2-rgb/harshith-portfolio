export type Project = {
  slug: string;
  name: string;
  tagline: string;
  oneLiner: string;
  description: string;
  status: "live" | "in-progress" | "planned" | "archived";
  category: "saas" | "tool" | "skill" | "agent" | "system" | "library";
  liveUrl?: string;
  repoUrl?: string;
  techStack: string[];
  highlights: string[];
  year: string;
  accentColor?: string;
  collection?: "governance-suite" | "training-data-quality" | "orchestration";
};

export const PROJECTS: Project[] = [
  {
    slug: "claude-hub",
    name: "Claude Hub",
    tagline: "181 hand-curated Claude resources across 8 types. AI search via Haiku. Three full UI iterations in one session.",
    oneLiner:
      "Editorial, opinionated marketplace of MCPs, skills, agents, and architectures, hand-picked by a practicing data engineer.",
    description:
      "181 resources across 8 types (MCPs, Skills, Agents, Prompts, Architectures, Setups, Hooks, Tricks). Editorial-density home with bento hero, live activity ticker, per-category sections, AI search via Claude Haiku, 73 author profiles, 10 curated stacks. Three full UI iterations shipped in one session.",
    status: "live",
    category: "system",
    liveUrl: "https://claude-hub-three.vercel.app",
    repoUrl: "https://github.com/uppulaharshith2-rgb/claude-hub",
    techStack: ["Next.js 16", "TypeScript", "Bun", "Tailwind", "Framer Motion", "Anthropic SDK", "Vercel"],
    highlights: [
      "181 hand-curated resources, 8 types",
      "AI semantic search powered by Claude Haiku",
      "Editorial design system — Anthropic warm amber, Geist Mono labels, sharp 6px corners",
      "Dark + light theme via pure CSS variables",
    ],
    year: "2026",
    accentColor: "#cc785c",
  },
  {
    slug: "cockpit",
    name: "Cockpit",
    tagline: "12 daemons watch Staff+ DE roles, score each against my embedding, queue high-fit applications. Self-hosted, daily use, 12 weeks running.",
    oneLiner:
      "Watches every relevant Staff+ data role across major job boards, scores each against my profile via embeddings, and queues high-fit applications.",
    description:
      "Daemon-based architecture with 12 workers (job scrape, profile embed, match score, application draft, notification, retention, etc.). Built solo with Claude over ~12 weeks. Production stack on Railway + Supabase + OpenAI embeddings + Anthropic generation. Single-user mode — strategy, prompts, and pipeline are the moat, repo intentionally private.",
    status: "live",
    category: "agent",
    liveUrl: "https://cockpit-web-seven.vercel.app",
    techStack: ["Next.js", "FastAPI", "Postgres", "Railway", "Supabase", "Anthropic", "OpenAI embeddings", "Alembic"],
    highlights: [
      "12 daemon workers, fully autonomous loop",
      "Cosine-ranked job feed against personal embedding",
      "21+ integration tests; alembic migration discipline",
      "Daily personal use — eats own dogfood every morning",
    ],
    year: "2026",
    accentColor: "#7c3aed",
  },
  {
    slug: "pipecode",
    name: "PipeCode",
    tagline: "Solo-founded SaaS. DE interview prep that actually runs your PySpark / SQL / dbt code instead of multiple-choice.",
    oneLiner:
      "Question bank + judge for SQL, PySpark, Snowflake, Airflow, dbt — the only DE interview prep that runs your code.",
    description:
      "Live SaaS. Hundreds of hand-curated DE questions, AI-powered question judge, weekly contests, LinkedIn outreach pipeline, cold-email infrastructure, marketing automation — a full product company built as a solo founder venture.",
    status: "live",
    category: "saas",
    liveUrl: "https://pipecode.ai",
    techStack: ["Next.js", "Postgres", "Stripe", "Anthropic", "Custom code judge"],
    highlights: [
      "Founded + built solo as CEO",
      "AI code judge for DE-specific languages (PySpark, SQL dialects)",
      "Active user base + recurring revenue",
      "Full marketing stack — cold email, LinkedIn, Reddit, weekly contests",
    ],
    year: "2025-2026",
    accentColor: "#10b981",
  },
  {
    slug: "secondbrain",
    name: "SecondBrain (personal vault)",
    tagline: "My personal Obsidian vault running 9 custom Claude skills daily. The public kit is extracted from this.",
    oneLiner:
      "The actual vault I use daily. PARA structure + every custom Claude skill, applied to my real life and work. The public starter kit (SecondBrain Kit) is extracted from this.",
    description:
      "PARA structure (Projects, Areas, Resources, Archive) extended with AI-native skills like /research-deep (Karpathy LLM Wiki pattern), /spark (cross-note pattern detection), /vault-health (orphan + contradiction audit), /process-inbox (triage), /weekly-review. Personal compounding knowledge artifact. Source of truth for active efforts, learnings, daily notes, decisions, and cross-project patterns.",
    status: "live",
    category: "system",
    repoUrl: "https://github.com/uppulaharshith2-rgb/secondbrain",
    techStack: ["Obsidian", "Claude Code", "Custom skills", "Templater", "Markdown"],
    highlights: [
      "10+ custom Claude skills, daily use",
      "Karpathy LLM Wiki pattern — every ingest rewrites 5-15 pages",
      "Frontmatter discipline + tag taxonomy",
      "Daily → weekly → quarterly retrospective loop",
    ],
    year: "2026",
    accentColor: "#0ea5e9",
  },
  {
    slug: "ai-cost-calculator",
    name: "AI Cost Calculator",
    tagline: "1,225 pairwise LLM comparison pages (50 models, programmatic SEO). Planned. Pure static, compounds over 12-18 months.",
    oneLiner:
      "Pairwise model comparison + cost calculator for every Claude / GPT / Gemini / open-source model. Programmatic SEO play.",
    description:
      "Pure static Next.js site. ~1,225 pairwise comparison pages from 50 LLM model pairs (50 choose 2). Token-cost estimator, side-by-side context-window + price tables, real benchmarks. Affiliate + ad revenue. 12-18mo SEO compounding asset, not a near-term revenue target.",
    status: "planned",
    category: "tool",
    techStack: ["Next.js 16", "TypeScript", "Static export", "Vercel"],
    highlights: [
      "~1,225 programmatic SEO pages",
      "Cross-validated as a real pain (4/5 research agents flagged LLM bill-shock)",
      "Slow compounding asset, not workflow SaaS",
      "Spec'd in vault on 2026-05-16 after 5-agent parallel research",
    ],
    year: "2026",
    accentColor: "#f59e0b",
  },
  {
    slug: "dbt-eval",
    name: "dbt-eval",
    tagline: "`dbt test` syntax for LLM outputs. Declarative YAML assertions for prompts. v0 ships 3 working assertions + 41 passing tests; roadmap names 8 more.",
    oneLiner:
      "I made LLM evaluation boring like dbt tests — same declarative YAML, same pass/fail/skip ergonomics every data engineer already knows.",
    description:
      "Public Python package. CLI (`dbt-eval run examples/`) reads YAML eval suites + JSONL fixtures, runs assertions, prints a dbt-style terminal report. v0 ships three working assertions: `regex_match` (pure-Python regex), `json_schema` (full JSON Schema validation), and `faithful` (LLM-as-judge via Claude Haiku 4.5 with a deterministic offline mock for CI). Mental model port: every DE knows `dbt test` — port that to prompts. The thesis is that LLM evaluation is broken because it's *exciting* — bespoke harnesses, novel metrics, custom dashboards — and the fix is to make it boring.",
    status: "live",
    category: "library",
    liveUrl: "https://github.com/uppulaharshith2-rgb/dbt-eval",
    repoUrl: "https://github.com/uppulaharshith2-rgb/dbt-eval",
    techStack: ["Python 3.10+", "YAML", "JSON Schema", "Claude Haiku 4.5", "pytest", "pyproject.toml"],
    highlights: [
      "41 tests passing in 0.51s — full suite runs offline via `DBT_EVAL_MOCK=1`",
      "Declarative YAML eval suites mirror dbt's `schema.yml` ergonomics intentionally",
      "Three assertions in v0; roadmap names 8 more (cosine_similarity, tool_call_shape, latency_p95, cost_per_call, no_pii, factual_consistency_v2, length_constraint, accepted_values)",
      "Honest v0 scope discipline — no real LLM call in the example pipeline yet; seam pre-built at `EvalCase.output()` for v0.2",
      "MIT-licensed, public, install with `pip install -e .` (PyPI publish queued)",
    ],
    year: "2026",
    accentColor: "#ff694b",
    collection: "governance-suite",
  },
  {
    slug: "prompt-contracts",
    name: "prompt-contracts",
    tagline: "dbt contracts for LLM JSON outputs. `@prompt_contract` decorator with raise/drop/quarantine modes + coerce + per-function stats. v0 ships JSON Schema + Pydantic validators; 55 tests passing.",
    oneLiner:
      "Your LLM is a producer in a data contract — treat it like one. Runtime enforcement, not dev-time eval.",
    description:
      "Public Python package. Decorator wraps any Claude/OpenAI call: declare the expected JSON output schema, validate at runtime, choose what to do on violation (raise / drop / quarantine). JSON Schema + Pydantic adapters built in. Best-effort `coerce` mode handles trivially-fixable outputs (strip code fences, trailing commas, stringified numbers). Every decorated function gains a `.contract_stats` attribute (passed / dropped / quarantined / errors / coerced) for end-of-pipeline introspection. Companion to dbt-eval — dbt-eval scores prompts in dev, prompt-contracts blocks bad outputs at runtime.",
    status: "live",
    category: "library",
    liveUrl: "https://github.com/uppulaharshith2-rgb/prompt-contracts",
    repoUrl: "https://github.com/uppulaharshith2-rgb/prompt-contracts",
    techStack: ["Python 3.10+", "JSON Schema", "Pydantic", "pytest", "pyproject.toml"],
    highlights: [
      "55 tests passing in 0.23s — full suite runs offline with the stub model included",
      "Three on-violation modes — `raise` (fail the DAG), `drop` (skip + log + counter), `quarantine` (write to a JSONL `_rejected.jsonl` you can replay)",
      "Honest scope discipline — `QuarantineStore` Protocol shipped with the JSONL implementation only; SQL/Snowflake adapter deferred to v0.2 as a clean drop-in (no refactor)",
      "Coerce mode handles 4 narrow repairs (code-fence strip, trailing comma fix, stringified-primitive cast, top-level JSON parse); refuses bool→int silently; tracked via a separate `coerced` counter so coercion is visible to dashboards instead of hidden",
      "Roadmap names Airflow `PromptContractOperator`, SQL/Snowflake quarantine adapter, OpenTelemetry export, declarative `prompt_contracts.yml` manifest, dbt-eval cross-tool model registry",
    ],
    year: "2026",
    accentColor: "#10b981",
    collection: "governance-suite",
  },
  {
    slug: "prompt-freshness",
    name: "prompt-freshness",
    tagline: "`dbt source freshness` for prompt templates. Per-(prompt, model) staleness — re-eval only counts against the current model alias.",
    oneLiner:
      "Your prompts are sources. Treat them like sources. `dbt source freshness` taught us this in 2022.",
    description:
      "Public Python package. CLI reads a `prompts.yml` manifest with per-prompt `warn_after / error_after` thresholds, checks last-evaluated timestamps against the current model alias. The headline feature: when you bump `claude-sonnet-4-6` → `claude-sonnet-4-7` in the manifest, every prompt previously evaluated against the older alias flips to STALE with an explicit `model alias drifted:` line — even if the wall-clock time hasn't elapsed. dbt-eval integration shipped end-to-end: `prompt-freshness mark-evaluated --suite examples/` parses dbt-eval YAML suites and updates state on passing runs. GitHub Action workflow opens an issue when a prompt goes stale.",
    status: "live",
    category: "library",
    liveUrl: "https://github.com/uppulaharshith2-rgb/prompt-freshness",
    repoUrl: "https://github.com/uppulaharshith2-rgb/prompt-freshness",
    techStack: ["Python 3.10+", "Click", "PyYAML", "GitHub Actions", "pytest"],
    highlights: [
      "57 tests passing in 0.10s — CI green across Python 3.10 / 3.11 / 3.12",
      "Model-alias drift detection — `claude-sonnet-4-6 → 4-7` bump flips evaluations to STALE with explicit reason",
      "dbt-eval integration shipped end-to-end (`prompt-freshness mark-evaluated --suite examples/`) — not stubbed",
      "Honest scope discipline — no git-aware staleness in v0 (it's a real git dependency + ambiguous semantics); listed v0.5",
      "Honest design trade-off — model-alias check is binary, not semantic; user owns the alias string by design, no normalization that's subtly wrong in both directions",
    ],
    year: "2026",
    accentColor: "#7c3aed",
    collection: "governance-suite",
  },
  {
    slug: "prompt-lineage",
    name: "prompt-lineage",
    tagline: "dbt-docs for prompts. Lineage graph: prompts → eval suites → contracts → callers. CLI emits `lineage.json` + a static HTML navigation site.",
    oneLiner:
      "The 4th and final governance-suite member. The navigation surface that retroactively turns three CLIs into a platform.",
    description:
      "Public Python package. Walks a project directory, finds `prompts.yml` manifests + dbt-eval suite YAMLs + `@prompt_contract` decorator usage + prompt-freshness state, and emits two artifacts: (1) `lineage.json` — the structured graph that locks in the schema (the part adopters integrate against in CI dashboards and compliance audits), (2) a static HTML site in the dbt-docs aesthetic with vanilla JS for sort/filter, light/dark via `prefers-color-scheme`. `prompt-lineage diff main..HEAD` subcommand subsumes most of the queued golden-diff Action's value. GitHub Action workflow posts sticky PR comment with the diff. v0 ships the schema; v0.2 adds the force-directed graph, dbt-style column lineage view, Slack notifications.",
    status: "live",
    category: "library",
    liveUrl: "https://github.com/uppulaharshith2-rgb/prompt-lineage",
    repoUrl: "https://github.com/uppulaharshith2-rgb/prompt-lineage",
    techStack: ["Python 3.10+", "Click", "Jinja2", "PyYAML", "pytest", "vanilla JS"],
    highlights: [
      "78 tests passing in 0.93s — the largest test count in the governance suite",
      "Schema-first v0: `lineage.json` is the part that locks in, HTML rendering is deferred-engine territory",
      "`diff main..HEAD` subcommand subsumes the queued `golden-diff` GitHub Marketplace Action — one repo does both navigation AND PR review",
      "Zero JS framework — vanilla `<script>` for sort/filter, ≤100 lines inline. Static HTML opens in any browser",
      "Honest design trade-off: contract→prompt linkage is inferred via body-string match for `.md` path literals (with explicit `prompt=` kwarg as the forward-compat escape hatch) — not silent or fragile-execution-based",
      "Suite-completing — the navigation surface that retroactively turns dbt-eval + prompt-contracts + prompt-freshness from three CLIs into one platform",
    ],
    year: "2026",
    accentColor: "#4f46e5",
    collection: "governance-suite",
  },
  {
    slug: "llm-expectations",
    name: "llm-expectations",
    tagline: "`dbt test` for your `finetune.jsonl`. Declarative YAML data quality checks for LLM training files — no warehouse, no SaaS, no model downloads.",
    oneLiner:
      "First repo of a new thesis: port Great Expectations' mental model to JSONL training files. The un-saturated niche after Lilac died and Argilla went into HF maintenance.",
    description:
      "Public Python package. CLI: `llm-expectations check finetune.jsonl --suite expectations.yml`. 9 working expectation types in v0 — schema, type, required, in-set, distribution, duplicates, PII (regex baseline with Luhn validation on cards), token count (char/4 deterministic approximation), and language detect via langdetect. Report output masks matched PII values (`j***@example.com`, `***66`) so the report itself is safe to paste in CI or Slack without becoming a PII liability. JSON output schema is what locks in; HTML / hosted dashboards / semantic dedup are v0.2 territory.",
    status: "live",
    category: "library",
    liveUrl: "https://github.com/uppulaharshith2-rgb/llm-expectations",
    repoUrl: "https://github.com/uppulaharshith2-rgb/llm-expectations",
    techStack: ["Python 3.10+", "Click", "PyYAML", "jsonschema", "langdetect", "pytest"],
    highlights: [
      "78 tests passing in 0.15s — 1669 LOC source under the 1800-LOC ceiling",
      "9 working expectation types in v0 (schema / type / required / in-set / distribution / duplicates / PII / tokens / language)",
      "Honest design trade-off — `_mask()` ensures the report doesn't itself leak the PII it found. Matched values become `j***@example.com` or `***66` before they hit terminal / JSON output. Categorisation preserved; report is safe to share",
      "Conscious zero-deps choice — char/4 token approximation (≈10-15% off vs tiktoken) keeps install trivially small and deterministic; real tiktoken backend deferred to v0.2",
      "First of the new training-data-quality thesis — sister to the governance suite for prompts, same DE-mental-model-port shape, different un-saturated niche",
    ],
    year: "2026",
    accentColor: "#06b6d4",
    collection: "training-data-quality",
  },
  {
    slug: "corpus-snapshot",
    name: "corpus-snapshot",
    tagline: "`git status` for your RAG corpus. Snapshot + diff source documents into a content-addressed state file. Composes with llm-expectations.",
    oneLiner:
      "Second repo of the training-data-quality thesis. Every production RAG postmortem includes 'we re-embedded the corpus and the answers got worse' — this catches it.",
    description:
      "Public Python package. CLI: `corpus-snapshot snapshot ./docs` content-addresses every chunk into `.corpus-snapshot/state.json`; `corpus-snapshot diff v1 v2` emits a markdown report of added/removed/modified chunks with preview-diff fragments. Three built-in chunkers: markdown (heading-aware, H1/H2 only for id-stability under copy edits), JSONL (line or configurable key field), plain text (paragraph window fallback). Local-FS only in v0; the schema (`state.json`) is the lock-in artifact. v0.2 adds pluggable iterator adapter (LangChain Document, LlamaIndex Node), Pinecone/Weaviate fetch adapters, embedding-aware semantic similarity, and a GitHub Action.",
    status: "live",
    category: "library",
    liveUrl: "https://github.com/uppulaharshith2-rgb/corpus-snapshot",
    repoUrl: "https://github.com/uppulaharshith2-rgb/corpus-snapshot",
    techStack: ["Python 3.10+", "Click", "PyYAML", "pytest", "stdlib hashing"],
    highlights: [
      "55 tests passing in 0.10s — 1031 LOC source under the 1200-LOC ceiling",
      "Three built-in chunkers (markdown heading-aware, JSONL line/keyed, plain paragraph-window)",
      "Honest design trade-off — markdown chunker caps at H1/H2 splits (not H1-H6) to preserve chunk-id stability under copy edits. Same shape as `git diff` ignoring whitespace by default: lower granularity in exchange for less noise on cosmetic changes",
      "Composes with llm-expectations end-to-end: `corpus-snapshot diff v1 v2 --json | jq '.modified[].path'` pipes the list of changed files into `llm-expectations check` for surgical validation",
      "Content-hash only in v0 — embedding-aware similarity is v0.2 territory; deterministic baseline first, model overhead later",
    ],
    year: "2026",
    accentColor: "#f43f5e",
    collection: "training-data-quality",
  },
  {
    slug: "fixture-lineage",
    name: "fixture-lineage",
    tagline: "Chain-of-custody for LLM eval fixtures. Signed Ed25519 manifest tying every fixture to source trace + redaction pipeline + consent policy + parent fixture hash.",
    oneLiner:
      "Third and final repo of the training-data-quality thesis. The signed-manifest tuple no incumbent ships — EU AI Act Aug 2026 demand catalyst.",
    description:
      "Public Python package. CLI: `fixture-lineage record SOURCE --redactors PIPE.yml --consent POLICY.yml` accepts a source pointer (local file or Langfuse trace ID), runs the redaction pipeline (regex baseline in v0, Presidio plugin path documented), emits a signed Ed25519 manifest entry into a git-friendly `.fixture-lineage/manifest.jsonl`. `verify-chain` walks parent_fixture_hash pointers, confirms signatures, and detects tampering. Append-only JSONL log — no database, no SaaS, no model downloads. Composes with llm-expectations and corpus-snapshot as the chain-of-custody layer above source validation and corpus diffing.",
    status: "live",
    category: "library",
    liveUrl: "https://github.com/uppulaharshith2-rgb/fixture-lineage",
    repoUrl: "https://github.com/uppulaharshith2-rgb/fixture-lineage",
    techStack: ["Python 3.10+", "Click", "PyYAML", "cryptography (Ed25519)", "pytest"],
    highlights: [
      "64 tests passing in 0.09s — 1500 LOC source at the budget cap, full tamper-test demo included",
      "Ed25519 signing with append-only JSONL manifest store; `verify-chain` catches signature tampering AND parent_hash discontinuity",
      "Honest design trade-off — keys-on-disk in v0 with a loud README warning + structured `Signer` boundary for future KMS/HSM plug-in. Same dev-surface-first pattern that cosign and sops followed in their early days; interactive password prompt would block the 30-second example flow",
      "Source adapters: local file + Langfuse trace fetch (lazy `requests` import, falls back to stub if no LANGFUSE_HOST set)",
      "Closes the training-data-quality thesis at 3 — mirrors the governance-suite-closes-at-4 'stop while the story is tight' discipline",
    ],
    year: "2026",
    accentColor: "#facc15",
    collection: "training-data-quality",
  },
  {
    slug: "forge",
    name: "Forge",
    tagline: "Multi-agent dev orchestrator — Claude Code on Max plan, zero extra spend",
    oneLiner:
      "Leader (Opus 4.7) spawns role-specific subagents per task. 11 personas, GSD project structure per task, Superpowers TDD methodology, file-based message bus. Runs on the Claude Max plan you already pay for.",
    description:
      "Project-agnostic multi-agent dev system. Synthesis of gstack (WHO) + GSD (WHAT) + Superpowers (HOW). Leader decides role + complexity + model routing, spawns subagent in a git worktree, subagent opens PR. STATE.md is single source of truth per task. Budget guard enforces concurrency + daily/weekly limits. Karpathy LLM Wiki rule for compound learning across tasks. Installable via one-liner curl.",
    status: "live",
    category: "system",
    liveUrl: "https://github.com/uppulaharshith2-rgb/forge",
    repoUrl: "https://github.com/uppulaharshith2-rgb/forge",
    techStack: ["Bash", "Claude Code Max", "Git worktrees", "File message bus", "Conductor.build"],
    highlights: [
      "11 role personas — Builder, Critic, CSO, QA, Designer, Eng Manager, Investigator, Innovator, Bug Hunter, Doc Engineer, Leader",
      "Complexity rubric routes Opus/Sonnet/Haiku per task — pay only for what each task needs",
      "Karpathy LLM Wiki rule for compound learning",
      "One-liner install: `curl -fsSL .../forge/install.sh | bash`",
      "MIT-licensed, public on GitHub",
    ],
    year: "2026",
    accentColor: "#ef4444",
  },
  {
    slug: "secondbrain-kit",
    name: "SecondBrain Kit",
    tagline: "Installable PARA-structured Obsidian vault + Claude Code skills",
    oneLiner:
      "Clone, customize the identity, start capturing. 9 custom slash commands, 11 templates, pre-written CLAUDE.md operating manual. Karpathy LLM Wiki rule baked in.",
    description:
      "Open-source starter kit for the personal knowledge vault that powers everything else I build. PARA folder skeleton (Inbox, Projects, Areas, Resources, Archive, Daily, Templates, Attachments) plus a `.claude/` directory with /today, /weekly-review, /process-inbox, /research-deep, /spark, /vault-health, /capture, /context. CLAUDE.md is pre-written with frontmatter schema, naming conventions, tag taxonomy, and behavior rules — drop in your identity and active efforts, that's the only customization.",
    status: "live",
    category: "system",
    liveUrl: "https://github.com/uppulaharshith2-rgb/secondbrain",
    repoUrl: "https://github.com/uppulaharshith2-rgb/secondbrain",
    techStack: ["Obsidian", "Claude Code", "Markdown", "YAML frontmatter", "Bash installer"],
    highlights: [
      "9 custom slash commands for vault operations",
      "11 starter templates (daily, weekly, monthly, project, concept, person, company, book, article, meeting, MOC)",
      "Pre-written CLAUDE.md — Claude reads it every session",
      "Karpathy LLM Wiki rule — rewrite, don't append",
      "MIT-licensed, one-liner install",
    ],
    year: "2026",
    accentColor: "#0ea5e9",
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getLiveProjects(): Project[] {
  return PROJECTS.filter((p) => p.status === "live");
}

const MONOGRAM_OVERRIDES: Record<string, string> = {
  "claude-hub": "CH",
  cockpit: "CK",
  pipecode: "PC",
  secondbrain: "SB",
  "secondbrain-kit": "SK",
  "ai-cost-calculator": "AI",
  forge: "F",
  "dbt-eval": "DE",
  "prompt-contracts": "PC",
  "prompt-freshness": "PF",
  "prompt-lineage": "PL",
  "llm-expectations": "LE",
  "corpus-snapshot": "CS",
  "fixture-lineage": "FL",
};

export function projectMonogram(slug: string, name: string): string {
  if (MONOGRAM_OVERRIDES[slug]) return MONOGRAM_OVERRIDES[slug];
  const parts = name.replace(/[()]/g, "").trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

/* Per-project lucide icon names. Resolved to actual components in
   components/projects/project-icon.tsx so this file stays free of React imports
   (server-component-safe). */
export const PROJECT_ICON_NAMES: Record<string, string> = {
  "claude-hub": "Sparkles",
  cockpit: "Plane",
  pipecode: "Database",
  secondbrain: "Brain",
  "secondbrain-kit": "NotebookText",
  "ai-cost-calculator": "Calculator",
  forge: "Hammer",
  "dbt-eval": "FlaskConical",
  "prompt-contracts": "ShieldCheck",
  "prompt-freshness": "Timer",
  "prompt-lineage": "Workflow",
  "llm-expectations": "ClipboardCheck",
  "corpus-snapshot": "GitCompare",
  "fixture-lineage": "Fingerprint",
};
