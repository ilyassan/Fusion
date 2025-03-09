import { ChartCard } from "../../components/ChartCard";
import { LineChartComponent } from "../../components/LineChartComponent";
import { fetchSalesTrendsData } from "../data/fetchSalesTrendsData";

interface SalesTrendsChartProps {
  dateRange: string;
}

export async function SalesTrendsChart({ dateRange }: SalesTrendsChartProps) {
  const salesTrendsData = await fetchSalesTrendsData(dateRange);

  return (
    <ChartCard
      title="Sales Trends"
      description="Revenue performance comparison"
    >
      <LineChartComponent
        data={salesTrendsData}
        lines={[
          { dataKey: "revenue", stroke: "#4f46e5", name: "Current Period" },
          { dataKey: "prevRevenue", stroke: "#10b981", name: "Previous Period" },
        ]}
        xAxisKey="period"
      />
    </ChartCard>
  );
}