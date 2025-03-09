"use server";

export interface InventoryAlert {
  type: "low" | "over" | "reorder";
  title: string;
  message: string;
}

export async function fetchInventoryAlertsData(): Promise<InventoryAlert[]> {
  await new Promise((resolve) => setTimeout(resolve, 700));

  return [
    { type: "low", title: "Low Stock Alert", message: "5 items are below the minimum stock threshold" },
    { type: "over", title: "Overstock Alert", message: "3 items have excessive stock levels" },
    { type: "reorder", title: "Reorder Reminder", message: "7 items need to be reordered soon" },
  ];
}