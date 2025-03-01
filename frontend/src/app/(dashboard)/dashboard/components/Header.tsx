"use client";

import { useState, useTransition } from "react";
import { Calendar, Bell, Settings, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  initialTimePeriod: string;
  updateFilter: (formData: FormData) => Promise<any>; // Server Action type
}

export function Header({ initialTimePeriod, updateFilter }: HeaderProps) {
  const [timePeriod, setTimePeriod] = useState(initialTimePeriod);
  const [isPending, startTransition] = useTransition();

  const handleTimePeriodChange = (newTimePeriod: string) => {
    setTimePeriod(newTimePeriod);
    const formData = new FormData();
    formData.append("timePeriod", newTimePeriod);
    startTransition(() => {
      updateFilter(formData).catch((err) => console.error("Filter update failed:", err));
    });
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg border border-gray-200">
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-600">Welcome back! Here's your overview.</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 gap-2"
              disabled={isPending}
            >
              <Calendar className="h-4 w-4 text-gray-600" />
              <span className="hidden sm:inline">{timePeriod}</span>
              <ChevronDown className="h-4 w-4 text-gray-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px] bg-white border border-gray-200">
            {["Today", "This Week", "This Month", "This Quarter", "This Year"].map((period) => (
              <DropdownMenuItem
                key={period}
                onSelect={() => handleTimePeriodChange(period)}
                className="cursor-pointer hover:bg-gray-50 text-gray-700"
              >
                {period}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline" size="icon" className="bg-white border-gray-200 hover:bg-gray-50">
          <Bell className="h-4 w-4 text-gray-600" />
        </Button>
        <Button variant="outline" size="icon" className="bg-white border-gray-200 hover:bg-gray-50">
          <Settings className="h-4 w-4 text-gray-600" />
        </Button>
      </div>
    </div>
  );
}