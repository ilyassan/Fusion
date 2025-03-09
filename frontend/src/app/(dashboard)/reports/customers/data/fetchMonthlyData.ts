export interface MonthlyData {
  month: string;
  leads: number;
  conversions: number;
  revenue: number;
}

export async function fetchMonthlyData(dateRange: string): Promise<MonthlyData[]> {
  "use server";
  await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate delay

  const baseData = [
    { month: "Jan", leads: 120, conversions: 25, revenue: 45000 },
    { month: "Feb", leads: 140, conversions: 30, revenue: 52000 },
    { month: "Mar", leads: 160, conversions: 35, revenue: 58000 },
    { month: "Apr", leads: 180, conversions: 40, revenue: 65000 },
    { month: "May", leads: 200, conversions: 45, revenue: 72000 },
    { month: "Jun", leads: 220, conversions: 50, revenue: 80000 },
  ];

  return dateRange === "1year" ? baseData : baseData.slice(- (dateRange === "6months" ? 6 : 1));
}