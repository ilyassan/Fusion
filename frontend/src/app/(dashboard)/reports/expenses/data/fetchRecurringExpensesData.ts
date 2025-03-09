export interface RecurringExpense {
  name: string;
  amount: number;
  frequency: string;
}

export async function fetchRecurringExpensesData(dateRange: string): Promise<RecurringExpense[]> {
  "use server";
  await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate delay

  return [
    { name: "CRM Software", amount: 5000, frequency: "Monthly" },
    { name: "Cloud Hosting", amount: 8000, frequency: "Monthly" },
    { name: "Office Cleaning Service", amount: 2000, frequency: "Monthly" },
    { name: "Team Collaboration Tools", amount: 1500, frequency: "Monthly" },
    { name: "Cybersecurity Suite", amount: 3000, frequency: "Monthly" },
  ];
}