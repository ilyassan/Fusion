import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Warehouse, StockLevel } from "../types/WarehouseTypes";
import { MapPin, Building, User, Phone, Package } from "lucide-react";

interface WarehouseDetailsSheetProps {
  isOpen: boolean;
  warehouse: Warehouse | null;
  stockLevels: StockLevel[];
  onClose: () => void;
}

export const WarehouseDetailsSheet: React.FC<WarehouseDetailsSheetProps> = ({
  isOpen,
  warehouse,
  stockLevels,
  onClose,
}) => {
  if (!warehouse) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-[600px]">
        <SheetHeader>
          <SheetTitle>{warehouse.name}</SheetTitle>
          <SheetDescription>Complete warehouse information and stock levels</SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-muted-foreground">Location</Label>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-red-400 mr-2" />
                {warehouse.location}
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground">Capacity</Label>
              <div className="flex items-center">
                <Building className="h-4 w-4 text-blue-400 mr-2" />
                {warehouse.capacity} {warehouse.capacityUnit}
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground">Contact Person</Label>
              <div className="flex items-center">
                <User className="h-4 w-4 text-green-400 mr-2" />
                {warehouse.contact}
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground">Phone</Label>
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-purple-400 mr-2" />
                {warehouse.phone}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center">
              <Package className="h-4 w-4 text-orange-400 mr-2" />
              Stock Inventory
            </h4>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stockLevels.map((stock) => (
                    <TableRow key={stock.productId}>
                      <TableCell>{stock.productName}</TableCell>
                      <TableCell className="text-right">{stock.quantity}</TableCell>
                      <TableCell className="text-right">${stock.value.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};