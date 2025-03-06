import { Invitation } from "../../(overview)/types/employeeTypes";

const mockInvitations: Invitation[] = [
  { id: 1, email: "alice@example.com", role: "Employee", sentAt: "2023-05-15" },
  { id: 2, email: "charlie@example.com", role: "Manager", sentAt: "2023-05-14" },
  { id: 3, email: "dave@example.com", role: "Employee", sentAt: "2023-05-13" },
  { id: 4, email: "eve@example.com", role: "Admin", sentAt: "2023-05-12" },
  { id: 5, email: "frank@example.com", role: "Manager", sentAt: "2023-05-11" },
  { id: 6, email: "grace@example.com", role: "Employee", sentAt: "2023-05-10" },
];

export async function fetchInvitations(page: number, itemsPerPage: number): Promise<{
  invitations: Invitation[];
  totalItems: number;
}> {
  await new Promise((r) => setTimeout(r, 1000)); // Simulate fetch
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedInvitations = mockInvitations.slice(start, end);
  return {
    invitations: paginatedInvitations,
    totalItems: mockInvitations.length,
  };
}

export async function addInvitation(email: string, role: string): Promise<Invitation> {
  await new Promise((r) => setTimeout(r, 1000)); // Simulate API call
  const newInvite: Invitation = {
    id: mockInvitations.length + 1,
    email,
    role,
    sentAt: new Date().toISOString().split("T")[0],
  };
  mockInvitations.unshift(newInvite); // Add to start of array
  return newInvite;
}