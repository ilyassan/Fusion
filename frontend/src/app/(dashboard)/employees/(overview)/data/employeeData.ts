import { Employee, Invitation, WorkerTypes, EmployeeGrowth, DepartmentDistribution } from "../../types/employeeTypes";

const mockEmployees: Employee[] = [
  { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com", phoneNumber: "123-456-7890", salary: 50000, role: "Employee" },
  { id: 2, firstName: "Jane", lastName: "Smith", email: "jane@example.com", phoneNumber: "098-765-4321", salary: 60000, role: "Manager" },
  { id: 3, firstName: "Bob", lastName: "Johnson", email: "bob@example.com", phoneNumber: "555-555-5555", salary: 55000, role: "Employee" },
];

const mockInvitations: Invitation[] = [
  { id: 1, email: "alice@example.com", role: "Employee", sentAt: "2023-05-15" },
  { id: 2, email: "charlie@example.com", role: "Manager", sentAt: "2023-05-14" },
];

// Combined fetch for all metrics
export async function fetchEmployeeMetrics(): Promise<{
  totalWorkers: number;
  workerTypes: WorkerTypes;
  salaryExpenses: number;
}> {
  "use server";
  await new Promise((r) => setTimeout(r, 800)); // Single fetch delay
  const totalWorkers = mockEmployees.length + mockInvitations.length;
  const employees = mockEmployees.filter((e) => e.role === "Employee").length + mockInvitations.filter((i) => i.role === "Employee").length;
  const managers = mockEmployees.filter((e) => e.role === "Manager").length + mockInvitations.filter((i) => i.role === "Manager").length;
  const salaryExpenses = mockEmployees.reduce((sum, emp) => sum + emp.salary, 0);
  return {
    totalWorkers,
    workerTypes: { employees, managers },
    salaryExpenses,
  };
}

export async function fetchEmployeeGrowth(): Promise<EmployeeGrowth[]> {
  "use server";
  await new Promise((r) => setTimeout(r, 1000)); // Slower fetch
  return [
    { month: "Jan", workers: 10 },
    { month: "Feb", workers: 12 },
    { month: "Mar", workers: 15 },
    { month: "Apr", workers: 18 },
    { month: "May", workers: 22 },
    { month: "Jun", workers: 25 },
  ];
}

export async function fetchDepartmentDistribution(): Promise<DepartmentDistribution[]> {
  "use server";
  await new Promise((r) => setTimeout(r, 1200)); // Slowest fetch
  return [
    { department: "Sales", count: 8 },
    { department: "Marketing", count: 5 },
    { department: "Engineering", count: 7 },
    { department: "Finance", count: 3 },
    { department: "Support", count: 2 },
  ];
}