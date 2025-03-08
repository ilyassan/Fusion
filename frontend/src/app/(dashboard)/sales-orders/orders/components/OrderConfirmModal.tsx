import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface OrderConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  action: { type: string; orderId?: string };
  onConfirm: () => void;
}

export function OrderConfirmModal({ open, onOpenChange, action, onConfirm }: OrderConfirmModalProps) {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogDescription>
              <>
                {action.type === "complete" && "Are you sure you want to mark this order as completed? It will be moved to the sales list and removed from pending orders."}
                {action.type === "cancel" && "Are you sure you want to cancel this order?"}
                {action.type === "export" && "Are you sure you want to export the selected orders?"}
                {action.type === "bulkComplete" && "Are you sure you want to mark the selected orders as completed? They will be moved to the sales list and removed from pending orders."}
                {action.type === "bulkCancel" && "Are you sure you want to cancel the selected orders?"}
              </>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}