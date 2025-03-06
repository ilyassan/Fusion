"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EmployeesHeader } from "./components/EmployeesHeader";
import { EmployeeFilters } from "./components/EmployeeFilters";
import { EmployeeTable } from "./components/EmployeeTable";
import { EmployeePagination } from "./components/EmployeePagination";
import { DeleteEmployeeModal } from "./components/DeleteEmployeeModal";
import { UpdateEmployeeModal } from "./components/UpdateEmployeeModal";
import { useEmployees } from "./hooks/useEmployees";
import { fetchEmployees, updateEmployee, deleteEmployee } from "./data/employeeData";
import { Employee } from "../types/employeeTypes";

export default function EmployeesPage() {
  const {
    employees,
    currentPage,
    setCurrentPage,
    totalItems,
    totalPages,
    itemsPerPage,
    isLoading,
    searchQuery,
    setSearchQuery,
    roleFilter,
    setRoleFilter,
    updateEmployee: handleUpdateEmployee,
    deleteEmployee: handleDeleteEmployee,
  } = useEmployees({
    itemsPerPage: 5,
    fetchEmployees,
    updateEmployee,
    deleteEmployee,
  });

  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; employeeId: number | null }>({
    isOpen: false,
    employeeId: null,
  });
  const [updateModal, setUpdateModal] = useState<{
    isOpen: boolean;
    employee: Employee | null;
    field: keyof Employee;
    value: string | number;
  }>({
    isOpen: false,
    employee: null,
    field: "email",
    value: "",
  });

  const uniqueRoles = Array.from(new Set(employees.map(emp => emp.role)));

  const handleDelete = (id: number) => {
    setDeleteModal({ isOpen: true, employeeId: id });
  };

  const confirmDelete = () => {
    if (deleteModal.employeeId) {
      handleDeleteEmployee(deleteModal.employeeId);
      setDeleteModal({ isOpen: false, employeeId: null });
    }
  };

  const handleUpdate = (id: number, field: keyof Employee, value: string | number) => {
    const employee = employees.find(emp => emp.id === id);
    if (employee) {
      setUpdateModal({ isOpen: true, employee, field, value });
    }
  };

  const confirmUpdate = () => {
    if (updateModal.employee && updateModal.field) {
      handleUpdateEmployee(updateModal.employee.id, updateModal.field, updateModal.value);
      setUpdateModal({ isOpen: false, employee: null, field: "email", value: "" });
    }
  };

  return (
    <div className="space-y-6">
      <EmployeesHeader />
      <Card>
        <CardHeader>
          <EmployeeFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            roleFilter={roleFilter}
            setRoleFilter={setRoleFilter}
            uniqueRoles={uniqueRoles}
          />
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <EmployeeTable
            employees={employees}
            isLoading={isLoading}
            updateEmployee={handleUpdate}
            deleteEmployee={handleDelete}
          />
          <EmployeePagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            setCurrentPage={setCurrentPage}
          />
        </CardContent>
      </Card>
      <DeleteEmployeeModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, employeeId: null })}
        onConfirm={confirmDelete}
      />
      <UpdateEmployeeModal
        isOpen={updateModal.isOpen}
        employee={updateModal.employee}
        field={updateModal.field}
        value={updateModal.value}
        onClose={() => setUpdateModal({ isOpen: false, employee: null, field: "email", value: "" })}
        onConfirm={confirmUpdate}
      />
    </div>
  );
}