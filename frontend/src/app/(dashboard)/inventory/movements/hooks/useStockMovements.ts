// movements/hooks/useStockMovements.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { useDebounce } from "use-debounce";
import { toast } from "@/hooks/use-toast";
import { StockMovement, Product, Supplier, NewMovementFormData } from "../types/MovementTypes";
import { mockStockMovements, mockProducts, mockSuppliers } from "../data/mockData";

interface UseStockMovementsReturn {
  movements: StockMovement[];
  products: Product[];
  suppliers: Supplier[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  addMovement: (movement: NewMovementFormData) => void;
  exportData: () => void;
  setSearch: (query: string) => void;
  setProductFilter: (product: string) => void;
  setMovementTypeFilter: (type: string) => void;
  setDateRange: (range: { from?: Date; to?: Date }) => void;
  sortMovements: (key: keyof StockMovement) => void;
}

export const useStockMovements = (): UseStockMovementsReturn => {
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [products] = useState<Product[]>(mockProducts);
  const [suppliers] = useState<Supplier[]>(mockSuppliers);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300); // Debounce search with 300ms delay
  const [productFilter, setProductFilter] = useState("All Products");
  const [movementTypeFilter, setMovementTypeFilter] = useState("All Types");
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({ from: undefined, to: undefined });
  const [sortConfig, setSortConfig] = useState<{ key: keyof StockMovement; direction: "asc" | "desc" }>({
    key: "date",
    direction: "desc",
  });

  const itemsPerPage = 10;

  const filterAndSortMovements = useCallback(
    (movementsToFilter: StockMovement[]) => {
      let result = [...movementsToFilter];

      // Apply filters
      result = result.filter((movement) => {
        const matchesSearch = Object.values(movement).some((value) =>
          String(value).toLowerCase().includes(debouncedSearch.toLowerCase()),
        );
        const matchesProduct = productFilter === "All Products" || movement.productName === productFilter;
        const matchesMovementType = movementTypeFilter === "All Types" || movement.movementType === movementTypeFilter;
        const matchesDateRange =
          (!dateRange.from || new Date(movement.date) >= dateRange.from) &&
          (!dateRange.to || new Date(movement.date) <= dateRange.to);
        return matchesSearch && matchesProduct && matchesMovementType && matchesDateRange;
      });

      // Apply sorting
      result.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue === undefined && bValue === undefined) return 0;
        if (aValue === undefined) return sortConfig.direction === "asc" ? 1 : -1;
        if (bValue === undefined) return sortConfig.direction === "asc" ? -1 : 1;

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortConfig.direction === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        if (sortConfig.direction === "asc") {
          return aValue > bValue ? 1 : -1;
        }
        return aValue < bValue ? 1 : -1;
      });

      return result;
    },
    [debouncedSearch, productFilter, movementTypeFilter, dateRange, sortConfig],
  );

  useEffect(() => {
    const loadMovements = async () => {
      setIsLoading(true);
      try {
        // Simulate fetching with a delay
        await new Promise((resolve) => setTimeout(resolve, 500)); // 500ms delay for filtering/search
        let filtered = filterAndSortMovements(mockStockMovements); // Always filter from full dataset
        // Apply pagination
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        setMovements(filtered.slice(start, end));
      } catch (error) {
        console.error("Error loading movements:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMovements();
  }, [
    debouncedSearch,
    productFilter,
    movementTypeFilter,
    dateRange,
    sortConfig,
    currentPage,
    filterAndSortMovements,
  ]);

  const totalPages = Math.ceil(filterAndSortMovements(mockStockMovements).length / itemsPerPage);

  const addMovement = useCallback(
    (movement: NewMovementFormData) => {
      const newMovement: StockMovement = {
        id: mockStockMovements.length + 1,
        date: movement.date.toISOString(),
        productName: movement.product,
        movementType: movement.movementType as StockMovement["movementType"],
        quantity: parseInt(movement.quantity),
        user: "Current User", // Replace with actual user from auth context
        supplier: movement.supplier,
        notes: movement.notes,
      };
      // Add to mock data and re-filter
      mockStockMovements.push(newMovement);
      const filtered = filterAndSortMovements(mockStockMovements);
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      setMovements(filtered.slice(start, end));
      toast({
        title: "Stock Movement Added",
        description: `A new stock movement has been recorded for ${movement.product}.`,
      });
    },
    [currentPage, filterAndSortMovements],
  );

  const exportData = useCallback(() => {
    const csvContent = [
      ["ID", "Date", "Product", "Movement Type", "Quantity", "User", "Supplier", "Notes"],
      ...movements.map((m) => [
        m.id,
        m.date,
        m.productName,
        m.movementType,
        m.quantity,
        m.user,
        m.supplier || "",
        m.notes || "",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "stock_movements.csv";
    a.click();
    window.URL.revokeObjectURL(url);
    toast({ title: "Data Exported", description: "Stock movements have been exported as CSV." });
  }, [movements]);

  const sortMovements = useCallback((key: keyof StockMovement) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  }, []);

  return {
    movements,
    products,
    suppliers,
    isLoading,
    currentPage,
    setCurrentPage,
    totalPages,
    addMovement,
    exportData,
    setSearch,
    setProductFilter,
    setMovementTypeFilter,
    setDateRange,
    sortMovements,
  };
};