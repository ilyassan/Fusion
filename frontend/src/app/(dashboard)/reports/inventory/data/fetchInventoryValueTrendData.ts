export interface InventoryValueTrend {
    month: string;
    value: number;
  }
  
  export async function fetchInventoryValueTrendData(dateRange: string): Promise<InventoryValueTrend[]> {
    "use server";
    await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate delay
  
    const baseData = [
      { month: "Jan", value: 1000000 },
      { month: "Feb", value: 1050000 },
      { month: "Mar", value: 1100000 },
      { month: "Apr", value: 1180000 },
      { month: "May", value: 1220000 },
      { month: "Jun", value: 1250000 },
    ];
  
    return dateRange === "1year" ? baseData : baseData.slice(- (dateRange === "6months" ? 6 : 1));
  }