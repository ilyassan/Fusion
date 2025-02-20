import type { Employee, Invitation } from "./types"

export const mockEmployees: Employee[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phoneNumber: "123-456-7890",
    salary: 50000,
    role: "Employee",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    phoneNumber: "098-765-4321",
    salary: 60000,
    role: "Manager",
  },
  {
    id: 3,
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob@example.com",
    phoneNumber: "555-555-5555",
    salary: 55000,
    role: "Employee",
  },
]

export const mockInvitations: Invitation[] = [
  { id: 1, email: "alice@example.com", role: "Employee", sentAt: "2023-05-15" },
  { id: 2, email: "charlie@example.com", role: "Manager", sentAt: "2023-05-14" },
]

