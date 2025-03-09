export interface TopSellingData {
  name: string;
  unitsSold: number;
  revenue: number;
  profitability: number;
}

export async function fetchTopSellingData(dateRange: string): Promise<TopSellingData[]> {
  "use server";
  await new Promise((resolve) => setTimeout(resolve, 600)); // Simulate delay
  const baseData = [
    { name: "Micro Chips", unitsSold: 95, revenue: 475000, profitability: 62 },
    { name: "Marketing", unitsSold: 65, revenue: 325000, profitability: 55 },
    { name: "Transistors", unitsSold: 125, revenue: 250000, profitability: 48 },
  ];
  return dateRange === "1year" ? baseData : baseData.slice(0, dateRange === "6months" ? 2 : 1);
}