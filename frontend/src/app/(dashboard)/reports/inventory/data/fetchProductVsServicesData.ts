export interface ProductVsService {
  name: string;
  value: number;
  color: string;
}

export async function fetchProductVsServicesData(dateRange: string): Promise<ProductVsService[]> {
  "use server";
  await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate delay

  return [
    { name: "Products", value: 80, color: "#4f46e5" },
    { name: "Services", value: 20, color: "#10b981" },
  ];
}