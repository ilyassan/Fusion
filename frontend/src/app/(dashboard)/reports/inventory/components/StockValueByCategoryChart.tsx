import { ChartCard } from "../../components/ChartCard";
import { PieChartComponent } from "../../components/PieChartComponent";
import { fetchProductCategoriesData } from "../data/fetchProductCategoriesData";

interface StockValueByCategoryChartProps {
  dateRange: string;
}

export async function StockValueByCategoryChart({ dateRange }: StockValueByCategoryChartProps) {
  const productCategories = await fetchProductCategoriesData(dateRange);

  return (
    <ChartCard
      title="Stock Value by Category"
      description="Distribution of inventory value across product categories"
    >
      <PieChartComponent
        data={productCategories}
        dataKey="value"
        nameKey="name"
        innerRadius={60}
        outerRadius={80}
      />
    </ChartCard>
  );
}