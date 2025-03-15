// warehouses/components/Header.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface HeaderProps {
  isLoading: boolean;
  onExport: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isLoading, onExport }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold">Warehouses & Stock Locations</h2>
        <p className="text-muted-foreground">Manage your warehouses and view stock levels</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={onExport} disabled={isLoading}>
          <Download className="mr-2 h-4 w-4 text-blue-500" /> Export Data
        </Button>
      </div>
    </div>
  );
};