import { Suspense } from "react";
import { Header } from "./components/Header";
import { PerformanceKPIs } from "./components/PerformanceKPIs";
import { HistoricalStockChart } from "./components/HistoricalStockChart";
import { ProductServiceChart } from "./components/ProductServiceChart";
import { RecentActivityTable } from "./components/RecentActivityTable";
import { TopSellingItemsChart } from "./components/TopSellingItemsChart";
import { InventoryHealthTabs } from "./components/InventoryHealthTabs";
import { InventoryAlerts } from "./components/InventoryAlerts";
import { MetricsSkeleton } from "./skeletons/MetricsSkeleton";
import { ChartSkeleton } from "./skeletons/ChartSkeleton";
import { TableSkeleton } from "./skeletons/TableSkeleton";
import { TabsSkeleton } from "./skeletons/TabsSkeleton";

export default async function InventoryOverviewPage() {
  return (
    <div className="w-full space-y-6">
      <Header />
      <Suspense fallback={<MetricsSkeleton />}>
        <PerformanceKPIs />
      </Suspense>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<ChartSkeleton />}>
          <HistoricalStockChart />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <ProductServiceChart />
        </Suspense>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<TableSkeleton />}>
          <RecentActivityTable />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <TopSellingItemsChart />
        </Suspense>
      </div>
      <Suspense fallback={<TabsSkeleton />}>
        <InventoryHealthTabs />
      </Suspense>
      <Suspense fallback={<TableSkeleton />}>
        <InventoryAlerts />
      </Suspense>
    </div>
  );
}