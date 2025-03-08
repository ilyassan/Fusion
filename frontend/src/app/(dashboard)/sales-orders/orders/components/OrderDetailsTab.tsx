"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Package, ShoppingCart, DollarSign, CheckCircle } from "lucide-react";
import { Order } from "../types/ordersTypes";
import { format, parse, isValid } from "date-fns"; // Add isValid import
import { cn } from "@/lib/utils";
import Skeleton from "@/app/(dashboard)/components/Skeleton";

interface OrderDetailsTabProps {
  order: Order;
  editedOrder: Order | null;
  setEditedOrder: React.Dispatch<React.SetStateAction<Order | null>>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  onUpdateOrder: (id: string, updatedOrder: Partial<Order>) => void;
  isLoading: boolean;
  onConfirmAction: (action: string, orderId: string) => void;
  onOpenChange: (open: boolean) => void;
}

export function OrderDetailsTab({
  order,
  editedOrder,
  setEditedOrder,
  isEditing,
  setIsEditing,
  onUpdateOrder,
  isLoading,
  onConfirmAction,
  onOpenChange,
}: OrderDetailsTabProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedOrder((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [name]: name === "quantity" && prev.type === "Product" ? parseInt(value) || 0 : value,
      };
    });
  };

  const handleDateChange = (date: Date | undefined) => {
    setEditedOrder((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        orderDate: date ? format(date, "yyyy-MM-dd") : prev.orderDate,
      };
    });
  };

  const handleSave = () => {
    if (editedOrder && order) {
      onUpdateOrder(order.id, {
        orderDate: editedOrder.orderDate,
        itemName: editedOrder.itemName,
        quantity: editedOrder.quantity,
        price: editedOrder.price,
        shippingAddress: editedOrder.shippingAddress,
        shippingMethod: editedOrder.shippingMethod,
        scheduledDate: editedOrder.scheduledDate,
        serviceDescription: editedOrder.serviceDescription,
      });
      setIsEditing(false);
    }
  };

  // Safely parse the orderDate, only if it's a valid string
  const parsedDate = editedOrder?.orderDate
    ? (() => {
        try {
          const date = parse(editedOrder.orderDate, "yyyy-MM-dd", new Date());
          return isValid(date) ? date : undefined;
        } catch (error) {
          console.error("Invalid date value:", editedOrder.orderDate, error);
          return undefined;
        }
      })()
    : undefined;

  const SkeletonDetails = () => (
    <div className="grid grid-cols-2 gap-4 p-2">
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <CalendarIcon className="h-4 w-4 text-blue-500" />
          <span className="font-medium text-sm">Date</span>
        </div>
        <Skeleton className="w-24 h-6" />
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <Package className="h-4 w-4 text-blue-500" />
          <span className="font-medium text-sm">Item</span>
        </div>
        <Skeleton className="w-28 h-6" />
      </div>
      {order.type === "Product" ? (
        <>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <ShoppingCart className="h-4 w-4 text-blue-500" />
              <span className="font-medium text-sm">Quantity</span>
            </div>
            <Skeleton className="w-16 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4 text-blue-500" />
              <span className="font-medium text-sm">Price</span>
            </div>
            <Skeleton className="w-16 h-6" />
          </div>
        </>
      ) : (
        <div className="space-y-1 col-span-2">
          <div className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4 text-blue-500" />
            <span className="font-medium text-sm">Scheduled Date</span>
          </div>
          <Skeleton className="w-24 h-6" />
        </div>
      )}
    </div>
  );

  const ViewMode = () => (
    <div className="grid grid-cols-2 gap-4 p-2">
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <CalendarIcon className="h-4 w-4 text-blue-500" />
          <span className="font-medium text-sm">Date</span>
        </div>
        <p className="text-sm">{parsedDate ? format(parsedDate, "PPP") : "N/A"}</p>
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <Package className="h-4 w-4 text-blue-500" />
          <span className="font-medium text-sm">Item</span>
        </div>
        <p className="text-sm">{editedOrder?.itemName || "N/A"}</p>
      </div>
      {order.type === "Product" ? (
        <>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <ShoppingCart className="h-4 w-4 text-blue-500" />
              <span className="font-medium text-sm">Quantity</span>
            </div>
            <p className="text-sm">{editedOrder?.quantity || "0"}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4 text-blue-500" />
              <span className="font-medium text-sm">Price</span>
            </div>
            <p className="text-sm">${editedOrder?.price.toFixed(2) || "0.00"}</p>
          </div>
          <div className="space-y-1 col-span-2">
            <div className="flex items-center gap-1">
              <Package className="h-4 w-4 text-blue-500" />
              <span className="font-medium text-sm">Shipping Address</span>
            </div>
            <p className="text-sm">{editedOrder?.shippingAddress || "N/A"}</p>
          </div>
          <div className="space-y-1 col-span-2">
            <div className="flex items-center gap-1">
              <Package className="h-4 w-4 text-blue-500" />
              <span className="font-medium text-sm">Shipping Method</span>
            </div>
            <p className="text-sm">{editedOrder?.shippingMethod || "N/A"}</p>
          </div>
        </>
      ) : (
        <>
          <div className="space-y-1 col-span-2">
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4 text-blue-500" />
              <span className="font-medium text-sm">Scheduled Date</span>
            </div>
            <p className="text-sm">{editedOrder?.scheduledDate || "N/A"}</p>
          </div>
          <div className="space-y-1 col-span-2">
            <div className="flex items-center gap-1">
              <Package className="h-4 w-4 text-blue-500" />
              <span className="font-medium text-sm">Description</span>
            </div>
            <p className="text-sm">{editedOrder?.serviceDescription || "N/A"}</p>
          </div>
        </>
      )}
    </div>
  );

  const EditMode = () => (
    <div className="grid grid-cols-2 gap-3 p-2">
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <CalendarIcon className="h-4 w-4 text-blue-500" />
          <span className="font-medium text-xs">Date</span>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full h-8 justify-start text-left font-normal text-sm",
                !editedOrder?.orderDate && "text-muted-foreground"
              )}
            >
              {parsedDate ? format(parsedDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={parsedDate}
              onSelect={handleDateChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <Package className="h-4 w-4 text-blue-500" />
          <span className="font-medium text-xs">Item</span>
        </div>
        <Input
          name="itemName"
          value={editedOrder?.itemName || ""}
          onChange={handleInputChange}
          className="w-full h-8 text-sm"
        />
      </div>
      {order.type === "Product" ? (
        <>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <ShoppingCart className="h-4 w-4 text-blue-500" />
              <span className="font-medium text-xs">Quantity</span>
            </div>
            <Input
              name="quantity"
              type="number"
              value={editedOrder?.quantity || 0}
              onChange={handleInputChange}
              className="w-full h-8 text-sm"
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4 text-blue-500" />
              <span className="font-medium text-xs">Price</span>
            </div>
            <Input
              name="price"
              type="number"
              value={editedOrder?.price || 0}
              onChange={handleInputChange}
              className="w-full h-8 text-sm"
            />
          </div>
          <div className="space-y-1 col-span-2">
            <div className="flex items-center gap-1">
              <Package className="h-4 w-4 text-blue-500" />
              <span className="font-medium text-xs">Shipping Address</span>
            </div>
            <Input
              name="shippingAddress"
              value={editedOrder?.shippingAddress || ""}
              onChange={handleInputChange}
              className="w-full h-8 text-sm"
            />
          </div>
          <div className="space-y-1 col-span-2">
            <div className="flex items-center gap-1">
              <Package className="h-4 w-4 text-blue-500" />
              <span className="font-medium text-xs">Shipping Method</span>
            </div>
            <Input
              name="shippingMethod"
              value={editedOrder?.shippingMethod || ""}
              onChange={handleInputChange}
              className="w-full h-8 text-sm"
            />
          </div>
        </>
      ) : (
        <>
          <div className="space-y-1 col-span-2">
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4 text-blue-500" />
              <span className="font-medium text-xs">Scheduled Date</span>
            </div>
            <Input
              name="scheduledDate"
              value={editedOrder?.scheduledDate || ""}
              onChange={handleInputChange}
              className="w-full h-8 text-sm"
            />
          </div>
          <div className="space-y-1 col-span-2">
            <div className="flex items-center gap-1">
              <Package className="h-4 w-4 text-blue-500" />
              <span className="font-medium text-xs">Description</span>
            </div>
            <Input
              name="serviceDescription"
              value={editedOrder?.serviceDescription || ""}
              onChange={handleInputChange}
              className="w-full h-8 text-sm"
            />
          </div>
        </>
      )}
    </div>
  );

  return (
    <>
      {isLoading ? (
        <SkeletonDetails />
      ) : isEditing ? (
        <EditMode />
      ) : (
        <ViewMode />
      )}
      <div className="flex justify-end gap-2 pt-2">
        {isLoading ? (
          <Skeleton className="w-20 h-8" />
        ) : isEditing ? (
          <>
            <Button
              variant="outline"
              onClick={() => setIsEditing(false)}
              className="h-8 text-sm py-0"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="h-8 text-sm py-0 bg-blue-600 hover:bg-blue-700"
            >
              Save
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => setIsEditing(true)}
              className="h-8 text-sm py-0 bg-blue-600 hover:bg-blue-700"
            >
              Edit
            </Button>
            {order.status !== "Completed" && (
              <Button
                onClick={() => {
                  onConfirmAction("complete", order.id);
                  onOpenChange(false);
                }}
                className="h-8 text-sm py-0 bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Mark as Completed
              </Button>
            )}
          </>
        )}
      </div>
    </>
  );
}