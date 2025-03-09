import { Suspense } from "react";
import { Header } from "./components/Header";
import { PerformanceKPIs } from "./components/PerformanceKPIs";
import { RevenueTrendsChart } from "./components/RevenueTrendsChart";
import { RevenueByProductChart } from "./components/RevenueByProductChart";
import { ProfitMarginAnalysisChart } from "./components/ProfitMarginAnalysisChart";
import { RevenueVsExpensesChart } from "./components/RevenueVsExpensesChart";
import { TopCustomersTable } from "./components/TopCustomersTable";
import { MetricsSkeleton } from "./skeletons/MetricsSkeleton";
import { ChartSkeleton } from "./skeletons/ChartSkeleton";
import { TableSkeleton } from "./skeletons/TableSkeleton";
import { updateFilter } from "./actions/updateFilter";

export default async function RevenueReportsDashboard({ searchParams }: { searchParams?: { dateRange?: string } }) {
  const dateRange = searchParams?.dateRange || "6months";

  return (
    <div className="w-full space-y-6">
      <Header initialDateRange={dateRange} updateFilter={updateFilter} />
      <Suspense fallback={<MetricsSkeleton />}>
        <PerformanceKPIs dateRange={dateRange} />
      </Suspense>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<ChartSkeleton />}>
          <RevenueTrendsChart dateRange={dateRange} />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <RevenueByProductChart dateRange={dateRange} />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <ProfitMarginAnalysisChart dateRange={dateRange} />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <RevenueVsExpensesChart dateRange={dateRange} />
        </Suspense>
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <TopCustomersTable dateRange={dateRange} />
      </Suspense>
    </div>
  );
}