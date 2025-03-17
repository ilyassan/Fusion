"use client";

import { Badge } from "@/components/ui/badge";
import { Task, TaskStatus, Priority } from "../../board/types/KanbanTypes";
import { format } from "date-fns";
import { Calendar, CheckCircle2, PlayCircle, ListChecks } from "lucide-react";

type TaskItemProps = {
  task: Task;
};

export default function TaskItem({ task }: TaskItemProps) {
  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case "todo":
        return <ListChecks className="h-5 w-5 text-gray-500" />;
      case "inprogress":
        return <PlayCircle className="h-5 w-5 text-blue-500" />;
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "critical":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
      {/* Status Icon */}
      <div className="flex-shrink-0">{getStatusIcon(task.status)}</div>

      {/* Title and Project */}
      <div className="flex-1 min-w-0">
        <div className="font-medium truncate">{task.title}</div>
        <div className="text-sm text-gray-500 truncate">{task.project}</div>
      </div>

      {/* Priority */}
      <Badge className={`${getPriorityColor(task.priority)} px-2 py-1 border`}>
        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
      </Badge>

      {/* Due Date */}
      <div className="flex items-center gap-1 text-sm whitespace-nowrap">
        <Calendar className="h-4 w-4 text-gray-500" />
        {task.dueDate ? (
          <span
            className={
              new Date(task.dueDate) < new Date() ? "text-red-500 font-medium" : "text-gray-600"
            }
          >
            {format(new Date(task.dueDate), "MMM dd, yyyy")}
          </span>
        ) : (
          "No due date"
        )}
      </div>

      {/* Tags */}
      <div className="flex gap-2 flex-shrink-0">
        {task.tags.slice(0, 2).map((tag) => (
          <Badge key={tag} variant="outline" className="text-xs bg-gray-50">
            {tag}
          </Badge>
        ))}
        {task.tags.length > 2 && (
          <Badge variant="outline" className="text-xs bg-gray-50">
            +{task.tags.length - 2}
          </Badge>
        )}
      </div>
    </div>
  );
}