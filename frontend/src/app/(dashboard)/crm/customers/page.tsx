"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CustomerHeader } from "./components/CustomerHeader";
import { CustomerFilters } from "./components/CustomerFilters";
import { CustomerTable } from "./components/CustomerTable";
import { CustomerPagination } from "./components/CustomerPagination";
import { CustomerDetailsModal } from "./components/CustomerDetailsModal";
import { AddContactModal } from "./components/AddContactModal";
import { Customer } from "./types/CustomerTypes";
import { useCustomers } from "./hooks/useCustomers"; // Adjust path
import { fetchCustomers, fetchFilteredCustomers } from "./data"; // Adjust path
import { useState } from "react";

export default function CustomersPage() {
  const {
    customers,
    addCustomer,
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
  } = useCustomers({
    initialFilters: { type: "all", status: "all" },
    itemsPerPage: 2,
    fetchCustomers,
    fetchFilteredCustomers,
  });

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);

  const totalPages = Math.ceil(totalItems / 2);

  const handleSort = (key: keyof Customer) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc",
    });
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  const handleAddContact = (
    newContact: Omit<Customer, "id" | "timeline" | "notes" | "deals" | "value" | "status" | "lastContact">
  ) => {
    addCustomer(newContact);
    setIsAddContactModalOpen(false);
  };

  const handleSelectedCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="space-y-6 min-h-full">
      <CustomerHeader onAddContactClick={() => setIsAddContactModalOpen(true)} />
      <Card>
        <CardContent className="pt-6">
          <CustomerFilters search={search} setSearch={setSearch} filters={filters} setFilters={setFilters} />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-0">
          <CustomerTable
            isLoading={isLoading}
            customers={customers}
            sortConfig={sortConfig}
            handleSort={handleSort}
            setSelectedCustomer={handleSelectedCustomer}
          />
        </CardContent>
      </Card>
      <CustomerPagination
        currentPage={currentPage}
        totalPages={totalPages}
        filteredDataLength={totalItems}
        itemsPerPage={2}
        setCurrentPage={setCurrentPage}
      />
      <CustomerDetailsModal 
        isOpen={isDetailsModalOpen} 
        customer={selectedCustomer} 
        onClose={() => setIsDetailsModalOpen(false)} 
      />
      <AddContactModal
        isOpen={isAddContactModalOpen}
        onClose={() => setIsAddContactModalOpen(false)}
        onAddContact={handleAddContact}
      />
    </div>
  );
}