"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { Customer, SortConfig, Filters } from "../types/CustomerTypes";

interface UseCustomersProps {
  initialFilters: Filters;
  itemsPerPage: number;
  fetchCustomers: (sortConfig: SortConfig) => Promise<Customer[]>;
  fetchFilteredCustomers: (
    filters: Filters,
    search: string,
    sortConfig: SortConfig,
    page: number,
    itemsPerPage: number
  ) => Promise<{ data: Customer[]; total: number }>;
}

export const useCustomers = ({
  initialFilters,
  itemsPerPage,
  fetchCustomers,
  fetchFilteredCustomers,
}: UseCustomersProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300); // Debounce search with 300ms delay
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "lastContact",
    direction: "desc",
  });
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        setIsLoading(true);
        if (debouncedSearch === "" && filters.type === "all" && filters.status === "all") {
          const data = await fetchCustomers(sortConfig);
          setCustomers(data.slice(0, itemsPerPage)); // Initial page
          setTotalItems(data.length);
        } else {
          const { data, total } = await fetchFilteredCustomers(
            filters,
            debouncedSearch,
            sortConfig,
            currentPage,
            itemsPerPage
          );
          setCustomers(data);
          setTotalItems(total);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCustomers();
  }, [filters, debouncedSearch, sortConfig, currentPage, itemsPerPage, fetchCustomers, fetchFilteredCustomers]); // Use debouncedSearch in dependencies

  const addCustomer = (
    newContact: Omit<Customer, "id" | "timeline" | "notes" | "deals" | "value" | "status" | "lastContact">
  ) => {
    const fullContact: Customer = {
      ...newContact,
      id: customers.length + 1,
      timeline: [],
      notes: [],
      deals: 0,
      value: 0,
      status: "Active",
      lastContact: new Date().toISOString().split("T")[0],
    };
    setCustomers([...customers, fullContact]);
    setTotalItems((prev) => prev + 1);
  };

  return {
    customers,
    totalItems,
    currentPage,
    setCurrentPage,
    search,
    setSearch,
    filters,
    setFilters,
    sortConfig,
    setSortConfig,
    isLoading,
    addCustomer,
  };
};