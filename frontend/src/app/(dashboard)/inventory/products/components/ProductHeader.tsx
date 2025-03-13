"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ProductHeaderProps {
  onAddProductClick: () => void;
  onAddCategoryClick: () => void;
}

export function ProductHeader({ onAddProductClick, onAddCategoryClick }: ProductHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold">Products Management</h2>
        <p className="text-gray-500">Manage your inventory items and categories</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto" onClick={onAddProductClick}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
        <Button className="bg-green-600 hover:bg-green-700 w-full sm:w-auto" onClick={onAddCategoryClick}>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>
    </div>
  );
}