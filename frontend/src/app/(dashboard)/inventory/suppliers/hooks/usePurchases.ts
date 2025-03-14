"use client";

import { useState, useCallback, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { PurchaseOrder } from "../types/PurchaseTypes";
import { mockPurchaseOrders } from "../data";
import { Supplier } from "../types/SupplierTypes";
import { toast } from "@/hooks/use-toast";

export interface PurchaseDeleteConfirmation {
  isOpen: boolean;
  id: string | null;
}

export const usePurchases = (suppliers: Supplier[]) => {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  const [isAddPOModalOpen, setIsAddPOModalOpen] = useState(false);
  const [isEditPOModalOpen, setIsEditPOModalOpen] = useState(false);
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<PurchaseDeleteConfirmation>({
    isOpen: false,
    id: null,
  });

  const fetchPurchaseOrders = useCallback(async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate network delay
    const filteredPOs = mockPurchaseOrders.filter(
      (po) =>
        po.id.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        po.supplierName.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
    setPurchaseOrders(filteredPOs);
    setIsLoading(false);
  }, [debouncedSearch]);

  useEffect(() => {
    fetchPurchaseOrders();
  }, [fetchPurchaseOrders]);

  const handleAddPO = useCallback(
    (po: Omit<PurchaseOrder, "id" | "status" | "supplierName">) => {
      const newId = `PO-${String(purchaseOrders.length + 1).padStart(3, "0")}`;
      const supplier = suppliers.find((s) => s.id === po.supplierId);
      const newPO: PurchaseOrder = {
        id: newId,
        supplierId: po.supplierId,
        supplierName: supplier?.name || "",
        orderDate: po.orderDate,
        expectedDelivery: po.expectedDelivery,
        status: "pending",
        items: po.items,
      };
      setPurchaseOrders((prev) => [...prev, newPO]);
      setIsAddPOModalOpen(false);
      toast({
        title: "Purchase Order Created",
        description: `Purchase order ${newId} has been created.`,
      });
    },
    [purchaseOrders, suppliers]
  );

  const handleEditPO = useCallback((updatedPO: PurchaseOrder) => {
    setPurchaseOrders((prev) => prev.map((po) => (po.id === updatedPO.id ? updatedPO : po)));
    setIsEditPOModalOpen(false);
    setSelectedPO(null);
    toast({
      title: "Purchase Order Updated",
      description: `Purchase order ${updatedPO.id} has been updated.`,
    });
  }, []);

  const handleDeletePO = useCallback(() => {
    setPurchaseOrders((prev) => prev.filter((po) => po.id !== deleteConfirmation.id));
    setDeleteConfirmation({ isOpen: false, id: null });
    toast({
      title: "Purchase Order Deleted",
      description: "The purchase order has been successfully deleted.",
      variant: "destructive",
    });
  }, [deleteConfirmation]);

  return {
    purchaseOrders,
    isLoading,
    search,
    setSearch,
    debouncedSearch,
    isAddPOModalOpen,
    setIsAddPOModalOpen,
    isEditPOModalOpen,
    setIsEditPOModalOpen,
    selectedPO,
    setSelectedPO,
    deleteConfirmation,
    setDeleteConfirmation,
    handleAddPO,
    handleEditPO,
    handleDeletePO,
  };
};