"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface SalesHeaderProps {
  onAddSaleClick: () => void;
}

export function SalesHeader({ onAddSaleClick }: SalesHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold">Sales Reports</h2>
        <p className="text-gray-500">Detailed view of all sales transactions</p>
      </div>
      <Button onClick={onAddSaleClick} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
        <Plus className="h-4 w-4" />
        Add New Sale
      </Button>
    </div>
  );
}