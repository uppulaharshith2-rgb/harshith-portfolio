"use client";

import { CSSProperties, ReactNode, useCallback, useEffect, useRef, useState } from "react";

export function Aurora({
  tone = "warm",
  spotlight = true,
  children,
  style,
}: {
  tone?: "warm" | "cool";
  spotlight?: boolean;
  children: ReactNode;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!spotlight) return;
    const el = ref.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width) * 100;
      const my = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mx", `${mx}%`);
      el.style.setProperty("--my", `${my}%`);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [spotlight]);

  return (
    <div ref={ref} style={{ position: "relative", isolation: "isolate", ...style }}>
      <div className={`aurora ${tone === "cool" ? "cool" : ""}`} aria-hidden />
      <div className="neo-grid" aria-hidden />
      {spotlight && <div className="spotlight" aria-hidden />}
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </div>
  );
}

export function KineticTitle({
  text,
  gradient,
  stagger = 26,
  delay = 0,
  italic = false,
}: {
  text: string;
  gradient?: "burn" | "signal" | "ember" | "sunrise" | "deep";
  stagger?: number;
  delay?: number;
  italic?: boolean;
}) {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPlay(false);
      return;
    }
    const t = setTimeout(() => setPlay(true), 60);
    return () => clearTimeout(t);
  }, []);

  const cls = `kinetic ${play ? "play" : ""} ${gradient ? `text-${gradient}` : ""}`;

  return (
    <span className={cls} style={italic ? { fontStyle: "italic" } : undefined}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className={`char ${ch === " " ? "space" : ""}`}
          style={{ animationDelay: `${delay + i * stagger}ms` }}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}

export function CounterStat({
  target,
  suffix = "",
  duration = 1400,
  label,
  gradient = "burn",
}: {
  target: number;
  suffix?: string;
  duration?: number;
  label: string;
  gradient?: "burn" | "signal" | "ember" | "sunrise" | "deep";
}) {
  const [val, setVal] = useState(target);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(target);
      return;
    }
    setVal(0);
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.floor(eased * target));
      if (t < 1) raf = requestAnimationFrame(step);
      else setVal(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span className={`stat-num text-${gradient}`}>
        {val.toLocaleString()}
        {suffix}
      </span>
      <span className="eyebrow-pro">
        <span className="line" />
        {label}
      </span>
    </div>
  );
}

export function Marquee({
  children,
  pauseOnHover = true,
}: {
  children: ReactNode;
  pauseOnHover?: boolean;
}) {
  return (
    <div className={`marquee ${pauseOnHover ? "marquee-pause" : ""}`}>
      <div className="marquee-track">
        {children}
        {children}
      </div>
    </div>
  );
}

export function TiltCard({
  accent,
  monogram,
  title,
  tagline,
  tags,
  status = "live",
  liveUrl,
  repoUrl,
  internalHref,
  year,
  span = 2,
}: {
  accent: string;
  monogram: string;
  title: string;
  tagline: string;
  tags: string[];
  status?: string;
  liveUrl?: string;
  repoUrl?: string;
  internalHref?: string;
  year: string;
  span?: 2 | 3 | 4 | 6;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const px = x / r.width;
    const py = y / r.height;
    const rx = (0.5 - py) * 10;
    const ry = (px - 0.5) * 12;
    el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    el.style.setProperty("--sx", `${px * 100}%`);
    el.style.setProperty("--sy", `${py * 100}%`);
  }, []);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(1200px) rotateX(0) rotateY(0)";
  }, []);

  const href = internalHref ?? liveUrl ?? repoUrl ?? "#";
  const external = !internalHref;

  const cardStyle = {
    "--card-accent": `linear-gradient(135deg, ${accent}, ${accent}55)`,
  } as CSSProperties;

  return (
    <a
      ref={ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={`tilt-card span-${span}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={cardStyle}
    >
      <div style={{ position: "relative", zIndex: 2 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <span
            className="tilt-mono"
            style={{
              background: `linear-gradient(135deg, ${accent}, ${accent}66)`,
              boxShadow: `0 0 28px ${accent}55, inset 0 1px 0 rgba(255,255,255,0.15)`,
            }}
          >
            {monogram}
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span className="live-dot">
              <span className="core" />
            </span>
            <span className="eyebrow-pro" style={{ fontSize: 10 }}>
              {status} · {year}
            </span>
          </span>
        </div>

        <h3
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 26,
            fontWeight: 600,
            margin: "0 0 8px",
            letterSpacing: "-0.03em",
            lineHeight: 1.12,
            color: "var(--text-primary)",
          }}
        >
          {title}
        </h3>

        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: 14,
            lineHeight: 1.55,
            margin: "0 0 16px",
          }}
        >
          {tagline}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
          {tags.slice(0, 5).map((t) => (
            <span key={t} className="chip-pro" style={{ fontSize: 10, padding: "4px 10px" }}>
              {t}
            </span>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: 14,
          }}
        >
          {liveUrl && (
            <span className="eyebrow-pro" style={{ color: "var(--neo-cyan)", fontSize: 11 }}>
              Live ↗
            </span>
          )}
          {repoUrl && (
            <span className="eyebrow-pro" style={{ fontSize: 11 }}>
              Code ↗
            </span>
          )}
          <span className="eyebrow-pro" style={{ marginLeft: "auto", fontSize: 11 }}>
            Read more →
          </span>
        </div>
      </div>
    </a>
  );
}

export function MagneticButton({
  href,
  children,
  external = true,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * 0.15}px, ${y * 0.18}px) scale(1.02)`;
  }, []);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="btn-magnetic"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </a>
  );
}

export function GradientOrb({
  color,
  size = 360,
  left,
  right,
  top,
  bottom,
  delay = 0,
}: {
  color: string;
  size?: number;
  left?: number | string;
  right?: number | string;
  top?: number | string;
  bottom?: number | string;
  delay?: number;
}) {
  return (
    <div
      className="gradient-orb"
      aria-hidden
      style={{
        background: color,
        width: size,
        height: size,
        left,
        right,
        top,
        bottom,
        animationDelay: `${delay}s`,
      }}
    />
  );
}
