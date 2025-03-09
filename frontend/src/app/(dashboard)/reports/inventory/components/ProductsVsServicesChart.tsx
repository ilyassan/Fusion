import { ChartCard } from "../../components/ChartCard";
import { PieChartComponent } from "../../components/PieChartComponent";
import { fetchProductVsServicesData } from "../data/fetchProductVsServicesData";

interface ProductsVsServicesChartProps {
  dateRange: string;
}

export async function ProductsVsServicesChart({ dateRange }: ProductsVsServicesChartProps) {
  const productVsServices = await fetchProductVsServicesData(dateRange);

  return (
    <ChartCard
      title="Products vs Services"
      description="Percentage split between products and services"
    >
      <PieChartComponent
        data={productVsServices}
        dataKey="value"
        nameKey="name"
        innerRadius={60}
        outerRadius={80}
      />
    </ChartCard>
  );
}