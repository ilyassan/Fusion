import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ProductsMultiSelect } from "./ProductsMultiSelect";
import { Supplier } from "../types/SupplierTypes";
import { availableProducts } from "../data";

interface EditSupplierModalProps {
  open: boolean;
  onClose: () => void;
  onEdit: (updatedSupplier: Supplier) => void;
  supplier: Supplier | null;
}

export const EditSupplierModal: React.FC<EditSupplierModalProps> = ({
  open,
  onClose,
  onEdit,
  supplier,
}) => {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  useEffect(() => {
    if (supplier) {
      setSelectedProducts(supplier.productsSupplied);
    }
  }, [supplier]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!supplier) return;
    const formData = new FormData(e.target as HTMLFormElement);
    const updatedSupplier: Supplier = {
      ...supplier,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      productsSupplied: selectedProducts,
    };
    onEdit(updatedSupplier);
    setSelectedProducts([]);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Supplier</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Supplier Name</Label>
              <Input id="name" name="name" required defaultValue={supplier?.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required defaultValue={supplier?.email} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" required defaultValue={supplier?.phone} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" name="address" required defaultValue={supplier?.address} />
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
              Update Supplier
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};