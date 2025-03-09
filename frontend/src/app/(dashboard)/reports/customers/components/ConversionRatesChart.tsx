import { ChartCard } from "../../components/ChartCard";
import { BarChartComponent } from "../../components/BarChartComponent";
import { fetchMonthlyData } from "../data/fetchMonthlyData";

interface ConversionRatesChartProps {
  dateRange: string;
}

export async function ConversionRatesChart({ dateRange }: ConversionRatesChartProps) {
  const monthlyData = await fetchMonthlyData(dateRange);

  return (
    <ChartCard
      title="Conversion Rates"
      description="Monthly lead conversion rates"
    >
      <BarChartComponent
        data={monthlyData}
        bars={[{ dataKey: "conversions", fill: "#7c3aed", name: "Conversions" }]}
        xAxisKey="month"
      />
    </ChartCard>
  );
}