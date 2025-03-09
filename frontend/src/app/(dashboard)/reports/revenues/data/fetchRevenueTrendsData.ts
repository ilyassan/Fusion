export interface RevenueTrend {
  month: string;
  revenue: number;
}

export async function fetchRevenueTrendsData(dateRange: string): Promise<RevenueTrend[]> {
  "use server";
  await new Promise((resolve) => setTimeout(resolve, 600)); // Simulate delay

  const baseData = [
    { month: "Jan", revenue: 350000 },
    { month: "Feb", revenue: 400000 },
    { month: "Mar", revenue: 450000 },
    { month: "Apr", revenue: 500000 },
    { month: "May", revenue: 550000 },
    { month: "Jun", revenue: 600000 },
  ];

  return dateRange === "1year" ? baseData : baseData.slice(- (dateRange === "6months" ? 6 : 1));
}