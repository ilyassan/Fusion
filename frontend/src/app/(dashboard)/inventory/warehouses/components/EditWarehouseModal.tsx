import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Warehouse } from "../types/WarehouseTypes";

interface EditWarehouseModalProps {
  warehouse: Warehouse | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedWarehouse: Warehouse) => void;
}

export const EditWarehouseModal: React.FC<EditWarehouseModalProps> = ({
  warehouse,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Warehouse | null>(null);

  useEffect(() => {
    if (warehouse) {
      setFormData(warehouse);
    }
  }, [warehouse]);

  if (!warehouse || !formData) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } },
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => prev && { ...prev, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onSave({ ...formData, capacity: parseInt(formData.capacity as any, 10) });
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Warehouse</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" value={formData.location} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="capacity">Capacity</Label>
              <div className="flex gap-2">
                <Input
                  id="capacity"
                  name="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  className="flex-1"
                  required
                  min="1"
                />
                <Select
                  name="capacityUnit"
                  value={formData.capacityUnit}
                  onValueChange={(value) => handleInputChange({ target: { name: "capacityUnit", value } })}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="m²">m²</SelectItem>
                    <SelectItem value="ft²">ft²</SelectItem>
                    <SelectItem value="yd²">yd²</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="contact">Contact Person</Label>
              <Input id="contact" name="contact" value={formData.contact} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};