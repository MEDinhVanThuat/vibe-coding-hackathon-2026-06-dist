# Meeting Notes App

> 言語: [English](README.md) | **日本語** | [Tiếng Việt](README.vi.md)

議事録管理アプリ。Next.js + Express + PostgreSQL を Docker Compose で起動する。

## セットアップ

### 必要なもの

- Docker Desktop（Mac）
- 16GB+ RAM 推奨

### 起動

```bash
cd app
docker compose up
```

初回は image build と npm install で数分かかる。
2 回目以降は named volume にキャッシュされるので速い。

起動後にアクセス：

- Web UI: http://localhost:3000
- API: http://localhost:4000/api/meetings
- Health check: http://localhost:4000/health

### 停止

```bash
docker compose down
```

DB のデータは named volume に残るので、再起動しても保持される。
クリーンに作り直したい場合：

```bash
docker compose down -v
```

## 構成

```
app/
├── docker-compose.yml
├── api/                 # Express + TypeScript + Prisma
│   ├── prisma/          # schema.prisma + seed.ts
│   └── src/
│       ├── index.ts     # Express entry
│       ├── lib/db.ts    # Prisma client
│       └── routes/
│           └── meetings.ts
└── web/                 # Next.js App Router
    ├── app/
    │   ├── page.tsx     # 議事録一覧
    │   ├── meetings/
    │   │   ├── new/page.tsx        # 新規作成
    │   │   └── [id]/
    │   │       ├── page.tsx        # 詳細
    │   │       └── edit/page.tsx   # 編集
    │   └── layout.tsx
    └── lib/
        ├── api.ts       # API クライアント
        └── types.ts
```

## API

| Method | Path | 説明 |
|---|---|---|
| GET | `/api/meetings` | 一覧（meetingDate 降順） |
| GET | `/api/meetings/:id` | 詳細 |
| POST | `/api/meetings` | 新規作成 |
| PUT | `/api/meetings/:id` | 更新 |
| DELETE | `/api/meetings/:id` | 削除 |

## トラブルシュート

### `docker compose up` が遅い・固まる

- 初回は image build + npm install で数分かかります（特に Apple Silicon で arm64 image を pull する場合）
- ネット帯域に依存します

### Postgres に接続できない

- `db` サービスが healthy になるまで `api` は起動しません
- ログで `pg_isready` 失敗が続く場合は `docker compose down -v` でボリュームをクリアしてリトライ

### ポートが衝突する

- 3000 / 4000 / 5433 を使います
- 既に他のプロセスが使っている場合は `docker-compose.yml` の `ports` を編集してください
