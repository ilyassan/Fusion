import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Warehouse, Product, StockLevel, TransferFormData } from "../types/WarehouseTypes";

interface StockTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTransfer: (transfer: TransferFormData) => void;
  warehouses: Warehouse[];
  products: Product[];
  stockLevels: StockLevel[];
}

export const StockTransferModal: React.FC<StockTransferModalProps> = ({
  isOpen,
  onClose,
  onTransfer,
  warehouses,
  products,
  stockLevels,
}) => {
  const [formData, setFormData] = useState<TransferFormData>({
    sourceWarehouse: "",
    destinationWarehouse: "",
    product: "",
    quantity: "",
  });
  const [availableQuantity, setAvailableQuantity] = useState(0);

  const handleSourceWarehouseChange = (value: string) => {
    const newFormData = { ...formData, sourceWarehouse: value, product: "", quantity: "" };
    setFormData(newFormData);
    setAvailableQuantity(0);
  };

  const handleProductChange = (value: string) => {
    const sourceStock = stockLevels.find(
      (s) => s.warehouseId === parseInt(formData.sourceWarehouse) && s.productId === parseInt(value),
    );
    setFormData({ ...formData, product: value, quantity: "" });
    setAvailableQuantity(sourceStock?.quantity || 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const quantity = parseInt(formData.quantity);
    if (quantity > availableQuantity) return;
    onTransfer(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Transfer Stock</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="sourceWarehouse">From</Label>
              <Select name="sourceWarehouse" value={formData.sourceWarehouse} onValueChange={handleSourceWarehouseChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select source warehouse" />
                </SelectTrigger>
                <SelectContent>
                  {warehouses.map((warehouse) => (
                    <SelectItem key={warehouse.id} value={warehouse.id.toString()}>
                      {warehouse.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="destinationWarehouse">To</Label>
              <Select
                name="destinationWarehouse"
                value={formData.destinationWarehouse}
                onValueChange={(value) => setFormData({ ...formData, destinationWarehouse: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select destination warehouse" />
                </SelectTrigger>
                <SelectContent>
                  {warehouses
                    .filter((w) => w.id.toString() !== formData.sourceWarehouse)
                    .map((warehouse) => (
                      <SelectItem key={warehouse.id} value={warehouse.id.toString()}>
                        {warehouse.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            {formData.sourceWarehouse && (
              <div>
                <Label htmlFor="product">Product</Label>
                <Select name="product" value={formData.product} onValueChange={handleProductChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products
                      .filter((p) =>
                        stockLevels.some(
                          (s) => s.warehouseId === parseInt(formData.sourceWarehouse) && s.productId === p.id,
                        ),
                      )
                      .map((product) => (
                        <SelectItem key={product.id} value={product.id.toString()}>
                          {product.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {formData.product && (
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <div>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    max={availableQuantity}
                    min="1"
                    required
                  />
                  <p className="text-sm text-muted-foreground mt-1">Available: {availableQuantity} units</p>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!formData.sourceWarehouse || !formData.destinationWarehouse || !formData.product || !formData.quantity}
            >
              Transfer Stock
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};