"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import { Product, Supplier, NewMovementFormData } from "../types/MovementTypes";

interface AddMovementFormProps {
  products: Product[];
  suppliers: Supplier[];
  onAddMovement: (movement: NewMovementFormData) => void;
}

export const AddMovementForm: React.FC<AddMovementFormProps> = ({ products, suppliers, onAddMovement }) => {
  const [newMovement, setNewMovement] = useState<NewMovementFormData>({
    product: "",
    quantity: "",
    movementType: "",
    date: new Date(),
    supplier: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddMovement(newMovement);
    setNewMovement({
      product: "",
      quantity: "",
      movementType: "",
      date: new Date(),
      supplier: "",
      notes: "",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Stock Movement</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="product">Product</Label>
              <Select
                value={newMovement.product}
                onValueChange={(value) => setNewMovement({ ...newMovement, product: value })}
              >
                <SelectTrigger id="product">
                  <SelectValue placeholder="Select a product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.name}>
                      <div className="flex items-center">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-6 h-6 mr-2 rounded"
                        />
                        {product.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={newMovement.quantity}
                onChange={(e) => setNewMovement({ ...newMovement, quantity: e.target.value })}
                placeholder="Enter quantity"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="movementType">Movement Type</Label>
              <Select
                value={newMovement.movementType}
                onValueChange={(value) => setNewMovement({ ...newMovement, movementType: value })}
              >
                <SelectTrigger id="movementType">
                  <SelectValue placeholder="Select movement type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Damage">Damage</SelectItem>
                  <SelectItem value="Loss">Loss</SelectItem>
                  <SelectItem value="Correction">Correction</SelectItem>
                  <SelectItem value="New Stock">New Stock</SelectItem>
                  <SelectItem value="Consumption">Consumption</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${!newMovement.date && "text-muted-foreground"}`}
                  >
                    {newMovement.date ? format(newMovement.date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={newMovement.date}
                    onSelect={(date) => date && setNewMovement({ ...newMovement, date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            {newMovement.movementType === "New Stock" && (
              <div className="space-y-2">
                <Label htmlFor="supplier">Supplier</Label>
                <Select
                  value={newMovement.supplier}
                  onValueChange={(value) => setNewMovement({ ...newMovement, supplier: value })}
                >
                  <SelectTrigger id="supplier">
                    <SelectValue placeholder="Select a supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map((supplier) => (
                      <SelectItem key={supplier.id} value={supplier.name}>
                        {supplier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="space-y-2 col-span-full">
              <Label htmlFor="notes">Notes</Label>
              <Input
                id="notes"
                value={newMovement.notes || ""}
                onChange={(e) => setNewMovement({ ...newMovement, notes: e.target.value })}
                placeholder="Add any additional notes"
              />
            </div>
          </div>
          <Button type="submit" className="w-full md:w-auto bg-blue-500 text-white hover:bg-blue-600">
            <Plus className="w-4 h-4 mr-2" /> Add Movement
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};