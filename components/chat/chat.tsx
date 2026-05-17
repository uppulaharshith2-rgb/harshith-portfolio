"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Message } from "./message";

type ChatMessage = { role: "user" | "assistant"; content: string };

const SUGGESTED_PROMPTS = [
  "What have you shipped this year?",
  "What's your most ambitious project?",
  "Tell me about Cockpit",
  "What's your stack?",
  "Are you open to roles?",
  "Show me PipeCode",
];

const ROTATING_PLACEHOLDERS = [
  "Ask me what I've built…",
  "Try: 'what's your most ambitious project?'",
  "Try: 'tell me about Claude Hub'",
  "Try: 'are you open to roles?'",
  "Try: 'what stack do you use?'",
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
    <div className="chat-shell">
      {messages.length === 0 ? (
        <EmptyState onPrompt={send} placeholderIdx={placeholderIdx} />
      ) : (
        <div style={{ marginBottom: 24 }}>
          {messages.map((m, i) => (
            <Message
              key={i}
              role={m.role}
              content={m.content || (streaming && i === messages.length - 1 ? "" : "")}
              streaming={streaming && i === messages.length - 1}
              onSuggestion={send}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}

      <div style={{ position: "sticky", bottom: 16, zIndex: 10 }}>
        <div style={{ position: "relative" }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={ROTATING_PLACEHOLDERS[placeholderIdx]}
            rows={1}
            className="chat-input"
            style={{ minHeight: 56, maxHeight: 180 }}
          />
          <button
            type="button"
            onClick={() => send(input)}
            disabled={!input.trim() || streaming}
            className="chat-send"
            aria-label="Send"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 8,
            padding: "0 6px",
            fontSize: 11,
            color: "var(--text-dim)",
          }}
          className="mono"
        >
          <span>
            <kbd
              style={{
                padding: "2px 6px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 4,
                fontSize: 10,
              }}
            >
              ⌘K
            </kbd>{" "}
            focus ·{" "}
            <kbd
              style={{
                padding: "2px 6px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 4,
                fontSize: 10,
              }}
            >
              Enter
            </kbd>{" "}
            send
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
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyState({
  onPrompt,
  placeholderIdx,
}: {
  onPrompt: (t: string) => void;
  placeholderIdx: number;
}) {
  return (
    <div style={{ paddingTop: 40, paddingBottom: 32, animation: "fadeInUp 0.6s ease-out both" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
        <span className="status-dot" />
        <span className="mono-label">available · open to senior/staff roles</span>
      </div>

      <h1
        className="display"
        style={{
          fontSize: "clamp(40px, 7vw, 72px)",
          margin: "0 0 18px",
          color: "var(--text-primary)",
        }}
      >
        Hi, I'm Harshith.
        <br />
        Ask me what I've{" "}
        <span className="under-accent" style={{ color: "var(--accent)" }}>
          built
        </span>
        .
      </h1>

      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: 17,
          lineHeight: 1.55,
          maxWidth: 540,
          margin: "0 0 28px",
        }}
      >
        Senior data engineer by day, indie AI builder by night. I ship with Claude.
        This page is a chat — type anything below, or pick a starter ↓
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {SUGGESTED_PROMPTS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPrompt(p)}
            className="prompt-chip"
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
