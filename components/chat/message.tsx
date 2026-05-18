"use client";

import { Fragment } from "react";
import { ProjectCard } from "@/components/projects/project-card";
import { getProject } from "@/lib/projects";

// Minimal markdown rendering — bold, code, links, lists, paragraphs.
// Done by hand to avoid an MD dep just for chat bubbles.
function renderInline(text: string, keyBase: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < text.length) {
    // **bold**
    const boldStart = text.indexOf("**", i);
    const codeStart = text.indexOf("`", i);
    const linkStart = text.indexOf("[", i);

    const next = [boldStart, codeStart, linkStart].filter((n) => n !== -1).sort((a, b) => a - b)[0];

    if (next === undefined) {
      parts.push(<Fragment key={`${keyBase}-${key++}`}>{text.slice(i)}</Fragment>);
      break;
    }

    if (next > i) {
      parts.push(<Fragment key={`${keyBase}-${key++}`}>{text.slice(i, next)}</Fragment>);
    }

    if (next === boldStart) {
      const end = text.indexOf("**", next + 2);
      if (end === -1) {
        parts.push(<Fragment key={`${keyBase}-${key++}`}>{text.slice(next)}</Fragment>);
        break;
      }
      parts.push(<strong key={`${keyBase}-${key++}`}>{text.slice(next + 2, end)}</strong>);
      i = end + 2;
    } else if (next === codeStart) {
      const end = text.indexOf("`", next + 1);
      if (end === -1) {
        parts.push(<Fragment key={`${keyBase}-${key++}`}>{text.slice(next)}</Fragment>);
        break;
      }
      parts.push(<code key={`${keyBase}-${key++}`}>{text.slice(next + 1, end)}</code>);
      i = end + 1;
    } else if (next === linkStart) {
      const closeBracket = text.indexOf("]", next);
      const openParen = closeBracket !== -1 ? text.charAt(closeBracket + 1) === "(" : false;
      const closeParen = openParen ? text.indexOf(")", closeBracket + 2) : -1;
      if (closeBracket === -1 || !openParen || closeParen === -1) {
        parts.push(<Fragment key={`${keyBase}-${key++}`}>{text.slice(next, next + 1)}</Fragment>);
        i = next + 1;
        continue;
      }
      const label = text.slice(next + 1, closeBracket);
      const url = text.slice(closeBracket + 2, closeParen);
      parts.push(
        <a key={`${keyBase}-${key++}`} href={url} target="_blank" rel="noreferrer">
          {label}
        </a>,
      );
      i = closeParen + 1;
    }
  }

  return parts;
}

type Block =
  | { kind: "text"; text: string }
  | { kind: "project"; slug: string }
  | { kind: "list"; items: string[] }
  | { kind: "suggestion"; text: string };

function parseContent(content: string): Block[] {
  const blocks: Block[] = [];
  const lines = content.split("\n");
  let buffer: string[] = [];
  let list: string[] | null = null;

  const flushBuffer = () => {
    if (buffer.length > 0) {
      blocks.push({ kind: "text", text: buffer.join("\n").trim() });
      buffer = [];
    }
  };
  const flushList = () => {
    if (list && list.length > 0) {
      blocks.push({ kind: "list", items: list });
    }
    list = null;
  };

  for (const raw of lines) {
    const line = raw.trimEnd();

    const projMatch = line.match(/^\[\[PROJECT:([a-z0-9-]+)\]\]\s*$/i);
    if (projMatch) {
      flushBuffer();
      flushList();
      blocks.push({ kind: "project", slug: projMatch[1].toLowerCase() });
      continue;
    }

    const suggMatch = line.match(/^>\s+(.+)$/);
    if (suggMatch) {
      flushBuffer();
      flushList();
      blocks.push({ kind: "suggestion", text: suggMatch[1].trim() });
      continue;
    }

    const listMatch = line.match(/^[-*]\s+(.+)$/);
    if (listMatch) {
      flushBuffer();
      list = list ?? [];
      list.push(listMatch[1]);
      continue;
    }

    if (line.trim() === "") {
      flushBuffer();
      flushList();
      continue;
    }

    flushList();
    buffer.push(line);
  }
  flushBuffer();
  flushList();

  return blocks;
}

export function Message({
  role,
  content,
  streaming = false,
  onSuggestion,
}: {
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
  onSuggestion?: (text: string) => void;
}) {
  const blocks = parseContent(content);

  return (
    <div className={`bubble-pro ${role}`}>
      {role === "assistant" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 12,
            paddingBottom: 10,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <span
            aria-hidden
            style={{
              width: 22,
              height: 22,
              borderRadius: 6,
              background: "var(--gradient-burn)",
              backgroundSize: "200% 200%",
              animation: "gradientShift 5s ease-in-out infinite",
              boxShadow: "0 0 16px rgba(236, 72, 153, 0.4)",
            }}
          />
          <span
            className="mono"
            style={{
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "var(--text-muted)",
            }}
          >
            harshith
          </span>
          {streaming && (
            <span
              className="mono"
              style={{
                marginLeft: "auto",
                color: "var(--neo-magenta)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--neo-magenta)",
                  boxShadow: "var(--glow-magenta)",
                }}
              />
              streaming
            </span>
          )}
        </div>
      )}

      <div className="prose-chat">
        {blocks.map((block, idx) => {
          if (block.kind === "project") {
            const proj = getProject(block.slug);
            if (!proj) return null;
            return <ProjectCard key={idx} project={proj} embedded />;
          }
          if (block.kind === "list") {
            return (
              <ul key={idx}>
                {block.items.map((item, i) => (
                  <li key={i}>{renderInline(item, `${idx}-${i}`)}</li>
                ))}
              </ul>
            );
          }
          if (block.kind === "suggestion") {
            return (
              <button
                key={idx}
                type="button"
                onClick={() => onSuggestion?.(block.text)}
                className="prompt-chip-pro"
                style={{ marginTop: 8, marginRight: 8, fontSize: 11.5 }}
              >
                <span className="lead">›</span> {block.text}
              </button>
            );
          }
          const isLast = idx === blocks.length - 1;
          return (
            <p key={idx} style={{ margin: "8px 0", lineHeight: 1.62 }}>
              {renderInline(block.text, String(idx))}
              {streaming && isLast && <span className="cursor" />}
            </p>
          );
        })}
      </div>
    </div>
  );
}
