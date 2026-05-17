import Link from "next/link";

export function SiteFooter() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-subtle)",
        padding: "32px 24px 40px",
        marginTop: 60,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span className="mono-label">harshith uppula · 2026</span>
          <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
            Built with Claude Opus 4.7, deployed on Vercel.
          </span>
        </div>

        <nav style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
          <a
            href="https://github.com/uppulaharshith2-rgb"
            target="_blank"
            rel="noreferrer"
            className="mono"
            style={{
              fontSize: 12,
              color: "var(--text-secondary)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              textDecoration: "none",
            }}
          >
            GitHub ↗
          </a>
          <a
            href="https://linkedin.com/in/uppulaharshith"
            target="_blank"
            rel="noreferrer"
            className="mono"
            style={{
              fontSize: 12,
              color: "var(--text-secondary)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              textDecoration: "none",
            }}
          >
            LinkedIn ↗
          </a>
          <a
            href="mailto:uppula.harshith2@gmail.com"
            className="mono"
            style={{
              fontSize: 12,
              color: "var(--text-secondary)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              textDecoration: "none",
            }}
          >
            Email ↗
          </a>
          <Link
            href="/blog/colophon"
            className="mono"
            style={{
              fontSize: 12,
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              textDecoration: "none",
            }}
          >
            Colophon
          </Link>
        </nav>
      </div>
    </footer>
  );
}
