import { Suspense } from "react";
import { AnalyticsHeader } from "./components/AnalyticsHeader";
import { RevenueLeadsChart } from "./components/RevenueLeadsChart";
import { PipelineDistributionChart } from "./components/PipelineDistributionChart";
import { CustomerRetentionChart } from "./components/CustomerRetentionChart";
import { ConversionRatesChart } from "./components/ConversionRatesChart";
import { SalesPerformanceTable } from "./components/SalesPerformanceTable";
import { fetchMonthlyData, fetchPipelineData, fetchRetentionData, fetchSalesPerformance } from "./data/analyticsData";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import ChartSkeleton from "@/app/(dashboard)/components/ChartSkeleton";
import TableSkeleton from "@/app/(dashboard)/components/TableSkeleton";

// Server Action
async function updateFilter(formData: FormData) {
  "use server";
  const timePeriod = formData.get("timePeriod") as string;
  revalidatePath("/crm/reports-analytics");
  redirect(`/crm/reports-analytics?timePeriod=${encodeURIComponent(timePeriod)}`);
}

export default async function AnalyticsDashboard({ searchParams }: { searchParams?: { timePeriod?: string } }) {
  const timePeriod = (await searchParams)?.timePeriod || "6months";

  return (
    <div className="space-y-6">
      <AnalyticsHeader
        initialTimePeriod={timePeriod === "30days" ? "Last 30 Days" : timePeriod === "6months" ? "Last 6 Months" : "Last Year"}
        updateFilter={updateFilter}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Suspense fallback={<ChartSkeleton />}>
          <RevenueLeadsSection timePeriod={timePeriod} />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <PipelineDistributionSection timePeriod={timePeriod} />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <CustomerRetentionSection timePeriod={timePeriod} />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <ConversionRatesSection timePeriod={timePeriod} />
        </Suspense>
      </div>

      <Suspense fallback={<TableSkeleton />}>
        <SalesPerformanceSection timePeriod={timePeriod} />
      </Suspense>
    </div>
  );
}

async function RevenueLeadsSection({ timePeriod }: { timePeriod: string }) {
  const data = await fetchMonthlyData(timePeriod);
  return <RevenueLeadsChart data={data} />;
}

async function PipelineDistributionSection({ timePeriod }: { timePeriod: string }) {
  const data = await fetchPipelineData(timePeriod);
  return <PipelineDistributionChart data={data} />;
}

async function CustomerRetentionSection({ timePeriod }: { timePeriod: string }) {
  const data = await fetchRetentionData(timePeriod);
  return <CustomerRetentionChart data={data} />;
}

async function ConversionRatesSection({ timePeriod }: { timePeriod: string }) {
  const data = await fetchMonthlyData(timePeriod);
  return <ConversionRatesChart data={data} />;
}

async function SalesPerformanceSection({ timePeriod }: { timePeriod: string }) {
  const data = await fetchSalesPerformance(timePeriod);
  return <SalesPerformanceTable data={data} />;
}