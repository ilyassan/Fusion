import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Employee } from "../../(overview)/types/employeeTypes";

interface UpdateEmployeeModalProps {
  isOpen: boolean;
  employee: Employee | null;
  field: string;
  value: string | number;
  onClose: () => void;
  onConfirm: () => void;
}

export function UpdateEmployeeModal({ isOpen, employee, field, value, onClose, onConfirm }: UpdateEmployeeModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Update</DialogTitle>
          <DialogDescription>
            Are you sure you want to update the {field} for {employee?.firstName} {employee?.lastName} to {value}?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={onConfirm}>
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}