"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2 } from "lucide-react";
import { Product } from "../types/SupplierTypes";
import { PurchaseOrderItem } from "../types/PurchaseTypes";

interface OrderItemsSectionProps {
  orderItems: PurchaseOrderItem[];
  setOrderItems: (items: PurchaseOrderItem[]) => void;
  availableProducts: Product[];
  supplierProducts: number[];
}

export const OrderItemsSection: React.FC<OrderItemsSectionProps> = ({
  orderItems,
  setOrderItems,
  availableProducts,
  supplierProducts,
}) => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState("");

  const addOrderItem = (productId: string, quantity: string) => {
    const product = availableProducts.find((p) => p.id.toString() === productId);
    if (!product) return;
    const newItem: PurchaseOrderItem = {
      productId: product.id,
      name: product.name,
      quantity: parseInt(quantity, 10),
      price: product.price,
    };
    setOrderItems([...orderItems, newItem]);
    setSelectedProduct("");
    setSelectedQuantity("");
  };

  const calculateTotal = (items: PurchaseOrderItem[]) =>
    items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="product" className="text-sm font-medium text-gray-700">
            Product
          </Label>
          <Select onValueChange={setSelectedProduct} value={selectedProduct}>
            <SelectTrigger id="product" className="border-gray-300 focus:ring-blue-500">
              <SelectValue placeholder="Select product" />
            </SelectTrigger>
            <SelectContent>
              {availableProducts
                .filter((product) => supplierProducts.includes(product.id))
                .map((product) => (
                  <SelectItem key={product.id} value={product.id.toString()}>
                    {product.name} (${product.price})
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="quantity" className="text-sm font-medium text-gray-700">
            Quantity
          </Label>
          <Input
            id="quantity"
            type="number"
            min="1"
            placeholder="Enter quantity"
            value={selectedQuantity}
            onChange={(e) => setSelectedQuantity(e.target.value)}
            className="border-gray-300 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-end items-end">
          <Button
            type="button"
            onClick={() => {
              if (selectedProduct && selectedQuantity && parseInt(selectedQuantity, 10) > 0) {
                addOrderItem(selectedProduct, selectedQuantity);
              }
            }}
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white flex items-center"
          >
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>
      </div>
      <div className="border rounded-md p-4 bg-gray-50">
        <h4 className="font-semibold mb-2 text-gray-800">Order Items</h4>
        <div className="max-h-48 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="text-gray-700">Product</TableHead>
                <TableHead className="text-gray-700">Quantity</TableHead>
                <TableHead className="text-gray-700">Price</TableHead>
                <TableHead className="text-gray-700">Total</TableHead>
                <TableHead className="text-gray-700"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500">
                    No items added yet
                  </TableCell>
                </TableRow>
              ) : (
                orderItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-gray-800">{item.name}</TableCell>
                    <TableCell className="text-gray-800">{item.quantity}</TableCell>
                    <TableCell className="text-gray-800">${item.price}</TableCell>
                    <TableCell className="text-gray-800">
                      ${(item.price * item.quantity).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setOrderItems(orderItems.filter((_, i) => i !== index))}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
              {orderItems.length > 0 && (
                <TableRow className="border-t border-gray-200">
                  <TableCell colSpan={3} className="text-right font-semibold text-gray-800">
                    Total:
                  </TableCell>
                  <TableCell colSpan={2} className="font-semibold text-gray-800">
                    ${calculateTotal(orderItems).toLocaleString()}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};