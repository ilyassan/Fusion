import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ProductsMultiSelect } from "./ProductsMultiSelect";
import { Supplier } from "../types/SupplierTypes";
import { availableProducts } from "../data";

interface AddSupplierModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (newSupplier: Omit<Supplier, "id">) => void;
}

export const AddSupplierModal: React.FC<AddSupplierModalProps> = ({ open, onClose, onAdd }) => {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const supplierData: Omit<Supplier, "id"> = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      productsSupplied: selectedProducts,
    };
    onAdd(supplierData);
    setSelectedProducts([]);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Supplier</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Supplier Name</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" name="address" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="productsSupplied">Products Supplied</Label>
            <ProductsMultiSelect
              value={selectedProducts}
              onChange={setSelectedProducts}
              products={availableProducts}
            />
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Add Supplier
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};