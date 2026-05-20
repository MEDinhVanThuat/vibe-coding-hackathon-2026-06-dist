# Vibe Coding Hackathon 2026-06

> 言語: [English](README.md) | **日本語** (このファイル) | [Tiếng Việt](README.vi.md)

![Vibe Coding Hackathon 2026-06 開催告知ポスター](assets/poster-2026-06.png)

社内向けバイブコーディング診断ハッカソン（2026年6月実施、ベトナム拠点向け）のスターターリポジトリ。

現時点での AI 活用力（バイブコーディング適性）を診断するハッカソンです。参加者は既存の議事録管理アプリに対して、ユーザーストーリーをもとに **1.5 時間で機能改善・バグ修正** を実施します。完成度よりも **AI をどう使ったか** が評価対象です。

## 当日のタイムライン

| いつ | 何をするか | 参照先 |
|---|---|---|
| **T-1 週間** | 環境準備、repo (`tasks/user-stories.ja.md` 含む) を AI ツールに投入 | [docs/pre-event-setup.ja.md](docs/pre-event-setup.ja.md) |
| **0:00** | キックオフ | — |
| **0:00 – 0:10** | 環境最終チェック / AI ウォームアップ。未読なら [`docs/codebase-tour.ja.md`](docs/codebase-tour.ja.md) | — |
| **0:10 – 0:50** | **Phase A** — `tasks/user-stories.ja.md` のみで作業 | [tasks/user-stories.ja.md](tasks/user-stories.ja.md) |
| **0:50** | `tasks/specs/` が `upstream/main` へ push される。`git pull upstream main` で取得 | [tasks/README.ja.md](tasks/README.ja.md) |
| **0:50 – 1:25** | **Phase B** — 重要度高タスクの仕様例を参照可 | tasks/specs/ |
| **1:25** | **提出締切** — 自 fork から本 repo の `main` に対して PR を Open | [docs/submission.ja.md](docs/submission.ja.md) |
| **1:25 – 1:30** | 振り返り記入 | [docs/reflection-template.ja.md](docs/reflection-template.ja.md) |

`tasks/user-stories.ja.md` は最初から repo に入っています — 事前にいつ読んでも構いません。当日中の push は **0:50 の `tasks/specs/`** のみ。`upstream` remote は事前準備で設定します。

## 6 タスクを全部終えたら（早期完了時）

最近の AI コーディングツールを使うと、1.5h 枠で 6 タスク全部終わるのは現実的です。そうなったら **余った時間でコード内の気になる箇所を自分で見つけて改善してください**。

- 改善ヒントは [docs/codebase-tour.ja.md](docs/codebase-tour.ja.md) の「6 タスクを早く終えた場合」を参照
- 対応した内容は PR 本文の **「追加で対応したこと」** セクション ([docs/submission.ja.md](docs/submission.ja.md) テンプレ) に記入
- 専用の得点枠はありませんが、後から振り返りやすくなります

## 当日の質問 / ヘルプ

- **質問・バグ報告はすべて Slack `#vibe-coding-hackathon` へ** — 運営が監視しています
- **本 repo に GitHub issue を起票しないでください** — 評価対象 repo を汚すため
- スターターアプリの本物のバグで時間内に修正できなかったものは、振り返り ([docs/reflection-template.ja.md](docs/reflection-template.ja.md)) に書いてください

## 評価について

このハッカソンは **競争ではなく診断** です。完成度のランキングを付けるのではなく、各参加者の AI との向き合い方を観察します。

実装の完成度そのものよりも、**何を選び、何を後回しにし、AI とどう協業したか** を重視します。AI ツールガイドは [docs/ai-tools-guide.ja.md](docs/ai-tools-guide.ja.md)。

アウトプット: 参加者ごとの個人診断レポート + 組織レベルのツール効果レポート。

## 設計の核

| 項目 | 内容 |
|---|---|
| 形式 | Phase 2 only（既存アプリの改善） |
| 時間 | 1.5h 固定 |
| 題材 | 議事録管理アプリ（Next.js + Express + PostgreSQL） |
| 環境 | Docker Compose（Mac / Apple Silicon 想定） |
| タスク | 6 つのユーザーストーリー |
| アウトプット | 個人診断レポート + 組織レベルのツール効果レポート |

## ディレクトリ構造

```
vibe-coding-hackathon-2026-06/
├── app/             # スターターアプリ（議事録管理）
│   ├── web/         # Next.js (frontend)
│   ├── api/         # Express (backend)
│   └── docker-compose.yml
├── tasks/           # 参加者向けタスクドキュメント
│   ├── README.ja.md       # 配布スケジュール
│   ├── user-stories.ja.md # ← 最初から repo にあり (いつ読んでも OK)
│   └── specs/             # ← 0:50 に upstream/main へ push
└── docs/            # 参加者向けガイド
    ├── pre-event-setup.ja.md
    ├── ai-tools-guide.ja.md
    ├── codebase-tour.ja.md
    ├── submission.ja.md
    ├── reflection-template.ja.md
    └── docker-troubleshooting.ja.md
```

## 状態

🚧 開発中（スターター実装フェーズ）
