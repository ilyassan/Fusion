export interface RevenueVsExpenses {
  month: string;
  revenue: number;
  expenses: number;
}

export async function fetchRevenueVsExpensesData(dateRange: string): Promise<RevenueVsExpenses[]> {
  "use server";
  await new Promise((resolve) => setTimeout(resolve, 600)); // Simulate delay

  const baseData = [
    { month: "Jan", revenue: 350000, expenses: 280000 },
    { month: "Feb", revenue: 400000, expenses: 310000 },
    { month: "Mar", revenue: 450000, expenses: 340000 },
    { month: "Apr", revenue: 500000, expenses: 370000 },
    { month: "May", revenue: 550000, expenses: 400000 },
    { month: "Jun", revenue: 600000, expenses: 430000 },
  ];

  return dateRange === "1year" ? baseData : baseData.slice(- (dateRange === "6months" ? 6 : 1));
}