"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { GlobalHeader } from "@/components/workspace/GlobalHeader";

export function Workspace() {
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
          準備中
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
