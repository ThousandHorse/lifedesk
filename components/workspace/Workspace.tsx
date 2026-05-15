"use client";

/**
 * Workspace: 4ペインの親コンポーネント。
 *
 * - selectedTool: 現在選択中のツール（Pane1 で切り替え）
 * - selectedRecordId: Pane2 で選択したレコード ID（null = 未選択）
 * - pane3Mode: "new" = 新規入力フォーム / "detail" = 詳細・編集ビュー
 * - mockData: 4ツール分のモックデータ（フェーズ2〜6 のみ使用）
 *
 * レイアウト構造:
 * ```
 * <SidebarProvider>
 * ┌─ Pane1（Sidebar）─┬─ SidebarInset ──────────────────┐
 * │ ToolNavPane       │ GlobalHeader                     │
 * │ ツール切り替え     ├──────┬──────────┬───────────────┤
 * │                   │Pane2 │  Pane3   │    Pane4      │
 * │                   │一覧  │入力/詳細 │サマリー+グラフ│
 * └───────────────────┴──────┴──────────┴───────────────┘
 * ```
 */

import { useState } from "react";

import {
  type ToolKey,
  type Pane3Mode,
  type MockData,
  type AttendanceRecord,
  type ExpenseRecord,
  type TaskItem,
  type MoneyTransaction,
  attendanceRecordSchema,
  expenseRecordSchema,
  taskItemSchema,
  moneyTransactionSchema,
} from "@/lib/schema";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { GlobalHeader } from "@/components/workspace/GlobalHeader";

type WorkspaceProps = {
  initialMockData: MockData;
};

export function Workspace({ initialMockData }: WorkspaceProps) {
  const [selectedTool, setSelectedTool] = useState<ToolKey>("attendance");
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [pane3Mode, setPane3Mode] = useState<Pane3Mode>("new");
  const [mockData, setMockData] = useState<MockData>(initialMockData);

  const handleSelectRecord = (id: string) => {
    setSelectedRecordId(id);
    setPane3Mode("detail");
  };

  const handleNewRecord = () => {
    setSelectedRecordId(null);
    setPane3Mode("new");
  };

  const handleSaveRecord = (
    record:
      | AttendanceRecord
      | ExpenseRecord
      | TaskItem
      | MoneyTransaction,
  ) => {
    setMockData((prev) => {
      const list = prev[selectedTool] as (
        | AttendanceRecord
        | ExpenseRecord
        | TaskItem
        | MoneyTransaction
      )[];
      const exists = list.some((r) => r.id === record.id);
      const next = exists
        ? list.map((r) => (r.id === record.id ? record : r))
        : [record, ...list];
      return { ...prev, [selectedTool]: next };
    });
    setSelectedRecordId(record.id);
    setPane3Mode("detail");
  };

  const handleDeleteRecord = (id: string) => {
    setMockData((prev) => {
      const list = prev[selectedTool] as (
        | AttendanceRecord
        | ExpenseRecord
        | TaskItem
        | MoneyTransaction
      )[];
      return { ...prev, [selectedTool]: list.filter((r) => r.id !== id) };
    });
    setSelectedRecordId(null);
    setPane3Mode("new");
  };

  // フェーズ3〜6 で各ペインコンポーネントに差し替える
  const sharedProps = {
    selectedTool,
    selectedRecordId,
    pane3Mode,
    mockData,
    onSelectTool: setSelectedTool,
    onSelectRecord: handleSelectRecord,
    onNewRecord: handleNewRecord,
    onSaveRecord: handleSaveRecord,
    onDeleteRecord: handleDeleteRecord,
  };

  // suppress unused variable warning until panes are implemented
  void sharedProps;

  // スキーマ参照（将来の Zod parse 用、import の dead-code 除去対策）
  void attendanceRecordSchema;
  void expenseRecordSchema;
  void taskItemSchema;
  void moneyTransactionSchema;

  return (
    <SidebarProvider
      defaultOpen
      className="h-svh w-full overflow-hidden bg-background text-foreground"
    >
      <SidebarInset className="flex min-w-0 flex-col bg-background">
        <GlobalHeader
          departmentTitle=""
          positionTitle="lifedesk"
          candidateName=""
          departments={[]}
          onAddDepartment={() => {}}
          onDeleteDepartment={() => {}}
        />
        <div className="flex min-h-0 flex-1 items-center justify-center text-muted-foreground">
          フェーズ3〜6 で各ペインを実装
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
