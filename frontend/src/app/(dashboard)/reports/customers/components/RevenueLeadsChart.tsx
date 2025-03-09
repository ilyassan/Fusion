import { ChartCard } from "../../components/ChartCard";
import { LineChartComponent } from "../../components/LineChartComponent";
import { fetchMonthlyData } from "../data/fetchMonthlyData";

interface RevenueLeadsChartProps {
  dateRange: string;
}

export async function RevenueLeadsChart({ dateRange }: RevenueLeadsChartProps) {
  const monthlyData = await fetchMonthlyData(dateRange);

  return (
    <ChartCard
      title="Revenue & Leads"
      description="Monthly revenue and lead generation"
    >
      <LineChartComponent
        data={monthlyData}
        lines={[
          { dataKey: "revenue", stroke: "#4f46e5", name: "Revenue ($)" },
          { dataKey: "leads", stroke: "#2563eb", name: "Leads" },
        ]}
        xAxisKey="month"
        dualAxis={true} // Enable dual Y-axis for revenue and leads
      />
    </ChartCard>
  );
}