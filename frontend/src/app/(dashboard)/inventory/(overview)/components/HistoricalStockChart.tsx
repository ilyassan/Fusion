import { ChartCard } from "@/app/(dashboard)/reports/components/ChartCard";
import { LineChartComponent } from "@/app/(dashboard)/reports/components/LineChartComponent";
import { fetchHistoricalStockData } from "../data/fetchHistoricalStockData";

export async function HistoricalStockChart() {
  const historicalStockData = await fetchHistoricalStockData();

  return (
    <ChartCard title="Historical Stock Levels" description="Stock quantity over time">
      <LineChartComponent
        data={historicalStockData}
        lines={[{ dataKey: "stock", stroke: "#3B82F6", name: "Stock" }]}
        xAxisKey="date"
      />
    </ChartCard>
  );
}