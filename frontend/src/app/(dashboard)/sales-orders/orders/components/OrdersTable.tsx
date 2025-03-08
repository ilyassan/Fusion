import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, CheckCircle, XCircle } from "lucide-react";
import { Order } from "../types/ordersTypes";
import Skeleton from "@/app/(dashboard)/components/Skeleton";

interface OrdersTableProps {
  orders: Order[];
  isLoading: boolean;
  selectedOrders: string[];
  setSelectedOrders: (ids: string[]) => void;
  onOpenDetails: (order: Order) => void;
  onConfirmAction: (action: string, orderId: string) => void;
}

export function OrdersTable({
  orders,
  isLoading,
  selectedOrders,
  setSelectedOrders,
  onOpenDetails,
  onConfirmAction,
}: OrdersTableProps) {
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Pending: "bg-yellow-100 text-yellow-800",
      Canceled: "bg-red-100 text-red-800",
      Completed: "bg-green-100 text-green-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedOrders.length === orders.length && !isLoading}
                  onCheckedChange={(checked) => {
                    if (!isLoading) {
                      setSelectedOrders(checked ? orders.map((order) => order.id) : []);
                    }
                  }}
                  className="border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 focus:ring-blue-500"
                  disabled={isLoading}
                />
              </TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              ["skeleton1", "skeleton2", "skeleton3"].map((key) => (
                <TableRow key={key}>
                  <TableCell>
                    <Skeleton className="w-5 h-6" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-24 h-6" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-32 h-6" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-20 h-6" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-28 h-6" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-10 h-6" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-16 h-6" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-20 h-6" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-16 h-6" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-20 h-6" />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedOrders.includes(order.id)}
                      onCheckedChange={(checked) => {
                        setSelectedOrders(
                          checked ? [...selectedOrders, order.id] : selectedOrders.filter((id) => id !== order.id)
                        );
                      }}
                      className="border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 focus:ring-blue-500"
                    />
                  </TableCell>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.type}</TableCell>
                  <TableCell>{order.itemName}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>${order.price.toFixed(2)}</TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onOpenDetails(order)}
                        className="hover:bg-blue-100"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onConfirmAction("complete", order.id)}
                        className="hover:bg-green-100"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onConfirmAction("cancel", order.id)}
                        className="hover:bg-red-100"
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}