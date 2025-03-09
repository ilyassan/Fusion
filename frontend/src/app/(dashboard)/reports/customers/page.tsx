import { Suspense } from "react";
import { Header } from "./components/Header";
import { PerformanceKPIs } from "./components/PerformanceKPIs";
import { RevenueLeadsChart } from "./components/RevenueLeadsChart";
import { PipelineDistributionChart } from "./components/PipelineDistributionChart";
import { CustomerRetentionChart } from "./components/CustomerRetentionChart";
import { ConversionRatesChart } from "./components/ConversionRatesChart";
import { SalesPerformanceTable } from "./components/SalesPerformanceTable";
import { MetricsSkeleton } from "./skeletons/MetricsSkeleton";
import { ChartSkeleton } from "./skeletons/ChartSkeleton";
import { TableSkeleton } from "./skeletons/TableSkeleton";
import { updateFilter } from "./actions/updateFilter";

export default async function CustomerReportsDashboard({ searchParams }: { searchParams?: { dateRange?: string } }) {
  const dateRange = (await searchParams)?.dateRange || "6months";

  return (
    <div className="w-full space-y-6">
      <Header initialDateRange={dateRange} updateFilter={updateFilter} />
      <Suspense fallback={<MetricsSkeleton />}>
        <PerformanceKPIs dateRange={dateRange} />
      </Suspense>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<ChartSkeleton />}>
          <RevenueLeadsChart dateRange={dateRange} />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <PipelineDistributionChart dateRange={dateRange} />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <CustomerRetentionChart dateRange={dateRange} />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <ConversionRatesChart dateRange={dateRange} />
        </Suspense>
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <SalesPerformanceTable dateRange={dateRange} />
      </Suspense>
    </div>
  );
}