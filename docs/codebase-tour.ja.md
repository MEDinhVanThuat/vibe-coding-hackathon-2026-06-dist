# コードベース ツアー

> 言語: [English](codebase-tour.md) | **日本語** | [Tiếng Việt](codebase-tour.vi.md)

このアプリは「議事録管理ツール」の最小実装です。
このドキュメントは **概要マップ** であり、詳細はソースコードを直接読むか、AI コーディングツールに読み込ませて把握してください。

> **AI ツール活用のヒント**: このドキュメントと `app/README.ja.md` を AI に渡したうえで、「このコードベースの構造を把握したい」と聞くと、効率的に全体像が掴めます。

## ディレクトリ構造

```
app/
├── docker-compose.yml       # 3 コンテナ (web / api / db) の定義
├── .env.example             # 環境変数テンプレ
├── README.ja.md             # 開発者向けセットアップ手順
├── web/                     # Next.js (App Router) フロントエンド
│   ├── app/                 # ページコンポーネント (Next.js App Router 規約)
│   │   ├── page.tsx         # 一覧画面 (/)
│   │   └── meetings/
│   │       ├── new/         # 新規作成
│   │       └── [id]/        # 詳細・編集
│   └── lib/
│       ├── api.ts           # API 呼び出し関数群
│       └── types.ts         # 共有型定義
└── api/                     # Express + TypeScript API
    ├── src/
    │   ├── index.ts         # サーバ起動
    │   └── routes/
    │       └── meetings.ts  # CRUD ルート
    └── prisma/
        ├── schema.prisma    # DB スキーマ
        └── seed.ts          # 初期データ投入
```

## 起動方法

```bash
cd app
docker compose up --build
```

- web: http://localhost:3000
- api: http://localhost:4000 (`/health` で疎通確認可能)
- db: PostgreSQL on host port 5433

初回起動時に seed が走り、12 件の議事録が入ります。

## API エンドポイント

| メソッド | パス | 用途 |
|---|---|---|
| GET | `/health` | 疎通確認 |
| GET | `/api/meetings` | 議事録一覧（meetingDate 降順） |
| GET | `/api/meetings/:id` | 詳細取得 |
| POST | `/api/meetings` | 新規作成 |
| PUT | `/api/meetings/:id` | 更新 |
| DELETE | `/api/meetings/:id` | 削除 |

## データモデル

```prisma
model Meeting {
  id          String   @id @default(cuid())
  title       String
  body        String
  meetingDate DateTime
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## 「触る場所マップ」

何を変えたいときに、まずどこを見ればよいか:

| やりたいこと | 触り始める場所 |
|---|---|
| 一覧画面の見た目を変える | `app/web/app/page.tsx` |
| 詳細・編集・削除の挙動 | `app/web/app/meetings/[id]/page.tsx`, `[id]/edit/page.tsx` |
| 新規作成フォームの挙動 | `app/web/app/meetings/new/page.tsx` |
| API リクエストの送り方 / 受け取り方 | `app/web/lib/api.ts` |
| API のロジック（CRUD） | `app/api/src/routes/meetings.ts` |
| DB スキーマの変更 | `app/api/prisma/schema.prisma` |
| 初期データの追加 | `app/api/prisma/seed.ts` |
| 表示日付のフォーマット | `app/web/lib/api.ts` の `formatDate` |

## DB スキーマを変更したい場合

```bash
# 1. schema.prisma を編集
# 2. コンテナ内で以下を実行
docker compose exec api npx prisma db push --accept-data-loss
docker compose exec api npx prisma generate
```

ハッカソン環境なので migration ファイルは作らず、`db push` で OK です。

## 動作確認のコツ

- API 単体: `curl http://localhost:4000/api/meetings | jq` で疎通
- DB 直接: `docker compose exec db psql -U app meetings -c "SELECT title, \"meetingDate\" FROM \"Meeting\";"`
- フロント: http://localhost:3000 でブラウザ確認

## このドキュメントに書いていないこと

- 既存コードの細かい実装詳細（ソースを読むか AI に聞いてください）
- 推奨実装パターン（解き方は自由です）
- 特定タスクの解き方ヒント（`tasks/user-stories.ja.md` を起点に判断してください）

## 6 タスクを早く終えた場合

最新の AI コーディングツールを使えば、1.5h の枠内で 6 タスクを十分に終えられる可能性があります。その場合は **残り時間でコード中に見つけた追加の改善に充ててください**。手がかりになりそうなプロンプト例:

- コードベース全体から `TODO` コメントを検索し、1〜2 件対応する
- `app/api/src/routes/meetings.ts` と `app/web/lib/api.ts` 周辺のエラーハンドリング — 黙って握り潰している箇所や、ユーザーに不親切なメッセージはないか
- 作成 / 編集フォーム（`app/web/app/meetings/new/page.tsx`, `app/web/app/meetings/[id]/edit/page.tsx`）で抜けている validation がないか確認する
- loading / empty 状態 — ユーザーの役に立っているか
- アクセシビリティの基本（label、キーボードフォーカス、コントラスト）
- 一覧ページで行数が多い時のパフォーマンス的な気になり所

対応したことは PR 本文の **「追加で対応したこと（任意）」** セクション（`docs/submission.ja.md` テンプレート）に記録してください。これら専用の加点枠はありませんが、後から振り返りやすくなります。
