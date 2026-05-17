"use client";

import { Fragment } from "react";

function renderInline(text: string, base: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  let i = 0;
  let k = 0;

  while (i < text.length) {
    const bold = text.indexOf("**", i);
    const code = text.indexOf("`", i);
    const link = text.indexOf("[", i);

    const candidates = [bold, code, link].filter((n) => n !== -1).sort((a, b) => a - b);
    const next = candidates[0];

    if (next === undefined) {
      out.push(<Fragment key={`${base}-${k++}`}>{text.slice(i)}</Fragment>);
      break;
    }

    if (next > i) {
      out.push(<Fragment key={`${base}-${k++}`}>{text.slice(i, next)}</Fragment>);
    }

    if (next === bold) {
      const end = text.indexOf("**", next + 2);
      if (end === -1) {
        out.push(<Fragment key={`${base}-${k++}`}>{text.slice(next)}</Fragment>);
        break;
      }
      out.push(<strong key={`${base}-${k++}`}>{text.slice(next + 2, end)}</strong>);
      i = end + 2;
    } else if (next === code) {
      const end = text.indexOf("`", next + 1);
      if (end === -1) {
        out.push(<Fragment key={`${base}-${k++}`}>{text.slice(next)}</Fragment>);
        break;
      }
      out.push(<code key={`${base}-${k++}`}>{text.slice(next + 1, end)}</code>);
      i = end + 1;
    } else if (next === link) {
      const closeBr = text.indexOf("]", next);
      const opensParen = closeBr !== -1 && text.charAt(closeBr + 1) === "(";
      const closeParen = opensParen ? text.indexOf(")", closeBr + 2) : -1;
      if (closeBr === -1 || !opensParen || closeParen === -1) {
        out.push(<Fragment key={`${base}-${k++}`}>{text.slice(next, next + 1)}</Fragment>);
        i = next + 1;
        continue;
      }
      const label = text.slice(next + 1, closeBr);
      const url = text.slice(closeBr + 2, closeParen);
      out.push(
        <a key={`${base}-${k++}`} href={url} target={url.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
          {label}
        </a>,
      );
      i = closeParen + 1;
    }
  }

  return out;
}

export function Markdown({ source }: { source: string }) {
  const lines = source.split("\n");
  const blocks: React.ReactNode[] = [];
  let buf: string[] = [];
  let list: string[] | null = null;

  const flushPara = () => {
    if (buf.length === 0) return;
    blocks.push(
      <p key={`p-${blocks.length}`} style={{ margin: "14px 0", lineHeight: 1.72 }}>
        {renderInline(buf.join(" "), `p-${blocks.length}`)}
      </p>,
    );
    buf = [];
  };
  const flushList = () => {
    if (!list) return;
    blocks.push(
      <ul key={`ul-${blocks.length}`}>
        {list.map((item, i) => (
          <li key={i}>{renderInline(item, `ul-${blocks.length}-${i}`)}</li>
        ))}
      </ul>,
    );
    list = null;
  };

  for (const raw of lines) {
    const line = raw.trimEnd();

    if (line.startsWith("## ")) {
      flushPara();
      flushList();
      blocks.push(
        <h2
          key={`h-${blocks.length}`}
          className="mono-label"
          style={{
            color: "var(--accent)",
            marginTop: 32,
            marginBottom: 12,
            fontSize: 12,
          }}
        >
          · {line.slice(3)}
        </h2>,
      );
      continue;
    }
    if (line.startsWith("> ")) {
      flushPara();
      flushList();
      blocks.push(
        <blockquote
          key={`bq-${blocks.length}`}
          style={{
            margin: "18px 0",
            padding: "14px 18px",
            borderLeft: "3px solid var(--accent)",
            background: "var(--accent-bg)",
            color: "var(--text-primary)",
            fontStyle: "italic",
            borderRadius: "0 6px 6px 0",
          }}
        >
          {renderInline(line.slice(2), `bq-${blocks.length}`)}
        </blockquote>,
      );
      continue;
    }
    const liMatch = line.match(/^[-*]\s+(.+)$/);
    if (liMatch) {
      flushPara();
      list = list ?? [];
      list.push(liMatch[1]);
      continue;
    }
    if (line.trim() === "") {
      flushPara();
      flushList();
      continue;
    }
    flushList();
    buf.push(line);
  }
  flushPara();
  flushList();

  return <div className="prose-chat">{blocks}</div>;
}
