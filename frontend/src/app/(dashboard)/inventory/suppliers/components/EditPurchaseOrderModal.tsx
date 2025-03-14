"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Supplier, Product } from "../types/SupplierTypes";
import { PurchaseOrder, PurchaseOrderItem } from "../types/PurchaseTypes";
import { OrderItemsSection } from "./OrderItemsSection";

interface EditPurchaseOrderModalProps {
  open: boolean;
  onClose: () => void;
  initialPO: PurchaseOrder | null;
  suppliers: Supplier[];
  availableProducts: Product[];
  handleEditPO: (updatedPO: PurchaseOrder) => void;
}

export const EditPurchaseOrderModal: React.FC<EditPurchaseOrderModalProps> = ({
  open,
  onClose,
  initialPO,
  suppliers,
  availableProducts,
  handleEditPO,
}) => {
  const [orderItems, setOrderItems] = useState<PurchaseOrderItem[]>([]);

  useEffect(() => {
    if (open && initialPO) {
      setOrderItems(initialPO.items || []);
    }
  }, [open, initialPO]);

  const handleClose = () => {
    setOrderItems([]);
    onClose();
  };

  const supplierProducts =
    initialPO && suppliers.find((s) => s.id === initialPO.supplierId)?.productsSupplied || [];

  return (
    <Dialog open={open} onOpenChange={(openState) => !openState && handleClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col">
        <DialogHeader className="shrink-0">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Edit Purchase Order
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const orderDate = formData.get("orderDate") as string;
            const expectedDelivery = formData.get("expectedDelivery") as string;
            if (initialPO) {
              const updatedPO: PurchaseOrder = {
                ...initialPO,
                orderDate,
                expectedDelivery,
                items: orderItems,
              };
              handleEditPO(updatedPO);
            }
            handleClose();
          }}
          className="flex-1 overflow-y-auto space-y-6 px-1"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="orderDate" className="text-sm font-medium text-gray-700">
                Order Date
              </Label>
              <Input
                id="orderDate"
                name="orderDate"
                type="date"
                required
                defaultValue={initialPO?.orderDate}
                className="border-gray-300 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expectedDelivery" className="text-sm font-medium text-gray-700">
                Expected Delivery
              </Label>
              <Input
                id="expectedDelivery"
                name="expectedDelivery"
                type="date"
                required
                defaultValue={initialPO?.expectedDelivery}
                className="border-gray-300 focus:ring-blue-500"
              />
            </div>
          </div>

          <OrderItemsSection
            orderItems={orderItems}
            setOrderItems={setOrderItems}
            availableProducts={availableProducts}
            supplierProducts={supplierProducts}
          />

          <DialogFooter className="shrink-0 border-t border-gray-200 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="mr-2 border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={orderItems.length === 0}
            >
              Update Order
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};