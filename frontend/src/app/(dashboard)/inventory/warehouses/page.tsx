"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useWarehouses } from "./hooks/useWarehouses";
import { WarehouseCard } from "./components/WarehouseCard";
import { AddWarehouseModal } from "./components/AddWarehouseModal";
import { EditWarehouseModal } from "./components/EditWarehouseModal";
import { StockTransferModal } from "./components/StockTransferModal";
import { WarehouseDetailsSheet } from "./components/WarehouseDetailsSheet";
import { WarehouseSkeleton } from "./components/WarehouseSkeleton";
import { Header } from "./components/Header";
import { FilterInputsSection } from "./components/FilterInputsSection";
import { Warehouse } from "./types/WarehouseTypes";

export default function WarehousesAndStockLocationsPage() {
  const {
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
  } = useWarehouses();

  const [isAddWarehouseModalOpen, setIsAddWarehouseModalOpen] = useState(false);
  const [isEditWarehouseModalOpen, setIsEditWarehouseModalOpen] = useState(false);
  const [isWarehouseDetailsSheetOpen, setIsWarehouseDetailsSheetOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; id: number | null }>({
    isOpen: false,
    id: null,
  });
  const [detailsWarehouse, setDetailsWarehouse] = useState<Warehouse | null>(null);

  return (
    <div className="space-y-6">
      <Header isLoading={isLoading} onExport={exportData} />

      <FilterInputsSection
        searchWarehouses={searchWarehouses}
        onAddWarehouse={() => setIsAddWarehouseModalOpen(true)}
        onTransferStock={() => setIsTransferModalOpen(true)}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array(3)
              .fill(0)
              .map((_, index) => <WarehouseSkeleton key={index} />)
          : filteredWarehouses.map((warehouse) => (
              <WarehouseCard
                key={warehouse.id}
                warehouse={warehouse}
                stockLevels={stockLevels.filter((s) => s.warehouseId === warehouse.id)}
                onEdit={() => {
                  setSelectedWarehouse(warehouse);
                  setIsEditWarehouseModalOpen(true);
                }}
                onDelete={() => setDeleteConfirmation({ isOpen: true, id: warehouse.id })}
                onViewDetails={() => {
                  setDetailsWarehouse(warehouse);
                  setIsWarehouseDetailsSheetOpen(true);
                }}
              />
            ))}
      </div>

      <AddWarehouseModal
        isOpen={isAddWarehouseModalOpen}
        onClose={() => setIsAddWarehouseModalOpen(false)}
        onSave={addWarehouse}
      />
      <EditWarehouseModal
        warehouse={selectedWarehouse}
        isOpen={isEditWarehouseModalOpen}
        onClose={() => {
          setIsEditWarehouseModalOpen(false);
        }}
        onSave={editWarehouse}
      />
      <StockTransferModal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        onTransfer={transferStock}
        warehouses={warehouses}
        products={products}
        stockLevels={stockLevels}
      />
      <WarehouseDetailsSheet
        isOpen={isWarehouseDetailsSheetOpen}
        warehouse={detailsWarehouse}
        stockLevels={stockLevels.filter((s) => s.warehouseId === detailsWarehouse?.id)}
        onClose={() => {
          setIsWarehouseDetailsSheetOpen(false);
        }}
      />
      <AlertDialog
        open={deleteConfirmation.isOpen}
        onOpenChange={(isOpen) => setDeleteConfirmation({ ...deleteConfirmation, isOpen })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this warehouse?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the warehouse and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteConfirmation.id !== null) deleteWarehouse(deleteConfirmation.id);
                setDeleteConfirmation({ isOpen: false, id: null });
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}