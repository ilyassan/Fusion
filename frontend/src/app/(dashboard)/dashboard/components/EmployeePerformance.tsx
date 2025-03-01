import { User } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Employee {
  name: string;
  sales: number;
  customerSatisfaction: number;
  salary: number;
}

interface EmployeePerformanceProps {
  employees: Employee[];
}

export function EmployeePerformance({ employees }: EmployeePerformanceProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-indigo-600" />
          Employee Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Sales</TableHead>
              <TableHead>Satisfaction</TableHead>
              <TableHead>Salary</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.name}>
                <TableCell className="font-medium">{employee.name}</TableCell>
                <TableCell>{employee.sales}</TableCell>
                <TableCell>{employee.customerSatisfaction}%</TableCell>
                <TableCell>${employee.salary}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}