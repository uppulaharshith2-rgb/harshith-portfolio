"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Message } from "./message";

type ChatMessage = { role: "user" | "assistant"; content: string };

const SUGGESTED_PROMPTS = [
  "What have you shipped this year?",
  "Tell me about Cockpit",
  "What's your stack?",
  "Are you open to roles?",
  "Show me PipeCode",
  "What's the Forge?",
];

const ROTATING_PLACEHOLDERS = [
  "ask anything — projects, OSS, stack, roles…",
  "try: what's your most ambitious project?",
  "try: tell me about Claude Hub",
  "try: are you open to roles?",
  "try: what's the governance suite?",
];

export function Chat({ initialPrompt }: { initialPrompt?: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (messages.length === 0) {
      const id = setInterval(() => {
        setPlaceholderIdx((i) => (i + 1) % ROTATING_PLACEHOLDERS.length);
      }, 3200);
      return () => clearInterval(id);
    }
  }, [messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || streaming) return;

      const userMsg: ChatMessage = { role: "user", content: trimmed };
      const nextHistory = [...messages, userMsg];
      setMessages([...nextHistory, { role: "assistant", content: "" }]);
      setInput("");
      setStreaming(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: nextHistory }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          throw new Error(`Request failed: ${res.status}`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let assistantContent = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          assistantContent += decoder.decode(value, { stream: true });
          setMessages([...nextHistory, { role: "assistant", content: assistantContent }]);
        }
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setMessages([
          ...nextHistory,
          {
            role: "assistant",
            content: `_(network error: ${(err as Error).message}. Try again, or email me at uppula.harshith2@gmail.com.)_`,
          },
        ]);
      } finally {
        setStreaming(false);
        abortRef.current = null;
      }
    },
    [messages, streaming],
  );

  useEffect(() => {
    if (initialPrompt && messages.length === 0) {
      send(initialPrompt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt]);

  // Self-demonstrate: auto-fire a representative question on first visit so the
  // chat shows itself working without requiring a click. Guarded by sessionStorage.
  useEffect(() => {
    if (initialPrompt) return;
    if (messages.length > 0 || streaming) return;
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem("autoseed-done") === "1") return;
    } catch {
      return;
    }
    const t = setTimeout(() => {
      try {
        sessionStorage.setItem("autoseed-done", "1");
      } catch {
        /* ignore */
      }
      send("What have you shipped this year?");
    }, 1800);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const reset = () => {
    abortRef.current?.abort();
    setMessages([]);
    setInput("");
  };

  return (
    <div style={{ width: "100%", maxWidth: 820, margin: "0 auto" }}>
      {messages.length === 0 ? (
        <PromptStrip onPrompt={send} />
      ) : (
        <div style={{ marginBottom: 18, textAlign: "left" }}>
          {messages.map((m, i) => (
            <Message
              key={i}
              role={m.role}
              content={m.content || ""}
              streaming={streaming && i === messages.length - 1}
              onSuggestion={send}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}

      <div style={{ position: "relative" }}>
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={ROTATING_PLACEHOLDERS[placeholderIdx]}
          rows={1}
          className="chat-pro-input"
          style={{ minHeight: 70, maxHeight: 180, textAlign: "left" }}
        />
        <button
          type="button"
          onClick={() => send(input)}
          disabled={!input.trim() || streaming}
          className="chat-pro-send"
          aria-label="Send"
        >
          <ArrowRight size={18} strokeWidth={2.6} aria-hidden />
        </button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 10,
          padding: "0 6px",
          fontSize: 10.5,
          color: "var(--text-dim)",
          fontFamily: "var(--font-mono)",
          letterSpacing: "0.04em",
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <span aria-hidden style={{ display: "inline-flex", alignItems: "center" }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--neo-lime)",
                boxShadow: "var(--glow-lime)",
                marginRight: 6,
              }}
            />
            powered by claude haiku
          </span>
          <span style={{ color: "var(--text-dim)" }}>·</span>
          <kbd
            style={{
              padding: "2px 6px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 4,
              fontSize: 10,
            }}
          >
            ⌘K
          </kbd>
          <span>focus</span>
          <span style={{ color: "var(--text-dim)" }}>·</span>
          <kbd
            style={{
              padding: "2px 6px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 4,
              fontSize: 10,
            }}
          >
            Enter
          </kbd>
          <span>send</span>
        </span>
        {messages.length > 0 && (
          <button
            onClick={reset}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--text-muted)",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              fontSize: 10.5,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            reset
          </button>
        )}
      </div>
    </div>
  );
}

function PromptStrip({ onPrompt }: { onPrompt: (t: string) => void }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        justifyContent: "center",
        marginBottom: 14,
        animation: "fadeInUp 0.5s ease-out both",
      }}
    >
      {SUGGESTED_PROMPTS.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onPrompt(p)}
          className="prompt-chip-pro"
        >
          <ChevronRight size={12} strokeWidth={2.4} aria-hidden className="lead" />
          {p}
        </button>
      ))}
    </div>
  );
}
