export interface SalesPerformanceData {
  rep: string;
  deals: number;
  revenue: number;
  conversion: number;
}

export async function fetchSalesPerformanceData(dateRange: string): Promise<SalesPerformanceData[]> {
  "use server";
  await new Promise((resolve) => setTimeout(resolve, 700)); // Simulate delay

  return [
    { rep: "John Smith", deals: 45, revenue: 125000, conversion: 68 },
    { rep: "Sarah Johnson", deals: 52, revenue: 145000, conversion: 72 },
    { rep: "Mike Wilson", deals: 38, revenue: 98000, conversion: 65 },
    { rep: "Emma Davis", deals: 41, revenue: 115000, conversion: 70 },
    { rep: "Tom Brown", deals: 35, revenue: 85000, conversion: 62 },
  ];
}