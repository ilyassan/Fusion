export interface SalesDistributionData {
  name: string;
  revenue: number;
  color: string;
}

export async function fetchSalesDistributionData(dateRange: string): Promise<SalesDistributionData[]> {
  "use server";
  await new Promise((resolve) => setTimeout(resolve, 400)); // Simulate delay
  return [
    { name: "Products", revenue: dateRange === "1year" ? 1440000 : dateRange === "6months" ? 720000 : 144000, color: "#4f46e5" },
    { name: "Services", revenue: dateRange === "1year" ? 1460000 : dateRange === "6months" ? 730000 : 146000, color: "#10b981" },
  ];
}