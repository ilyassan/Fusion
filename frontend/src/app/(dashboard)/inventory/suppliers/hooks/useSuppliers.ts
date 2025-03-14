"use client";

import { useState, useCallback, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { Supplier } from "../types/SupplierTypes";
import { mockSuppliers } from "../data";
import { toast } from "@/hooks/use-toast";

export interface SupplierDeleteConfirmation {
  isOpen: boolean;
  id: number | null;
}

export const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  const [isAddSupplierModalOpen, setIsAddSupplierModalOpen] = useState(false);
  const [isEditSupplierModalOpen, setIsEditSupplierModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<SupplierDeleteConfirmation>({
    isOpen: false,
    id: null,
  });

  const fetchSuppliers = useCallback(async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate network delay
    const filteredSuppliers = mockSuppliers.filter(
      (supplier) =>
        supplier.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        supplier.email.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
    setSuppliers(filteredSuppliers);
    setIsLoading(false);
  }, [debouncedSearch]);

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);

  const handleAddSupplier = useCallback((newSupplier: Omit<Supplier, "id">) => {
    const newId = suppliers.length > 0 ? Math.max(...suppliers.map((s) => s.id)) + 1 : 1;
    setSuppliers((prev) => [...prev, { ...newSupplier, id: newId }]);
    setIsAddSupplierModalOpen(false);
    toast({
      title: "Supplier Added",
      description: `${newSupplier.name} has been added to your suppliers.`,
    });
  }, [suppliers]);

  const handleEditSupplier = useCallback((updatedSupplier: Supplier) => {
    setSuppliers((prev) => prev.map((s) => (s.id === updatedSupplier.id ? updatedSupplier : s)));
    setIsEditSupplierModalOpen(false);
    setSelectedSupplier(null);
    toast({
      title: "Supplier Updated",
      description: `${updatedSupplier.name}'s information has been updated.`,
    });
  }, []);

  const handleDeleteSupplier = useCallback(() => {
    setSuppliers((prev) => prev.filter((s) => s.id !== deleteConfirmation.id));
    setDeleteConfirmation({ isOpen: false, id: null });
    toast({
      title: "Supplier Deleted",
      description: "The supplier has been successfully deleted.",
      variant: "destructive",
    });
  }, [deleteConfirmation]);

  return {
    suppliers,
    isLoading,
    search,
    setSearch,
    debouncedSearch,
    isAddSupplierModalOpen,
    setIsAddSupplierModalOpen,
    isEditSupplierModalOpen,
    setIsEditSupplierModalOpen,
    selectedSupplier,
    setSelectedSupplier,
    deleteConfirmation,
    setDeleteConfirmation,
    handleAddSupplier,
    handleEditSupplier,
    handleDeleteSupplier,
  };
};