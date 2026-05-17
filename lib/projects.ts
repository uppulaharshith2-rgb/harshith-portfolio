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
};

export function projectMonogram(slug: string, name: string): string {
  if (MONOGRAM_OVERRIDES[slug]) return MONOGRAM_OVERRIDES[slug];
  const parts = name.replace(/[()]/g, "").trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}
