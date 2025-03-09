"use server";

export interface InventoryHealthData {
  turnover: { averageRate: string; bestCategory: string; slowestCategory: string };
  aging: { [key: string]: number };
  accuracy: { overallRate: string; lastCount: string; nextCount: string };
}

export async function fetchInventoryHealthData(): Promise<InventoryHealthData> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    turnover: {
      averageRate: "4.5",
      bestCategory: "Electronics (6.2 times/year)",
      slowestCategory: "Furniture (2.8 times/year)",
    },
    aging: {
      "0-30 days": 60,
      "31-60 days": 25,
      "61-90 days": 10,
      "90+ days": 5,
    },
    accuracy: {
      overallRate: "98.5",
      lastCount: "June 1, 2023",
      nextCount: "July 1, 2023",
    },
  };
}