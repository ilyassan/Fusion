"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Skeleton from "@/app/(dashboard)/components/Skeleton";
import { ListChecks, PlayCircle, CheckCircle2 } from "lucide-react";

export default function KanbanBoardSkeleton() {
  const stages = [
    { id: "todo", title: "To Do", icon: ListChecks },
    { id: "inprogress", title: "In Progress", icon: PlayCircle },
    { id: "completed", title: "Completed", icon: CheckCircle2 },
  ];

  const TaskSkeleton = () => (
    <div className="p-3 border rounded-md bg-white space-y-3">
      {/* Title */}
      <Skeleton className="h-5 w-3/4 rounded" />
      
      {/* Description (short line) */}
      <Skeleton className="h-4 w-full rounded" />
      
      {/* Tags */}
      <div className="flex gap-2">
        <Skeleton className="h-5 w-12 rounded-full" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      
      {/* Assignee and Due Date */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Assignee Avatar */}
          <Skeleton className="h-6 w-6 rounded-full" />
          {/* Assignee Name */}
          <Skeleton className="h-4 w-20 rounded" />
        </div>
        {/* Due Date */}
        <Skeleton className="h-4 w-24 rounded" />
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stages.map((stage) => (
        <Card key={stage.id} className="h-full">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <stage.icon className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">{stage.title}</span>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Badge for task count */}
                <Skeleton className="h-5 w-6 rounded-full" />

                {/* Badge for add task */}
                <Skeleton className="h-8 w-[4.5rem] rounded-sm" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-2 space-y-2">
              {/* Render 3 task skeletons per column */}
              <TaskSkeleton />
              <TaskSkeleton />
              <TaskSkeleton />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}