"use server";

export interface HistoricalStock {
  date: string;
  stock: number;
}

export async function fetchHistoricalStockData(): Promise<HistoricalStock[]> {
  await new Promise((resolve) => setTimeout(resolve, 600));

  return [
    { date: "Jan", stock: 12000 },
    { date: "Feb", stock: 13500 },
    { date: "Mar", stock: 14200 },
    { date: "Apr", stock: 13800 },
    { date: "May", stock: 15000 },
    { date: "Jun", stock: 14500 },
  ];
}