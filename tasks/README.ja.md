# tasks/

> 言語: [English](README.md) | **日本語** | [Tiếng Việt](README.vi.md)

このディレクトリにはハッカソンのタスク本文が入っています:

| いつ | 何 | 取得方法 |
|---|---|---|
| **事前（今）** | `user-stories.{md,ja.md,vi.md}` — タスク本文 | clone した時点で既に存在。いつでも読み込み・AI 投入可 |
| **当日 0:50 解禁** | `tasks/specs/` — 重要度高タスクの仕様例 | 0:50 に `git pull upstream main` |

`tasks/user-stories.*` は事前準備段階で AI ツール（Claude Code / Codex / Cursor 等）に投入できるよう、pre-event repo に最初から含めています。`tasks/specs/` は 0:50 まで持ち越し: Phase A (0:10–0:50) はユーザーストーリーのみで解いていただき、Phase B (0:50–1:25) で仕様例が開示されます。

> **注**: pull は `upstream/main`（運営側 repo）から行ってください。`origin`（あなたの fork）には届きません。`upstream` remote の追加手順は `docs/pre-event-setup.ja.md` 手順 2 を参照してください。

当日のフル timeline は `README.ja.md` (トップ階層) を参照。提出フローは `docs/submission.ja.md`。
