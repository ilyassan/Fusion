export interface PerformanceData {
  totalExpenses: number;
  monthlyTrend: number;
  largestCategory: string;
  expenseRatio: number;
}

export async function fetchPerformanceData(dateRange: string): Promise<PerformanceData> {
  "use server";
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay

  const baseExpenses = dateRange === "1year" ? 1250000 : dateRange === "6months" ? 1250000 : 210000;

  return {
    totalExpenses: baseExpenses,
    monthlyTrend: -2.5,
    largestCategory: "Salaries",
    expenseRatio: 68,
  };
}