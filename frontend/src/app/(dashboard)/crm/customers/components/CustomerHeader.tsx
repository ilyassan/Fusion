"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface CustomerHeaderProps {
  onAddContactClick: () => void;
}

export function CustomerHeader({ onAddContactClick }: CustomerHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold">Customers & Contacts</h2>
        <p className="text-gray-500">Manage your customer relationships</p>
      </div>
      <div className="flex gap-2">
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={onAddContactClick}>
          <Plus className="h-4 w-4 mr-2" />
          Add Contact
        </Button>
      </div>
    </div>
  );
}