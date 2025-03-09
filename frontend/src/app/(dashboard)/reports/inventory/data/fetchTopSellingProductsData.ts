export interface TopSellingProduct {
  name: string;
  sales: number;
  stockLevel: number;
}

export async function fetchTopSellingProductsData(dateRange: string): Promise<TopSellingProduct[]> {
  "use server";
  await new Promise((resolve) => setTimeout(resolve, 700)); // Simulate delay

  return [
    { name: "Smartphone X", sales: 1200, stockLevel: 500 },
    { name: "Laptop Pro", sales: 800, stockLevel: 300 },
    { name: "Wireless Earbuds", sales: 1500, stockLevel: 700 },
    { name: "Smart Watch", sales: 950, stockLevel: 400 },
    { name: "Tablet Ultra", sales: 600, stockLevel: 200 },
  ];
}