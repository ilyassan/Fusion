import { ChartCard } from "../../components/ChartCard";
import { PieChartComponent } from "../../components/PieChartComponent";
import { fetchRevenueByProductData } from "../data/fetchRevenueByProductData";

interface RevenueByProductChartProps {
  dateRange: string;
}

export async function RevenueByProductChart({ dateRange }: RevenueByProductChartProps) {
  const revenueByProduct = await fetchRevenueByProductData(dateRange);

  return (
    <ChartCard
      title="Revenue by Product/Service"
      description="Earnings breakdown by category"
    >
      <PieChartComponent
        data={revenueByProduct}
        dataKey="revenue"
        nameKey="name"
        innerRadius={60}
        outerRadius={80}
      />
    </ChartCard>
  );
}