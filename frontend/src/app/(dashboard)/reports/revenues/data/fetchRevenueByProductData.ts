export interface RevenueByProduct {
  name: string;
  revenue: number;
  color: string;
}

export async function fetchRevenueByProductData(dateRange: string): Promise<RevenueByProduct[]> {
  "use server";
  await new Promise((resolve) => setTimeout(resolve, 400)); // Simulate delay

  return [
    { name: "Product A", revenue: 1500000, color: "#4f46e5" },
    { name: "Product B", revenue: 1200000, color: "#7c3aed" },
    { name: "Service X", revenue: 800000, color: "#2563eb" },
    { name: "Service Y", revenue: 700000, color: "#0891b2" },
    { name: "Product C", revenue: 500000, color: "#10b981" },
    { name: "Other", revenue: 300000, color: "#f59e0b" },
  ];
}