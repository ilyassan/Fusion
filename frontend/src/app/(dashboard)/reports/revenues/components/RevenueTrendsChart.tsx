import { ChartCard } from "../../components/ChartCard";
import { LineChartComponent } from "../../components/LineChartComponent";
import { fetchRevenueTrendsData } from "../data/fetchRevenueTrendsData";

interface RevenueTrendsChartProps {
  dateRange: string;
}

export async function RevenueTrendsChart({ dateRange }: RevenueTrendsChartProps) {
  const revenueTrends = await fetchRevenueTrendsData(dateRange);

  return (
    <ChartCard
      title="Revenue Trends"
      description="Monthly revenue analysis"
    >
      <LineChartComponent
        data={revenueTrends}
        lines={[{ dataKey: "revenue", stroke: "#4f46e5", name: "Revenue" }]}
        xAxisKey="month"
      />
    </ChartCard>
  );
}