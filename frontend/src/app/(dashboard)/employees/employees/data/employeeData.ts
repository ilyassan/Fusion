import { Employee } from "../../types/employeeTypes";

let mockEmployees: Employee[] = [
  { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com", phoneNumber: "123-456-7890", salary: 50000, role: "Employee" },
  { id: 2, firstName: "Jane", lastName: "Smith", email: "jane@example.com", phoneNumber: "098-765-4321", salary: 60000, role: "Manager" },
  { id: 3, firstName: "Bob", lastName: "Johnson", email: "bob@example.com", phoneNumber: "555-555-5555", salary: 55000, role: "Employee" },
  { id: 4, firstName: "Alice", lastName: "Brown", email: "alice@example.com", phoneNumber: "444-444-4444", salary: 70000, role: "Admin" },
  { id: 5, firstName: "Charlie", lastName: "Davis", email: "charlie@example.com", phoneNumber: "333-333-3333", salary: 52000, role: "Employee" },
  { id: 6, firstName: "Eve", lastName: "Wilson", email: "eve@example.com", phoneNumber: "222-222-2222", salary: 65000, role: "Manager" },
];

export async function fetchEmployees(page: number, itemsPerPage: number, searchQuery: string, roleFilter: string): Promise<{
  employees: Employee[];
  totalItems: number;
}> {
  await new Promise((r) => setTimeout(r, 1000)); // Simulate fetch
  let filtered = [...mockEmployees];
  
  if (searchQuery) {
    const lowerQuery = searchQuery.toLowerCase();
    filtered = filtered.filter(emp =>
      emp.firstName.toLowerCase().includes(lowerQuery) ||
      emp.lastName.toLowerCase().includes(lowerQuery) ||
      emp.email.toLowerCase().includes(lowerQuery)
    );
  }

  if (roleFilter !== "all") {
    filtered = filtered.filter(emp => emp.role === roleFilter);
  }

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedEmployees = filtered.slice(start, end);

  return {
    employees: paginatedEmployees,
    totalItems: filtered.length,
  };
}

export async function updateEmployee(id: number, field: keyof Employee, value: string | number): Promise<void> {
  await new Promise((r) => setTimeout(r, 500)); // Simulate update
  mockEmployees = mockEmployees.map(emp =>
    emp.id === id ? { ...emp, [field]: field === "salary" ? Number(value) : value } : emp
  );
}

export async function deleteEmployee(id: number): Promise<void> {
  await new Promise((r) => setTimeout(r, 500)); // Simulate delete
  mockEmployees = mockEmployees.filter(emp => emp.id !== id);
}