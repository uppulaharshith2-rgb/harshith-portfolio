import Link from "next/link";
import type { Metadata } from "next";
import { listContributions, contributionStats } from "@/lib/oss";

export const metadata: Metadata = {
  title: "Open source",
  description:
    "Every PR I've filed, every repo I've published, every Claude skill I've released — receipts for the AI builder claim.",
};

const KIND_LABEL: Record<string, string> = {
  pr: "PR",
  repo: "Repo",
  skill: "Skill",
  issue: "Issue",
};

const STATUS_COLOR: Record<string, string> = {
  open: "var(--warning)",
  merged: "var(--success)",
  closed: "var(--text-dim)",
  draft: "var(--text-muted)",
  published: "var(--success)",
};

export default function OssPage() {
  const contributions = listContributions();
  const stats = contributionStats();

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 24px 80px" }}>
      <header style={{ marginBottom: 40 }}>
        <div className="mono-label" style={{ marginBottom: 8 }}>
          · open source · {stats.total} contributions · {stats.open} open · {stats.merged} merged
        </div>
        <h1
          className="display"
          style={{ fontSize: "clamp(40px, 6vw, 60px)", margin: "0 0 14px" }}
        >
          Public{" "}
          <span className="under-accent" style={{ color: "var(--accent)" }}>
            receipts
          </span>
        </h1>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: 17,
            maxWidth: 620,
            margin: 0,
            lineHeight: 1.55,
          }}
        >
          Every pull request I've filed, every repo I've published, every Claude skill I've
          shipped. Receipts for the AI builder claim — diffs, test counts, links, dates.
        </p>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 12,
          marginBottom: 48,
        }}
      >
        <Stat label="contributions" value={String(stats.total)} />
        <Stat label="public PRs" value={String(stats.prs)} accent />
        <Stat label="OSS repos" value={String(stats.repos)} accent />
        <Stat label="merged" value={String(stats.merged)} />
        <Stat label="open" value={String(stats.open)} />
      </div>

      <div style={{ display: "grid", gap: 20 }}>
        {contributions.map((c) => (
          <article
            key={c.slug}
            className="proj-card"
            style={{ padding: 24, display: "block" }}
          >
            <header
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 14,
                marginBottom: 12,
                flexWrap: "wrap",
              }}
            >
              <div style={{ flex: "1 1 320px", minWidth: 0 }}>
                <div
                  className="mono"
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    fontSize: 11,
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: 8,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      padding: "2px 8px",
                      borderRadius: 4,
                      background: "var(--accent-bg)",
                      color: "var(--accent)",
                      border: "1px solid var(--accent-border)",
                    }}
                  >
                    {KIND_LABEL[c.kind] ?? c.kind}
                  </span>
                  <span>{c.repo}</span>
                  <span>·</span>
                  <span>{c.date}</span>
                  <span>·</span>
                  <span
                    style={{ display: "inline-flex", alignItems: "center", gap: 5 }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: STATUS_COLOR[c.status] ?? "var(--text-muted)",
                        boxShadow: `0 0 6px ${STATUS_COLOR[c.status] ?? "var(--text-muted)"}`,
                      }}
                    />
                    {c.status}
                  </span>
                </div>
                <h2
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    margin: "0 0 4px",
                    letterSpacing: "-0.015em",
                    lineHeight: 1.3,
                  }}
                >
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    {c.title} <span style={{ color: "var(--accent)", fontWeight: 400 }}>↗</span>
                  </a>
                </h2>
              </div>

              {c.stats && (
                <div
                  className="mono"
                  style={{
                    display: "flex",
                    gap: 14,
                    fontSize: 11,
                    color: "var(--text-secondary)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    flexShrink: 0,
                    paddingTop: 24,
                  }}
                >
                  {c.stats.files !== undefined && (
                    <span>
                      <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                        {c.stats.files}
                      </span>{" "}
                      files
                    </span>
                  )}
                  {c.stats.additions !== undefined && (
                    <span>
                      <span style={{ color: "var(--success)", fontWeight: 600 }}>
                        +{c.stats.additions}
                      </span>
                    </span>
                  )}
                  {c.stats.deletions !== undefined && (
                    <span>
                      <span style={{ color: "var(--danger)", fontWeight: 600 }}>
                        −{c.stats.deletions}
                      </span>
                    </span>
                  )}
                  {c.stats.tests !== undefined && (
                    <span>
                      <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                        {c.stats.tests}
                      </span>{" "}
                      tests
                    </span>
                  )}
                </div>
              )}
            </header>

            <p
              style={{
                fontSize: 15,
                lineHeight: 1.65,
                color: "var(--text-secondary)",
                margin: "0 0 16px",
              }}
            >
              {c.summary}
            </p>

            {c.highlights.length > 0 && (
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 16px",
                  display: "grid",
                  gap: 6,
                }}
              >
                {c.highlights.map((h, i) => (
                  <li
                    key={i}
                    style={{
                      paddingLeft: 20,
                      position: "relative",
                      fontSize: 14,
                      color: "var(--text-secondary)",
                      lineHeight: 1.55,
                    }}
                  >
                    <span
                      className="mono"
                      style={{
                        position: "absolute",
                        left: 0,
                        color: "var(--accent)",
                        fontSize: 13,
                      }}
                    >
                      →
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            )}

            <div
              style={{
                fontSize: 13.5,
                lineHeight: 1.6,
                color: "var(--text-muted)",
                fontStyle: "italic",
                paddingTop: 12,
                borderTop: "1px solid var(--border-subtle)",
              }}
            >
              <span
                className="mono"
                style={{
                  fontStyle: "normal",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  fontSize: 10.5,
                  color: "var(--accent)",
                  marginRight: 8,
                }}
              >
                Why
              </span>
              {c.whyItMatters}
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 4,
                marginTop: 14,
              }}
            >
              {c.tags.map((t) => (
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
          </article>
        ))}
      </div>

      <footer
        style={{
          marginTop: 56,
          paddingTop: 28,
          borderTop: "1px solid var(--border-subtle)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: 14,
            margin: "0 0 8px",
          }}
        >
          New contributions land here automatically as the portfolio forge loop ships them.
        </p>
        <Link
          href="/"
          className="mono"
          style={{
            fontSize: 11,
            color: "var(--accent)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            textDecoration: "none",
          }}
        >
          ← Back to chat
        </Link>
      </footer>
    </div>
  );
}

function Stat({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      className="surface"
      style={{
        padding: "16px 18px",
        textAlign: "left",
      }}
    >
      <div
        className="mono-label"
        style={{
          marginBottom: 6,
          color: accent ? "var(--accent)" : "var(--text-muted)",
        }}
      >
        {label}
      </div>
      <div
        className="display"
        style={{
          fontSize: 28,
          color: "var(--text-primary)",
          lineHeight: 1,
        }}
      >
        {value}
      </div>
    </div>
  );
}
