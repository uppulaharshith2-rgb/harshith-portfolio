"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FolderKanban,
  GitPullRequestArrow,
  Home as HomeIcon,
  Moon,
  PenLine,
  Sun,
  User,
} from "lucide-react";

const NAV = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/oss", label: "OSS", icon: GitPullRequestArrow },
  { href: "/blog", label: "Writing", icon: PenLine },
  { href: "/about", label: "About", icon: User },
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
        background: "color-mix(in srgb, var(--bg-primary) 75%, transparent)",
        backdropFilter: "saturate(180%) blur(14px)",
        WebkitBackdropFilter: "saturate(180%) blur(14px)",
        position: "sticky",
        top: 0,
        zIndex: 40,
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <Link
          href="/"
          className="wordmark-pro"
          style={{
            textDecoration: "none",
            fontSize: 15,
          }}
        >
          <span className="dot" aria-hidden />
          harshith<span className="tld">.dev</span>
        </Link>

        <nav style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {NAV.map((n) => {
            const active = pathname === n.href || (n.href !== "/" && pathname.startsWith(n.href));
            const Icon = n.icon;
            return (
              <Link
                key={n.href}
                href={n.href}
                className="mono"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 12px",
                  fontSize: 11.5,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: active ? "var(--neo-magenta)" : "var(--text-secondary)",
                  textDecoration: "none",
                  borderRadius: 999,
                  background: active ? "rgba(236, 72, 153, 0.10)" : "transparent",
                  border: active ? "1px solid rgba(236, 72, 153, 0.25)" : "1px solid transparent",
                  transition: "all 0.15s ease",
                }}
              >
                <Icon size={13} strokeWidth={2.4} aria-hidden />
                <span className="nav-label">{n.label}</span>
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
              borderRadius: 999,
              background: "var(--surface)",
              color: "var(--text-secondary)",
              cursor: "pointer",
              minWidth: 36,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {mounted ? (
              theme === "dark" ? (
                <Moon size={13} strokeWidth={2.4} aria-hidden />
              ) : (
                <Sun size={13} strokeWidth={2.4} aria-hidden />
              )
            ) : (
              <span>·</span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
