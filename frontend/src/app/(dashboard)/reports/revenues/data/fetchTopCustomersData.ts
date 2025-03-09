export interface TopCustomer {
  name: string;
  revenue: number;
  percentage: number;
}

export async function fetchTopCustomersData(dateRange: string): Promise<TopCustomer[]> {
  "use server";
  await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate delay

  return [
    { name: "Acme Corp", revenue: 750000, percentage: 15 },
    { name: "TechGiant Inc", revenue: 600000, percentage: 12 },
    { name: "MegaCorp", revenue: 450000, percentage: 9 },
    { name: "InnovateTech", revenue: 350000, percentage: 7 },
    { name: "Global Solutions", revenue: 300000, percentage: 6 },
  ];
}