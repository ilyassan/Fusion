"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TaskStatus } from "../../types/KanbanTypes";

type TaskStatusProps = {
  status: TaskStatus;
  onChange: (status: TaskStatus) => void;
};

export default function TaskStatusComponent({ status, onChange }: TaskStatusProps) {
  return (
    <div className="mb-6">
      <Select value={status} onValueChange={(value) => onChange(value as TaskStatus)}>
        <SelectTrigger className="w-[150px] bg-gray-100 text-gray-800">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todo">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-gray-500"></span>
              <span>To Do</span>
            </div>
          </SelectItem>
          <SelectItem value="inprogress">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500"></span>
              <span>In Progress</span>
            </div>
          </SelectItem>
          <SelectItem value="completed">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <span>Completed</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}