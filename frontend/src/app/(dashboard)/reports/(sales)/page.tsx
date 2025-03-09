import { Suspense } from "react";
import { Header } from "./components/Header";
import { PerformanceKPIs } from "./components/PerformanceKPIs";
import { SalesTrendsChart } from "./components/SalesTrendsChart";
import { TopSellingChart } from "./components/TopSellingChart";
import { SalesDistributionChart } from "./components/SalesDistributionChart";
import { GeographicalSalesChart } from "./components/GeographicalSalesChart";
import { MetricsSkeleton } from "./skeletons/MetricsSkeleton";
import { ChartSkeleton } from "./skeletons/ChartSkeleton";
import { updateFilter } from "./actions/updateFilter";

export default async function SalesReportsDashboard({ searchParams }: { searchParams?: { dateRange?: string } }) {
  const dateRange = (await searchParams)?.dateRange || "6months";

  return (
    <div className="w-full space-y-6">
      <Header initialDateRange={dateRange} updateFilter={updateFilter} />
      <Suspense fallback={<MetricsSkeleton />}>
        <PerformanceKPIs dateRange={dateRange} />
      </Suspense>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<ChartSkeleton />}>
          <SalesTrendsChart dateRange={dateRange} />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <TopSellingChart dateRange={dateRange} />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <SalesDistributionChart dateRange={dateRange} />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <GeographicalSalesChart dateRange={dateRange} />
        </Suspense>
      </div>
    </div>
  );
}