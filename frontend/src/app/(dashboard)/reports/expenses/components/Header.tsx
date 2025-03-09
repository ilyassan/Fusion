"use client";

import { useState, useTransition } from "react";
import { ReportHeader } from "../../components/ReportHeader";

interface HeaderProps {
  initialDateRange: string;
  updateFilter: (formData: FormData) => Promise<void>;
}

export function Header({ initialDateRange, updateFilter }: HeaderProps) {
  const [dateRange, setDateRange] = useState(initialDateRange);
  const [isPending, startTransition] = useTransition();

  const handleDateRangeChange = (newDateRange: string) => {
    setDateRange(newDateRange);
    const formData = new FormData();
    formData.append("dateRange", newDateRange);
    startTransition(() => {
      updateFilter(formData).catch((err) => console.error("Filter update failed:", err));
    });
  };

  const handleExport = () => {
    console.log("Generating comprehensive expense report...");
  };

  return (
    <ReportHeader
      title="Expense Reports"
      description="Track company expenses and identify cost-saving opportunities"
      dateRange={dateRange}
      onDateRangeChange={handleDateRangeChange}
      onExport={handleExport}
      isPending={isPending}
    />
  );
}