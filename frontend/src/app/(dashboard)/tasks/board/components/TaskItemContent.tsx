"use client";

import { Badge } from "@/components/ui/badge";
import { Clock, User } from "lucide-react";
import { Task } from "../types/KanbanTypes";
import { priorityColors } from "../data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type TaskItemContentProps = {
  task: Task;
};

export default function TaskItemContent({ task }: TaskItemContentProps) {
  return (
    <div className="space-y-2 ml-6">
      <div className="font-medium">{task.title}</div>
      <div className="flex items-center justify-between">
        <Badge className={priorityColors[task.priority]}>{task.priority}</Badge>
        <div className="flex items-center gap-1">
          {task.assignee.map((user) => (
            <Avatar key={user} className="h-6 w-6">
              <AvatarImage src="https://avatars.githubusercontent.com/u/110723408?s=400&u=9275e97f2ff1e329301d5120adf8b907df02605d&v=4"/>
              <AvatarFallback>{user[0].toUpperCase()}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Clock className="h-3 w-3" />
        Due: {task.dueDate || "Not set"}
      </div>
      <div className="flex flex-wrap gap-1">
        {task.tags.map((tag) => (
          <Badge key={tag} variant="outline" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}