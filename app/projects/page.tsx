import Link from "next/link";
import type { Metadata } from "next";
import { PROJECTS } from "@/lib/projects";

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

      {byCategory.map(({ cat, items }) => (
        <section key={cat} style={{ marginBottom: 64 }}>
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
                      width: 26,
                      height: 26,
                      borderRadius: 6,
                      background: `linear-gradient(135deg, ${p.accentColor}, ${p.accentColor}55)`,
                      boxShadow: `0 0 12px ${p.accentColor}33`,
                    }}
                  />
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
