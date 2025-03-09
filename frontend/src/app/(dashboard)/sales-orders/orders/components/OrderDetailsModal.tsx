"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Order } from "../types/ordersTypes";
import { OrderDetailsTab } from "./OrderDetailsTab";
import { CustomerDetailsTab } from "./CustomerDetailsTab";
import { OrderActivityTab } from "./OrderActivityTab";
import Skeleton from "@/app/(dashboard)/components/Skeleton";

interface OrderDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedOrder: Order | null;
  onConfirmAction: (action: string, orderId: string) => void;
  onUpdateOrder: (id: string, updatedOrder: Partial<Order>) => void;
}

export function OrderDetailsModal({
  open,
  onOpenChange,
  selectedOrder,
  onConfirmAction,
  onUpdateOrder,
}: OrderDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedOrder, setEditedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (open && selectedOrder) {
      setIsLoading(true);
      setTimeout(() => {
        setEditedOrder(selectedOrder);
        setIsLoading(false);
      }, 500); // Simulate async loading
    }
  }, [open, selectedOrder]);

  if (!selectedOrder) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="px-4 pt-4 pb-2">
          <DialogTitle className="text-2xl font-bold">
            {isLoading ? (
              <Skeleton className="w-40 h-8" />
            ) : (
              `Order #${selectedOrder.id} Details`
            )}
          </DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="order-details" className="w-full">
          <TabsList className="grid w-full grid-cols-3 px-4 border-b">
            <TabsTrigger value="order-details">Order Details</TabsTrigger>
            <TabsTrigger value="customer-details">Customer Details</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          <TabsContent value="order-details" className="px-4 pt-4">
            <OrderDetailsTab
              order={selectedOrder}
              editedOrder={editedOrder}
              setEditedOrder={setEditedOrder}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              onUpdateOrder={onUpdateOrder}
              isLoading={isLoading}
              onConfirmAction={onConfirmAction}
              onOpenChange={onOpenChange}
            />
          </TabsContent>
          <TabsContent value="customer-details" className="px-4 pt-4">
            <CustomerDetailsTab order={selectedOrder} isLoading={isLoading} />
          </TabsContent>
          <TabsContent value="activity" className="px-4 pt-4 max-h-[300px] overflow-y-auto">
            <OrderActivityTab order={selectedOrder} isLoading={isLoading} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}