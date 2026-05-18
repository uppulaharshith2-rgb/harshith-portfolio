import Link from "next/link";
import type { Metadata } from "next";
import { PROJECTS } from "@/lib/projects";
import { ProjectIcon } from "@/components/projects/project-icon";

export const metadata: Metadata = {
  title: "Projects",
  description: "Everything I've shipped — live products, AI tools, open source, and experiments.",
};

const CATEGORY_ORDER: Array<typeof PROJECTS[number]["category"]> = [
  "saas",
  "agent",
  "system",
  "tool",
  "skill",
  "library",
];

const CATEGORY_COPY: Record<typeof PROJECTS[number]["category"], string> = {
  saas: "SaaS",
  tool: "Tools",
  skill: "Claude skills",
  agent: "Agents",
  system: "Systems",
  library: "Libraries",
};

export default function ProjectsPage() {
  const byCategory = CATEGORY_ORDER.map((cat) => ({
    cat,
    items: PROJECTS.filter((p) => p.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px 80px" }}>
      <header style={{ marginBottom: 48 }}>
        <div className="mono-label" style={{ marginBottom: 8 }}>
          · {PROJECTS.length} projects · {PROJECTS.filter((p) => p.status === "live").length} live
        </div>
        <h1
          className="display"
          style={{ fontSize: "clamp(40px, 6vw, 64px)", margin: "0 0 12px" }}
        >
          Everything I've{" "}
          <span className="under-accent" style={{ color: "var(--accent)" }}>
            built
          </span>
        </h1>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: 16,
            maxWidth: 640,
            margin: 0,
            lineHeight: 1.55,
          }}
        >
          Hand-curated. I don't list dead links or vapor. Everything here is something I actually
          shipped or am actively building.
        </p>
      </header>

      {(() => {
        const suite = PROJECTS.filter((p) => p.collection === "governance-suite");
        if (suite.length < 2) return null;
        return (
          <section
            style={{
              marginBottom: 64,
              padding: "28px 28px 24px",
              borderRadius: 10,
              border: "1px solid var(--border)",
              borderLeft: "3px solid var(--accent)",
              background:
                "linear-gradient(135deg, var(--accent-bg) 0%, transparent 35%), var(--bg-elevated)",
            }}
          >
            <header
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 12,
                marginBottom: 14,
              }}
            >
              <div
                className="mono-label"
                style={{ color: "var(--accent)" }}
              >
                · collection · {suite.length} live
              </div>
              <a
                href="#libraries"
                className="mono"
                style={{
                  fontSize: 11,
                  color: "var(--text-secondary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  textDecoration: "none",
                }}
              >
                dbt-style governance for prompts ↘
              </a>
            </header>
            <h2
              className="display"
              style={{
                fontSize: "clamp(26px, 3.4vw, 34px)",
                margin: "0 0 8px",
                color: "var(--text-primary)",
                letterSpacing: "-0.015em",
              }}
            >
              The governance suite for{" "}
              <span className="under-accent" style={{ color: "var(--accent)" }}>
                LLM outputs
              </span>
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: 14.5,
                lineHeight: 1.55,
                margin: "0 0 18px",
                maxWidth: 680,
              }}
            >
              Eval in dev. Contracts at runtime. Source-freshness across model upgrades.
              Port the dbt mental model — `schema.yml`, model contracts, `dbt source freshness` —
              to LLM outputs, so AI observability becomes boring instead of bespoke.
            </p>
            <div
              style={{
                borderTop: "1px solid var(--border-subtle)",
                paddingTop: 14,
                display: "grid",
                gap: 8,
              }}
            >
              {suite.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 12px",
                    borderRadius: 6,
                    background: "transparent",
                    color: "inherit",
                    textDecoration: "none",
                    transition: "background 0.15s ease",
                  }}
                  className="surface-hover"
                >
                  <span
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 8,
                      background: `linear-gradient(135deg, ${p.accentColor}, ${p.accentColor}66)`,
                      boxShadow: `0 0 12px ${p.accentColor}55, inset 0 1px 0 rgba(255,255,255,0.15)`,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <ProjectIcon slug={p.slug} size={16} strokeWidth={2.2} />
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: "var(--text-primary)",
                        letterSpacing: "-0.015em",
                      }}
                    >
                      {p.name}
                    </div>
                    <div
                      style={{
                        fontSize: 12.5,
                        color: "var(--text-muted)",
                        lineHeight: 1.4,
                        marginTop: 2,
                      }}
                    >
                      {p.highlights[0]}
                    </div>
                  </div>
                  <div
                    className="mono"
                    style={{
                      fontSize: 10.5,
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {p.status} · {p.year} →
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })()}

      {byCategory.map(({ cat, items }) => (
        <section key={cat} id={cat} style={{ marginBottom: 64 }}>
          <div
            className="mono-label"
            style={{
              marginBottom: 18,
              paddingBottom: 12,
              borderBottom: "1px solid var(--border-subtle)",
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <span style={{ color: "var(--accent)", fontSize: 12 }}>
              · {CATEGORY_COPY[cat]}
            </span>
            <span>{items.length}</span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 16,
            }}
          >
            {items.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="proj-card"
                style={{ display: "block" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 10,
                  }}
                >
                  <span
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: `linear-gradient(135deg, ${p.accentColor}, ${p.accentColor}66)`,
                      boxShadow: `0 0 14px ${p.accentColor}55, inset 0 1px 0 rgba(255,255,255,0.15)`,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <ProjectIcon slug={p.slug} size={18} strokeWidth={2.2} />
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 17,
                        fontWeight: 600,
                        color: "var(--text-primary)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {p.name}
                    </div>
                    <div
                      className="mono"
                      style={{
                        fontSize: 10.5,
                        color: "var(--text-muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginTop: 2,
                      }}
                    >
                      {p.status} · {p.year}
                    </div>
                  </div>
                </div>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--text-secondary)",
                    lineHeight: 1.55,
                    margin: "10px 0 14px",
                    minHeight: 65,
                  }}
                >
                  {p.tagline}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {p.techStack.slice(0, 4).map((t) => (
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
      ))}
    </div>
  );
}
