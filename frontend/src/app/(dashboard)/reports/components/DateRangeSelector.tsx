"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";

interface DateRangeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function DateRangeSelector({ value, onChange, disabled }: DateRangeSelectorProps) {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="w-full sm:w-[180px] bg-white">
        <CalendarIcon className="mr-2 h-4 w-4" />
        <SelectValue placeholder="Select period" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="30days">Last 30 Days</SelectItem>
        <SelectItem value="6months">Last 6 Months</SelectItem>
        <SelectItem value="1year">Last Year</SelectItem>
      </SelectContent>
    </Select>
  );
}