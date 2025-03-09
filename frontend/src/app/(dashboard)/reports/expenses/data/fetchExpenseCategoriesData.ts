export interface ExpenseCategory {
  name: string;
  value: number;
  color: string;
}

export async function fetchExpenseCategoriesData(dateRange: string): Promise<ExpenseCategory[]> {
  "use server";
  await new Promise((resolve) => setTimeout(resolve, 400)); // Simulate delay

  return [
    { name: "Salaries", value: 600000, color: "#4f46e5" },
    { name: "Rent", value: 200000, color: "#7c3aed" },
    { name: "Marketing", value: 150000, color: "#2563eb" },
    { name: "Utilities", value: 100000, color: "#0891b2" },
    { name: "Software", value: 120000, color: "#10b981" },
    { name: "Others", value: 80000, color: "#f59e0b" },
  ];
}