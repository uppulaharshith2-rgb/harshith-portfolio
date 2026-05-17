import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPost, listPosts } from "@/lib/posts";
import { Markdown } from "@/components/ui/markdown";

export function generateStaticParams() {
  return listPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article style={{ maxWidth: 720, margin: "0 auto", padding: "60px 24px 80px" }}>
      <Link
        href="/blog"
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
        ← All writing
      </Link>

      <header style={{ marginTop: 24, marginBottom: 32 }}>
        <div className="mono-label" style={{ marginBottom: 10 }}>
          · {post.date} · {post.readTime} min read
        </div>
        <h1
          className="display"
          style={{ fontSize: "clamp(34px, 5vw, 50px)", margin: "0 0 16px" }}
        >
          {post.title}
        </h1>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: 17,
            lineHeight: 1.55,
            margin: 0,
          }}
        >
          {post.excerpt}
        </p>
        <div
          style={{
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
            marginTop: 18,
            paddingBottom: 24,
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          {post.tags.map((t) => (
            <span
              key={t}
              className="mono"
              style={{
                fontSize: 10.5,
                padding: "3px 8px",
                borderRadius: 4,
                background: "var(--surface-active)",
                color: "var(--text-secondary)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </header>

      <Markdown source={post.body} />

      <footer
        style={{
          marginTop: 56,
          paddingTop: 28,
          borderTop: "1px solid var(--border-subtle)",
        }}
      >
        <div
          className="mono"
          style={{
            fontSize: 12,
            color: "var(--text-secondary)",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span>
            Reach me:{" "}
            <a
              href="mailto:uppula.harshith2@gmail.com"
              style={{ color: "var(--accent)" }}
            >
              uppula.harshith2@gmail.com
            </a>
          </span>
          <Link href="/blog" style={{ color: "var(--text-secondary)" }}>
            ← more writing
          </Link>
        </div>
      </footer>
    </article>
  );
}
