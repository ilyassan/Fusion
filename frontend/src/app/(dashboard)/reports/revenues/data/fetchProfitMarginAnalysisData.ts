export interface ProfitMarginAnalysis {
  name: string;
  revenue: number;
  cost: number;
}

export async function fetchProfitMarginAnalysisData(dateRange: string): Promise<ProfitMarginAnalysis[]> {
  "use server";
  await new Promise((resolve) => setTimeout(resolve, 700)); // Simulate delay

  return [
    { name: "Product A", revenue: 1500000, cost: 900000 },
    { name: "Product B", revenue: 1200000, cost: 700000 },
    { name: "Service X", revenue: 800000, cost: 400000 },
    { name: "Service Y", revenue: 700000, cost: 350000 },
    { name: "Product C", revenue: 500000, cost: 300000 },
  ];
}