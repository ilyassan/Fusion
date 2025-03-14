"use client";

import { useState, useEffect, useCallback } from "react";
import { useDebounce } from "use-debounce";
import { Service, SortConfig, Filters } from "../types/ServiceTypes";
import { toast } from "@/hooks/use-toast";
import { mockServices } from "../data";

interface UseServicesProps {
  initialFilters: Filters;
  itemsPerPage: number;
}

export const useServices = ({ initialFilters, itemsPerPage }: UseServicesProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "name", direction: "asc" });
  const [services, setServices] = useState<Service[]>(mockServices);
  const [displayedServices, setDisplayedServices] = useState<Service[]>([]);
  const [totalItems, setTotalItems] = useState(mockServices.length);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    type: "service" | null;
    id: number | null;
  }>({ isOpen: false, type: null, id: null });

  const processServices = useCallback(async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate loading

    const filtered = services.filter((service) => {
      const matchesSearch = Object.values(service).some((value) =>
        String(value).toLowerCase().includes(debouncedSearch.toLowerCase())
      );
      const matchesCategory = filters.category === "all" || service.category === filters.category;
      const matchesPriceRange =
        filters.priceRange === "all" ||
        (filters.priceRange === "low" && service.price < 500) ||
        (filters.priceRange === "medium" && service.price >= 500 && service.price < 1000) ||
        (filters.priceRange === "high" && service.price >= 1000);

      return matchesSearch && matchesCategory && matchesPriceRange;
    });

    const sorted = [...filtered].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      const directionMultiplier = sortConfig.direction === "asc" ? 1 : -1;
      if (typeof aValue === "number" && typeof bValue === "number") {
        return directionMultiplier * (aValue - bValue);
      }
      return directionMultiplier * String(aValue).localeCompare(String(bValue));
    });

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedData = sorted.slice(start, end);

    setDisplayedServices(paginatedData);
    setTotalItems(filtered.length);
    setIsLoading(false);
  }, [filters, debouncedSearch, sortConfig, currentPage, itemsPerPage, services]);

  useEffect(() => {
    processServices();
  }, [processServices]);

  const addService = useCallback((newService: Omit<Service, "id">) => {
    const maxId = services.length > 0 ? Math.max(...services.map((s) => s.id)) : 0;
    const fullService: Service = { ...newService, id: maxId + 1 };
    setServices((prev) => [...prev, fullService]);
    toast({
      title: "Service Added",
      description: `${newService.name} has been added to the services.`,
    });
  }, [services]);

  const updateService = useCallback((updatedService: Service) => {
    setServices((prev) => prev.map((s) => (s.id === updatedService.id ? updatedService : s)));
    toast({
      title: "Service Updated",
      description: `${updatedService.name} has been updated.`,
    });
  }, []);

  const deleteService = useCallback((id: number) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    setDeleteConfirmation({ isOpen: false, type: null, id: null });
    toast({
      title: "Service Deleted",
      description: "The service has been removed.",
      variant: "destructive",
    });
  }, []);

  return {
    services: displayedServices,
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
    addService,
    updateService,
    deleteService,
    deleteConfirmation,
    setDeleteConfirmation,
  };
};