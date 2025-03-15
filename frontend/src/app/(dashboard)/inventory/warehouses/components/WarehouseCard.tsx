import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Warehouse, StockLevel } from "../types/WarehouseTypes";
import { MapPin, Edit, Trash2, Building, DollarSign, ChevronRight, Box } from "lucide-react";

interface WarehouseCardProps {
  warehouse: Warehouse;
  stockLevels: StockLevel[];
  onEdit: () => void;
  onDelete: () => void;
  onViewDetails: () => void;
}

export const WarehouseCard: React.FC<WarehouseCardProps> = ({
  warehouse,
  stockLevels,
  onEdit,
  onDelete,
  onViewDetails,
}) => {
  const getUtilizationColor = (rate: number) => {
    if (rate < 50) return "text-green-500";
    if (rate < 75) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{warehouse.name}</CardTitle>
        <div className="flex gap-3">
          <Edit className="cursor-pointer h-4 w-4 text-blue-500" onClick={onEdit} />
          <Trash2 className="cursor-pointer h-4 w-4 text-red-500" onClick={onDelete} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="text-2xl font-bold">{warehouse.totalItems.toLocaleString()} items</div>
            <p className="text-xs text-muted-foreground">
              <DollarSign className="inline h-3 w-3 text-green-500" /> Total Value: $
              {warehouse.totalValue.toLocaleString()}
            </p>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-1 h-4 w-4 text-red-400" />
            {warehouse.location}
          </div>
          <div>
            <div className="text-sm font-medium mb-2">Capacity Usage:</div>
            <div className="flex items-center gap-2">
              <Building className={`h-4 w-4 ${getUtilizationColor(warehouse.utilizationRate)}`} />
              <div className="flex-1 h-2 bg-gray-200 rounded-full">
                <div
                  className={`h-2 rounded-full ${getUtilizationColor(warehouse.utilizationRate)} bg-current`}
                  style={{ width: `${warehouse.utilizationRate}%` }}
                />
              </div>
              <span className={`text-sm ${getUtilizationColor(warehouse.utilizationRate)}`}>
                {warehouse.utilizationRate}%
              </span>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium">Top Products:</div>
            <ul className="mt-2 text-sm space-y-2">
              {stockLevels.slice(0, 3).map((stock) => (
                <li key={stock.productId} className="flex justify-between items-center">
                  <span className="flex items-center">
                    <Box className="h-3 w-3 text-blue-400 mr-2" />
                    {stock.productName}
                  </span>
                  <span className="font-medium">{stock.quantity}</span>
                </li>
              ))}
            </ul>
          </div>
          <Button variant="outline" className="w-full mt-4" onClick={onViewDetails}>
            View Details <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};