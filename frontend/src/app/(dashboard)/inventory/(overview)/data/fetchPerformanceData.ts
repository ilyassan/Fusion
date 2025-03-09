"use server";

export interface PerformanceData {
  totalStockQuantity: number;
  totalStockValue: number;
  productServiceSplit: { products: number; services: number };
  lowStockItems: number;
}

export async function fetchPerformanceData(): Promise<PerformanceData> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    totalStockQuantity: 15000,
    totalStockValue: 1250000,
    productServiceSplit: { products: 75, services: 25 },
    lowStockItems: 23,
  };
}