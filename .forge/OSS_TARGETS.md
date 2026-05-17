# OSS contribution plan — Claude ecosystem

> 10 prioritized PR targets in the Anthropic / Claude / MCP ecosystem.
> Each `OSS_PR` queue item should pull from this list. Update with outcomes
> as PRs land. **Karpathy rule** — rewrite stale entries, don't append duplicates.

## Prioritization rubric

For each target, score 1-3 on each axis:
- **Visibility** — how many devs will see the PR?
- **Effort** — how many hours to produce a quality PR? (lower = better)
- **Relevance** — how directly does it signal Senior/Staff AI DE candidacy?

Priority = Visibility + Relevance - Effort.

## Tier 1 — high-leverage, ship first

### 1. `anthropic-cookbook` — add a data-engineering example
- Repo: github.com/anthropics/anthropic-cookbook
- Pitch: add a notebook showing Claude orchestrating a real DE pipeline (e.g., dbt model generation from a sample schema, or PySpark UDF synthesis from a natural-language spec).
- Why: huge official-Anthropic visibility. Direct DE relevance.
- Effort: ~6h (notebook + writeup + PR description)
- Score: V3 + R3 − E2 = **4**

### 2. `awesome-claude-code` — add Forge + SecondBrain + portfolio entries
- Repo: github.com/awesome-claude-code/awesome-claude-code (or similar awesome-list)
- Pitch: PR adding entries for Forge (multi-agent orchestrator), SecondBrain (vault skills), and the chat-first portfolio pattern.
- Why: SEO + discovery for the user's own OSS projects.
- Effort: ~1h
- Score: V2 + R2 − E1 = **3**

### 3. `mcp-server-*` — pick a popular MCP server and add a real bug fix or feature
- Repo: scan github.com/modelcontextprotocol/servers issues
- Pitch: pick the most-starred MCP server with a beginner-friendly open issue.
- Why: MCP is hot, contributions read as "I understand the protocol."
- Effort: ~4h (depends on the issue)
- Score: V3 + R3 − E2 = **4**

## Tier 2 — medium leverage

### 4. `claude-code` repo — doc fix or example
- Repo: github.com/anthropics/claude-code
- Pitch: find a doc with a stale model name, broken example, or unclear edge case. Fix it.
- Why: official-Anthropic visibility, low effort.
- Effort: ~2h
- Score: V3 + R2 − E1 = **4**

### 5. `langchain-anthropic` integration — add tool use example
- Repo: github.com/langchain-ai/langchain (in `libs/partners/anthropic/`)
- Pitch: add a clean tool-use example showing Claude calling typed tools end-to-end.
- Why: LangChain has massive audience.
- Effort: ~3h
- Score: V3 + R2 − E2 = **3**

### 6. `dbt-claude` or similar AI×DE OSS — start one if missing
- Pitch: if a Claude×dbt integration doesn't exist as an OSS plugin, create the seed.
- Why: at the intersection of AI + DE — the candidate's exact specialty.
- Effort: ~10h (full new project)
- Score: V2 + R3 − E3 = **2** (high effort but high signal)

### 7. `prefect`, `dagster`, or `airflow` — add a Claude task type / operator
- Pitch: contribute a `ClaudeOperator` for one of the orchestration tools.
- Why: bridges classic DE infra with AI — exact candidacy fit.
- Effort: ~5h
- Score: V2 + R3 − E2 = **3**

### 8. `litellm` or similar router — add or improve Claude routing logic
- Repo: github.com/BerriAI/litellm
- Pitch: find an open issue about Claude routing, fix it.
- Why: actively maintained, lots of devs use it.
- Effort: ~3h
- Score: V2 + R2 − E2 = **2**

## Tier 3 — opportunistic

### 9. A small Claude SDK PR in any popular dev-tool repo
- Pitch: find a dev tool (Zed, Cursor, Continue, Aider) where Claude support has a gap. File a fix.
- Why: developer-tool ecosystem visibility.
- Effort: variable
- Score: opportunistic

### 10. Write a Claude skill, publish to a public-skills repo
- Pitch: extract one of the SecondBrain skills (`/research-deep`, `/process-inbox`) and contribute it to a public skills marketplace if one exists.
- Why: cross-pollinates with the SecondBrain repo.
- Effort: ~2h
- Score: V2 + R2 − E1 = **3**

## Execution notes

- One PR per `OSS_PR` tick. The nightly tick picks the highest-priority unstarted item.
- Each PR should follow the target repo's CONTRIBUTING.md — read it first.
- Open a draft PR first if the change is non-trivial — solicit maintainer feedback before sinking 8 hours.
- Commit as `uppula.harshith2@gmail.com` so author attribution flows back to the portfolio profile.

## Completed

(empty — first OSS_PR tick hasn't fired)
