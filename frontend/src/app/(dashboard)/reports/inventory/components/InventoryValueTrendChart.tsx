import { ChartCard } from "../../components/ChartCard";
import { AreaChartComponent } from "../../components/AreaChartComponent";
import { fetchInventoryValueTrendData } from "../data/fetchInventoryValueTrendData";

interface InventoryValueTrendChartProps {
  dateRange: string;
}

export async function InventoryValueTrendChart({ dateRange }: InventoryValueTrendChartProps) {
  const inventoryValueTrend = await fetchInventoryValueTrendData(dateRange);

  return (
    <ChartCard
      title="Inventory Value Trend"
      description="Historical trend of total inventory value over time"
    >
      <AreaChartComponent
        data={inventoryValueTrend}
        area={{ dataKey: "value", stroke: "#4f46e5", fill: "#4f46e5", fillOpacity: 0.2, name: "Inventory Value" }}
        xAxisKey="month"
      />
    </ChartCard>
  );
}