"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { Order, Filters, SortConfig, ActivityLog } from "../types/ordersTypes"; // Import ActivityLog
import { fetchOrders, fetchFilteredOrders, updateOrder } from "../data/ordersData";

interface UseOrdersProps {
  initialFilters: Filters;
  itemsPerPage: number;
}

export function useOrders({ initialFilters, itemsPerPage }: UseOrdersProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "orderDate", direction: "desc" });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  useEffect(() => {
    const loadOrders = async () => {
      setIsLoading(true);
      setError(null);
      try {
        if (!debouncedSearch && !filters.orderType && !filters.status && !filters.dateFrom && !filters.dateTo) {
          const data = await fetchOrders();
          setOrders(data.slice(0, itemsPerPage));
          setTotalItems(data.length);
        } else {
          const { data, total } = await fetchFilteredOrders(
            debouncedSearch,
            filters,
            sortConfig,
            currentPage,
            itemsPerPage
          );
          setOrders(data);
          setTotalItems(total);
        }
      } catch (err) {
        setError("Failed to load orders. Please try again.");
        console.error("Error fetching orders:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, [debouncedSearch, filters, sortConfig, currentPage, itemsPerPage]);

  const handleUpdateOrder = async (id: string, updatedOrder: Partial<Order>) => {
    try {
      const currentOrder = orders.find((order) => order.id === id);
      if (!currentOrder) throw new Error("Order not found");

      const newActivityLogEntry: ActivityLog = {
        action: updatedOrder.status ? "Status Changed" as const : "Updated" as const,
        by: "user", 
        at: new Date().toISOString(),
      };

      // Merge existing activity log with new entry
      const updated = await updateOrder(id, {
        ...updatedOrder,
        activityLog: [...currentOrder.activityLog, newActivityLogEntry],
      });

      if (updated.status === "Completed") {
        // Remove the order from the list since it becomes a sale
        setOrders((prev) => prev.filter((order) => order.id !== id));
        setTotalItems((prev) => prev - 1);
      } else {
        setOrders((prev) => prev.map((order) => (order.id === id ? updated : order)));
      }
    } catch (err) {
      setError("Failed to update order. Please try again.");
      console.error("Error updating order:", err);
    }
  };

  const handleBulkUpdate = async (status: "Completed" | "Canceled") => {
    try {
      const updates = selectedOrders.map((id) => {
        const currentOrder = orders.find((order) => order.id === id);
        if (!currentOrder) return Promise.resolve(null);
        const newActivityLogEntry: ActivityLog = {
          action: "Status Changed" as const,
          by: "user", // In a real app, this would come from auth context
          at: new Date().toISOString(),
        };
        return updateOrder(id, {
          status,
          activityLog: [...currentOrder.activityLog, newActivityLogEntry],
        });
      });
      await Promise.all(updates);
      if (status === "Completed") {
        // Remove completed orders from the list since they become sales
        setOrders((prev) => {
          const updatedOrders = prev.filter((order) => !selectedOrders.includes(order.id));
          setTotalItems(updatedOrders.length);
          return updatedOrders;
        });
      } else {
        setOrders((prev) =>
          prev.map((order) =>
            selectedOrders.includes(order.id) ? { ...order, status } : order
          )
        );
      }
      setSelectedOrders([]);
    } catch (err) {
      setError(`Failed to bulk update orders to ${status}.`);
      console.error("Error during bulk update:", err);
    }
  };

  return {
    orders,
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
    error,
    selectedOrders,
    setSelectedOrders,
    updateOrder: handleUpdateOrder,
    bulkUpdate: handleBulkUpdate,
  };
}