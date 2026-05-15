/**
 * lifedesk ドメインの Zod スキーマと派生型。
 * 4 ツール（勤怠管理 / 経費申請 / タスク&スケジュール / お金）の SSoT。
 * UI コンポーネントはここから型をインポートする。
 */

import { z } from "zod";

// ===== 共通 =====

export const toolKeySchema = z.enum([
  "attendance",
  "expense",
  "task-schedule",
  "money",
]);
export type ToolKey = z.infer<typeof toolKeySchema>;

export const pane3ModeSchema = z.enum(["new", "detail"]);
export type Pane3Mode = z.infer<typeof pane3ModeSchema>;

// ===== 勤怠管理 =====

export const attendanceRecordSchema = z.object({
  id: z.string(),
  /** 出勤時刻（ISO 8601 文字列）*/
  clockIn: z.string(),
  /** 退勤時刻（ISO 8601 文字列）。当日未退勤の場合は空文字 */
  clockOut: z.string(),
  note: z.string(),
});
export type AttendanceRecord = z.infer<typeof attendanceRecordSchema>;

// ===== 経費申請 =====

export const expenseCategorySchema = z.enum([
  "交通費",
  "宿泊費",
  "飲食費",
  "消耗品",
  "通信費",
  "その他",
]);
export type ExpenseCategory = z.infer<typeof expenseCategorySchema>;

export const expenseStatusSchema = z.enum(["未申請", "申請済", "承認済"]);
export type ExpenseStatus = z.infer<typeof expenseStatusSchema>;

export const expenseRecordSchema = z.object({
  id: z.string(),
  date: z.string(),
  title: z.string(),
  amount: z.number(),
  category: expenseCategorySchema,
  status: expenseStatusSchema,
  note: z.string(),
});
export type ExpenseRecord = z.infer<typeof expenseRecordSchema>;

// ===== タスク&スケジュール =====

/** due_at あり = イベント、なし（空文字）= タスク */
export const taskItemTypeSchema = z.enum(["task", "event"]);
export type TaskItemType = z.infer<typeof taskItemTypeSchema>;

export const taskItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  /** "task" | "event" */
  type: taskItemTypeSchema,
  /** ISO 8601 文字列。タスクの場合は空文字 */
  dueAt: z.string(),
  done: z.boolean(),
  note: z.string(),
});
export type TaskItem = z.infer<typeof taskItemSchema>;

// ===== お金 =====

export const moneyTypeSchema = z.enum(["income", "expense"]);
export type MoneyType = z.infer<typeof moneyTypeSchema>;

export const moneyCategorySchema = z.enum([
  "給与",
  "副収入",
  "食費",
  "家賃",
  "光熱費",
  "通信費",
  "交通費",
  "娯楽",
  "医療",
  "その他",
]);
export type MoneyCategory = z.infer<typeof moneyCategorySchema>;

export const moneyTransactionSchema = z.object({
  id: z.string(),
  date: z.string(),
  title: z.string(),
  amount: z.number(),
  type: moneyTypeSchema,
  category: moneyCategorySchema,
  note: z.string(),
});
export type MoneyTransaction = z.infer<typeof moneyTransactionSchema>;

// ===== 互換スタブ（フェーズ3で GlobalHeader 置き換え後に削除） =====

/** @deprecated フェーズ3で ToolNavPane に置き換え後に削除 */
export type Department = {
  id: string;
  name: string;
  positions: { id: string; name: string; count: number }[];
};

// ===== モックデータ型（フェーズ2〜6 で使用） =====

export type MockData = {
  attendance: AttendanceRecord[];
  expense: ExpenseRecord[];
  "task-schedule": TaskItem[];
  money: MoneyTransaction[];
};
