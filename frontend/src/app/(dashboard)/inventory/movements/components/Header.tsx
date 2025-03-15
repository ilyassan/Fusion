// movements/components/Header.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface HeaderProps {
  isLoading: boolean;
  onExport: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isLoading, onExport }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold">Stock Movements & Adjustments</h2>
        <p className="text-muted-foreground">Manage and track your inventory changes</p>
      </div>
      <Button variant="outline" onClick={onExport} disabled={isLoading}>
        <Download className="mr-2 h-4 w-4 text-blue-500" /> Export Data
      </Button>
    </div>
  );
};