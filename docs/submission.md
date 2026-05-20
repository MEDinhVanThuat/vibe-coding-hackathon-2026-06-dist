# Submission Rules

> Languages: **English** | [日本語](submission.ja.md) | [Tiếng Việt](submission.vi.md)

By the **end of the hackathon (1 hour 25 minutes in)**, submit your work as described below.

## Submission format

**Open a Pull Request.**

How to do it:

1. Fork this repository to your own account (you should have already done this during pre-event setup).
2. In your fork, create a branch named `submit/<your-name>` and do all your work on that branch.
   - Examples: `submit/linh-nguyen`, `submit/hiroshi-tanaka`
3. When you're done — or when the deadline arrives — open a PR from your fork into **this repository's `main` branch**.

PRs are **not merged**: they are evaluation snapshots. It is fine to submit something incomplete, as long as it works.

## What to put in the PR description

Use this template — copy it directly into your PR body:

```markdown
## Tasks I worked on

- List in the order you tackled them (use the # numbers from user-stories.md).
- Example:
  1. #1 UTC date display — done
  2. #4 full-text search — done
  3. #3 tags — partial (API done, UI not started)
  4. #6 long title overflow — not attempted

## Why I picked this order

A short paragraph or bullet list:
- Which user story felt most important, and why?
- Why did you push back / skip the others?

## How I used AI tools

- Which tools you used (Claude Code / GitHub Copilot / Cursor / others)
- 2-3 concrete examples of where you delegated to the AI vs. decided yourself
- An example or two of the AI failing or producing something that did not match your intent
- If you used any tool-specific advanced features (sub-agents, custom skills, MCP servers, hooks, custom commands, plan mode, etc.), describe how you used them and what you got out of it

## What you verified

- What you actually exercised (list view, CRUD, the new feature, ...)
- Any known issues you noticed but did not fix

## AI context files you added (optional)

If you authored any AI context files yourself during the event and committed them to the repo, mention them here. Examples of what counts:

- Tool instruction files (`CLAUDE.md`, `AGENTS.md`, `GEMINI.md`, `.github/copilot-instructions.md`, `.cursorrules`)
- Tool-specific config dirs (`.claude/skills/`, `.cursor/rules/`, `.windsurf/`, `.continue/`)
- MCP server configs (`mcp.json`)
- Anything similar for the tool you used

Including these is optional, but if you did, briefly say what they contain (architecture notes, conventions, skill definitions, etc.). They are part of how you used the AI — worth highlighting.

## Extra work (optional)

If you finished all 6 tasks and used the remaining time on additional improvements, list them here:
- e.g., "Added input validation to the create form", "Refactored `app/web/lib/api.ts` error handling", "Improved loading state UX"
- Brief is fine — one line each
```

Screenshots are optional. A clear text PR body is plenty.

## Deadline

| Elapsed | Event |
|---|---|
| 0:50 | Spec examples for high-priority tasks pushed to `upstream/main` — run `git pull upstream main` to fetch `tasks/specs/` |
| **1:25** | **Submission deadline — open the PR** |
| 1:25–1:30 | Fill out the reflection (`docs/reflection-template.md`) |

You are free to keep working after 1:25, but **what is evaluated is the snapshot of your PR at the 1:25 mark**.

## What the PR body is for

What we focus on when reading PRs:

1. **What you chose to do, and what you chose to skip** — your reasoning matters more than the count
2. **How you delegated work to AI vs. handled it yourself** — concrete examples, not abstractions
3. **Code quality, working behavior, whether you over-iterated** — pragmatic, not perfect
4. Implementation completeness on its own is secondary — you do **not** have to finish all 6 tasks.

This is **not a competition**: it is an individual diagnostic plus an organization-level data point about tooling effectiveness. Aiming for "perfect, but I ran out of time" is worse than aiming for "I made deliberate tradeoffs and can explain them."
