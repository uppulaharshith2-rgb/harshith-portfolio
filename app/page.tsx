import { Chat } from "@/components/chat/chat";
import { PROJECTS } from "@/lib/projects";
import Link from "next/link";

export default function HomePage() {
  const live = PROJECTS.filter((p) => p.status === "live").slice(0, 4);

  return (
    <div>
      {/* Grid background behind hero */}
      <div
        className="grid-bg"
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          height: "min(100vh, 900px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <section
        style={{
          position: "relative",
          zIndex: 1,
          padding: "60px 24px 48px",
        }}
      >
        <Chat />
      </section>

      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "48px 24px 72px",
          borderTop: "1px solid var(--border-subtle)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: 24,
            gap: 12,
          }}
        >
          <div>
            <div className="mono-label" style={{ marginBottom: 6 }}>
              live · {live.length}
            </div>
            <h2
              className="display"
              style={{ fontSize: "clamp(32px, 4.4vw, 48px)", margin: 0 }}
            >
              Things I've{" "}
              <span className="under-accent" style={{ color: "var(--accent)" }}>
                shipped
              </span>
            </h2>
          </div>
          <Link
            href="/projects"
            className="mono"
            style={{
              fontSize: 12,
              color: "var(--accent)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              textDecoration: "none",
              alignSelf: "end",
            }}
          >
            All projects →
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          {live.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="proj-card"
              style={{ display: "block" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 5,
                    background: `linear-gradient(135deg, ${p.accentColor}, ${p.accentColor}55)`,
                    display: "inline-block",
                    boxShadow: `0 0 10px ${p.accentColor}33`,
                  }}
                />
                <span style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)" }}>
                  {p.name}
                </span>
              </div>
              <p
                style={{
                  fontSize: 13.5,
                  color: "var(--text-secondary)",
                  lineHeight: 1.55,
                  margin: 0,
                  minHeight: 40,
                }}
              >
                {p.tagline}
              </p>
              <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 4 }}>
                {p.techStack.slice(0, 3).map((t) => (
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
      </section>

      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "24px 24px 56px",
        }}
      >
        <div
          className="surface"
          style={{
            padding: "28px 28px",
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            alignItems: "center",
            justifyContent: "space-between",
            background:
              "linear-gradient(135deg, var(--accent-bg), transparent), var(--surface)",
            borderColor: "var(--accent-border)",
          }}
        >
          <div>
            <div className="mono-label" style={{ marginBottom: 6, color: "var(--accent)" }}>
              · open to senior / staff AI DE roles
            </div>
            <h3
              className="display"
              style={{
                fontSize: "clamp(22px, 3vw, 30px)",
                margin: "0 0 4px",
                color: "var(--text-primary)",
              }}
            >
              Hiring for AI infra, data, or eval?
            </h3>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: 14,
                margin: 0,
              }}
            >
              Anthropic, OpenAI, xAI, Databricks-tier — happy to talk. 20-min intro.
            </p>
          </div>
          <a
            href="mailto:uppula.harshith2@gmail.com?subject=Role%20inquiry"
            className="mono"
            style={{
              padding: "12px 18px",
              background: "var(--accent)",
              color: "#fff",
              borderRadius: 8,
              textDecoration: "none",
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontWeight: 600,
            }}
          >
            Email me →
          </a>
        </div>
      </section>
    </div>
  );
}
