export interface ProductCategory {
  name: string;
  value: number;
  color: string;
}

export async function fetchProductCategoriesData(dateRange: string): Promise<ProductCategory[]> {
  "use server";
  await new Promise((resolve) => setTimeout(resolve, 400)); // Simulate delay

  return [
    { name: "Electronics", value: 450000, color: "#4f46e5" },
    { name: "Furniture", value: 350000, color: "#7c3aed" },
    { name: "Clothing", value: 250000, color: "#2563eb" },
    { name: "Books", value: 200000, color: "#0891b2" },
  ];
}