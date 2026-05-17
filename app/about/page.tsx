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
          · Receipts, not adjectives
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: 14.5, margin: "0 0 14px" }}>
          Every claim below is checkable in 30 seconds. No vibes.
        </p>
        <ul>
          <li>
            <strong>OSS contribution to a 47k-star repo with zero regressions.</strong>{" "}
            <a
              href="https://github.com/BerriAI/litellm/pull/28113"
              target="_blank"
              rel="noreferrer"
            >
              litellm PR #28113
            </a>{" "}
            — 6 files, +346 / −0, 21 new tests, 976 existing tests still green. Read the
            two prior closed PRs first to learn why maintainers rejected them, then shipped
            a defense-in-depth fix that doesn't repeat their mistakes.{" "}
            <Link href="/blog/shipping-litellm-pr-by-reading-the-two-that-didnt" style={{ color: "var(--accent)" }}>
              Postmortem.
            </Link>
          </li>
          <li>
            <strong>Multi-agent dev on the Claude Max plan I already pay for.</strong>{" "}
            <a
              href="https://github.com/uppulaharshith2-rgb/forge"
              target="_blank"
              rel="noreferrer"
            >
              Forge
            </a>{" "}
            — 11 role personas (Builder, Critic, CSO, QA, Designer, Eng Manager, Investigator,
            Innovator, Bug Hunter, Doc Engineer, Leader), Opus 4.7 leader, file-based
            message bus, budget guard, install in one curl. Zero extra spend.
          </li>
          <li>
            <strong>Built and closed the dbt-style governance suite for prompts.</strong>{" "}
            One thesis, four public repos shipped this week, 231 combined passing tests:{" "}
            <Link href="/projects/dbt-eval" style={{ color: "var(--accent)" }}>
              dbt-eval
            </Link>{" "}
            (declare what good output looks like — 41 tests),{" "}
            <Link href="/projects/prompt-contracts" style={{ color: "var(--accent)" }}>
              prompt-contracts
            </Link>{" "}
            (enforce it at runtime — 55 tests),{" "}
            <Link href="/projects/prompt-freshness" style={{ color: "var(--accent)" }}>
              prompt-freshness
            </Link>{" "}
            (keep both honest as models shift — 57 tests), and{" "}
            <Link href="/projects/prompt-lineage" style={{ color: "var(--accent)" }}>
              prompt-lineage
            </Link>{" "}
            (dbt-docs for prompts — see how it all connects — 78 tests). Four repos that
            cite each other in their READMEs, one mental model every analytics engineer
            already knows. None compete with promptfoo, DeepEval, or Phoenix — they
            occupy the un-saturated governance layer above eval.{" "}
            <Link href="/oss" style={{ color: "var(--accent)" }}>
              See the collection.
            </Link>
          </li>
          <li>
            <strong>Opening the next thesis — training-data quality.</strong>{" "}
            With the governance suite closed,{" "}
            <Link href="/projects/llm-expectations" style={{ color: "var(--accent)" }}>
              llm-expectations
            </Link>{" "}
            ships as the first repo of a sister thesis: declarative YAML data quality
            checks for JSONL training files (SFT/DPO). Same DE-mental-model-port shape
            as the governance suite, different un-saturated niche — Lilac dead post-
            Databricks-acquisition, Argilla in HF maintenance, Cleanlab is classical-ML
            imperative, Great Expectations has no LLM primitives. v0 ships 78 passing
            tests across 9 expectation types in 0.15s. Sequel repo (corpus-snapshot —
            git status for your RAG corpus) is incumbency-confirmed and queued.
          </li>
          <li>
            <strong>Daily-use AI products I shipped solo.</strong>{" "}
            <Link href="/projects/cockpit" style={{ color: "var(--accent)" }}>
              Cockpit
            </Link>{" "}
            (12 daemons score Staff+ DE roles against my embedding, queues applications —
            emails me at 6am, 12 weeks running);{" "}
            <Link href="/projects/claude-hub" style={{ color: "var(--accent)" }}>
              Claude Hub
            </Link>{" "}
            (181 curated resources across 8 types, AI semantic search via Haiku);{" "}
            <Link href="/projects/pipecode" style={{ color: "var(--accent)" }}>
              PipeCode
            </Link>{" "}
            (real SaaS I founded — DE interview prep that runs your SQL/PySpark code).
          </li>
          <li>
            <strong>Velocity that compounds, not bursts.</strong> Three full UI iterations
            of Claude Hub in one session.{" "}
            <Link href="/projects/claude-hub" style={{ color: "var(--accent)" }}>
              The v1 → v3 build log
            </Link>{" "}
            is the receipt — including what was rejected each time and why.
          </li>
          <li>
            <strong>I run my own AI infra in public.</strong> This portfolio's content,
            blog posts, and OSS contributions all ship from a self-built forge loop —
            parallel research agents scout, an implementation agent ships one atomic
            commit per cycle, the build must be green before commit. See{" "}
            <Link href="/oss" style={{ color: "var(--accent)" }}>
              /oss
            </Link>{" "}
            for the live ledger.
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
