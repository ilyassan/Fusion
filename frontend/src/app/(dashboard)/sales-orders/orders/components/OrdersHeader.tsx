import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface OrdersHeaderProps {
  onExport: () => void;
}

export function OrdersHeader({ onExport }: OrdersHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold">Pending Orders</h1>
        <p className="text-gray-500">Manage and track all pending orders</p>
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={onExport} className="bg-blue-600 hover:bg-blue-700">
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </div>
    </div>
  );
}