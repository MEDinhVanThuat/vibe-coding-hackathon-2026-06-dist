# AI Coding Tools Guide

> Languages: **English** | [日本語](ai-tools-guide.ja.md) | [Tiếng Việt](ai-tools-guide.vi.md)

Using AI coding tools during this hackathon is **freely allowed** and **encouraged**. There is no required tool, and there is no required workflow. Use what works for you.

## Tools you can use (examples)

Any of these are fine. Use whatever you are comfortable with, or take this as an opportunity to try something new.

| Tool | Form | Notable for |
|---|---|---|
| Claude Code | CLI / IDE integration | Agentic, parallel sub-agents, long-running tasks |
| GitHub Copilot | IDE inline + Chat | Inline completion, PR assistance |
| Cursor | IDE | Completion + chat, composer mode |
| Windsurf | IDE | Agent features, automated file operations |
| Aider | CLI | git workflow integration |
| Gemini Code Assist | IDE | Large context, Google ecosystem |
| ChatGPT / Claude.ai | Web | Conversation only — code is copy/paste |

Tool differences are part of how teams actually work; bring whatever helps you.

---

## Practical patterns

These are habits that tend to work well with AI coding tools. They are not rules — pick what fits each task.

### Match effort to task complexity

The right amount of planning and review depends on the task.

- A one-line label change usually does not need a planning session.
- A multi-file feature usually does benefit from one.

If you over-plan a trivial change you waste time. If you under-plan a complex change you create bugs you have to chase later.

### Feed context, don't assume it

Most AI tools default to a tiny view of your repo. Before asking for changes, point the tool at the files that matter: existing schema, the page you are editing, the API route involved.

A short prompt with the right files attached usually beats a long prompt with no context.

### Read what the AI produced, before running it

"It compiled" is not the same as "it works." "It works once" is not the same as "it handles the edge cases." Skim the diff. Run the obvious cases. Run one non-obvious case.

### Decide what to do first, and what to skip

There are 6 user stories and 1.5 hours. You probably cannot do everything well. Read the stories, decide your order, decide what to defer, and write down your reasoning in the commit messages or PR body.

The reasoning is worth more than the count of features.

### When the AI keeps failing, stop and reset

If three prompts in a row produce something wrong, that is a signal — either your prompt is missing context, or the task is not well-defined yet, or the AI does not have the information it needs. Step back, clarify, or write the code yourself.

---

## On the day

- **Don't aim for perfection.** You do not need to finish all 6 stories. What you focus on is your call.
- **Don't over-trust the AI.** Verify behavior yourself. "AI said it's done" is not the same as "I confirmed it works."
- **Don't fully outsource judgement.** Big calls — order, design, final quality — are yours.
- **Stop and reset when stuck.** If three prompts in a row are not working, change approach or write the code yourself.

Have fun.
