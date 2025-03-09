import { ChartCard } from "../../components/ChartCard";
import { LineChartComponent } from "../../components/LineChartComponent";
import { fetchInventoryMovementsData } from "../data/fetchInventoryMovementsData";

interface InventoryMovementsChartProps {
  dateRange: string;
}

export async function InventoryMovementsChart({ dateRange }: InventoryMovementsChartProps) {
  const inventoryMovements = await fetchInventoryMovementsData(dateRange);

  return (
    <ChartCard
      title="Inventory Movements"
      description="Stock-in and stock-out trends over time"
    >
      <LineChartComponent
        data={inventoryMovements}
        lines={[
          { dataKey: "stockIn", stroke: "#4f46e5", name: "Stock In" },
          { dataKey: "stockOut", stroke: "#ef4444", name: "Stock Out" },
        ]}
        xAxisKey="month"
      />
    </ChartCard>
  );
}