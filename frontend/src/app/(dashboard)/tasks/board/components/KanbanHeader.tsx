"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type KanbanHeaderProps = {
  viewMode: "kanban" | "list" | "calendar";
  setViewMode: (mode: "kanban" | "list" | "calendar") => void;
};

export default function KanbanHeader({
  viewMode,
  setViewMode,
}: KanbanHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold">Task Board</h2>
        <p className="text-gray-500">Manage your tasks efficiently</p>
      </div>
      <div className="flex gap-2">
        <Select value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
          <SelectTrigger className="w-[150px] bg-white">
            <SelectValue placeholder="View Mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="kanban">Kanban</SelectItem>
            <SelectItem value="list">List</SelectItem>
            <SelectItem value="calendar">Calendar</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}