"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { Employee } from "../../types/employeeTypes";

interface UseEmployeesProps {
  itemsPerPage: number;
  fetchEmployees: (page: number, itemsPerPage: number, searchQuery: string, roleFilter: string) => Promise<{
    employees: Employee[];
    totalItems: number;
  }>;
  updateEmployee: (id: number, field: keyof Employee, value: string | number) => Promise<void>;
  deleteEmployee: (id: number) => Promise<void>;
}

export function useEmployees({ itemsPerPage, fetchEmployees, updateEmployee, deleteEmployee }: UseEmployeesProps) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const [roleFilter, setRoleFilter] = useState("all");

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const loadEmployees = async () => {
    setIsLoading(true);
    try {
      const { employees: fetchedEmployees, totalItems: fetchedTotal } = await fetchEmployees(
        currentPage,
        itemsPerPage,
        debouncedSearchQuery, // Use debounced value for fetching
        roleFilter
      );
      setEmployees(fetchedEmployees);
      setTotalItems(fetchedTotal);
    } catch (err) {
      console.error("Failed to fetch employees:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, [currentPage, debouncedSearchQuery, roleFilter, itemsPerPage]);

  const handleUpdateEmployee = async (id: number, field: keyof Employee, value: string | number) => {
    try {
      await updateEmployee(id, field, value);
      setEmployees(prev =>
        prev.map(emp => (emp.id === id ? { ...emp, [field]: value } : emp))
      );
    } catch (err) {
      console.error("Failed to update employee:", err);
    }
  };

  const handleDeleteEmployee = async (id: number) => {
    try {
      await deleteEmployee(id);
      setEmployees(prev => prev.filter(emp => emp.id !== id));
      setTotalItems(prev => prev - 1);
      if (employees.length === 1 && currentPage > 1) {
        setCurrentPage(prev => prev - 1);
      }
    } catch (err) {
      console.error("Failed to delete employee:", err);
    }
  };

  return {
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
  };
}