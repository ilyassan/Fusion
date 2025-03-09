"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SalesHeader } from "./components/SalesHeader";
import { SalesFilters } from "./components/SalesFilters";
import { SalesTable } from "./components/SalesTable";
import { SalesPagination } from "./components/SalesPagination";
import { SalesDetailsModal } from "./components/SalesDetailsModal";
import { AddSaleModal } from "./components/AddSaleModal";
import { useSales } from "./hooks/useSales";
import { fetchSales, fetchFilteredSales, addSale, updateSale } from "./data/salesData";
import { Sale } from "./types/salesTypes";

export default function SalesPage() {
  const {
    sales,
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
    addSale: handleAddSale,
    updateSale: handleUpdateSale,
  } = useSales({
    initialFilters: { category: "all", dateFrom: "", dateTo: "" },
    itemsPerPage: 10,
    fetchSales,
    fetchFilteredSales,
    addSale,
    updateSale,
  });

  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const totalPages = Math.ceil(totalItems / 10);

  const handleSort = (key: keyof Sale) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc",
    });
    setCurrentPage(1);
  };

  const handleSelectedSale = (sale: Sale) => {
    setSelectedSale(sale);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="space-y-8">
      <SalesHeader onAddSaleClick={() => setIsAddModalOpen(true)} />
      <Card>
        <CardContent className="pt-6">
          <SalesFilters search={search} setSearch={setSearch} filters={filters} setFilters={setFilters} />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-0">
          <SalesTable
            sales={sales}
            isLoading={isLoading}
            sortConfig={sortConfig}
            handleSort={handleSort}
            setSelectedSale={handleSelectedSale}
          />
        </CardContent>
      </Card>
      <SalesPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={10}
        setCurrentPage={setCurrentPage}
      />
      <AddSaleModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddSale={handleAddSale}
      />
      <SalesDetailsModal
        isOpen={isDetailsModalOpen}
        sale={selectedSale}
        onClose={() => setIsDetailsModalOpen(false)}
        onUpdateSale={handleUpdateSale}
      />
    </div>
  );
}