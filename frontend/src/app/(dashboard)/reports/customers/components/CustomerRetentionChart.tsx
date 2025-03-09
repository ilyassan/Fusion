import { ChartCard } from "../../components/ChartCard";
import { AreaChartComponent } from "../../components/AreaChartComponent";
import { fetchRetentionData } from "../data/fetchRetentionData";

interface CustomerRetentionChartProps {
  dateRange: string;
}

export async function CustomerRetentionChart({ dateRange }: CustomerRetentionChartProps) {
  const retentionData = await fetchRetentionData(dateRange);

  return (
    <ChartCard
      title="Customer Retention"
      description="Monthly retention rates"
    >
      <AreaChartComponent
        data={retentionData}
        area={{ dataKey: "rate", stroke: "#0891b2", fill: "#0891b2", fillOpacity: 0.2, name: "Retention Rate (%)" }}
        xAxisKey="month"
        yDomain={[85, 100]}
      />
    </ChartCard>
  );
}