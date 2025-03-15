// warehouses/hooks/useWarehouses.ts
import { useState, useEffect, useCallback } from "react";
import { toast } from "@/hooks/use-toast";
import { Warehouse, StockLevel, Product, TransferFormData } from "../types/WarehouseTypes";
import { mockWarehouses, mockStockLevels, mockProducts } from "../data/mockData";

interface UseWarehousesReturn {
  warehouses: Warehouse[];
  stockLevels: StockLevel[];
  products: Product[];
  filteredWarehouses: Warehouse[];
  isLoading: boolean;
  addWarehouse: (newWarehouse: Omit<Warehouse, "id" | "totalItems" | "totalValue" | "utilizationRate">) => void;
  editWarehouse: (updatedWarehouse: Warehouse) => void;
  deleteWarehouse: (id: number) => void;
  transferStock: (transfer: TransferFormData) => void;
  exportData: () => void;
  searchWarehouses: (query: string) => void;
}

export const useWarehouses = (): UseWarehousesReturn => {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [stockLevels, setStockLevels] = useState<StockLevel[]>([]);
  const [products] = useState<Product[]>(mockProducts);
  const [filteredWarehouses, setFilteredWarehouses] = useState<Warehouse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  // Simulate API fetch with delay
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1-second delay
    setWarehouses(mockWarehouses);
    setStockLevels(mockStockLevels);
    setFilteredWarehouses(mockWarehouses);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Add warehouse
  const addWarehouse = useCallback(
    (newWarehouse: Omit<Warehouse, "id" | "totalItems" | "totalValue" | "utilizationRate">) => {
      const updatedWarehouses = [
        ...warehouses,
        {
          ...newWarehouse,
          id: warehouses.length + 1,
          totalItems: 0,
          totalValue: 0,
          utilizationRate: 0,
        },
      ];
      setWarehouses(updatedWarehouses);
      setFilteredWarehouses(updatedWarehouses);
      toast({ title: "Warehouse Added", description: `${newWarehouse.name} has been added to the list.` });
    },
    [warehouses],
  );

  // Edit warehouse
  const editWarehouse = useCallback(
    (updatedWarehouse: Warehouse) => {
      const updatedWarehouses = warehouses.map((w) =>
        w.id === updatedWarehouse.id
          ? { ...updatedWarehouse, totalItems: w.totalItems, totalValue: w.totalValue, utilizationRate: w.utilizationRate }
          : w,
      );
      setWarehouses(updatedWarehouses);
      setFilteredWarehouses(updatedWarehouses);
      toast({ title: "Warehouse Updated", description: `${updatedWarehouse.name} has been updated.` });
    },
    [warehouses],
  );

  // Delete warehouse
  const deleteWarehouse = useCallback(
    (id: number) => {
      const updatedWarehouses = warehouses.filter((w) => w.id !== id);
      setWarehouses(updatedWarehouses);
      setFilteredWarehouses(updatedWarehouses);
      setStockLevels((prev) => prev.filter((s) => s.warehouseId !== id));
      toast({
        title: "Warehouse Deleted",
        description: "The warehouse has been removed from the list.",
        variant: "destructive",
      });
    },
    [warehouses],
  );

  // Transfer stock
  const transferStock = useCallback(
    (transfer: TransferFormData) => {
      const sourceStock = stockLevels.find(
        (s) => s.warehouseId === parseInt(transfer.sourceWarehouse) && s.productId === parseInt(transfer.product),
      );
      const quantity = parseInt(transfer.quantity);

      if (!sourceStock || sourceStock.quantity < quantity) {
        toast({
          title: "Transfer Failed",
          description: "Insufficient stock in source warehouse.",
          variant: "destructive",
        });
        return;
      }

      const newStockLevels = stockLevels.map((stock) => {
        if (stock.warehouseId === parseInt(transfer.sourceWarehouse) && stock.productId === parseInt(transfer.product)) {
          return { ...stock, quantity: stock.quantity - quantity };
        }
        if (
          stock.warehouseId === parseInt(transfer.destinationWarehouse) &&
          stock.productId === parseInt(transfer.product)
        ) {
          return { ...stock, quantity: stock.quantity + quantity };
        }
        return stock;
      });

      if (
        !stockLevels.some(
          (s) => s.warehouseId === parseInt(transfer.destinationWarehouse) && s.productId === parseInt(transfer.product),
        )
      ) {
        const product = products.find((p) => p.id === parseInt(transfer.product));
        if (product) {
          newStockLevels.push({
            warehouseId: parseInt(transfer.destinationWarehouse),
            productId: parseInt(transfer.product),
            productName: product.name,
            quantity,
            value: product.price * quantity,
          });
        }
      }

      setStockLevels(newStockLevels);
      toast({ title: "Stock Transferred", description: `${quantity} units have been transferred successfully.` });
    },
    [stockLevels, products],
  );

  // Export data
  const exportData = useCallback(() => {
    const csvContent = [
      ["ID", "Name", "Location", "Capacity", "Unit", "Total Items", "Total Value", "Utilization Rate"],
      ...warehouses.map((w) => [
        w.id,
        w.name,
        w.location,
        w.capacity,
        w.capacityUnit,
        w.totalItems,
        w.totalValue,
        w.utilizationRate,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "warehouses.csv";
    a.click();
    window.URL.revokeObjectURL(url);
    toast({ title: "Data Exported", description: "Warehouse data has been exported as CSV." });
  }, [warehouses]);

  // Search warehouses with debounce
  const searchWarehouses = useCallback(
    (query: string) => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }

      const newTimeout = setTimeout(async () => {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500)); // 0.5-second delay
        const filtered = warehouses.filter((warehouse) => {
          const queryLower = query.toLowerCase();
          return (
            query === "" ||
            warehouse.name.toLowerCase().includes(queryLower) ||
            warehouse.location.toLowerCase().includes(queryLower)
          );
        });
        setFilteredWarehouses(filtered);
        setIsLoading(false);
      }, 300); // 300ms debounce

      setDebounceTimeout(newTimeout);
    },
    [warehouses, debounceTimeout],
  );

  return {
    warehouses,
    stockLevels,
    products,
    filteredWarehouses,
    isLoading,
    addWarehouse,
    editWarehouse,
    deleteWarehouse,
    transferStock,
    exportData,
    searchWarehouses,
  };
};