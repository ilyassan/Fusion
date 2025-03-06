import { Suspense } from "react";
import { SalesHeader } from "./components/SalesHeader";
import { MetricCard } from "./components/MetricCard";
import { RevenueHistoryChart } from "./components/RevenueHistoryChart";
import { ProductPerformanceChart } from "./components/ProductPerformanceChart";
import { SalesByChannelChart } from "./components/SalesByChannelChart";
import { MonthlyTargetProgress } from "./components/MonthlyTargetProgress";
import {
  fetchSalesMetrics,
  fetchRevenueHistory,
  fetchProductPerformance,
  fetchSalesByChannel,
  fetchMonthlyTargets,
} from "./data/salesData";
import { DollarSign, ShoppingCart, TrendingUp, Target, ArrowUpRight, ArrowDownRight } from "lucide-react";
import ChartSkeleton from "@/app/(dashboard)/components/ChartSkeleton";

export default async function SalesOverviewPage() {

  return (
    <div className="space-y-8">
      <SalesHeader />

      <Suspense fallback={<MetricsSkeleton />}>
        <MetricsSection/>
      </Suspense>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Suspense fallback={<ChartSkeleton />}>
          <RevenueHistorySection />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <ProductPerformanceSection />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <SalesByChannelSection />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <MonthlyTargetProgressSection />
        </Suspense>
      </div>
    </div>
  );
}


async function MetricsSection() {
  const metrics = await fetchSalesMetrics();
  const monthlyTargets = await fetchMonthlyTargets();
  const growth = ((monthlyTargets.current - monthlyTargets.previousMonth) / monthlyTargets.previousMonth * 100).toFixed(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <MetricCard
        title="Total Revenue"
        value={`$${metrics.totalRevenue.toLocaleString()}`}
        Icon={DollarSign}
        iconColor="text-green-500"
        growth={Number(growth)}
      />
      <MetricCard
        title="Total Sales"
        value={metrics.totalSales.toLocaleString()}
        Icon={ShoppingCart}
        iconColor="text-blue-500"
        subText="orders this month"
      />
      <MetricCard
        title="Avg Order Value"
        value={`$${metrics.avgOrderValue}`}
        Icon={TrendingUp}
        iconColor="text-purple-500"
        subText="per order"
      />
      <MetricCard
        title="Conversion Rate"
        value={`${metrics.conversionRate}%`}
        Icon={Target}
        iconColor="text-orange-500"
        subText="of total visitors"
      />
    </div>
    );
}

async function RevenueHistorySection() {
  const data = await fetchRevenueHistory();
  return <RevenueHistoryChart data={data} />;
}

async function ProductPerformanceSection() {
  const data = await fetchProductPerformance();
  return <ProductPerformanceChart data={data} />;
}

async function SalesByChannelSection() {
  const data = await fetchSalesByChannel();
  return <SalesByChannelChart data={data} />;
}

async function MonthlyTargetProgressSection() {
  const data = await fetchMonthlyTargets();
  return <MonthlyTargetProgress data={data} />;
}

function MetricsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="h-32 bg-gray-200 animate-pulse rounded-lg" />
      <div className="h-32 bg-gray-200 animate-pulse rounded-lg" />
      <div className="h-32 bg-gray-200 animate-pulse rounded-lg" />
      <div className="h-32 bg-gray-200 animate-pulse rounded-lg" />
    </div>
  );
}