import Link from "next/link";
import { Project, projectMonogram } from "@/lib/projects";

const STATUS_COPY: Record<Project["status"], { label: string; color: string }> = {
  live: { label: "Live", color: "var(--success)" },
  "in-progress": { label: "In progress", color: "var(--warning)" },
  planned: { label: "Planned", color: "var(--text-muted)" },
  archived: { label: "Archived", color: "var(--text-dim)" },
};

export function ProjectCard({ project, embedded = false }: { project: Project; embedded?: boolean }) {
  const status = STATUS_COPY[project.status];
  const accent = project.accentColor ?? "var(--accent)";
  const href = `/projects/${project.slug}`;

  return (
    <div
      className="proj-card"
      style={{
        position: "relative",
        marginTop: embedded ? 12 : 0,
        marginBottom: embedded ? 12 : 0,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            className="mono"
            style={{
              width: 32,
              height: 32,
              borderRadius: 6,
              background: `linear-gradient(135deg, ${accent}, ${accent}55)`,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 12px ${accent}33`,
              fontSize: 12,
              fontWeight: 600,
              color: "#fff",
              letterSpacing: "0.04em",
              flexShrink: 0,
            }}
          >
            {projectMonogram(project.slug, project.name)}
          </span>
          <Link
            href={href}
            style={{
              fontSize: 17,
              fontWeight: 600,
              color: "var(--text-primary)",
              textDecoration: "none",
              letterSpacing: "-0.01em",
            }}
          >
            {project.name}
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: status.color,
              boxShadow: `0 0 6px ${status.color}`,
            }}
          />
          <span
            className="mono"
            style={{
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--text-muted)",
            }}
          >
            {status.label} · {project.year}
          </span>
        </div>
      </div>

      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: 14.5,
          lineHeight: 1.55,
          margin: "0 0 12px",
        }}
      >
        {project.oneLiner}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
        {project.techStack.slice(0, 5).map((t) => (
          <span
            key={t}
            className="mono"
            style={{
              fontSize: 10.5,
              padding: "3px 8px",
              borderRadius: 4,
              background: "var(--surface-active)",
              color: "var(--text-secondary)",
              letterSpacing: "0.02em",
            }}
          >
            {t}
          </span>
        ))}
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="mono"
            style={{
              fontSize: 11,
              color: "var(--accent)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            Live ↗
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="mono"
            style={{
              fontSize: 11,
              color: "var(--text-secondary)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              textDecoration: "none",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            Code ↗
          </a>
        )}
        <Link
          href={href}
          className="mono"
          style={{
            fontSize: 11,
            color: "var(--text-secondary)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            textDecoration: "none",
            marginLeft: "auto",
          }}
        >
          Read more →
        </Link>
      </div>
    </div>
  );
}
