"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filters } from "../types/CustomerTypes";

interface CustomerFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

export function CustomerFilters({ search, setSearch, filters, setFilters }: CustomerFiltersProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="lg:col-span-2">
        <Input
          placeholder="Search contacts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
        />
      </div>
      <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value as Filters["type"] })}>
        <SelectTrigger>
          <SelectValue placeholder="All Types" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="Individual">Individual</SelectItem>
          <SelectItem value="Organization">Organization</SelectItem>
        </SelectContent>
      </Select>
      <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value as Filters["status"] })}>
        <SelectTrigger>
          <SelectValue placeholder="All Statuses" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="Active">Active</SelectItem>
          <SelectItem value="Inactive">Inactive</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}