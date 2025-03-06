export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  salary: number;
  role: string;
};

export type Invitation = {
  id: number;
  email: string;
  role: string;
  sentAt: string;
};

export interface WorkerTypes {
  employees: number;
  managers: number;
}

export interface EmployeeGrowth {
  month: string;
  workers: number;
}

export interface DepartmentDistribution {
  department: string;
  count: number;
}