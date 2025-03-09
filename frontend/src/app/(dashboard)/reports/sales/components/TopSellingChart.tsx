import { ChartCard } from "../../components/ChartCard";
import { BarChartComponent } from "../../components/BarChartComponent";
import { fetchTopSellingData } from "../data/fetchTopSellingData";

interface TopSellingChartProps {
  dateRange: string;
}

export async function TopSellingChart({ dateRange }: TopSellingChartProps) {
  const topSellingData = await fetchTopSellingData(dateRange);

  return (
    <ChartCard
      title="Top-Selling Items"
      description="Performance by product/service"
    >
      <BarChartComponent
        data={topSellingData}
        bars={[
          { dataKey: "revenue", fill: "#4f46e5", name: "Revenue" },
          { dataKey: "unitsSold", fill: "#10b981", name: "Units Sold" },
        ]}
        xAxisKey="name"
      />
    </ChartCard>
  );
}