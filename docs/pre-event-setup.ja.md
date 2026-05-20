# 事前準備（ハッカソン 1 週間前までに）

> 言語: [English](pre-event-setup.md) | **日本語** | [Tiếng Việt](pre-event-setup.vi.md)

ハッカソン当日の 1.5 時間を環境構築に費やさないために、**1 週間前までに以下を完了してください**。
所要時間は 30 分〜 1 時間程度を見込んでいます（初回 `docker compose up` のビルドに 5〜10 分かかります）。

詰まったら #vibe-coding-hackathon Slack チャンネルで質問してください（運営が回答します）。

---

## 1. Docker Desktop のインストール / 起動確認

- Docker Desktop for Mac (Apple Silicon 向け) をインストール済みであること
  - https://www.docker.com/products/docker-desktop/ から DL
- Docker Desktop アプリが起動していること（メニューバーに鯨のアイコン）
- ターミナルで以下が動くこと:

```bash
docker --version          # 例: Docker version 28.x.x
docker compose version    # 例: Docker Compose version v2.x.x
```

`docker info` がエラーなく走れば OK です。

## 2. リポジトリの fork と clone

1. https://github.com/marketenterprise/vibe-coding-hackathon-2026-06-dist にアクセス
2. 右上の **Fork** ボタンで自分のアカウントに fork する
3. fork をローカルに clone し、運営側 repo を `upstream` リモートとして追加（タスク本文の段階配布は `upstream/main` へ push されます。あなたの fork には流れません）:

```bash
git clone https://github.com/<あなたのアカウント>/vibe-coding-hackathon-2026-06-dist.git
cd vibe-coding-hackathon-2026-06-dist
git remote add upstream https://github.com/marketenterprise/vibe-coding-hackathon-2026-06-dist.git
git remote -v   # 確認: origin → あなたの fork / upstream → marketenterprise
git fetch upstream
```

## 3. アプリの起動確認

```bash
cd app
docker compose up --build
```

初回のビルドに 5〜10 分かかります。完了すると 3 つのコンテナが立ち上がります:

- `api-1`: ログに `API listening on port 4000` が出る
- `web-1`: ログに `Ready in <時間>` が出る
- `db-1`: `database system is ready to accept connections` が出る

## 4. 動作確認

ブラウザで http://localhost:3000 を開いて、議事録の一覧 (12 件) が表示されることを確認してください。

以下も試してみてください:

- 一覧から議事録をクリックして詳細画面が開くこと
- 「New」リンクから新規作成画面が開けること
- 詳細画面の「Edit」「Delete」が動くこと

ここまで動けば、当日に向けた準備は完了です。

## 5. 詰まったら

- まず `docs/docker-troubleshooting.ja.md` を読んでください（よくある詰まりポイントの対処集）
- それでも解決しなければ Slack #vibe-coding-hackathon で質問
- 当日朝に Docker が起動しない、ということがないように、**今のうちに一度動かしてください**

---

## タスク本文について

- **`tasks/user-stories.ja.md` は最初から repo に入っています** — いつ読んでも、いつ AI ツールに投入していただいても構いません。事前段階で AI に投入しておくのを推奨します。同じ要約が `tasks/README.ja.md` にもあります
- **`tasks/specs/`（重要度高タスクの仕様例）はまだ repo にありません** — 当日 **0:50** に `upstream/main` へ push されます。その時点で `git pull upstream main` を実行して取得してください（あなたの fork の `origin/main` には届きません — 上の手順 2 で追加した `upstream` remote から pull します）。Phase B (0:50–1:25) で仕様例が開示されます

Phase A (0:10–0:50) はユーザーストーリーのみで解いていただき、Phase B で重要度高タスクの仕様例が開示されます。

逆に **読んで OK** なもの:

- `README.ja.md`
- `docs/codebase-tour.ja.md` ← コードベース概要、AI 読み込み用
- `docs/submission.ja.md` ← 提出フロー
- `docs/reflection-template.ja.md` ← 振り返りテンプレ
- `docs/ai-tools-guide.ja.md` ← AI ツール活用ガイド
- `docs/docker-troubleshooting.ja.md` ← この事前準備のお供
- `app/README.ja.md` ← 開発者向けセットアップ詳細
- `app/api/prisma/schema.prisma` 等のコード ← AI に読み込ませる練習をしておくと当日が楽です

## 当日の準備

- 普段使っている AI コーディングツール（Claude Code / Copilot / Cursor / etc.）が手元の環境で動く状態にしておいてください
- ログイン / 認証 / API キー設定を当日にやらないでください（時間ロスになります）
- どのツールを使うかは自由です（cf. `docs/ai-tools-guide.ja.md`）
