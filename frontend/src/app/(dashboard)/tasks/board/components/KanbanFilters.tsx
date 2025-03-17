"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filters } from "../types/KanbanTypes";

type KanbanFiltersProps = {
  filters: Filters;
  setFilters: (filters: Filters) => void;
};

export default function KanbanFilters({ filters, setFilters }: KanbanFiltersProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Input
            placeholder="Filter by title, tags, assignee..."
            className="col-span-3"
            value={filters.keyword}
            onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
          />

          <Select
            value={filters.priority || "all"}
            onValueChange={(value) =>
              setFilters({ ...filters, priority: value === "all" ? "" : (value as any) })
            }
          >
            <SelectTrigger className="col-start-5">
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
      </CardContent>
    </Card>
  );
}