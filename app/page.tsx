import attendanceData from "@/data/attendance.json";
import expenseData from "@/data/expense.json";
import taskScheduleData from "@/data/task-schedule.json";
import moneyData from "@/data/money.json";
import {
  attendanceRecordSchema,
  expenseRecordSchema,
  taskItemSchema,
  moneyTransactionSchema,
} from "@/lib/schema";
import { z } from "zod";
import { Workspace } from "@/components/workspace/Workspace";

export default function Page() {
  const attendance = z.array(attendanceRecordSchema).parse(attendanceData);
  const expense = z.array(expenseRecordSchema).parse(expenseData);
  const taskSchedule = z.array(taskItemSchema).parse(taskScheduleData);
  const money = z.array(moneyTransactionSchema).parse(moneyData);

  return (
    <Workspace
      initialMockData={{
        attendance,
        expense,
        "task-schedule": taskSchedule,
        money,
      }}
    />
  );
}
