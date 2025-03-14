"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ServiceHeaderProps {
  onAddServiceClick: () => void;
  onAddCategoryClick: () => void;
}

export function ServiceHeader({ onAddServiceClick, onAddCategoryClick }: ServiceHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold">Services Management</h2>
        <p className="text-gray-500">Manage your service offerings and categories</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto" onClick={onAddServiceClick}>
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
        <Button className="bg-green-600 hover:bg-green-700 w-full sm:w-auto" onClick={onAddCategoryClick}>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>
    </div>
  );
}