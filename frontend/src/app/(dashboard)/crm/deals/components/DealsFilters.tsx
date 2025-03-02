"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Filters } from "../types/DealTypes";
import { cn } from "@/lib/utils";
import { InputDate } from "@/components/ui/date-input";

type DealsFiltersProps = {
  filters: Filters;
  setFilters: (filters: Filters) => void;
};

export default function DealsFilters({ filters, setFilters }: DealsFiltersProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search Input */}
          <Input
            placeholder="Search deals..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />

          {/* Priority Select */}
          <Select
            value={filters.priority || "all"}
            onValueChange={(value) =>
              setFilters({ ...filters, priority: value === "all" ? "" : value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          <InputDate
            date={filters.fromDate}
            onDateChange={(date) => setFilters({ ...filters, fromDate: date })}
            placeholder="From Date"
          />

          <InputDate
            date={filters.toDate}
            onDateChange={(date) => setFilters({ ...filters, toDate: date })}
            placeholder="To Date"
          />
        </div>
      </CardContent>
    </Card>
  );
}