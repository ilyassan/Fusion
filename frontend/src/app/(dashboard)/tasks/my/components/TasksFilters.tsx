"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filters, Priority } from "../../board/types/KanbanTypes";

type TasksFiltersProps = {
  filters: Filters;
  setFilters: (filters: Filters) => void;
};

export default function TasksFilters({ filters, setFilters }: TasksFiltersProps) {
  return (
    <div className="flex gap-4 mb-6">
      <div className="w-full max-w-sm">
        <Input
          type="text"
          placeholder="Search tasks..."
          value={filters.keyword}
          onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
          className="w-full bg-white"
        />
      </div>
      <Select
        value={filters.priority || "all"}
        onValueChange={(value) =>
          setFilters({ ...filters, priority: value === "all" ? "" : (value as Priority) })
        }
      >
        <SelectTrigger className="w-40 bg-white">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Priorities</SelectItem>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
          <SelectItem value="critical">Critical</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}