"use server";

export interface TopSellingItem {
  name: string;
  sales: number;
  stock: number;
}

export async function fetchTopSellingItemsData(): Promise<TopSellingItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 600));

  return [
    { name: "Widget A", sales: 1200, stock: 800 },
    { name: "Gadget B", sales: 950, stock: 500 },
    { name: "Tool C", sales: 800, stock: 600 },
    { name: "Device D", sales: 700, stock: 400 },
    { name: "Part E", sales: 500, stock: 1000 },
  ];
}