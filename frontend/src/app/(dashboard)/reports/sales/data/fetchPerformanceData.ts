export interface PerformanceData {
  totalRevenue: number;
  totalSalesOrders: number;
  averageOrderValue: number;
  salesGrowth: number;
}

export async function fetchPerformanceData(dateRange: string): Promise<PerformanceData> {
  "use server";
  await new Promise((resolve) => setTimeout(resolve, 4000)); // Simulate delay

  // Base data for different date ranges
  return {
    totalRevenue: dateRange === "1year" ? 2900000 : dateRange === "6months" ? 1450000 : 290000,
    totalSalesOrders: dateRange === "1year" ? 970 : dateRange === "6months" ? 485 : 97,
    averageOrderValue: dateRange === "1year" ? 2990 : dateRange === "6months" ? 2990 : 2990,
    salesGrowth: dateRange === "1year" ? 37 : dateRange === "6months" ? 18.5 : 3.7,
  };
}