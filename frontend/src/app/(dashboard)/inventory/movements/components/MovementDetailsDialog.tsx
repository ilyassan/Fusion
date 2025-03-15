import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { StockMovement } from "../types/MovementTypes";

interface MovementDetailsDialogProps {
  isOpen: boolean;
  movement: StockMovement | null;
  onClose: () => void;
}

export const MovementDetailsDialog: React.FC<MovementDetailsDialogProps> = ({ isOpen, movement, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Stock Movement Details</DialogTitle>
          <DialogDescription>Detailed information about the selected stock movement.</DialogDescription>
        </DialogHeader>
        {movement && (
          <div className="space-y-4">
            <div>
              <Label className="font-bold">Date and Time:</Label>
              <p>{format(new Date(movement.date), "PPP p")}</p>
            </div>
            <div>
              <Label className="font-bold">Product:</Label>
              <p>{movement.productName}</p>
            </div>
            <div>
              <Label className="font-bold">Movement Type:</Label>
              <p>{movement.movementType}</p>
            </div>
            <div>
              <Label className="font-bold">Quantity:</Label>
              <p>{movement.quantity}</p>
            </div>
            <div>
              <Label className="font-bold">Performed By:</Label>
              <p>{movement.user}</p>
            </div>
            {movement.movementType === "New Stock" && movement.supplier && (
              <div>
                <Label className="font-bold">Supplier:</Label>
                <p>{movement.supplier}</p>
              </div>
            )}
            <div>
              <Label className="font-bold">Notes:</Label>
              <p>{movement.notes || "No additional notes"}</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};