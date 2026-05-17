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
