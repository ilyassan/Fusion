"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DollarSign, Percent, Package } from "lucide-react";
import { Product, Category } from "../types/ProductTypes";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (newProduct: Omit<Product, "id">) => void;
  categories: Category[];
}

export function AddProductModal({ isOpen, onClose, onAddProduct, categories }: AddProductModalProps) {
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    sku: "",
    barcode: "",
    description: "",
    price: 0,
    cost: 0,
    tax: 0,
    supplier: "",
    warehouse: "",
    currentStock: 0,
    minStockLevel: 0,
    category: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string } }
  ) => {
    const { name, value } = "target" in e ? e.target : e;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProduct({
      ...newProduct,
      price: Number(newProduct.price),
      cost: Number(newProduct.cost),
      tax: Number(newProduct.tax),
      currentStock: Number(newProduct.currentStock),
      minStockLevel: Number(newProduct.minStockLevel),
    });
    setNewProduct({
      name: "",
      sku: "",
      barcode: "",
      description: "",
      price: 0,
      cost: 0,
      tax: 0,
      supplier: "",
      warehouse: "",
      currentStock: 0,
      minStockLevel: 0,
      category: "",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add New Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>
            <TabsContent value="basic">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" value={newProduct.name} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="sku">SKU</Label>
                    <Input id="sku" name="sku" value={newProduct.sku} onChange={handleInputChange} required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={newProduct.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <div className="relative">
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        value={newProduct.price}
                        onChange={handleInputChange}
                        required
                      />
                      <DollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      name="category"
                      value={newProduct.category}
                      onValueChange={(value) => handleInputChange({ target: { name: "category", value } })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="details">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="barcode">Barcode</Label>
                    <Input id="barcode" name="barcode" value={newProduct.barcode} onChange={handleInputChange} />
                  </div>
                  <div>
                    <Label htmlFor="supplier">Supplier</Label>
                    <Select
                      name="supplier"
                      value={newProduct.supplier}
                      onValueChange={(value) => handleInputChange({ target: { name: "supplier", value } })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="supplier1">Supplier 1</SelectItem>
                        <SelectItem value="supplier2">Supplier 2</SelectItem>
                        <SelectItem value="supplier3">Supplier 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="cost">Cost</Label>
                    <div className="relative">
                      <Input
                        id="cost"
                        name="cost"
                        type="number"
                        value={newProduct.cost}
                        onChange={handleInputChange}
                        required
                      />
                      <DollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="tax">Tax</Label>
                    <div className="relative">
                      <Input
                        id="tax"
                        name="tax"
                        type="number"
                        value={newProduct.tax}
                        onChange={handleInputChange}
                        required
                      />
                      <Percent className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="warehouse">Warehouse</Label>
                    <Select
                      name="warehouse"
                      value={newProduct.warehouse}
                      onValueChange={(value) => handleInputChange({ target: { name: "warehouse", value } })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select warehouse" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main">Main Warehouse</SelectItem>
                        <SelectItem value="secondary">Secondary Warehouse</SelectItem>
                        <SelectItem value="offsite">Offsite Storage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currentStock">Initial Stock</Label>
                    <div className="relative">
                      <Input
                        id="currentStock"
                        name="currentStock"
                        type="number"
                        value={newProduct.currentStock}
                        onChange={handleInputChange}
                        required
                      />
                      <Package className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="minStockLevel">Minimum Stock Level</Label>
                    <Input
                      id="minStockLevel"
                      name="minStockLevel"
                      type="number"
                      value={newProduct.minStockLevel}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Add Product
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}