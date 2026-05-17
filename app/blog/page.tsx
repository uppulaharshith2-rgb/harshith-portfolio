import Link from "next/link";
import type { Metadata } from "next";
import { listPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on AI-native building, Claude, data engineering, and what I'm shipping.",
};

export default function BlogPage() {
  const posts = listPosts();

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px 80px" }}>
      <header style={{ marginBottom: 40 }}>
        <div className="mono-label" style={{ marginBottom: 8 }}>· writing · {posts.length} posts</div>
        <h1
          className="display"
          style={{ fontSize: "clamp(40px, 6vw, 60px)", margin: "0 0 12px" }}
        >
          Notes on{" "}
          <span className="under-accent" style={{ color: "var(--accent)" }}>
            building
          </span>{" "}
          with Claude
        </h1>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: 16,
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          Working notes. Mostly while I'm shipping something, sometimes after.
        </p>
      </header>

      <div style={{ display: "grid", gap: 14 }}>
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="proj-card"
            style={{ display: "block" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: 14,
                marginBottom: 6,
              }}
            >
              <h2
                style={{
                  fontSize: 19,
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.015em",
                  margin: 0,
                }}
              >
                {p.title}
              </h2>
              <span
                className="mono"
                style={{
                  fontSize: 11,
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  whiteSpace: "nowrap",
                }}
              >
                {p.date} · {p.readTime}m
              </span>
            </div>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: 14.5,
                lineHeight: 1.6,
                margin: "6px 0 10px",
              }}
            >
              {p.excerpt}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="mono"
                  style={{
                    fontSize: 10,
                    padding: "2px 6px",
                    borderRadius: 3,
                    background: "var(--surface-active)",
                    color: "var(--text-muted)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
