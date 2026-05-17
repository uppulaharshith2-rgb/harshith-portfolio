"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Writing" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = (localStorage.getItem("theme") as "dark" | "light" | null) ?? "dark";
    setTheme(t);
    if (t === "light") document.documentElement.classList.add("light");
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    if (next === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  };

  return (
    <header
      style={{
        borderBottom: "1px solid var(--border-subtle)",
        background: "color-mix(in srgb, var(--bg-primary) 90%, transparent)",
        backdropFilter: "saturate(180%) blur(8px)",
        position: "sticky",
        top: 0,
        zIndex: 40,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <Link
          href="/"
          className="mono"
          style={{
            color: "var(--text-primary)",
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span className="status-dot" />
          harshith<span style={{ color: "var(--accent)" }}>.dev</span>
        </Link>

        <nav style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {NAV.map((n) => {
            const active = pathname === n.href || (n.href !== "/" && pathname.startsWith(n.href));
            return (
              <Link
                key={n.href}
                href={n.href}
                className="mono"
                style={{
                  padding: "8px 12px",
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: active ? "var(--accent)" : "var(--text-secondary)",
                  textDecoration: "none",
                  borderRadius: 6,
                  background: active ? "var(--accent-bg)" : "transparent",
                  transition: "all 0.15s ease",
                }}
              >
                {n.label}
              </Link>
            );
          })}

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="mono"
            style={{
              marginLeft: 8,
              padding: "8px 10px",
              fontSize: 11,
              border: "1px solid var(--border)",
              borderRadius: 6,
              background: "var(--surface)",
              color: "var(--text-secondary)",
              cursor: "pointer",
              minWidth: 36,
            }}
          >
            {mounted ? (theme === "dark" ? "☾" : "☀") : "·"}
          </button>
        </nav>
      </div>
    </header>
  );
}
