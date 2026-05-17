import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT, cannedReply } from "@/lib/system-prompt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: NextRequest) {
  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return new Response("Bad JSON", { status: 400 });
  }

  const messages = (body.messages ?? []).filter(
    (m): m is ChatMessage =>
      !!m &&
      (m.role === "user" || m.role === "assistant") &&
      typeof m.content === "string" &&
      m.content.length > 0 &&
      m.content.length < 4000,
  );

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return new Response("Last message must be from user", { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  const encoder = new TextEncoder();

  // Fallback path: no API key → stream a canned reply chunk-by-chunk so the UI still feels live.
  if (!apiKey) {
    const reply = cannedReply(messages[messages.length - 1].content);
    const stream = new ReadableStream({
      async start(controller) {
        for (let i = 0; i < reply.length; i += 8) {
          controller.enqueue(encoder.encode(reply.slice(i, i + 8)));
          await new Promise((r) => setTimeout(r, 18));
        }
        controller.close();
      },
    });
    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8", "X-Source": "canned" },
    });
  }

  const client = new Anthropic({ apiKey });

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const result = await client.messages.stream({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 800,
          system: SYSTEM_PROMPT,
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
        });

        for await (const event of result) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        controller.enqueue(
          encoder.encode(`\n\n_(API error: ${msg.slice(0, 200)})_`),
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "X-Source": "anthropic" },
  });
}
