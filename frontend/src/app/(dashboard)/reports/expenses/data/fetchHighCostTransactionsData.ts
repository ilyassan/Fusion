export interface HighCostTransaction {
  description: string;
  amount: number;
  date: string;
}

export async function fetchHighCostTransactionsData(dateRange: string): Promise<HighCostTransaction[]> {
  "use server";
  await new Promise((resolve) => setTimeout(resolve, 700)); // Simulate delay

  return [
    { description: "Annual Office Rent", amount: 150000, date: "2023-06-01" },
    { description: "Q2 Marketing Campaign", amount: 75000, date: "2023-04-15" },
    { description: "Server Infrastructure Upgrade", amount: 50000, date: "2023-05-20" },
    { description: "Employee Training Program", amount: 30000, date: "2023-03-10" },
    { description: "New Product Development", amount: 100000, date: "2023-02-28" },
  ];
}