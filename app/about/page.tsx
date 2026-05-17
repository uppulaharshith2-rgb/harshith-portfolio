import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Who I am, what I'm working on, and how I work.",
};

export default function AboutPage() {
  return (
    <div style={{ maxWidth: 780, margin: "0 auto", padding: "60px 24px 80px" }}>
      <header style={{ marginBottom: 36 }}>
        <div className="mono-label" style={{ marginBottom: 8 }}>· about</div>
        <h1
          className="display"
          style={{ fontSize: "clamp(40px, 6vw, 60px)", margin: "0 0 14px" }}
        >
          I'm{" "}
          <span className="under-accent" style={{ color: "var(--accent)" }}>
            Harshith
          </span>
          .
        </h1>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: 18,
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          Senior data engineer by day. Indie AI builder by night. I ship with Claude.
        </p>
      </header>

      <section className="prose-chat" style={{ fontSize: 16, lineHeight: 1.72 }}>
        <h2 className="mono-label" style={{ color: "var(--accent)", marginTop: 0 }}>
          · How I work
        </h2>
        <p>
          I build production-grade tools mostly solo, mostly at night, mostly with{" "}
          <strong>Claude Opus 4.7</strong> as my primary collaborator. Claude Code on the Max plan,
          custom skills for the parts I do repeatedly, a multi-agent orchestrator (
          <strong>Forge</strong>) for the parts that fan out.
        </p>
        <p>
          The thread connecting everything I ship is{" "}
          <strong>compounding leverage per unit of solo time</strong>. Every tool I build either
          saves me time, generates leverage on a long-tail problem (like the Cockpit job pipeline
          or the SecondBrain vault), or compounds my taste (Claude Hub).
        </p>

        <h2 className="mono-label" style={{ color: "var(--accent)", marginTop: 32 }}>
          · What I'm currently looking for
        </h2>
        <p>
          A <strong>Senior or Staff AI Data Engineer</strong> role at a top AI lab, pre-IPO infra
          unicorn, or AI-native product company. I'm targeting work where the data layer is the
          product — eval pipelines, training data infra, RAG/vector systems, agentic workflows on
          warehouse-scale data.
        </p>
        <ul>
          <li>Anthropic, OpenAI, xAI, Mistral — top of list</li>
          <li>Databricks, Snowflake, Stripe, Ramp — strong fits</li>
          <li>Series B-D AI infra (LangChain, LlamaIndex, Pinecone, Modal-tier)</li>
        </ul>

        <h2 className="mono-label" style={{ color: "var(--accent)", marginTop: 32 }}>
          · What makes me different
        </h2>
        <ul>
          <li>
            <strong>Practitioner credibility</strong> — I do the work in production at Meta-scale,
            not just write about it.
          </li>
          <li>
            <strong>Founder bandwidth</strong> — I built and run PipeCode (DE interview prep) solo.
            Real product, real users, real revenue.
          </li>
          <li>
            <strong>AI-native operating model</strong> — Claude is in every workflow, not bolted
            on. Forge, SecondBrain, and Cockpit are evidence.
          </li>
          <li>
            <strong>Velocity</strong> — I shipped three full UI iterations of Claude Hub in one
            session.{" "}
            <Link href="/projects/claude-hub" style={{ color: "var(--accent)" }}>
              Receipts here.
            </Link>
          </li>
        </ul>

        <h2 className="mono-label" style={{ color: "var(--accent)", marginTop: 32 }}>
          · Reach me
        </h2>
        <p>
          Email is best:{" "}
          <a href="mailto:uppula.harshith2@gmail.com">uppula.harshith2@gmail.com</a>. I read
          everything and reply to most.
        </p>
        <p>
          GitHub:{" "}
          <a
            href="https://github.com/uppulaharshith2-rgb"
            target="_blank"
            rel="noreferrer"
          >
            uppulaharshith2-rgb
          </a>
          . LinkedIn:{" "}
          <a
            href="https://linkedin.com/in/uppulaharshith"
            target="_blank"
            rel="noreferrer"
          >
            uppulaharshith
          </a>
          .
        </p>
      </section>
    </div>
  );
}
