import { Company } from "../types/companyTypes";

let mockCompanies: Company[] = [
  { id: 1, name: "Tech Solutions Inc", role: "Administrator", category: "Technology", members: 15 },
  { id: 2, name: "Digital Marketing Agency", role: "Manager", category: "Consulting", members: 8 },
  { id: 3, name: "Mongool", role: "Employee", category: "Marketing", members: 8 },
];

export async function fetchCompanies(): Promise<Company[]> {
  await new Promise((r) => setTimeout(r, 1000)); // Simulate fetch delay
  return [...mockCompanies];
}

export async function addCompany(company: Omit<Company, 'id'>): Promise<Company> {
  await new Promise((r) => setTimeout(r, 500)); // Simulate add delay
  const newCompany: Company = { ...company, id: mockCompanies.length + 1 };
  mockCompanies.push(newCompany);
  return newCompany;
}