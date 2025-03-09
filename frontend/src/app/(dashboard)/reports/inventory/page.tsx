import { Suspense } from "react";
import { Header } from "./components/Header";
import { PerformanceKPIs } from "./components/PerformanceKPIs";
import { StockValueByCategoryChart } from "./components/StockValueByCategoryChart";
import { ProductsVsServicesChart } from "./components/ProductsVsServicesChart";
import { InventoryMovementsChart } from "./components/InventoryMovementsChart";
import { TopSellingProductsChart } from "./components/TopSellingProductsChart";
import { InventoryValueTrendChart } from "./components/InventoryValueTrendChart";
import { MetricsSkeleton } from "./skeletons/MetricsSkeleton";
import { ChartSkeleton } from "./skeletons/ChartSkeleton";
import { updateFilter } from "./actions/updateFilter";

export default async function InventoryReportsDashboard({ searchParams }: { searchParams?: { dateRange?: string } }) {
  const dateRange = searchParams?.dateRange || "6months";

  return (
    <div className="w-full space-y-6">
      <Header initialDateRange={dateRange} updateFilter={updateFilter} />
      <Suspense fallback={<MetricsSkeleton />}>
        <PerformanceKPIs dateRange={dateRange} />
      </Suspense>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<ChartSkeleton />}>
          <StockValueByCategoryChart dateRange={dateRange} />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <ProductsVsServicesChart dateRange={dateRange} />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <InventoryMovementsChart dateRange={dateRange} />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <TopSellingProductsChart dateRange={dateRange} />
        </Suspense>
      </div>
      <Suspense fallback={<ChartSkeleton />}>
        <InventoryValueTrendChart dateRange={dateRange} />
      </Suspense>
    </div>
  );
}