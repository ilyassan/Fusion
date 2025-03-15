import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Product } from "../types/MovementTypes";

interface MovementsFilterProps {
  products: Product[];
  onSearchChange: (query: string) => void;
  onProductChange: (product: string) => void;
  onMovementTypeChange: (type: string) => void;
  onDateRangeChange: (range: { from?: Date; to?: Date }) => void;
}

export const MovementsFilter: React.FC<MovementsFilterProps> = ({
  products,
  onSearchChange,
  onProductChange,
  onMovementTypeChange,
  onDateRangeChange,
}) => {
  const [search, setSearch] = useState("");
  const [productFilter, setProductFilter] = useState("All Products");
  const [movementTypeFilter, setMovementTypeFilter] = useState("All Types");
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({ from: undefined, to: undefined });

  // Handle changes and call the respective callbacks
  const handleSearchChange = (value: string) => {
    setSearch(value);
    onSearchChange(value);
  };

  const handleProductChange = (value: string) => {
    setProductFilter(value);
    onProductChange(value);
  };

  const handleMovementTypeChange = (value: string) => {
    setMovementTypeFilter(value);
    onMovementTypeChange(value);
  };

  const handleDateRangeChange = (range: { from?: Date; to?: Date }) => {
    setDateRange(range);
    onDateRangeChange(range);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search movements..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex-1">
          <Select value={productFilter} onValueChange={handleProductChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Product" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Products">All Products</SelectItem>
              {products.map((product) => (
                <SelectItem key={product.id} value={product.name}>
                  {product.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Select value={movementTypeFilter} onValueChange={handleMovementTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Movement Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Types">All Types</SelectItem>
              <SelectItem value="New Stock">Stock In</SelectItem>
              <SelectItem value="Consumption">Stock Out</SelectItem>
              <SelectItem value="Damage">Damage</SelectItem>
              <SelectItem value="Loss">Loss</SelectItem>
              <SelectItem value="Correction">Correction</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <Label>Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal ${
                  !dateRange.from && "text-muted-foreground"
                }`}
              >
                {dateRange.from ? format(dateRange.from, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateRange.from}
                onSelect={(date) => handleDateRangeChange({ ...dateRange, from: date })}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex-1">
          <Label>End Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal ${
                  !dateRange.to && "text-muted-foreground"
                }`}
              >
                {dateRange.to ? format(dateRange.to, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateRange.to}
                onSelect={(date) => handleDateRangeChange({ ...dateRange, to: date })}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};