export interface PerformanceData {
  totalRevenue: number;
  totalLeads: number;
  averageDealSize: number;
  conversionRate: number;
}

export async function fetchPerformanceData(dateRange: string): Promise<PerformanceData> {
  "use server";
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay

  const baseRevenue = dateRange === "1year" ? 372000 : dateRange === "6months" ? 372000 : 80000;
  const baseLeads = dateRange === "1year" ? 1020 : dateRange === "6months" ? 1020 : 220;

  return {
    totalRevenue: baseRevenue,
    totalLeads: baseLeads,
    averageDealSize: Math.round(baseRevenue / (baseLeads * 0.225)), // Assuming 22.5% conversion rate
    conversionRate: Math.round((225 / baseLeads) * 100), // Mock conversion rate
  };
}