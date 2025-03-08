"use client";

import { useState } from "react";
import { useOrders } from "./hooks/useOrders";
import { OrdersHeader } from "./components/OrdersHeader";
import { OrdersFilters } from "./components/OrdersFilters";
import { OrdersTable } from "./components/OrdersTable";
import { OrdersPagination } from "./components/OrdersPagination";
import { OrderDetailsModal } from "./components/OrderDetailsModal";
import { OrderConfirmModal } from "./components/OrderConfirmModal";
import { Order, Filters } from "./types/ordersTypes";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

export default function OrdersPage() {
  const initialFilters: Filters = {
    orderType: "All",
    status: "All",
    dateFrom: "",
    dateTo: "",
  };
  const itemsPerPage = 10;

  const {
    orders,
    totalItems,
    currentPage,
    setCurrentPage,
    search,
    setSearch,
    filters,
    setFilters,
    isLoading,
    error,
    selectedOrders,
    setSelectedOrders,
    updateOrder,
    bulkUpdate,
  } = useOrders({ initialFilters, itemsPerPage });

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [confirmAction, setConfirmAction] = useState<{ type: string; orderId?: string }>({ type: "" });

  const handleExport = () => {
    setConfirmAction({ type: "export" });
    setIsConfirmModalOpen(true);
  };

  const handleOpenDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsModalOpen(true);
  };

  const handleConfirmAction = (action: string, orderId?: string) => {
    setConfirmAction({ type: action, orderId });
    setIsConfirmModalOpen(true);
  };

  const handleConfirm = () => {
    if (confirmAction.type === "complete" && confirmAction.orderId) {
      updateOrder(confirmAction.orderId, { status: "Completed" });
    } else if (confirmAction.type === "cancel" && confirmAction.orderId) {
      updateOrder(confirmAction.orderId, { status: "Canceled" });
    } else if (confirmAction.type === "export") {
      console.log("Exporting selected orders:", selectedOrders);
    } else if (confirmAction.type === "bulkComplete") {
      bulkUpdate("Completed");
    } else if (confirmAction.type === "bulkCancel") {
      bulkUpdate("Canceled");
    }
    setIsConfirmModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <OrdersHeader onExport={handleExport} />
      <OrdersFilters search={search} setSearch={setSearch} filters={filters} setFilters={setFilters} />
      <div className="flex justify-center sm:justify-start items-center gap-2">
        <Button
          variant="outline"
          onClick={() => handleConfirmAction("bulkComplete")}
          disabled={selectedOrders.length === 0}
          className="bg-green-100 text-green-800 hover:bg-green-200"
        >
          <CheckCircle className="mr-2 h-4 w-4" />
          Mark as Completed
        </Button>
        <Button
          variant="outline"
          onClick={() => handleConfirmAction("bulkCancel")}
          disabled={selectedOrders.length === 0}
          className="bg-red-100 text-red-800 hover:bg-red-200"
        >
          <XCircle className="mr-2 h-4 w-4" />
          Cancel Orders
        </Button>
      </div>
      {isLoading ? (
        <OrdersTable
          orders={orders}
          isLoading={isLoading}
          selectedOrders={selectedOrders}
          setSelectedOrders={setSelectedOrders}
          onOpenDetails={handleOpenDetails}
          onConfirmAction={handleConfirmAction}
        />
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <>
          <OrdersTable
            orders={orders}
            isLoading={isLoading}
            selectedOrders={selectedOrders}
            setSelectedOrders={setSelectedOrders}
            onOpenDetails={handleOpenDetails}
            onConfirmAction={handleConfirmAction}
          />
          <OrdersPagination
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
      <OrderDetailsModal
        open={isDetailsModalOpen}
        onOpenChange={setIsDetailsModalOpen}
        selectedOrder={selectedOrder}
        onConfirmAction={handleConfirmAction}
        onUpdateOrder={updateOrder}
      />
      <OrderConfirmModal
        open={isConfirmModalOpen}
        onOpenChange={setIsConfirmModalOpen}
        action={confirmAction}
        onConfirm={handleConfirm}
      />
    </div>
  );
}