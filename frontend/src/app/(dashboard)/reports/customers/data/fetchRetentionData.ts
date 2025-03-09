export interface RetentionData {
  month: string;
  rate: number;
}

export async function fetchRetentionData(dateRange: string): Promise<RetentionData[]> {
  "use server";
  await new Promise((resolve) => setTimeout(resolve, 600)); // Simulate delay

  const baseData = [
    { month: "Jan", rate: 95 },
    { month: "Feb", rate: 94 },
    { month: "Mar", rate: 96 },
    { month: "Apr", rate: 93 },
    { month: "May", rate: 95 },
    { month: "Jun", rate: 97 },
  ];

  return dateRange === "1year" ? baseData : baseData.slice(- (dateRange === "6months" ? 6 : 1));
}