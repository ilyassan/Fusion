"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, Download, ChevronDown } from "lucide-react";

interface AnalyticsHeaderProps {
  initialTimePeriod: string;
  updateFilter: (formData: FormData) => Promise<void>;
}

const TIME_PERIOD_MAP: Record<string, string> = {
  "30days": "Last 30 Days",
  "6months": "Last 6 Months",
  "1year": "Last Year",
};

const REVERSE_TIME_PERIOD_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(TIME_PERIOD_MAP).map(([key, value]) => [value, key])
);

export function AnalyticsHeader({ initialTimePeriod, updateFilter }: AnalyticsHeaderProps) {

  const initialDisplayPeriod = TIME_PERIOD_MAP[initialTimePeriod] || initialTimePeriod;
  const [displayTimePeriod, setDisplayTimePeriod] = useState(initialDisplayPeriod);
  const [isPending, startTransition] = useTransition();

  const handleTimePeriodChange = (displayPeriod: string) => {
    const internalPeriod = REVERSE_TIME_PERIOD_MAP[displayPeriod] || displayPeriod;
    setDisplayTimePeriod(displayPeriod);
    const formData = new FormData();
    formData.append("timePeriod", internalPeriod); // Use internal value for server
    startTransition(() => {
      updateFilter(formData).catch((err) => console.error("Filter update failed:", err));
    });
  };

  const handleDownload = () => {
    console.log("Downloading report...");
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold">Reports & Analytics</h2>
        <p className="text-muted-foreground">
          Track your sales performance and business metrics
        </p>
      </div>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 gap-2"
              disabled={isPending}
            >
              <Calendar className="h-4 w-4 text-gray-600" />
              <span className="hidden sm:inline">{displayTimePeriod}</span>
              <ChevronDown className="h-4 w-4 text-gray-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px] bg-white border border-gray-200">
            {Object.values(TIME_PERIOD_MAP).map((period) => (
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
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </Button>
      </div>
    </div>
  );
}