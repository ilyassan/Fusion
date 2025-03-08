"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Filters } from "../types/salesTypes";

interface SalesFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

export function SalesFilters({ search, setSearch, filters, setFilters }: SalesFiltersProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search transactions..."
          className="pl-8 w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="Electronics">Electronics</SelectItem>
          <SelectItem value="Clothing">Clothing</SelectItem>
          <SelectItem value="Food">Food</SelectItem>
          <SelectItem value="Books">Books</SelectItem>
          <SelectItem value="Sports">Sports</SelectItem>
        </SelectContent>
      </Select>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn("w-full justify-start text-left font-normal", !filters.dateFrom && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {filters.dateFrom ? format(new Date(filters.dateFrom), "PPP") : <span>From</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={filters.dateFrom ? new Date(filters.dateFrom) : undefined}
            onSelect={(date) =>
              setFilters({ ...filters, dateFrom: date ? date.toISOString().split("T")[0] : "" })
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn("w-full justify-start text-left font-normal", !filters.dateTo && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {filters.dateTo ? format(new Date(filters.dateTo), "PPP") : <span>To</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={filters.dateTo ? new Date(filters.dateTo) : undefined}
            onSelect={(date) => setFilters({ ...filters, dateTo: date ? date.toISOString().split("T")[0] : "" })}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}