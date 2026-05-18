import Link from "next/link";
import { ExternalLink, Github, Linkedin, Mail, ScrollText } from "lucide-react";

export function SiteFooter() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-subtle)",
        padding: "44px 24px 56px",
        marginTop: 60,
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          gap: 24,
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Link
            href="/"
            className="wordmark-pro"
            style={{ textDecoration: "none", fontSize: 17 }}
          >
            <span className="dot" aria-hidden />
            harshith<span className="tld">.dev</span>
          </Link>
          <span
            style={{
              fontSize: 13,
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            uppula.harshith2@gmail.com · san jose, ca
          </span>
          <span style={{ fontSize: 12, color: "var(--text-dim)", marginTop: 4 }}>
            Built with Claude Opus 4.7. Deployed on Vercel.
          </span>
        </div>

        <nav style={{ display: "flex", gap: 18, flexWrap: "wrap", alignItems: "center" }}>
          <FooterLink
            href="https://github.com/uppulaharshith2-rgb"
            label="GitHub"
            icon={<Github size={14} strokeWidth={2.4} aria-hidden />}
            external
          />
          <FooterLink
            href="https://linkedin.com/in/uppulaharshith"
            label="LinkedIn"
            icon={<Linkedin size={14} strokeWidth={2.4} aria-hidden />}
            external
          />
          <FooterLink
            href="mailto:uppula.harshith2@gmail.com"
            label="Email"
            icon={<Mail size={14} strokeWidth={2.4} aria-hidden />}
          />
          <FooterLink
            href="/blog/colophon"
            label="Colophon"
            icon={<ScrollText size={14} strokeWidth={2.4} aria-hidden />}
            internal
          />
        </nav>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  label,
  icon,
  external,
  internal,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  external?: boolean;
  internal?: boolean;
}) {
  const className = "mono";
  const style: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontSize: 11.5,
    color: "var(--text-secondary)",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    textDecoration: "none",
  };

  if (internal) {
    return (
      <Link href={href} className={className} style={style}>
        {icon}
        {label}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={className}
      style={style}
    >
      {icon}
      {label}
      {external && <ExternalLink size={11} strokeWidth={2.4} aria-hidden />}
    </a>
  );
}
