export interface ExpenseTrend {
  month: string;
  expenses: number;
  revenue: number;
}

export async function fetchExpenseTrendsData(dateRange: string): Promise<ExpenseTrend[]> {
  "use server";
  await new Promise((resolve) => setTimeout(resolve, 600)); // Simulate delay

  const baseData = [
    { month: "Jan", expenses: 200000, revenue: 250000 },
    { month: "Feb", expenses: 210000, revenue: 270000 },
    { month: "Mar", expenses: 220000, revenue: 290000 },
    { month: "Apr", expenses: 200000, revenue: 310000 },
    { month: "May", expenses: 230000, revenue: 330000 },
    { month: "Jun", expenses: 210000, revenue: 350000 },
  ];

  return dateRange === "1year" ? baseData : baseData.slice(- (dateRange === "6months" ? 6 : 1));
}