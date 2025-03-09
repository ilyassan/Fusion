import { ChartCard } from "../../components/ChartCard";
import { BarChartComponent } from "../../components/BarChartComponent";
import { fetchTopSellingProductsData } from "../data/fetchTopSellingProductsData";

interface TopSellingProductsChartProps {
  dateRange: string;
}

export async function TopSellingProductsChart({ dateRange }: TopSellingProductsChartProps) {
  const topSellingProducts = await fetchTopSellingProductsData(dateRange);

  return (
    <ChartCard
      title="Top Selling Products"
      description="Best-performing products by sales volume"
    >
      <BarChartComponent
        data={topSellingProducts}
        bars={[
          { dataKey: "sales", fill: "#4f46e5", name: "Sales" },
          { dataKey: "stockLevel", fill: "#10b981", name: "Current Stock" },
        ]}
        xAxisKey="name"
        xAxisProps={{ angle: -45, textAnchor: "end", height: 60 }}
      />
    </ChartCard>
  );
}