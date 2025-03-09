export interface SalesTrendData {
  period: string;
  revenue: number;
  prevRevenue: number;
}

export async function fetchSalesTrendsData(dateRange: string): Promise<SalesTrendData[]> {
  "use server";
  await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate delay
  const baseData = [
    { period: "Jan", revenue: 210000, prevRevenue: 180000 },
    { period: "Feb", revenue: 230000, prevRevenue: 195000 },
    { period: "Mar", revenue: 260000, prevRevenue: 220000 },
    { period: "Apr", revenue: 285000, prevRevenue: 240000 },
    { period: "May", revenue: 310000, prevRevenue: 260000 },
  ];
  return dateRange === "1year" ? baseData : baseData.slice(0, dateRange === "6months" ? 3 : 1);
}