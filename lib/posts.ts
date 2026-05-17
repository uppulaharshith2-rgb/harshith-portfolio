export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readTime: number;
  body: string; // simple markdown — bold, code, links, lists, headings, paragraphs
  draft?: boolean;
};

export const POSTS: Post[] = [
  {
    slug: "forge-multi-agent-dev-zero-extra-spend",
    title: "Forge: multi-agent dev that adds nothing to my Claude bill",
    excerpt:
      "Most multi-agent dev frameworks lock you to a runtime or add per-token billing on top of your Claude subscription. Forge does neither. 11 personas, a file-system bus, git worktrees, and the Max plan you already pay for.",
    date: "2026-05-17",
    tags: ["multi-agent", "claude-code", "forge", "open-source", "architecture"],
    readTime: 8,
    body: `Every multi-agent dev framework I tried failed one of two tests.

**Test 1: do I have to learn a new runtime?** Devin, OpenHands, Cline, half a dozen others — each is its own product surface. New CLI, new auth, new project format, new mental model. The blast radius for a side-project orchestrator is too big.

**Test 2: does it add to my bill?** Most agent frameworks layer a router or proxy on top of your provider, which means new per-request costs. I already pay $200/mo for Claude Max. Stacking another usage-based bill on top of that — to get an agent loop I could write in bash — felt wrong.

[Forge](https://github.com/uppulaharshith2-rgb/forge) is my answer. It's the smallest interesting version of a multi-agent dev orchestrator: a directory of role-persona markdown files, a file-system message bus, git worktrees for isolation, and a Leader process (Claude Opus 4.7, interactive via Claude Code) that routes tasks to specialists. Zero new runtime. Zero extra spend.

## The shape

\`\`\`
LEADER (Opus 4.7) ──┬── reads task queue
                    ├── decides role (gstack matrix)
                    ├── scores complexity (1-10)
                    ├── routes model (Opus / Sonnet / Haiku)
                    ├── scaffolds GSD project per task
                    └── spawns subagent in a git worktree
                                │
                                ▼
                  [Builder | Critic | CSO | QA | Designer | …]
                    operates under Superpowers (TDD)
                    communicates via forge/bus/
\`\`\`

11 role personas: Builder, Critic, CSO, QA, Designer, Eng Manager, Investigator, Innovator, Bug Hunter, Doc Engineer, plus the Leader. Each is a markdown file under \`personas/\`. The Leader reads the file, decides whether the next task needs a Builder or a Critic, and spawns that persona into a fresh git worktree.

Subagents communicate by writing markdown files into \`bus/inbox/\` and \`bus/outbox/\`. No queue server, no RPC, no JSON-over-stdio dance. \`tail -f bus/master_log\` is the entire observability layer. If a subagent hangs, the budget guard kills it after a timeout. If it succeeds, the Leader merges its PR and runs compound learning — appending what the agent learned into \`compound/AGENTS.md\` (Karpathy LLM Wiki rule: rewrite affected sections, don't blindly append).

## Why this works on the Max plan

The Max plan gives you Claude Opus 4.7 access through Claude Code, capped by message rate and not by per-request billing. The expensive part of multi-agent dev is parallel inference. If you can structure parallelism as **separate Claude Code sessions in separate worktrees**, each session draws from the same flat-rate subscription. No router proxy, no per-token meter.

The trick is making "separate Claude Code sessions" cheap to spawn. \`bin/spawn_subagent.sh\` creates a git worktree, symlinks a per-task \`CLAUDE.md\`, and launches a fresh \`claude\` process there. [Conductor.build](https://conductor.build/) handles the Mac UI for switching between them. Total cost to add a 12th persona: one new markdown file.

## What the role matrix actually does

The Leader scores each incoming task on complexity 1-10 and routes by role. The scoring lives in \`config/complexity_rubric.md\` — it's not magic, it's a checklist. "Touches more than three files" +1. "Requires schema migration" +2. "Production-facing" +2. Anything ≥ 8 goes to Opus. 5-7 goes to Sonnet. ≤ 4 goes to Haiku.

The role matrix in \`config/role_matrix.md\` maps task shape to persona: bug → Bug Hunter, security review → CSO, UI polish → Designer, refactor → Builder + Critic in sequence. Most tasks need 1-2 personas. A small minority need 5+.

## What the budget guard does

\`bin/budget_guard.sh\` runs as a launchd cron every 5 minutes. It enforces three caps:

1. **Concurrency cap** — no more than N subagents active at once (default 4)
2. **Daily message cap** — kills all subagents if today's Max usage exceeds 90%
3. **Weekly message cap** — same, weekly window

If you blow past the cap, every spawned subagent finds a \`STOP\` flag in \`bus/broadcast/\` and exits cleanly. State persists in \`STATE.md\` per task, so resuming after rate-limit reset is just \`forge run --resume <task-id>\`.

This is what makes the loop responsible. Without the guard, an unbounded Leader could chew through your daily Max allotment in an hour.

## The single biggest design choice

**File-system message bus, not a queue server.** Every other multi-agent framework I looked at uses Redis, NATS, or some bespoke RPC. Forge uses directories.

The trade-off: throughput is bounded by file-system contention (fine for ≤ 10 concurrent agents), and you lose features like message replay or ordered delivery. The wins: zero infra to stand up, every message is a file you can \`cat\`, every state is a directory you can \`ls\`, the entire system survives the box rebooting, and debugging is just \`find\` + \`grep\`.

For a solo-dev orchestrator, that's the right point on the curve. The 10-agent ceiling matches what one human can attend to anyway.

## What Forge is not

- **Not a CI/CD replacement.** It's interactive — the Leader is you, plus Opus. Agents run while you watch.
- **Not a substitute for code review.** Critic personas do *first-pass* review; the Leader (you) merges.
- **Not multi-user.** State is per-checkout. Two people sharing a Forge install will collide on \`bus/\` files.
- **Not battle-tested at scale.** I use it on side projects. The patterns are inspired by production multi-agent work (Devin, OpenHands, Voyager, Reflexion, Gas Town) but Forge itself is solo-dev grade.

## Install

\`\`\`bash
curl -fsSL https://raw.githubusercontent.com/uppulaharshith2-rgb/forge/main/install.sh | bash
\`\`\`

Adds \`~/forge/bin\` to your PATH. Run \`forge run <repo> "<goal>"\` to start a Leader session on any git repo. \`forge status\` for active tasks, \`forge kill\` to stop everything.

[Repo here](https://github.com/uppulaharshith2-rgb/forge). MIT. Issues and PRs welcome — especially around the complexity rubric and role matrix, which I'm still tuning.

## Why I wrote this

Most "build your own agent framework" posts handwave the actual hard parts — budget, concurrency, persistence, retry, the difference between fan-out and parallelism. The hard parts are also the boring parts. Forge tries to make them as boring as possible: bash scripts, markdown files, git worktrees. Things a solo dev can debug at 2am.

The lesson I'd extract: **multi-agent dev doesn't need a multi-agent platform**. It needs role-clarity (gstack), per-task isolation (worktrees), explicit budget (cron guard), and a way for agents to talk that you can read with your eyes (the file bus). Everything else is detail.`,
  },
  {
    slug: "why-claude-hub",
    title: "Why I'm building Claude Hub",
    excerpt:
      "Generic AI tool directories are everywhere. Vertical curation by a credible practitioner is the unmet gap. Here's the bet.",
    date: "2026-05-16",
    tags: ["claude", "data-engineering", "side-projects"],
    readTime: 4,
    body: `The AI tool directory space looks crowded. Smithery owns MCPs. mcp.so, glama, pulsemcp all exist. So why build another?

Because **none of them are opinionated**. They list everything, rate nothing, and assume every visitor has the same context. That's a search problem, not a curation problem — and search problems get solved by Google + Anthropic's own marketplace the second they ship it.

The unmet gap is **vertical curation by a credible practitioner**. Not "every MCP that exists" but "the 30 MCPs a data engineer building production pipelines with Claude should actually care about, with honest one-line reviews and a 'skip it when…' note."

## The thesis in one line

> Taste density nobody else can replicate. Domain expertise + practitioner conviction + opinionated reviews = an unfair advantage no aggregator can clone.

## Why this isn't a startup

I killed the startup framing fast:

- **Zero defensibility** — static site, no accounts, no behavioral data, cloneable in a day.
- **Distribution prohibitive** — Smithery owns SEO for "MCP directory" queries.
- **Existential incumbent risk** — Anthropic will ship native skill discovery inside claude.ai. When that lands, generic directories become irrelevant overnight.
- **No monetization without a backend** — and adding accounts/backend = creating a SaaS, which is a different commitment.

But as a **portfolio + authority project**, all of those become non-issues. I don't need defensibility. I don't need to outrank Smithery on horizontal queries. I just need to be the place data engineers send each other for "what should I use with Claude for X."

## What v3 actually shipped

- 181 hand-curated resources across 8 types (MCPs, skills, agents, prompts, architectures, setups, hooks, tricks)
- Editorial design system — Anthropic warm amber as the only accent, Geist Mono for all metadata labels
- AI semantic search via Claude Haiku
- 73 author profiles, 10 curated stacks
- Dark + light theme via pure CSS variables

Three full UI iterations in a single session — v1 was maximalist glassmorphism (rejected at 10%), v2 went sparse "editorial terminal" (rejected at 1%, too thin), v3 landed on editorial + density (the current shape).

The standing instruction in my vault: **keep building until told to stop.**`,
  },
  {
    slug: "shipping-litellm-pr-by-reading-the-two-that-didnt",
    title: "How I shipped a litellm PR by reading the two PRs that didn't",
    excerpt:
      "The Opus 4.7 temperature bug in litellm had two closed PRs and an open issue. Reading the closed ones for ten minutes was the difference between a third rejection and an open PR.",
    date: "2026-05-17",
    tags: ["open-source", "claude", "litellm", "process"],
    readTime: 7,
    body: `Anthropic's Messages API rejects \`temperature\` on Claude Opus 4.7. Only \`top_p\` works for sampling. This isn't subtle — it's in the model migration docs and the API returns a hard 400.

[litellm](https://github.com/BerriAI/litellm) — the 47k-star OSS router most LLM apps use to abstract providers — still listed \`temperature\` as a supported OpenAI param for Opus 4.7. So anyone routing Opus 4.7 through litellm with \`drop_params=True\` (the flag that's supposed to strip unsupported params automatically) silently failed and got a hard API error in production.

The bug was filed as [issue #26444](https://github.com/BerriAI/litellm/issues/26444). Two contributors had already tried to fix it. **Both PRs were closed unmerged.** No maintainer left a comment explaining why on either one. The issue was still open.

My PR shipped this week and is now [#28113](https://github.com/BerriAI/litellm/pull/28113). 6 files, +346 lines, 21 new tests, 976 existing tests still green.

The thing that made the difference was not technical. It was **reading both closed PRs end-to-end before writing a single line of code.**

## What the first PR got wrong

[PR #26445](https://github.com/BerriAI/litellm/pull/26445) over-stripped. It treated *every* reasoning-family model the same — Opus 4.7, Sonnet's reasoning mode, future o-series equivalents. The author reasoned: "this is a reasoning-model thing, so apply the filter to the reasoning family."

But Anthropic's deprecation is **Opus-4.7-specific**, not reasoning-family-wide. Sonnet 4.6 still accepts \`temperature\` perfectly. The PR would have broken \`temperature\` for a much larger user base than it fixed.

Greptile flagged this as P2 on the diff. Maintainer closed it without merging or commenting. Nobody followed up.

## What the second PR got wrong

[PR #26246](https://github.com/BerriAI/litellm/pull/26246) had the gating right — filter only for Opus 4.7. But it bundled the fix with a 256-line rewrite introducing a new \`ProviderSpecificModelInfo\` TypedDict and rerouting how the model-info path resolves capabilities.

This is the classic "while I'm here, let me refactor the surrounding code" trap. The refactor wasn't wrong — but it wasn't necessary for the bug, and it forced the maintainer to context-switch into evaluating a small architecture change at the same time as a small bug fix. Two reviews for the price of one is not a deal maintainers want to make.

Closed without comment.

## What worked the third time

Read both prior diffs. Internalize the failure modes. Then:

1. **Scope ruthlessly.** Only Opus 4.7. Substring check on the model id (so dated variants like \`claude-opus-4-7-20251201\` and vendor-prefixed forms like \`anthropic/claude-opus-4-7\` are all covered). Sonnet, Haiku, Opus 4.6, and 3.x untouched and regression-tested.
2. **Use the existing helper, don't invent new plumbing.** The codebase already has \`_is_explicitly_disabled_factory\` which reads raw \`model_info.get(key)\`. The fix wires into that. No TypedDict, no new class hierarchy.
3. **Defense in depth.** Filter in \`get_supported_openai_params\` *and* guard \`temperature\` / \`top_p\` in \`map_openai_params\` *and* set \`supports_temperature: false\` / \`supports_top_p: false\` on all 10 Opus 4.7 entries in \`model_prices_and_context_window.json\` (Anthropic direct + 5 Bedrock variants + Azure AI + 2 Vertex AI). Three layers so the next person upgrading these models can't accidentally regress one.
4. **Mirror into Bedrock.** Bedrock's \`AmazonConverseConfig.get_supported_openai_params\` had the same bug. Fixed in the same PR. Noted Databricks in the PR body as a follow-up since the same shape applies there too.
5. **Anticipate pushback in the PR body, don't make maintainers ask.** Three callouts documented up front: the backup-file drift constraint (a pre-existing JSON-sync convention I had to satisfy), why both the JSON flag *and* the static fallback (the family check covers unreleased dated snapshots before anyone updates JSON), and why I didn't fold Databricks into this PR (separate provider, easy follow-up).

## The pattern

Most OSS PR advice is about how to write the diff. The actually-load-bearing skill is **how to read what didn't ship**.

A closed PR is signal. If two prior attempts on the same issue both died without comment, that doesn't mean the maintainers don't care — it means each PR gave the maintainer a reason to bounce that the contributor didn't see. Finding those reasons takes ten minutes of reading. Not finding them costs you the PR.

This generalizes:

- **Before you start**: \`gh pr list --search "<issue keyword>" --state closed\`. Read every closed PR linked to the issue.
- **Look for the unstated reason.** Maintainers rarely write "this PR was over-scoped." They just stop responding. Your job is to infer what scope they would have accepted.
- **Match their conventions exactly.** Read the most recent 3-5 merged PRs to the same area. Match the test style, the commit message format, the type annotations, the doc string voice.
- **Anticipate the pushback in the PR body.** Maintainers are time-poor. A PR description that pre-answers the obvious questions earns goodwill that a PR description full of marketing fluff burns.

The 10 minutes I spent reading PR #26445 and PR #26246 was the highest-leverage time of the whole contribution. The actual fix was an afternoon. Anyone could have written it. The reason this one is open and the prior two are closed is the ten minutes before the code.

If you're contributing to OSS and your PR keeps not landing — read what didn't ship. It's almost always there.`,
  },
  {
    slug: "colophon",
    title: "Colophon",
    excerpt: "How this site is built, and why.",
    date: "2026-05-16",
    tags: ["meta"],
    readTime: 2,
    body: `This portfolio is itself a project — built in one session with **Claude Opus 4.7** as the primary collaborator, deployed on Vercel.

## Stack

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Runtime**: Bun for dev, Node on prod
- **Styling**: Tailwind v3 + custom CSS variables for theming
- **AI**: Anthropic SDK streaming from the \`/api/chat\` endpoint
- **Type**: \`Geist\` for sans, \`Geist Mono\` for accents, \`Instrument Serif\` for display headings
- **Deploy**: Vercel free tier

## Design

Single warm accent (Anthropic amber, \`#cc785c\`). Pure surfaces — no gradients except for project icons. Monospace for all metadata labels (mono = editorial signal). Sharp 6-10px corners. Dark first, light theme toggle.

## The chat-first home

The landing IS a chat. Visitors type a question, the response streams from Claude Haiku with embedded project cards. If no \`ANTHROPIC_API_KEY\` is set, a canned-reply system takes over with regex-based intent matching — still streams chunk-by-chunk so the UI feels live.

## Why chat-first

Most engineer portfolios are static — a hero, a grid of project cards, an about section, a contact button. Generic. Forgettable.

A chat-first portfolio does three things at once:
1. Proves I ship AI UX, not just write about it.
2. Lets visitors self-serve the depth they want — \`tell me about Cockpit\` vs \`what's your stack\`.
3. Creates a memorable surface — hiring managers actually remember "the guy with the chat portfolio."`,
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug && !p.draft);
}

export function listPosts(): Post[] {
  return POSTS.filter((p) => !p.draft).sort((a, b) =>
    b.date.localeCompare(a.date),
  );
}
