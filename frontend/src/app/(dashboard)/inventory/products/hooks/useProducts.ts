"use client";

import { useState, useEffect, useCallback } from "react";
import { useDebounce } from "use-debounce";
import { Product, SortConfig, Filters } from "../types/ProductTypes";
import { toast } from "@/hooks/use-toast";
import { mockProducts } from "../data";

interface UseProductsProps {
  initialFilters: Filters;
  itemsPerPage: number;
}

export const useProducts = ({ initialFilters, itemsPerPage }: UseProductsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "name", direction: "asc" });
  const [products, setProducts] = useState<Product[]>(mockProducts || []); // Source data
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]); // Filtered/sorted/paginated data
  const [totalItems, setTotalItems] = useState(mockProducts.length || 0);
  const [isLoading, setIsLoading] = useState(true); // Start true for initial load
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    type: "product" | null;
    id: number | null;
  }>({ isOpen: false, type: null, id: null });

  // Memoized function to process products
  const processProducts = useCallback(async () => {
    setIsLoading(true);
    console.log("Processing products..."); // Debug log

    // Simulate async operation for skeleton visibility
    await new Promise((resolve) => setTimeout(resolve, 800)); // 800ms delay

    const filtered = products.filter((product) => {
      const matchesSearch = Object.values(product).some((value) =>
        String(value).toLowerCase().includes(debouncedSearch.toLowerCase())
      );
      const matchesCategory = filters.category === "all" || product.category === filters.category;
      const matchesStockStatus =
        filters.stockStatus === "all" ||
        (filters.stockStatus === "low" && product.currentStock <= product.minStockLevel) ||
        (filters.stockStatus === "medium" &&
          product.currentStock > product.minStockLevel &&
          product.currentStock <= product.minStockLevel * 2) ||
        (filters.stockStatus === "high" && product.currentStock > product.minStockLevel * 2);

      return matchesSearch && matchesCategory && matchesStockStatus;
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

    setDisplayedProducts(paginatedData);
    setTotalItems(filtered.length);
    setIsLoading(false);
    console.log("Processing complete"); // Debug log
  }, [filters, debouncedSearch, sortConfig, currentPage, itemsPerPage, products]);

  // Effect to trigger product processing
  useEffect(() => {
    processProducts();
  }, [processProducts]);

  // Add a product
  const addProduct = useCallback((newProduct: Omit<Product, "id">) => {
    const maxId = products.length > 0 ? Math.max(...products.map((p) => p.id)) : 0;
    const fullProduct: Product = { ...newProduct, id: maxId + 1 };
    setProducts((prev) => [...prev, fullProduct]);
    toast({
      title: "Product Added",
      description: `${newProduct.name} has been added to the inventory.`,
    });
  }, [products]);

  // Delete a product
  const deleteProduct = useCallback((id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleteConfirmation({ isOpen: false, type: null, id: null });
    toast({
      title: "Product Deleted",
      description: "The product has been removed from the inventory.",
      variant: "destructive",
    });
  }, []);

  return {
    products: displayedProducts,
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
    addProduct,
    deleteProduct,
    deleteConfirmation,
    setDeleteConfirmation,
  };
};