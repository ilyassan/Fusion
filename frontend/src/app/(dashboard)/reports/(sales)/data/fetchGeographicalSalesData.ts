export interface GeographicalSalesData {
  region: string;
  revenue: number;
  color: string;
}

export async function fetchGeographicalSalesData(dateRange: string): Promise<GeographicalSalesData[]> {
  "use server";
  await new Promise((resolve) => setTimeout(resolve, 700)); // Simulate delay
  const baseData = [
    { region: "Agadir", revenue: 620000, color: "#2563eb" },
    { region: "Rabat", revenue: 450000, color: "#7c3aed" },
    { region: "Tanger", revenue: 380000, color: "#0891b2" },
  ];
  return dateRange === "1year" ? baseData : baseData.slice(0, dateRange === "6months" ? 2 : 1);
}