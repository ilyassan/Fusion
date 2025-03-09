import { Suspense } from "react";
import { Header } from "./components/Header";
import { PerformanceKPIs } from "./components/PerformanceKPIs";
import { ExpenseBreakdownChart } from "./components/ExpenseBreakdownChart";
import { ExpenseTrendsChart } from "./components/ExpenseTrendsChart";
import { HighCostTransactionsTable } from "./components/HighCostTransactionsTable";
import { RecurringExpensesTable } from "./components/RecurringExpensesTable";
import { MetricsSkeleton } from "./skeletons/MetricsSkeleton";
import { ChartSkeleton } from "./skeletons/ChartSkeleton";
import { TableSkeleton } from "./skeletons/TableSkeleton";
import { updateFilter } from "./actions/updateFilter";

export default async function ExpenseReportsDashboard({ searchParams }: { searchParams?: { dateRange?: string } }) {
  const dateRange = (await searchParams)?.dateRange || "6months";

  return (
    <div className="w-full space-y-6">
      <Header initialDateRange={dateRange} updateFilter={updateFilter} />
      <Suspense fallback={<MetricsSkeleton />}>
        <PerformanceKPIs dateRange={dateRange} />
      </Suspense>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<ChartSkeleton />}>
          <ExpenseBreakdownChart dateRange={dateRange} />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <ExpenseTrendsChart dateRange={dateRange} />
        </Suspense>
      </div>
      <div className="space-y-6">
        <Suspense fallback={<TableSkeleton />}>
          <HighCostTransactionsTable dateRange={dateRange} />
        </Suspense>
        <Suspense fallback={<TableSkeleton />}>
          <RecurringExpensesTable dateRange={dateRange} />
        </Suspense>
      </div>
    </div>
  );
}