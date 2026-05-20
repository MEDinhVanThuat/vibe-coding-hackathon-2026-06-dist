# Docker トラブルシューティング

> 言語: [English](docker-troubleshooting.md) | **日本語** | [Tiếng Việt](docker-troubleshooting.vi.md)

Mac / Apple Silicon 環境で踏みやすい詰まりポイントの対処集です。
**症状 → 原因 → 対処** の 3 部構成。当日に詰まったらこのページに戻ってきてください。

事前準備時 (`docs/pre-event-setup.ja.md`) に一度動かしておけば、当日に初めて踏むことはほとんどないはずです。

---

## 1. `docker compose up` でいきなり止まる

### 症状

```
Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
```

### 原因

Docker Desktop アプリ自体が起動していません。

### 対処

メニューバーから Docker Desktop を起動。鯨アイコンが「動いている」状態（白色 + 安定）になるまで待ちます。

```bash
docker info  # エラーなく情報が出れば OK
```

---

## 2. ビルドが `exec format error` で止まる

### 症状

```
exec /docker-entrypoint.sh: exec format error
```

または `WARNING: The requested image's platform (linux/amd64) does not match...`

### 原因

Apple Silicon 上で amd64 イメージを引いてしまっています。`docker-compose.yml` の `platform: linux/arm64` 指定が効いていない、または手元の Docker 設定が `--platform` を上書きしている。

### 対処

```bash
# 既存コンテナとイメージを掃除
cd app
docker compose down -v
docker compose build --no-cache
docker compose up
```

それでもダメなら、Docker Desktop 設定 → Features in development で「Use Rosetta for x86/amd64 emulation on Apple Silicon」が ON になっていないか確認。OFF を推奨。

---

## 3. `npm install` が遅い / ファイル変更が反映されない

### 症状

- ビルドが 10 分以上かかる
- `app/web/lib/api.ts` を編集しても hot reload が走らない

### 原因

Mac の Docker volume mount は遅い。`node_modules` をホスト側にマウントすると壊滅的に遅くなります。
このアプリでは `node_modules` を named volume にしてあるので、ホストの `node_modules` をいじってはいけません。

### 対処

```bash
# ホスト側に node_modules フォルダがあれば削除（コンテナ内のものを使うので要らない）
rm -rf app/web/node_modules app/api/node_modules

# named volume を作り直す
docker compose down -v
docker compose up --build
```

ホストにコードを書く → コンテナがそれを検知して reload、という流れです。`node_modules` だけはコンテナ内専用です。

---

## 4. ポート競合 (3000 / 4000 / 5433 が使用中)

### 症状

```
Error response from daemon: driver failed programming external connectivity on endpoint:
listen tcp 0.0.0.0:3000: bind: address already in use
```

### 原因

ホスト側で同じポートを別プロセスが掴んでいます。

### 対処

```bash
# どのプロセスが掴んでいるか確認
lsof -i :3000
lsof -i :4000
lsof -i :5433

# 特定できたら kill するか、そのプロセスを終了させる
kill <PID>
```

別ポートを使いたい場合は `app/docker-compose.yml` の `ports:` を編集（例: `"3001:3000"`）。フロント側で API URL を変更するなら `.env` の `NEXT_PUBLIC_API_URL` も合わせて変更。

---

## 5. DB を初期化したい / seed をやり直したい

### 症状

- データがおかしくなった、最初の 12 件に戻したい
- スキーマを変更したのでテーブルを作り直したい

### 原因

named volume `db_data` に古いデータが残っているため。

### 対処

```bash
docker compose down -v   # -v が重要、volume を削除する
docker compose up --build
```

起動時に Prisma の `db push` と seed が再実行されます。

**注意**: `-v` フラグは入れないと volume が残ります（データが消えない）。意図して入れてください。

---

## 6. Prisma client のエラー

### 症状

```
@prisma/client did not initialize yet. Please run "prisma generate"
```

または

```
PrismaClientInitializationError: ...
```

### 原因

`schema.prisma` を変更したあと、Prisma client の再生成が走っていません。

### 対処

```bash
# コンテナの中で再生成
docker compose exec api npx prisma generate

# スキーマも DB に反映させる
docker compose exec api npx prisma db push --accept-data-loss
```

それでも解決しなければ、コンテナを作り直す:

```bash
docker compose down
docker compose up --build
```

---

## 7. コンテナの状態が分からない / どれが落ちているか確認したい

### 症状

`http://localhost:3000` にアクセスしても何も返ってこない / コネクション拒否される。

### 対処（切り分け手順）

```bash
# 1. 全コンテナの状態確認
docker compose ps

# 2. 落ちているコンテナがあれば、そのログを見る
docker compose logs api      # API のログ
docker compose logs web      # Web のログ
docker compose logs db       # DB のログ
docker compose logs -f api   # 追従して見る (Ctrl+C で抜ける)

# 3. 個別に再起動
docker compose restart api
```

「`Healthy`」「`Up`」になっているか、エラーログが出ていないかを確認します。

---

## 8. それでも解決しないとき（最終手段）

```bash
# 全部消して最初からやり直す
cd app
docker compose down -v
docker system prune -f
docker compose up --build
```

これでもダメなら、Slack で症状とログを貼って質問してください。

---

## 補足: Apple Silicon 以外の環境について

このハッカソンは **Mac (Apple Silicon)** 前提で動作確認されています。Intel Mac / Linux / Windows でも動くはずですが、`platform: linux/arm64` 指定が逆効果になる可能性があります。

Intel Mac / 他環境の方は、Slack で運営に相談してください（個別対応します）。
