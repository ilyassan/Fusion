import { ChartCard } from "../../components/ChartCard";
import { BarChartComponent } from "../../components/BarChartComponent";
import { fetchProfitMarginAnalysisData } from "../data/fetchProfitMarginAnalysisData";

interface ProfitMarginAnalysisChartProps {
  dateRange: string;
}

export async function ProfitMarginAnalysisChart({ dateRange }: ProfitMarginAnalysisChartProps) {
  const profitMarginAnalysis = await fetchProfitMarginAnalysisData(dateRange);

  return (
    <ChartCard
      title="Profit Margin Analysis"
      description="Revenue vs. costs per product/service"
    >
      <BarChartComponent
        data={profitMarginAnalysis}
        bars={[
          { dataKey: "revenue", fill: "#4f46e5", name: "Revenue" },
          { dataKey: "cost", fill: "#ef4444", name: "Cost" },
        ]}
        xAxisKey="name"
        xAxisProps={{ angle: -45, textAnchor: "end", height: 60 }}
        stackId="a"
      />
    </ChartCard>
  );
}