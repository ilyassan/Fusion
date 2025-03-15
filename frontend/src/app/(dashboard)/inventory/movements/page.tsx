"use client";

import React, { useState } from "react";
import { useStockMovements } from "./hooks/useStockMovements";
import { Header } from "./components/Header";
import { AddMovementForm } from "./components/AddMovementForm";
import { MovementsFilter } from "./components/MovementsFilter";
import { MovementsTable } from "./components/MovementsTable";
import { MovementDetailsDialog } from "./components/MovementDetailsDialog";
import { StockMovement } from "./types/MovementTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StockMovementsAndAdjustmentsPage() {
  const {
    movements,
    products,
    suppliers,
    isLoading,
    currentPage,
    totalPages,
    setCurrentPage,
    addMovement,
    exportData,
    setSearch,
    setProductFilter,
    setMovementTypeFilter,
    setDateRange,
    sortMovements,
  } = useStockMovements();

  const [selectedMovement, setSelectedMovement] = useState<StockMovement | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  const handleViewDetails = (movement: StockMovement) => {
    setSelectedMovement(movement);
    setIsDetailsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <Header isLoading={isLoading} onExport={exportData} />
      <AddMovementForm products={products} suppliers={suppliers} onAddMovement={addMovement} />
      <Card>
        <CardHeader>
          <CardTitle>Stock Movements Log</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <MovementsFilter
                products={products}
                onSearchChange={setSearch}
                onProductChange={setProductFilter}
                onMovementTypeChange={setMovementTypeFilter}
                onDateRangeChange={setDateRange}
          />
          <MovementsTable
              isLoading={isLoading}
              movements={movements}
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={100}
              onPageChange={setCurrentPage}
              onSort={sortMovements}
              onViewDetails={handleViewDetails}
          />
        </CardContent>
      </Card>
      <MovementDetailsDialog
        isOpen={isDetailsDialogOpen}
        movement={selectedMovement}
        onClose={() => setIsDetailsDialogOpen(false)}
      />
    </div>
  );
}