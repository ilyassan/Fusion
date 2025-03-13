"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filters } from "../types/ProductTypes";
import { Search } from "lucide-react";
import { Category } from "../types/ProductTypes";

interface ProductFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  filters: Filters;
  setFilters: (filters: Filters) => void;
  categories: Category[];
}

export function ProductFilters({ search, setSearch, filters, setFilters, categories }: ProductFiltersProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="lg:col-span-2 relative">
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
      <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
        <SelectTrigger>
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.name}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={filters.stockStatus} onValueChange={(value) => setFilters({ ...filters, stockStatus: value })}>
        <SelectTrigger>
          <SelectValue placeholder="All Stock Levels" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Stock Levels</SelectItem>
          <SelectItem value="low">Low Stock</SelectItem>
          <SelectItem value="medium">Medium Stock</SelectItem>
          <SelectItem value="high">High Stock</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}