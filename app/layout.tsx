import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";

const sans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const display = Instrument_Serif({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://harshith-portfolio-khaki.vercel.app"),
  title: {
    default: "Harshith Uppula — AI builder, Claude-native projects",
    template: "%s · Harshith Uppula",
  },
  description:
    "Senior data engineer, indie AI builder. Shipping with Claude — Cockpit, Claude Hub, PipeCode, Forge, SecondBrain Kit. Ask the site what I've built.",
  keywords: [
    "Harshith Uppula",
    "AI Engineer",
    "Staff Data Engineer",
    "Claude",
    "Anthropic",
    "Claude Code",
    "MCP",
    "Multi-agent systems",
    "AI Data Engineer",
    "Forge",
    "Claude Hub",
    "Cockpit",
    "PipeCode",
    "open source",
  ],
  authors: [{ name: "Harshith Uppula", url: "https://github.com/uppulaharshith2-rgb" }],
  creator: "Harshith Uppula",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Harshith Uppula — AI builder",
    description: "Ask the site what I've built. Chat-first portfolio for an AI data engineer.",
    url: "https://harshith-portfolio-khaki.vercel.app",
    siteName: "harshith.dev",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harshith Uppula — AI builder",
    description: "Ask the site what I've built.",
    creator: "@uppulaharshith",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${display.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try {
                  var t = localStorage.getItem('theme');
                  if (t === 'light') document.documentElement.classList.add('light');
                } catch(e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Harshith Uppula",
              url: "https://harshith-portfolio-khaki.vercel.app",
              image: "https://harshith-portfolio-khaki.vercel.app/apple-icon.svg",
              jobTitle: "Senior Data Engineer · Indie AI Builder",
              email: "mailto:uppula.harshith2@gmail.com",
              sameAs: [
                "https://github.com/uppulaharshith2-rgb",
                "https://linkedin.com/in/uppulaharshith",
              ],
              knowsAbout: [
                "Anthropic Claude",
                "Claude Code",
                "Model Context Protocol",
                "Multi-agent systems",
                "Data engineering",
                "PySpark",
                "dbt",
                "Snowflake",
                "Vector databases",
                "RAG infrastructure",
                "Eval pipelines",
              ],
              worksFor: { "@type": "Organization", name: "PipeCode" },
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <SiteHeader />
        <main className="min-h-[calc(100vh-140px)]">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
