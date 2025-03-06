"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { Employee } from "../../types/employeeTypes";
import Skeleton from "@/app/(dashboard)/components/Skeleton";

interface EmployeeTableProps {
  employees: Employee[];
  isLoading: boolean;
  updateEmployee: (id: number, field: keyof Employee, value: string | number) => void;
  deleteEmployee: (id: number) => void;
}

export function EmployeeTable({ employees, isLoading, updateEmployee, deleteEmployee }: EmployeeTableProps) {
  const [editingCell, setEditingCell] = useState<{ id: number; field: keyof Employee } | null>(null);
  const [editValue, setEditValue] = useState<string | number>("");

  const handleCellEditStart = (id: number, field: keyof Employee, initialValue: string | number) => {
    setEditingCell({ id, field });
    setEditValue(initialValue);
  };

  const handleCellEdit = (id: number, field: keyof Employee, value: string | number) => {
    updateEmployee(id, field, value);
    setEditingCell(null);
    setEditValue("");
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="whitespace-nowrap">Phone Number</TableHead>
          <TableHead>Salary</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="w-24">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          ["skeleton1", "skeleton2", "skeleton3"].map((key) => (
            <TableRow key={key}>
              <TableCell><Skeleton className="w-32 h-6" /></TableCell>
              <TableCell><Skeleton className="w-48 h-6" /></TableCell>
              <TableCell><Skeleton className="w-28 h-6" /></TableCell>
              <TableCell><Skeleton className="w-20 h-6" /></TableCell>
              <TableCell><Skeleton className="w-24 h-6" /></TableCell>
              <TableCell><Skeleton className="w-16 h-6" /></TableCell>
            </TableRow>
          ))
        ) : (
          employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell className="whitespace-nowrap">
                {employee.firstName} {employee.lastName}
              </TableCell>
              <TableCell
                onDoubleClick={() => handleCellEditStart(employee.id, "email", employee.email)}
              >
                {editingCell?.id === employee.id && editingCell?.field === "email" ? (
                  <Input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={() => handleCellEdit(employee.id, "email", editValue)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") handleCellEdit(employee.id, "email", editValue);
                    }}
                    autoFocus
                  />
                ) : (
                  <span className="cursor-pointer hover:bg-blue-50 px-2 py-1 rounded">
                    {employee.email}
                  </span>
                )}
              </TableCell>
              <TableCell className="whitespace-nowrap">{employee.phoneNumber}</TableCell>
              <TableCell
                onDoubleClick={() => handleCellEditStart(employee.id, "salary", employee.salary)}
              >
                {editingCell?.id === employee.id && editingCell?.field === "salary" ? (
                  <Input
                    type="number"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={() => handleCellEdit(employee.id, "salary", Number(editValue))}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") handleCellEdit(employee.id, "salary", Number(editValue));
                    }}
                    autoFocus
                  />
                ) : (
                  <span className="cursor-pointer hover:bg-blue-50 px-2 py-1 rounded">
                    ${employee.salary.toLocaleString()}
                  </span>
                )}
              </TableCell>
              <TableCell>{employee.role}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => deleteEmployee(employee.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}