# harshith-portfolio

Chat-first portfolio for Harshith Uppula's AI builder work.
Next.js 16 · TypeScript · Bun · Tailwind v3 · Anthropic SDK · Vercel.

## Dev

```bash
bun install
bun dev
```

Visit http://localhost:3000.

## Env

Optional. Without `ANTHROPIC_API_KEY` the chat falls back to canned replies that still stream chunk-by-chunk.

```bash
ANTHROPIC_API_KEY=sk-ant-...
```

## Deploy

`vercel --prod` from the project root, or push to `main` with Vercel GitHub integration enabled.

## Structure

```
app/
  page.tsx                 ← chat-first landing
  api/chat/route.ts        ← streaming Claude endpoint (fallback when no API key)
  projects/                ← list + detail pages (driven by lib/projects.ts)
  blog/                    ← list + detail pages (driven by lib/posts.ts)
  about/                   ← static about
components/
  chat/                    ← chat shell + message rendering
  projects/                ← project cards
  ui/                      ← header, footer, markdown renderer
lib/
  projects.ts              ← project data (add new builds here)
  posts.ts                 ← blog data
  system-prompt.ts         ← Claude system prompt + canned fallback replies
```

## Adding new work

- **New project**: append to `PROJECTS` in `lib/projects.ts`. Picks up everywhere automatically.
- **New blog post**: append to `POSTS` in `lib/posts.ts`. Markdown body supports `**bold**`, `code`, `[links](url)`, `## headings`, `> quotes`, and `- lists`.
- **New chat intent**: add a regex + reply to `CANNED_REPLIES` in `lib/system-prompt.ts` for the no-API-key path.
```
