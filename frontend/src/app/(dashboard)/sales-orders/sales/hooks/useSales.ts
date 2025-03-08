"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { Sale, Filters, SortConfig } from "../types/salesTypes";

interface UseSalesProps {
  initialFilters: Filters;
  itemsPerPage: number;
  fetchSales: () => Promise<Sale[]>;
  fetchFilteredSales: (
    search: string,
    filters: Filters,
    sortConfig: SortConfig,
    page: number,
    itemsPerPage: number
  ) => Promise<{ data: Sale[]; total: number }>;
  addSale: (newSale: Omit<Sale, "id" | "createdBy" | "createdAt">) => Promise<Sale>;
  updateSale: (id: number, updatedSale: Partial<Sale>) => Promise<Sale>;
}

export function useSales({ initialFilters, itemsPerPage, fetchSales, fetchFilteredSales, addSale, updateSale }: UseSalesProps) {
  const [sales, setSales] = useState<Sale[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "date", direction: "desc" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSales = async () => {
      setIsLoading(true);
      try {
        if (!debouncedSearch && !filters.category && !filters.dateFrom && !filters.dateTo) {
          const data = await fetchSales();
          setSales(data.slice(0, itemsPerPage));
          setTotalItems(data.length);
        } else {
          const { data, total } = await fetchFilteredSales(
            debouncedSearch,
            filters,
            sortConfig,
            currentPage,
            itemsPerPage
          );
          setSales(data);
          setTotalItems(total);
        }
      } catch (error) {
        console.error("Error fetching sales:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSales();
  }, [debouncedSearch, filters, sortConfig, currentPage, itemsPerPage]);

  const handleAddSale = async (newSale: Omit<Sale, "id" | "createdBy" | "createdAt">) => {
    const addedSale = await addSale(newSale);
    setSales(prev => [addedSale, ...prev].slice(0, itemsPerPage));
    setTotalItems(prev => prev + 1);
  };

  const handleUpdateSale = async (id: number, updatedSale: Partial<Sale>) => {
    const updated = await updateSale(id, updatedSale);
    setSales(prev => prev.map(sale => (sale.id === id ? updated : sale)));
  };

  return {
    sales,
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
    addSale: handleAddSale,
    updateSale: handleUpdateSale,
  };
}