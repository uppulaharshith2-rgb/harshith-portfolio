import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getProject, PROJECTS } from "@/lib/projects";
import { ProjectIcon } from "@/components/projects/project-icon";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const proj = getProject(slug);
  if (!proj) return { title: "Not found" };
  return {
    title: proj.name,
    description: proj.tagline,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const accent = project.accentColor ?? "var(--accent)";
  const others = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <div style={{ maxWidth: 880, margin: "0 auto", padding: "60px 24px 80px" }}>
      <Link
        href="/projects"
        className="mono"
        style={{
          fontSize: 11,
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          textDecoration: "none",
          marginBottom: 24,
          display: "inline-block",
        }}
      >
        ← All projects
      </Link>

      <header style={{ marginTop: 24, marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
          <span
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              background: `linear-gradient(135deg, ${accent}, ${accent}66)`,
              boxShadow: `0 0 22px ${accent}55, inset 0 1px 0 rgba(255,255,255,0.15)`,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <ProjectIcon slug={project.slug} size={26} strokeWidth={2.2} />
          </span>
          <div>
            <div className="mono-label" style={{ marginBottom: 4 }}>
              · {project.category} · {project.status} · {project.year}
            </div>
            <h1
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(36px, 5vw, 54px)",
                fontWeight: 600,
                letterSpacing: "-0.035em",
                lineHeight: 1.05,
                margin: 0,
                color: "var(--text-primary)",
              }}
            >
              {project.name}
            </h1>
          </div>
        </div>

        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: 18,
            lineHeight: 1.5,
            margin: "0 0 24px",
          }}
        >
          {project.tagline}
        </p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="mono"
              style={{
                padding: "10px 16px",
                background: "var(--accent)",
                color: "#fff",
                borderRadius: 8,
                textDecoration: "none",
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Open live ↗
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="mono"
              style={{
                padding: "10px 16px",
                background: "var(--surface)",
                color: "var(--text-primary)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                textDecoration: "none",
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              View code ↗
            </a>
          )}
        </div>
      </header>

      <section style={{ marginBottom: 40 }}>
        <h2 className="mono-label" style={{ marginBottom: 12, color: "var(--accent)" }}>
          · Overview
        </h2>
        <p
          style={{
            color: "var(--text-primary)",
            fontSize: 16.5,
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          {project.description}
        </p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 className="mono-label" style={{ marginBottom: 12, color: "var(--accent)" }}>
          · Highlights
        </h2>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "grid",
            gap: 8,
          }}
        >
          {project.highlights.map((h) => (
            <li
              key={h}
              style={{
                paddingLeft: 22,
                position: "relative",
                fontSize: 15,
                color: "var(--text-secondary)",
                lineHeight: 1.6,
              }}
            >
              <span
                className="mono"
                style={{
                  position: "absolute",
                  left: 0,
                  color: "var(--accent)",
                  fontSize: 14,
                }}
              >
                →
              </span>
              {h}
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginBottom: 48 }}>
        <h2 className="mono-label" style={{ marginBottom: 12, color: "var(--accent)" }}>
          · Stack
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {project.techStack.map((t) => (
            <span
              key={t}
              className="mono"
              style={{
                fontSize: 12,
                padding: "5px 10px",
                borderRadius: 4,
                background: "var(--surface)",
                color: "var(--text-primary)",
                border: "1px solid var(--border)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      <section
        style={{
          borderTop: "1px solid var(--border-subtle)",
          paddingTop: 36,
        }}
      >
        <h2 className="mono-label" style={{ marginBottom: 16, color: "var(--accent)" }}>
          · More
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 12,
          }}
        >
          {others.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="proj-card"
              style={{ display: "block", padding: 14 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <span
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 6,
                    background: `linear-gradient(135deg, ${p.accentColor}, ${p.accentColor}66)`,
                    boxShadow: `0 0 10px ${p.accentColor}44, inset 0 1px 0 rgba(255,255,255,0.15)`,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <ProjectIcon slug={p.slug} size={13} strokeWidth={2.4} />
                </span>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {p.name}
                </div>
              </div>
              <div
                style={{
                  fontSize: 12.5,
                  color: "var(--text-secondary)",
                  lineHeight: 1.4,
                }}
              >
                {p.tagline}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
