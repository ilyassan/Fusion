export interface Company {
  id: number;
  name: string;
  role: 'Administrator' | 'Manager' | 'Employee';
  category: string;
  members: number;
}