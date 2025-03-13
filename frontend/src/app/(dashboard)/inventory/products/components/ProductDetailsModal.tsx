"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { Product } from "../types/ProductTypes";
import { Info, Package, Activity } from "lucide-react";

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDetailsModal({ product, isOpen, onClose }: ProductDetailsModalProps) {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">Product Details - {product.name}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-50 p-1 rounded-lg">
            <TabsTrigger value="info" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Info className="w-4 h-4 mr-2" />
              Information
            </TabsTrigger>
            <TabsTrigger value="inventory" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Package className="w-4 h-4 mr-2" />
              Inventory
            </TabsTrigger>
            <TabsTrigger value="stock" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Activity className="w-4 h-4 mr-2" />
              Stock
            </TabsTrigger>
          </TabsList>

          <div className="mt-4 space-y-4">
            <TabsContent value="info">
              <div className="space-y-4 p-0.5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-gray-700">Product Name</label>
                    <p className="border rounded px-3 py-2 bg-gray-50">{product.name}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-gray-700">SKU Code</label>
                    <p className="border rounded px-3 py-2 bg-gray-50">{product.sku}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-gray-700">Barcode</label>
                    <p className="border rounded px-3 py-2 bg-gray-50">{product.barcode}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-gray-700">Product Description</label>
                  <p className="border rounded px-3 py-2 bg-gray-50 min-h-[80px]">{product.description}</p>
                </div>

                <div className="rounded-lg border p-4 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-gray-600">Retail Price</label>
                      <p className="border rounded px-3 py-2">${product.price.toFixed(2)}</p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-gray-600">Cost Price</label>
                      <p className="border rounded px-3 py-2">${product.cost.toFixed(2)}</p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-gray-600">Tax Rate</label>
                      <p className="border rounded px-3 py-2">{(product.tax * 100).toFixed(2)}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="inventory">
              <div className="space-y-4 p-0.5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-gray-700">Current Stock Level</label>
                    <p className="border rounded px-3 py-2">{product.currentStock}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-gray-700">Minimum Stock Level</label>
                    <p className="border rounded px-3 py-2">{product.minStockLevel}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-gray-700">Warehouse Location</label>
                    <p className="border rounded px-3 py-2">{product.warehouse}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-gray-700">Primary Supplier</label>
                    <p className="border rounded px-3 py-2">{product.supplier}</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="stock">
              <div className="space-y-4 p-0.5">
                <div className="rounded-lg border overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-blue-50">
                      <TableRow>
                        <TableHead className="text-blue-600">Date</TableHead>
                        <TableHead className="text-blue-600">Activity</TableHead>
                        <TableHead className="text-blue-600">Quantity</TableHead>
                        <TableHead className="text-blue-600">Performed By</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="hover:bg-gray-50">
                        <TableCell>2023-06-01</TableCell>
                        <TableCell>Stock Added</TableCell>
                        <TableCell className="text-green-600">+50</TableCell>
                        <TableCell>John Doe</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-gray-50">
                        <TableCell>2023-06-15</TableCell>
                        <TableCell>Stock Removed</TableCell>
                        <TableCell className="text-red-600">-20</TableCell>
                        <TableCell>Jane Smith</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}