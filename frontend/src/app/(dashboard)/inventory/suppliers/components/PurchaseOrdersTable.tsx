// suppliers/components/PurchaseOrdersTable.tsx
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Skeleton from "@/app/(dashboard)/components/Skeleton";
import { Edit, Trash2, Plus } from "lucide-react";
import { PurchaseOrder } from "../types/PurchaseTypes";
import { statusColors } from "../data";

interface PurchaseOrdersTableProps {
  purchaseOrders: PurchaseOrder[];
  search: string;
  setSearch: (value: string) => void;
  setIsAddPOModalOpen: (open: boolean) => void;
  setSelectedPO: (po: PurchaseOrder) => void;
  setIsEditPOModalOpen: (open: boolean) => void;
  setDeleteConfirmation: (confirmation: { isOpen: boolean; id: string | null }) => void;
  isLoading: boolean;
}

const PurchaseOrderSkeletonRow: React.FC = () => (
  <TableRow>
    <TableCell>
      <Skeleton className="h-4 w-24" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-32" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-24" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-24" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-16" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-20" />
    </TableCell>
    <TableCell className="flex gap-2.5 justify-end">
      <Skeleton className="w-9 h-7" />
      <Skeleton className="w-9 h-7" />
    </TableCell>
  </TableRow>
);

export const PurchaseOrdersTable: React.FC<PurchaseOrdersTableProps> = ({
  purchaseOrders,
  search,
  setSearch,
  setIsAddPOModalOpen,
  setSelectedPO,
  setIsEditPOModalOpen,
  setDeleteConfirmation,
  isLoading,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Purchase Orders</CardTitle>
        <Button
          onClick={() => setIsAddPOModalOpen(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Purchase Order
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            placeholder="Search purchase orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Expected Delivery</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total Value</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => <PurchaseOrderSkeletonRow key={index} />)
            ) : purchaseOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No purchase orders found
                </TableCell>
              </TableRow>
            ) : (
              purchaseOrders.map((po) => (
                <TableRow key={po.id}>
                  <TableCell className="font-medium">{po.id}</TableCell>
                  <TableCell>{po.supplierName}</TableCell>
                  <TableCell>{po.orderDate}</TableCell>
                  <TableCell>{po.expectedDelivery}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[po.status]}>
                      {po.status.charAt(0).toUpperCase() + po.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    $
                    {po.items
                      ? po.items
                          .reduce((total, item) => total + item.price * item.quantity, 0)
                          .toLocaleString()
                      : "0"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedPO(po);
                        setIsEditPOModalOpen(true);
                      }}
                      className="mr-2"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDeleteConfirmation({ isOpen: true, id: po.id })}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};