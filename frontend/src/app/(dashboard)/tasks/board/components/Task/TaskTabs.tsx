"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommentsSection from "./CommentsSection";
import ActivityLog from "./ActivityLog";
import { Task } from "../../types/KanbanTypes";

type TaskTabsProps = {
  task: Task;
  updateTask: (taskId: string, updatedData: Partial<Task>) => void;
};

export default function TaskTabs({ task, updateTask }: TaskTabsProps) {
  return (
    <Tabs defaultValue="comments" className="w-full">
      <TabsList className="bg-slate-100">
        <TabsTrigger value="comments" className="data-[state=active]:bg-white">
          Comments
        </TabsTrigger>
        <TabsTrigger value="activity" className="data-[state=active]:bg-white">
          Activity
        </TabsTrigger>
      </TabsList>
      <TabsContent value="comments" className="min-h-[200px]">
        <CommentsSection
          comments={task.comments}
          taskId={task.id}
          updateTask={updateTask}
        />
      </TabsContent>
      <TabsContent value="activity" className="min-h-[200px]">
        <ActivityLog activityLog={task.activityLog} />
      </TabsContent>
    </Tabs>
  );
}