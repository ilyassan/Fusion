"use server";

export interface RecentActivity {
  id: number;
  type: string;
  item: string;
  quantity: number;
  date: string;
}

export async function fetchRecentActivityData(): Promise<RecentActivity[]> {
  await new Promise((resolve) => setTimeout(resolve, 700));

  return [
    { id: 1, type: "Restock", item: "Widget A", quantity: 500, date: "2023-06-15" },
    { id: 2, type: "Sale", item: "Gadget B", quantity: -50, date: "2023-06-14" },
    { id: 3, type: "Restock", item: "Tool C", quantity: 200, date: "2023-06-13" },
    { id: 4, type: "Sale", item: "Device D", quantity: -75, date: "2023-06-12" },
    { id: 5, type: "Adjustment", item: "Part E", quantity: -25, date: "2023-06-11" },
  ];
}