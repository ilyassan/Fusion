import { ChartCard } from "../../components/ChartCard";
import { LineChartComponent } from "../../components/LineChartComponent";
import { fetchRevenueVsExpensesData } from "../data/fetchRevenueVsExpensesData";

interface RevenueVsExpensesChartProps {
  dateRange: string;
}

export async function RevenueVsExpensesChart({ dateRange }: RevenueVsExpensesChartProps) {
  const revenueVsExpenses = await fetchRevenueVsExpensesData(dateRange);

  return (
    <ChartCard
      title="Revenue vs. Expenses"
      description="Profit margins against operational costs"
    >
      <LineChartComponent
        data={revenueVsExpenses}
        lines={[
          { dataKey: "revenue", stroke: "#4f46e5", name: "Revenue" },
          { dataKey: "expenses", stroke: "#ef4444", name: "Expenses" },
        ]}
        xAxisKey="month"
      />
    </ChartCard>
  );
}