import { ChartCard } from "../../components/ChartCard";
import { LineChartComponent } from "../../components/LineChartComponent";
import { fetchExpenseTrendsData } from "../data/fetchExpenseTrendsData";

interface ExpenseTrendsChartProps {
  dateRange: string;
}

export async function ExpenseTrendsChart({ dateRange }: ExpenseTrendsChartProps) {
  const expenseTrends = await fetchExpenseTrendsData(dateRange);

  return (
    <ChartCard
      title="Expense vs Revenue Trends"
      description="Monthly comparison of expenses and revenue"
    >
      <LineChartComponent
        data={expenseTrends}
        lines={[
          { dataKey: "expenses", stroke: "#ef4444", name: "Expenses" },
          { dataKey: "revenue", stroke: "#22c55e", name: "Revenue" },
        ]}
        xAxisKey="month"
      />
    </ChartCard>
  );
}