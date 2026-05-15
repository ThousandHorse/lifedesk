# lifedesk — AIへの引き継ぎ指示書

## このプロジェクトとは

個人用ワークスペース「lifedesk」の実装プロジェクト。
勤怠管理・経費申請・タスク&スケジュール・お金の4ツールを1画面で管理する。

詳細な設計は以下を参照:
- `plan.md` — 実装プラン・フェーズ一覧・DB設計
- `design.md` — 4ペイン構成のアスキーアート

---

## 現在の状態

- `plan.md` `design.md` 作成済み
- GitHub リポジトリ作成済み: https://github.com/ThousandHorse/lifedesk
- **次にやること: フェーズ1（セットアップ）**

---

## 確定済みの設計決定

### ツール構成（4ツール）と解決課題

| ツール | 課題 | 解決 |
|--------|------|------|
| 勤怠管理 | 手動入力が面倒 | ワンタップで出退勤を完結 |
| 経費申請 | レシートが積み上がる | その場でサッと入力 |
| タスク&スケジュール | タスクが流れる | 期限つきで忘れない仕組み |
| お金 | 月末になぜなくなるかわからない | カテゴリ別収支で可視化 |

### 4ペイン設計

| Pane | コンポーネント名 | 役割 |
|------|----------------|------|
| Pane1 | ToolNavPane | ツール切り替えナビ（4ツールのセレクター） |
| Pane2 | RecordListPane | レコード一覧 ＋ ヘッダーに「＋新規」ボタン |
| Pane3 | InputPane | デフォルト=入力フォーム、リスト項目クリックで詳細表示に切り替わる |
| Pane4 | OutputPane | サマリーカード ＋ recharts グラフ |

### Pane3 のモード

```
Pane2「＋新規」クリック  →  Pane3 = 入力フォーム（空）
Pane2 項目クリック       →  Pane3 = 詳細・編集ビュー
```

### ツール別の特記事項

- **勤怠管理 Pane3**: 出勤・退勤ボタン（現在時刻自動記録）+ 編集で手修正可
- **タスク&スケジュール Pane2**: タブフィルター（すべて / タスク / イベント）+ Badge で識別
- **タスク&スケジュール Pane3**: 期限日時なし = タスク、あり = イベントとして保存
- **スケジュール Pane2**: カレンダーウィジェットなし、リスト表示で統一

### 技術スタック

- **ベース**: `/Users/chibatakuma/Documents/Project/Sample/workspace-ui-kit` を道A（踏襲ルート）でコピーして改造
- **追加ライブラリ（モック時）**: `recharts`
- **追加ライブラリ（本実装時）**: `@supabase/supabase-js` `@supabase/ssr`
- **認証**: Supabase Auth（メール＋パスワード）、個人利用・RLS で保護

### Workspace.tsx の状態設計

```typescript
type ToolKey = 'attendance' | 'expense' | 'task-schedule' | 'money'
type Pane3Mode = 'new' | 'detail'

selectedTool: ToolKey
selectedRecordId: string | null
pane3Mode: Pane3Mode
mockData: Record<ToolKey, Record[]>  // モックフェーズのみ
```

---

## フェーズ一覧と進捗

- [ ] フェーズ1: セットアップ（workspace-ui-kit コピー・recharts インストール）
- [ ] フェーズ2: スキーマ + モックデータ + Workspace.tsx 状態設計
- [ ] フェーズ3: Pane1 — ToolNavPane
- [ ] フェーズ4: Pane2 — RecordListPane（全4ツール）
- [ ] フェーズ5: Pane3 — InputPane（全4ツール）
- [ ] フェーズ6: Pane4 — OutputPane（サマリーカード + recharts）
- [ ] フェーズ7: Supabase セットアップ・Auth・ログインページ
- [ ] フェーズ8: タスク&スケジュール 本実装（Supabase 接続）
- [ ] フェーズ9: 勤怠管理 本実装
- [ ] フェーズ10: 経費申請 本実装
- [ ] フェーズ11: お金 本実装

---

## 進め方のルール

1. **フェーズを1つずつ実装する**。前のフェーズの完了確認が取れてから次へ進む
2. **完了確認の基準は `plan.md` の各フェーズに記載**
3. **道Aのルール（workspace-ui-kit の設計思想）を尊重する**
   - 4ペイン構造を維持する
   - `app/globals.css` の CSS 変数（色・角丸）を使う
   - shadcn/ui コンポーネントを使う

---

## 次のチャットで最初にやること（フェーズ1）

```
workspace-ui-kit を lifedesk にコピーしてセットアップしてください。
plan.md のフェーズ1の手順に従って進めてください。
```

### フェーズ1 の手順

1. `/Users/chibatakuma/Documents/Project/Sample/workspace-ui-kit` の内容を `/Users/chibatakuma/Documents/Project/lifedesk` にコピー（`.git` は除く）
2. 採用管理サンプル固有ファイルを削除
   - `data/candidates.json`
   - `data/positions.json`
   - `data/workspace.json`
3. `recharts` をインストール: `npm install recharts`
4. `npm run dev` でサーバーが起動することを確認

---

## ファイル構成（現在）

```
lifedesk/
├── .claude/
│   └── skills/
│       └── grill-me/
│           └── SKILL.md    ← 要件深掘り用スキル
├── .gitignore
├── CLAUDE.md               ← この引き継ぎ指示書
├── design.md               ← ペイン構成アスキーアート
└── plan.md                 ← 実装プラン全体
```
