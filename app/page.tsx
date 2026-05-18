import { Chat } from "@/components/chat/chat";
import {
  Aurora,
  CounterStat,
  GradientOrb,
  KineticTitle,
  MagneticButton,
  Marquee,
  TiltCard,
} from "@/components/ui/pro-max";
import { CONTRIBUTIONS } from "@/lib/oss";
import { POSTS } from "@/lib/posts";
import { PROJECTS, projectMonogram } from "@/lib/projects";
import { ArrowDown, ArrowRight, ExternalLink, Github, Mail, Sparkles } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const live = PROJECTS.filter((p) => p.status === "live");
  const featured: { slug: string; span: 2 | 3 | 4 }[] = [
    { slug: "claude-hub", span: 3 },
    { slug: "cockpit", span: 3 },
    { slug: "pipecode", span: 2 },
    { slug: "forge", span: 2 },
    { slug: "dbt-eval", span: 2 },
    { slug: "prompt-lineage", span: 3 },
    { slug: "secondbrain-kit", span: 3 },
  ];
  const featuredProjects = featured
    .map(({ slug, span }) => ({ proj: live.find((p) => p.slug === slug), span }))
    .filter((x): x is { proj: NonNullable<typeof x.proj>; span: 2 | 3 | 4 } => !!x.proj);

  const totalTests = PROJECTS.filter((p) =>
    ["dbt-eval", "prompt-contracts", "prompt-freshness", "prompt-lineage", "llm-expectations", "corpus-snapshot", "fixture-lineage"].includes(p.slug),
  ).length;

  const tickerItems: { color: "lime" | "magenta" | "cyan" | "amber" | "violet"; verb: string; target: string; detail: string }[] = [
    { color: "cyan", verb: "live", target: "claude-hub", detail: "181 curated resources · 8 types" },
    { color: "lime", verb: "shipped", target: "dbt-eval v0", detail: "41 tests passing in 0.51s" },
    { color: "magenta", verb: "merged", target: "litellm PR #28113", detail: "+346 / -0 · 21 new tests" },
    { color: "violet", verb: "shipped", target: "prompt-lineage", detail: "78 tests · dbt-docs for prompts" },
    { color: "amber", verb: "running", target: "cockpit", detail: "12 daemons · 12 weeks" },
    { color: "cyan", verb: "shipped", target: "llm-expectations", detail: "9 expectation types · PII masking" },
    { color: "lime", verb: "shipped", target: "corpus-snapshot", detail: "git status for RAG corpora" },
    { color: "magenta", verb: "shipped", target: "fixture-lineage", detail: "Ed25519 signed chain-of-custody" },
    { color: "violet", verb: "live", target: "pipecode", detail: "active SaaS · DE interview prep" },
    { color: "amber", verb: "shipped", target: "forge", detail: "11 personas · file-bus orchestration" },
  ];

  return (
    <div>
      {/* ─── HERO ──────────────────────────────────────────────────── */}
      <Aurora tone="warm" spotlight>
        <GradientOrb color="rgba(204, 120, 92, 0.45)" size={420} left="-12%" top="10%" />
        <GradientOrb color="rgba(236, 72, 153, 0.32)" size={360} right="-8%" top="20%" delay={3} />
        <GradientOrb color="rgba(167, 139, 250, 0.32)" size={300} left="40%" bottom="-10%" delay={6} />

        <section
          style={{
            position: "relative",
            maxWidth: 1280,
            margin: "0 auto",
            padding: "72px 24px 56px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22, textAlign: "center" }}>
            <span className="chip-pro gradient">
              <Sparkles size={12} strokeWidth={2.4} aria-hidden />
              <span style={{ color: "var(--neo-lime)" }}>shipping</span>
              <span style={{ opacity: 0.6 }}>·</span>
              <span>open to staff AI DE roles</span>
            </span>

            <h1
              className="display"
              style={{
                fontSize: "clamp(48px, 8vw, 116px)",
                margin: 0,
                lineHeight: 0.96,
                letterSpacing: "-0.04em",
                maxWidth: 1100,
              }}
            >
              <KineticTitle text="Hey, I'm Harshith." stagger={26} />
              <br />
              <span style={{ fontStyle: "italic" }}>
                <KineticTitle text="I build with " stagger={26} delay={520} />
                <KineticTitle text="Claude." stagger={26} delay={780} gradient="burn" />
              </span>
            </h1>

            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: 18,
                lineHeight: 1.55,
                maxWidth: 640,
                margin: "4px auto 8px",
              }}
            >
              Senior data engineer by day, indie AI builder by night. Eleven public repos, a merged PR into a 47k-star
              library, three live products in twelve weeks. This page is a chat — ask me anything.
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginTop: 4 }}>
              <MagneticButton href="mailto:uppula.harshith2@gmail.com?subject=Role%20inquiry" external={false}>
                <Mail size={16} strokeWidth={2.4} aria-hidden />
                <span>Email me</span>
                <ArrowRight size={16} strokeWidth={2.4} aria-hidden />
              </MagneticButton>
              <a href="#shipped" className="btn-ghost-pro">
                See what I&apos;ve shipped
                <ArrowDown size={14} strokeWidth={2.4} aria-hidden />
              </a>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 28,
                marginTop: 40,
                paddingTop: 32,
                paddingBottom: 32,
                width: "100%",
                maxWidth: 960,
                borderTop: "1px solid var(--border-subtle)",
                borderBottom: "1px solid var(--border-subtle)",
              }}
              className="hero-stats"
            >
              <CounterStat target={181} label="curated Claude resources" gradient="ember" />
              <CounterStat target={428} label={`passing tests · ${totalTests} OSS repos`} gradient="signal" />
              <CounterStat target={47} suffix="k" label="stars in repos I've shipped to" gradient="burn" />
              <CounterStat target={POSTS.length} label="essays written" gradient="deep" />
            </div>

            <div style={{ width: "100%", marginTop: 8 }}>
              <Chat />
            </div>
          </div>
        </section>
      </Aurora>

      {/* ─── LIVE TICKER ───────────────────────────────────────────── */}
      <section
        style={{
          borderTop: "1px solid var(--border-subtle)",
          borderBottom: "1px solid var(--border-subtle)",
          padding: "18px 0",
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--bg-elevated) 80%, transparent), transparent)",
        }}
      >
        <Marquee>
          {tickerItems.map((it, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: `var(--neo-${it.color})`,
                  boxShadow: `var(--glow-${it.color})`,
                }}
                aria-hidden
              />
              <span className="eyebrow-pro" style={{ color: `var(--neo-${it.color})` }}>
                {it.verb}
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--text-primary)" }}>
                {it.target}
              </span>
              <span style={{ color: "var(--text-muted)", fontSize: 13 }}>{it.detail}</span>
              <span style={{ color: "var(--text-dim)", margin: "0 4px" }}>◆</span>
            </span>
          ))}
        </Marquee>
      </section>

      {/* ─── SHIPPED BENTO ─────────────────────────────────────────── */}
      <section
        id="shipped"
        style={{ maxWidth: 1280, margin: "0 auto", padding: "88px 24px 48px" }}
      >
        <header
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
            marginBottom: 40,
          }}
        >
          <div style={{ maxWidth: 760 }}>
            <span className="eyebrow-pro">
              <span className="line" />
              · shipped · {live.length} · 2026
            </span>
            <h2
              className="display"
              style={{
                fontSize: "clamp(40px, 6vw, 76px)",
                margin: "12px 0 0",
                letterSpacing: "-0.035em",
                lineHeight: 1.04,
              }}
            >
              Things I&apos;ve{" "}
              <span className="text-signal" style={{ fontStyle: "italic" }}>
                shipped
              </span>
              <span style={{ color: "var(--neo-magenta)" }}>.</span>
            </h2>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: 14, maxWidth: 380, lineHeight: 1.55, margin: 0 }}>
            Tilt a card to feel it. Hover for the shine. Every link goes to a live repo, live URL, or live demo —
            nothing is vapor.
          </p>
        </header>

        <div className="bento">
          {featuredProjects.map(({ proj, span }) => (
            <TiltCard
              key={proj.slug}
              accent={proj.accentColor ?? "#cc785c"}
              monogram={projectMonogram(proj.slug, proj.name)}
              title={proj.name}
              tagline={proj.tagline}
              tags={proj.techStack}
              status={proj.status}
              liveUrl={proj.liveUrl}
              repoUrl={proj.repoUrl}
              internalHref={`/projects/${proj.slug}`}
              year={proj.year}
              span={span}
            />
          ))}
        </div>

        <div style={{ marginTop: 32, display: "flex", justifyContent: "center" }}>
          <Link
            href="/projects"
            className="btn-ghost-pro"
            style={{ textDecoration: "none" }}
          >
            All {PROJECTS.length} projects
            <ArrowRight size={14} strokeWidth={2.4} aria-hidden />
          </Link>
        </div>
      </section>

      {/* ─── OSS LANES ─────────────────────────────────────────────── */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "56px 24px 40px" }}>
        <header style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 36 }}>
          <div>
            <span className="eyebrow-pro">
              <span className="line" />
              · open source · {CONTRIBUTIONS.length} contributions
            </span>
            <h2
              className="display"
              style={{
                fontSize: "clamp(32px, 4.4vw, 52px)",
                margin: "12px 0 0",
                letterSpacing: "-0.03em",
                lineHeight: 1.06,
              }}
            >
              Public{" "}
              <span className="text-burn" style={{ fontStyle: "italic" }}>
                receipts
              </span>
              .
            </h2>
          </div>
          <Link
            href="/oss"
            className="mono"
            style={{
              fontSize: 12,
              color: "var(--neo-cyan)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            All contributions <ArrowRight size={14} strokeWidth={2.4} aria-hidden />
          </Link>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 14,
          }}
        >
          {[
            { label: "Governance suite", count: 4, accent: "var(--neo-magenta)", glow: "var(--glow-magenta)", note: "dbt-eval · prompt-contracts · prompt-freshness · prompt-lineage" },
            { label: "Training-data quality", count: 3, accent: "var(--neo-cyan)", glow: "var(--glow-cyan)", note: "llm-expectations · corpus-snapshot · fixture-lineage" },
            { label: "Upstream PRs", count: 2, accent: "var(--neo-lime)", glow: "var(--glow-lime)", note: "litellm · claude-agent-sdk-python" },
            { label: "Orchestration", count: 1, accent: "var(--neo-amber)", glow: "var(--glow-amber)", note: "forge — multi-agent dev system" },
          ].map((lane) => (
            <div
              key={lane.label}
              className="surface"
              style={{
                padding: 20,
                background: "var(--bg-elevated)",
                borderColor: "var(--border-subtle)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: 1,
                  background: lane.accent,
                  boxShadow: lane.glow,
                  opacity: 0.7,
                }}
              />
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12 }}>
                <span className="eyebrow-pro" style={{ color: lane.accent }}>
                  {lane.label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 32,
                    color: "var(--text-primary)",
                    fontVariantNumeric: "tabular-nums",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}
                >
                  {lane.count}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: 12.5, color: "var(--text-secondary)", lineHeight: 1.55, fontFamily: "var(--font-mono)" }}>
                {lane.note}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── HIRING CTA ────────────────────────────────────────────── */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "56px 24px 96px" }}>
        <div
          style={{
            position: "relative",
            isolation: "isolate",
            borderRadius: 24,
            padding: "56px 48px",
            overflow: "hidden",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              zIndex: -1,
              background: "var(--gradient-burn)",
              backgroundSize: "200% 200%",
              animation: "gradientShift 10s ease-in-out infinite",
              filter: "saturate(110%)",
            }}
          />
          <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: -1, background: "rgba(8,8,8,0.78)" }} />
          <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: -1, opacity: 0.4 }} className="neo-grid" />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 32,
              flexWrap: "wrap",
            }}
          >
            <div style={{ maxWidth: 720 }}>
              <span className="eyebrow-pro" style={{ color: "var(--neo-cyan)" }}>
                <span className="line" />
                · open · senior / staff AI DE
              </span>
              <h3
                className="display"
                style={{
                  fontSize: "clamp(34px, 4.2vw, 54px)",
                  margin: "18px 0 14px",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.08,
                  color: "#fafafa",
                }}
              >
                Hiring for AI infra,{" "}
                <span className="text-signal" style={{ fontStyle: "italic" }}>
                  data
                </span>
                , or <span className="text-burn">eval</span>?
              </h3>
              <p style={{ color: "rgba(250,250,250,0.7)", fontSize: 16, lineHeight: 1.6, margin: 0 }}>
                Anthropic, OpenAI, xAI, Databricks-tier — happy to talk. 20-minute intro. The receipts are{" "}
                <a href="#shipped" style={{ color: "var(--neo-cyan)", textDecoration: "underline" }}>
                  right above
                </a>
                .
              </p>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <MagneticButton href="mailto:uppula.harshith2@gmail.com?subject=Role%20inquiry" external={false}>
                <Mail size={16} strokeWidth={2.4} aria-hidden />
                <span>Email me</span>
                <ArrowRight size={16} strokeWidth={2.4} aria-hidden />
              </MagneticButton>
              <a
                href="https://github.com/uppulaharshith2-rgb"
                target="_blank"
                rel="noreferrer"
                className="btn-ghost-pro"
              >
                <Github size={14} strokeWidth={2.4} aria-hidden />
                GitHub
                <ExternalLink size={12} strokeWidth={2.4} aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
