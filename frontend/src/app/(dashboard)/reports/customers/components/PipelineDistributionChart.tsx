import { ChartCard } from "../../components/ChartCard";
import { PieChartComponent } from "../../components/PieChartComponent";
import { fetchPipelineData } from "../data/fetchPipelineData";

interface PipelineDistributionChartProps {
  dateRange: string;
}

export async function PipelineDistributionChart({ dateRange }: PipelineDistributionChartProps) {
  const pipelineData = await fetchPipelineData(dateRange);

  return (
    <ChartCard
      title="Pipeline Distribution"
      description="Deal distribution across stages"
    >
      <PieChartComponent
        data={pipelineData}
        dataKey="value"
        nameKey="name"
        innerRadius={60}
        outerRadius={80}
      />
    </ChartCard>
  );
}