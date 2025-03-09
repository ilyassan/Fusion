import { ChartCard } from "../../components/ChartCard";
import { VerticalBarChartComponent } from "../../components/VerticalBarChartComponent";
import { fetchGeographicalSalesData } from "../data/fetchGeographicalSalesData";

interface GeographicalSalesChartProps {
  dateRange: string;
}

export async function GeographicalSalesChart({ dateRange }: GeographicalSalesChartProps) {
  const geographicalSalesData = await fetchGeographicalSalesData(dateRange);

  return (
    <ChartCard
      title="Geographical Sales"
      description="Revenue by region"
    >
      <VerticalBarChartComponent
        data={geographicalSalesData}
        bar={{ dataKey: "revenue", fill: "#4f46e5" }}
        yAxisKey="region"
      />
    </ChartCard>
  );
}