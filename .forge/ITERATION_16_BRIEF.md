---
title: "Iteration #16 dispatch brief — Marketplace Actions"
type: forge
created: 2026-05-17
status: ready-to-fire
---

# Iteration #16 dispatch brief — Marketplace Actions

> Drafted 2026-05-17 by the research agent during iteration #13.
> Paste verbatim into the impl-agent prompt when iteration #16 fires.

## Two new repos (siblings to existing 9 OSS repos)

- `github.com/uppulaharshith2-rgb/prompt-lineage-diff-action`
- `github.com/uppulaharshith2-rgb/corpus-snapshot-diff-action`

## Action type decision: COMPOSITE

- Python CLIs (prompt-lineage, corpus-snapshot) are on PyPI as of iter #13. Wrapper just needs `pip install <name>==<pin>`, run the subcommand, post the comment.
- Docker action = 20-40s cold start + Dockerfile maintenance burden per repo.
- JS action = either re-impl in TS (dual source-of-truth, forbidden) or shell out (in which case composite is simpler).
- Composite composes with `marocchino/sticky-pull-request-comment@v2` and `actions/upload-artifact@v4` without a Node entrypoint.

## Repo layout per action (identical for both)

```
prompt-lineage-diff-action/
├── action.yml              # Composite action metadata + branding
├── scripts/
│   ├── run-diff.sh         # pip install, run CLI, capture markdown + JSON
│   └── format-comment.py   # Wrap CLI output in sticky-comment header + collapsible sections
├── .github/
│   └── workflows/
│       ├── test.yml        # Self-test: run action against fixture PR
│       └── release.yml     # Tag → publish to Marketplace (manual approval gate)
├── examples/
│   └── usage.yml           # Drop-in workflow snippet users paste
├── tests/
│   └── fixtures/           # 2 minimal diff scenarios for self-test
├── README.md               # Usage, inputs/outputs, Marketplace badge, FAQ
├── CHANGELOG.md            # Keep-a-changelog
├── LICENSE                 # MIT (match parent CLI repos)
└── .gitignore
```

**Hard ceiling**: ≤ 800 LOC of shell+Python combined per repo. If you exceed, you're re-implementing — stop.

## action.yml shape (literal, paste as-is and adapt name for the corpus-snapshot variant)

```yaml
name: 'Prompt Lineage Diff'
description: 'Posts a sticky PR comment with structured diff of prompt lineage (added prompts, removed eval suites, modified contracts).'
author: 'uppulaharshith2-rgb'
branding:
  icon: 'git-pull-request'
  color: 'orange'
inputs:
  cli-version:
    description: 'Pinned prompt-lineage version'
    required: false
    default: '0.1.0'
  base-ref:
    description: 'Base ref to diff against'
    required: false
    default: ${{ github.event.pull_request.base.sha }}
  head-ref:
    description: 'Head ref'
    required: false
    default: ${{ github.event.pull_request.head.sha }}
  github-token:
    description: 'Token for PR comments'
    required: true
  upload-artifact:
    description: 'Upload structured-diff JSON as artifact'
    required: false
    default: 'true'
  comment-header:
    description: 'Sticky comment identifier'
    required: false
    default: 'prompt-lineage-diff'
outputs:
  diff-json-path:
    description: 'Path to structured diff JSON'
    value: ${{ steps.run.outputs.json-path }}
  has-changes:
    description: 'true if diff is non-empty'
    value: ${{ steps.run.outputs.has-changes }}
runs:
  using: 'composite'
  steps:
    - uses: actions/setup-python@v5
      with: { python-version: '3.11' }
    - name: Install CLI
      shell: bash
      run: pip install prompt-lineage==${{ inputs.cli-version }}
    - id: run
      shell: bash
      run: ${{ github.action_path }}/scripts/run-diff.sh
      env:
        BASE_REF: ${{ inputs.base-ref }}
        HEAD_REF: ${{ inputs.head-ref }}
    - if: inputs.upload-artifact == 'true' && steps.run.outputs.has-changes == 'true'
      uses: actions/upload-artifact@v4
      with: { name: prompt-lineage-diff, path: ${{ steps.run.outputs.json-path }} }
    - if: steps.run.outputs.has-changes == 'true'
      uses: marocchino/sticky-pull-request-comment@v2
      with:
        header: ${{ inputs.comment-header }}
        path: ${{ steps.run.outputs.md-path }}
        GITHUB_TOKEN: ${{ inputs.github-token }}
```

For corpus-snapshot variant: swap name, description, branding icon (`database` or `file-text`), default `comment-header`, and `pip install corpus-snapshot`.

## Sticky comment mechanic

Compose `marocchino/sticky-pull-request-comment@v2` — 60M+ weekly runs, MIT, stable since 2022. Identified by `header:` field — guarantees idempotent update on subsequent commits. Direct `gh api` REST was considered and rejected (re-implementing find/PATCH/POST + pagination is ~40 LOC of brittle code marocchino already nails).

## Resolved: artifact + comment (both)

Ship the JSON artifact too. Reasoning:
1. It's 5 lines of YAML gated on `inputs.upload-artifact`
2. It's the integration hook for downstream consumers (eval pipelines, lineage dashboards)
3. Without it the action is just a comment-poster; JSON artifact is what makes it composable

## Marketplace publishing checklist

1. `action.yml` at repo root with unique `name:` ("Prompt Lineage Diff" and "Corpus Snapshot Diff" unclaimed as of 2026-05).
2. `branding:` block with icon + color (required for Marketplace listing).
3. README must have: one-liner, usage snippet, full input/output table, "Available on Marketplace" badge, link to parent CLI repo.
4. LICENSE file (MIT).
5. No workflow files in repo root (`.github/workflows/` is fine; root is not).
6. 2FA enabled on `uppulaharshith2-rgb` (already done).
7. Tag `v0.1.0` → GitHub release UI → tick "Publish this Action to the GitHub Marketplace" → pick primary + secondary category (Code Quality / Continuous Integration).
8. After publish: `gh api /repos/uppulaharshith2-rgb/<repo>` to confirm + visually verify Marketplace listing renders.
9. Tag `v0.1` and `v0` floating aliases pointing at `v0.1.0` (convention for users pinning to major).
10. No "verified creator" badge possible without org partnership — skip; v0.2 concern.

## Worked example — fake PR diff → sticky comment

PR adds `prompts/v3.yaml`, removes `evals/legacy.suite`, modifies `contracts/output.schema.json`.

```markdown
<!-- prompt-lineage-diff -->
## Prompt Lineage Diff (3 changes)

### Added (1)
- `prompts/v3.yaml` — new prompt `summarize-v3` (token-budget: 2048)

### Removed (1)
- `evals/legacy.suite` — 14 cases, last passing run: 2026-04-12

### Modified (1)
<details><summary>contracts/output.schema.json — 2 field changes</summary>

- `+ confidence: number (0-1)`
- `- legacy_score: number` (deprecated)
</details>

<sub>Generated by [prompt-lineage-diff-action](https://github.com/uppulaharshith2-rgb/prompt-lineage-diff-action) v0.1.0 · [JSON artifact](#artifacts)</sub>
```

## Hard rules for the impl agent

- **DO NOT re-implement diff logic.** `pip install prompt-lineage==0.1.0` and `pip install corpus-snapshot==0.1.0`. Dual SoT is forbidden.
- **Pin CLI version in default input;** allow override.
- **Post-publish verification**: `curl -sI https://github.com/marketplace/actions/prompt-lineage-diff` returns 200, README badge resolves.
- **Self-test workflow** runs on every push to main against a fixture PR.
- ≤ 800 LOC shell+Python per repo. If you exceed, you're re-implementing — stop.
- **Both repos ship together** in one dispatch session, not two.

## v0 scope (ship now)

- Composite action, PyPI install of pinned CLI, sticky comment via marocchino, JSON artifact upload.
- Marketplace listing live for both.
- README with usage snippet + 1 fixture-driven self-test.

## v0.2 deferred

- Verified creator badge (needs org partnership).
- Configurable comment templates (Jinja inputs).
- Multi-PR-thread support (one comment per affected prompt family).
- Slack/Discord webhook output in addition to PR comment.
- Comparison mode against a baseline tag (not just base..head).

## Pre-emptive maintainer pushback (cover in README)

1. **"Why not Docker action for hermeticity?"** — Composite with `setup-python@v5` + pinned PyPI version is hermetic enough; Docker cold-start is 20-40s, composite is 3-5s. We chose user latency.
2. **"Why pin the CLI version in the action?"** — Floating versions cause silent diff-format drift across PRs in the same repo. Pinning is explicit; override is one input.
3. **"Why marocchino and not a custom sticky impl?"** — 60M+ weekly runs, MIT, maintained. Re-implementing is ~40 LOC of brittle pagination we don't want to own.

## Dispatch prerequisite

Iteration #13 (PyPI publish) must have landed cleanly so that `pip install prompt-lineage==0.1.0` and `pip install corpus-snapshot==0.1.0` resolve. If iter #13 is still pending user action (the pypi.org pending-publisher setup), DEFER iteration #16 — don't fire until PyPI install works.
