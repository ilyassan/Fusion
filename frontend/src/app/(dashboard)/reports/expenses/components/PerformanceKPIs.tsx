import { MetricCard } from "../../components/MetricCard";
import { fetchPerformanceData } from "../data/fetchPerformanceData";
import { DollarSign, TrendingDown, PieChartIcon, ArrowUpDown } from "lucide-react";

interface PerformanceKPIsProps {
  dateRange: string;
}

export async function PerformanceKPIs({ dateRange }: PerformanceKPIsProps) {
  const performanceData = await fetchPerformanceData(dateRange);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Expenses"
        value={`$${performanceData.totalExpenses.toLocaleString()}`}
        icon={<DollarSign className="h-6 md:h-8 w-6 md:w-8 text-blue-600" />}
      />
      <MetricCard
        title="Monthly Trend"
        value={`${performanceData.monthlyTrend}%`}
        icon={<TrendingDown className="h-6 md:h-8 w-6 md:w-8 text-green-600" />}
      />
      <MetricCard
        title="Largest Category"
        value={performanceData.largestCategory}
        icon={<PieChartIcon className="h-6 md:h-8 w-6 md:w-8 text-purple-600" />}
        disableAnimation={true}
      />
      <MetricCard
        title="Expense Ratio"
        value={`${performanceData.expenseRatio}%`}
        icon={<ArrowUpDown className="h-6 md:h-8 w-6 md:w-8 text-teal-600" />}
      />
    </div>
  );
}