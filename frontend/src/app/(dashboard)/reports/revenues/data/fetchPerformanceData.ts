export interface PerformanceData {
  totalRevenue: number;
  netProfit: number;
  revenueGrowth: number;
  profitMargin: number;
}

export async function fetchPerformanceData(dateRange: string): Promise<PerformanceData> {
  "use server";
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay

  const baseRevenue = dateRange === "1year" ? 5000000 : dateRange === "6months" ? 5000000 : 600000;
  const baseProfit = baseRevenue * 0.3; // 30% profit margin

  return {
    totalRevenue: baseRevenue,
    netProfit: baseProfit,
    revenueGrowth: 15.5,
    profitMargin: 30,
  };
}