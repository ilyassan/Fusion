// suppliers/page.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useSuppliers } from "./hooks/useSuppliers";
import { usePurchases } from "./hooks/usePurchases";
import { SuppliersTable } from "./components/SuppliersTable";
import { PurchaseOrdersTable } from "./components/PurchaseOrdersTable";
import { AddSupplierModal } from "./components/AddSupplierModal";
import { EditSupplierModal } from "./components/EditSupplierModal";
import { AddPurchaseOrderModal } from "./components/AddPurchaseOrderModal";
import { EditPurchaseOrderModal } from "./components/EditPurchaseOrderModal";
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
import { availableProducts } from "./data";

export default function SuppliersAndPurchasesPage() {
  const {
    suppliers,
    isLoading: suppliersLoading,
    search: supplierSearch,
    setSearch: setSupplierSearch,
    isAddSupplierModalOpen,
    setIsAddSupplierModalOpen,
    isEditSupplierModalOpen,
    setIsEditSupplierModalOpen,
    selectedSupplier,
    setSelectedSupplier,
    deleteConfirmation: supplierDeleteConfirmation,
    setDeleteConfirmation: setSupplierDeleteConfirmation,
    handleAddSupplier,
    handleEditSupplier,
    handleDeleteSupplier,
  } = useSuppliers();

  const {
    purchaseOrders,
    isLoading: purchasesLoading,
    search: poSearch,
    setSearch: setPOSearch,
    isAddPOModalOpen,
    setIsAddPOModalOpen,
    isEditPOModalOpen,
    setIsEditPOModalOpen,
    selectedPO,
    setSelectedPO,
    deleteConfirmation: poDeleteConfirmation,
    setDeleteConfirmation: setPODeleteConfirmation,
    handleAddPO,
    handleEditPO,
    handleDeletePO,
  } = usePurchases(suppliers);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Suppliers & Purchases</h2>
          <p className="text-gray-500">Manage your suppliers and purchase orders</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              /* Implement export logic */
            }}
          >
            <Download className="mr-2 h-4 w-4 text-blue-500" /> Export Data
          </Button>
        </div>
      </div>

      <SuppliersTable
        suppliers={suppliers}
        search={supplierSearch}
        setSearch={setSupplierSearch}
        availableProducts={availableProducts}
        setIsAddSupplierModalOpen={setIsAddSupplierModalOpen}
        setSelectedSupplier={setSelectedSupplier}
        setIsEditSupplierModalOpen={setIsEditSupplierModalOpen}
        setDeleteConfirmation={setSupplierDeleteConfirmation}
        isLoading={suppliersLoading}
      />

      <PurchaseOrdersTable
        purchaseOrders={purchaseOrders}
        search={poSearch}
        setSearch={setPOSearch}
        setIsAddPOModalOpen={setIsAddPOModalOpen}
        setSelectedPO={setSelectedPO}
        setIsEditPOModalOpen={setIsEditPOModalOpen}
        setDeleteConfirmation={setPODeleteConfirmation}
        isLoading={purchasesLoading}
      />

      <AddSupplierModal
        open={isAddSupplierModalOpen}
        onClose={() => setIsAddSupplierModalOpen(false)}
        onAdd={handleAddSupplier}
      />

      <EditSupplierModal
        open={isEditSupplierModalOpen}
        onClose={() => {
          setIsEditSupplierModalOpen(false);
          setSelectedSupplier(null);
        }}
        onEdit={handleEditSupplier}
        supplier={selectedSupplier}
      />

      <AddPurchaseOrderModal
        open={isAddPOModalOpen}
        onClose={() => {
          setIsAddPOModalOpen(false);
        }}
        suppliers={suppliers}
        availableProducts={availableProducts}
        handleAddPO={handleAddPO}
      />

      <EditPurchaseOrderModal
        open={isEditPOModalOpen}
        onClose={() => {
          setIsEditPOModalOpen(false);
          setSelectedPO(null);
        }}
        initialPO={selectedPO}
        suppliers={suppliers}
        availableProducts={availableProducts}
        handleEditPO={handleEditPO}
      />

      {/* Supplier Delete Confirmation */}
      <AlertDialog
        open={supplierDeleteConfirmation.isOpen}
        onOpenChange={(isOpen) => setSupplierDeleteConfirmation({ ...supplierDeleteConfirmation, isOpen })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the supplier from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteSupplier}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Purchase Order Delete Confirmation */}
      <AlertDialog
        open={poDeleteConfirmation.isOpen}
        onOpenChange={(isOpen) => setPODeleteConfirmation({ ...poDeleteConfirmation, isOpen })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the purchase order from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeletePO}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}