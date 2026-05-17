import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        textAlign: "center",
        padding: 24,
      }}
    >
      <div className="mono-label">· 404</div>
      <h1 className="display" style={{ fontSize: 56, margin: 0 }}>
        Not found.
      </h1>
      <p style={{ color: "var(--text-secondary)", margin: "0 0 8px" }}>
        That route doesn't exist. Try the home page.
      </p>
      <Link
        href="/"
        className="mono"
        style={{
          padding: "10px 18px",
          background: "var(--accent)",
          color: "#fff",
          borderRadius: 8,
          textDecoration: "none",
          fontSize: 12,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        ← Home
      </Link>
    </div>
  );
}
