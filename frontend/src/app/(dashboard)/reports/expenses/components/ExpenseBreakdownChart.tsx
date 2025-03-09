import { ChartCard } from "../../components/ChartCard";
import { PieChartComponent } from "../../components/PieChartComponent";
import { fetchExpenseCategoriesData } from "../data/fetchExpenseCategoriesData";

interface ExpenseBreakdownChartProps {
  dateRange: string;
}

export async function ExpenseBreakdownChart({ dateRange }: ExpenseBreakdownChartProps) {
  const expenseCategories = await fetchExpenseCategoriesData(dateRange);

  return (
    <ChartCard
      title="Expense Breakdown by Category"
      description="Distribution of expenses across major categories"
    >
      <PieChartComponent
        data={expenseCategories}
        dataKey="value"
        nameKey="name"
        innerRadius={60}
        outerRadius={80}
      />
    </ChartCard>
  );
}