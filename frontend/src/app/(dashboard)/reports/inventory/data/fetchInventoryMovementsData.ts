export interface InventoryMovement {
  month: string;
  stockIn: number;
  stockOut: number;
}

export async function fetchInventoryMovementsData(dateRange: string): Promise<InventoryMovement[]> {
  "use server";
  await new Promise((resolve) => setTimeout(resolve, 600)); // Simulate delay

  const baseData = [
    { month: "Jan", stockIn: 1200, stockOut: 1000 },
    { month: "Feb", stockIn: 1300, stockOut: 1100 },
    { month: "Mar", stockIn: 1400, stockOut: 1200 },
    { month: "Apr", stockIn: 1500, stockOut: 1300 },
    { month: "May", stockIn: 1600, stockOut: 1400 },
    { month: "Jun", stockIn: 1700, stockOut: 1500 },
  ];

  return dateRange === "1year" ? baseData : baseData.slice(- (dateRange === "6months" ? 6 : 1));
}