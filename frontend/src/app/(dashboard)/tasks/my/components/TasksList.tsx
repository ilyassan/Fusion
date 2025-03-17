"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Task } from "../../board/types/KanbanTypes";
import { ClipboardList } from "lucide-react";
import TaskItem from "./TaskItem";
import TaskSkeleton from "./TaskSkeleton";
import Skeleton from "@/app/(dashboard)/components/Skeleton";

type TasksListProps = {
  tasks: Task[];
  isLoading: boolean;
};

export default function TasksList({ tasks, isLoading }: TasksListProps) {
  return (
    <Card className="shadow-sm overflow-hidden">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="flex items-center gap-2 text-lg">
          <ClipboardList className="h-5 w-5 text-gray-500" />
          Your Assigned Tasks {isLoading ? <Skeleton className="w-7 h-6" /> : `( ${tasks.length} )`}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {isLoading ? (
          <div className="space-y-4 pt-2">
            <TaskSkeleton />
            <TaskSkeleton />
            <TaskSkeleton />
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="flex justify-center mb-4">
              <ClipboardList className="h-12 w-12 text-gray-300" />
            </div>
            <p className="font-medium">No tasks match your current filters</p>
            <p className="text-sm mt-1">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}