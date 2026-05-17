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
  metadataBase: new URL("https://harshith-portfolio.vercel.app"),
  title: {
    default: "Harshith Uppula — AI builder, Claude-native projects",
    template: "%s · Harshith Uppula",
  },
  description:
    "I build with Claude. Ask me what I've shipped — Cockpit, Claude Hub, PipeCode, AI skills, open source.",
  keywords: [
    "Harshith Uppula",
    "AI Engineer",
    "Claude",
    "Anthropic",
    "Data Engineer",
    "Cockpit",
    "Claude Hub",
    "PipeCode",
    "open source",
  ],
  authors: [{ name: "Harshith Uppula" }],
  creator: "Harshith Uppula",
  openGraph: {
    title: "Harshith Uppula — AI builder",
    description: "Ask me what I've shipped.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harshith Uppula — AI builder",
    description: "Ask me what I've shipped.",
  },
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
      </head>
      <body className="antialiased">
        <SiteHeader />
        <main className="min-h-[calc(100vh-140px)]">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
