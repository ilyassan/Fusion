"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TaskStatus } from "../types/KanbanTypes";
import { Trash2 } from "lucide-react";

type BulkActionsToolbarProps = {
  selectedTasks: string[];
  deleteTasks: (taskIds: string[]) => void;
  bulkAssign: (taskIds: string[], assignee: string) => void;
  bulkChangeStatus: (taskIds: string[], newStatus: TaskStatus) => void;
};

export default function BulkActionsToolbar({
  selectedTasks,
  deleteTasks,
  bulkAssign,
  bulkChangeStatus,
}: BulkActionsToolbarProps) {
  return (
    <div className="flex items-center gap-2 p-2 bg-gray-100 rounded">
      <span>{selectedTasks.length} tasks selected</span>
      <Select
        onValueChange={(value) => bulkChangeStatus(selectedTasks, value as TaskStatus)}
      >
        <SelectTrigger className="w-[150px] bg-white">
          <SelectValue placeholder="Change Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todo">To Do</SelectItem>
          <SelectItem value="inprogress">In Progress</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={(value) => bulkAssign(selectedTasks, value)}>
        <SelectTrigger className="w-[150px] bg-white">
          <SelectValue placeholder="Assign To" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="user1">User 1</SelectItem>
          <SelectItem value="user2">User 2</SelectItem>
          <SelectItem value="user3">User 3</SelectItem>
        </SelectContent>
      </Select>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => deleteTasks(selectedTasks)}
      >
        <Trash2 className="h-4 w-4 mr-2" />
        Delete
      </Button>
    </div>
  );
}