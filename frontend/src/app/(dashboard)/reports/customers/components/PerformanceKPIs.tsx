import { MetricCard } from "../../components/MetricCard";
import { fetchPerformanceData } from "../data/fetchPerformanceData";
import { TrendingUp, Users, DollarSign, BarChartIcon } from "lucide-react";

interface PerformanceKPIsProps {
  dateRange: string;
}

export async function PerformanceKPIs({ dateRange }: PerformanceKPIsProps) {
  const performanceData = await fetchPerformanceData(dateRange);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Revenue"
        value={`$${performanceData.totalRevenue.toLocaleString()}`}
        icon={<TrendingUp className="h-6 md:h-8 w-6 md:w-8 text-blue-600" />}
      />
      <MetricCard
        title="Total Leads"
        value={performanceData.totalLeads.toString()}
        icon={<Users className="h-6 md:h-8 w-6 md:w-8 text-green-600" />}
      />
      <MetricCard
        title="Avg. Deal Size"
        value={`$${performanceData.averageDealSize.toLocaleString()}`}
        icon={<DollarSign className="h-6 md:h-8 w-6 md:w-8 text-purple-600" />}
      />
      <MetricCard
        title="Conversion Rate"
        value={`${performanceData.conversionRate}%`}
        valueClassName="text-green-600"
        icon={<BarChartIcon className="h-6 md:h-8 w-6 md:w-8 text-teal-600" />}
      />
    </div>
  );
}