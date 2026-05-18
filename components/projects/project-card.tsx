import Link from "next/link";
import { CSSProperties } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Project, projectMonogram } from "@/lib/projects";

const STATUS_COPY: Record<Project["status"], { label: string; color: string }> = {
  live: { label: "Live", color: "var(--neo-lime)" },
  "in-progress": { label: "In progress", color: "var(--neo-amber)" },
  planned: { label: "Planned", color: "var(--text-muted)" },
  archived: { label: "Archived", color: "var(--text-dim)" },
};

export function ProjectCard({ project, embedded = false }: { project: Project; embedded?: boolean }) {
  const status = STATUS_COPY[project.status];
  const accent = project.accentColor ?? "#cc785c";
  const href = `/projects/${project.slug}`;

  const cardStyle: CSSProperties = {
    marginTop: embedded ? 12 : 0,
    marginBottom: embedded ? 12 : 0,
    "--card-accent": `linear-gradient(135deg, ${accent}, ${accent}55)`,
  } as CSSProperties;

  return (
    <Link href={href} className="proj-card" style={cardStyle}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 14,
        }}
      >
        <span
          className="tilt-mono"
          style={{
            background: `linear-gradient(135deg, ${accent}, ${accent}66)`,
            boxShadow: `0 0 24px ${accent}55, inset 0 1px 0 rgba(255,255,255,0.15)`,
            width: 42,
            height: 42,
            fontSize: 14,
          }}
        >
          {projectMonogram(project.slug, project.name)}
        </span>

        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <span
            aria-hidden
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: status.color,
              boxShadow: `0 0 8px ${status.color}`,
            }}
          />
          <span
            className="mono"
            style={{
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--text-muted)",
            }}
          >
            {status.label} · {project.year}
          </span>
        </span>
      </div>

      <h3
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 22,
          fontWeight: 600,
          margin: "0 0 8px",
          letterSpacing: "-0.025em",
          lineHeight: 1.15,
          color: "var(--text-primary)",
        }}
      >
        {project.name}
      </h3>

      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: 14,
          lineHeight: 1.55,
          margin: "0 0 14px",
        }}
      >
        {project.oneLiner}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
        {project.techStack.slice(0, 5).map((t) => (
          <span key={t} className="chip-pro" style={{ fontSize: 10, padding: "4px 10px" }}>
            {t}
          </span>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: 14,
          alignItems: "center",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: 12,
        }}
      >
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="mono"
            style={{
              fontSize: 11,
              color: "var(--neo-cyan)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            Live
            <ExternalLink size={11} strokeWidth={2.4} aria-hidden />
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
              letterSpacing: "0.1em",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            Code
            <ExternalLink size={11} strokeWidth={2.4} aria-hidden />
          </a>
        )}
        <span
          className="mono"
          style={{
            fontSize: 11,
            color: "var(--text-secondary)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginLeft: "auto",
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          Read more
          <ArrowUpRight size={12} strokeWidth={2.4} aria-hidden />
        </span>
      </div>
    </Link>
  );
}
