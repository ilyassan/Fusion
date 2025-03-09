import { ChartCard } from "../../components/ChartCard";
import { PieChartComponent } from "../../components/PieChartComponent";
import { fetchSalesDistributionData } from "../data/fetchSalesDistributionData";

interface SalesDistributionChartProps {
  dateRange: string;
}

export async function SalesDistributionChart({ dateRange }: SalesDistributionChartProps) {
  const salesDistributionData = await fetchSalesDistributionData(dateRange);

  return (
    <ChartCard
      title="Revenue Distribution"
      description="Products vs Services"
    >
      <PieChartComponent
        data={salesDistributionData}
        dataKey="revenue"
        nameKey="name"
        innerRadius={60}
        outerRadius={80}
      />
    </ChartCard>
  );
}