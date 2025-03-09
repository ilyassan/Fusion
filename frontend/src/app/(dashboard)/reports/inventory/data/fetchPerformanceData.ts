export interface PerformanceData {
  totalStockValue: number;
  stockoutRate: number;
  totalSKUs: number;
  avgLeadTime: number;
}

export async function fetchPerformanceData(dateRange: string): Promise<PerformanceData> {
  "use server";
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay

  const baseValue = dateRange === "1year" ? 1250000 : dateRange === "6months" ? 1250000 : 300000;

  return {
    totalStockValue: baseValue,
    stockoutRate: 5.2,
    totalSKUs: 1250,
    avgLeadTime: 7,
  };
}