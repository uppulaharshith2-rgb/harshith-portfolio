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
    tagline: "Curated registry of Claude tools for data teams",
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
    tagline: "AI job-application copilot — autopilot for the senior IC job hunt",
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
    tagline: "Real interview prep for data engineers",
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
    name: "SecondBrain",
    tagline: "PARA-structured vault with Claude skills woven in",
    oneLiner:
      "Obsidian vault wired with custom Claude Code skills — daily notes, weekly reviews, inbox triage, vault health, all automated.",
    description:
      "PARA structure (Projects, Areas, Resources, Archive) extended with AI-native skills like /research-deep (Karpathy LLM Wiki pattern), /spark (cross-note pattern detection), /vault-health (orphan + contradiction audit), /process-inbox (triage), /weekly-review. Personal compounding knowledge artifact.",
    status: "live",
    category: "system",
    repoUrl: "https://github.com/uppulaharshith2-rgb/secondbrain-skills",
    techStack: ["Obsidian", "Claude Code", "Custom skills", "Templater", "Markdown"],
    highlights: [
      "10+ custom Claude skills for vault operations",
      "Karpathy LLM Wiki pattern — rewrite, don't append",
      "Frontmatter discipline + tag taxonomy",
      "Daily-note → weekly-review → quarterly retrospective loop",
    ],
    year: "2026",
    accentColor: "#0ea5e9",
  },
  {
    slug: "ai-cost-calculator",
    name: "AI Cost Calculator",
    tagline: "Stop guessing your LLM bill — calculate it",
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
    slug: "forge",
    name: "Forge",
    tagline: "Multi-agent dev orchestrator — Claude Code on Max plan",
    oneLiner:
      "Leader (Opus 4.7) spawns role-specific subagents per task, GSD project structure per task, Superpowers TDD methodology, file-based message bus. Zero extra spend — runs on the Claude Max plan only.",
    description:
      "Project-agnostic multi-agent dev system. Synthesis of gstack (WHO) + GSD (WHAT) + Superpowers (HOW). Leader decides role + complexity + model routing, spawns subagent in worktree, subagent opens PR. STATE.md is single source of truth per task. Budget guard enforces concurrency + daily/weekly limits.",
    status: "in-progress",
    category: "system",
    techStack: ["Bash", "Claude Code", "Git worktrees", "File message bus", "Conductor.build"],
    highlights: [
      "11 role personas (Builder, Critic, CSO, QA, Designer, Eng Manager, etc.)",
      "Complexity rubric routes Opus/Sonnet/Haiku per task",
      "Karpathy LLM Wiki rule for compound learning",
      "Skeleton complete, end-to-end test pending",
    ],
    year: "2026",
    accentColor: "#ef4444",
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getLiveProjects(): Project[] {
  return PROJECTS.filter((p) => p.status === "live");
}
