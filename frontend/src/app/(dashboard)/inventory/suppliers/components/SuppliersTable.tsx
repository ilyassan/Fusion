// suppliers/components/SuppliersTable.tsx
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Skeleton from "@/app/(dashboard)/components/Skeleton";
import { Edit, Trash2, Plus } from "lucide-react";
import { Supplier, Product } from "../types/SupplierTypes";

interface SuppliersTableProps {
  suppliers: Supplier[];
  search: string;
  setSearch: (value: string) => void;
  availableProducts: Product[];
  setIsAddSupplierModalOpen: (open: boolean) => void;
  setSelectedSupplier: (supplier: Supplier) => void;
  setIsEditSupplierModalOpen: (open: boolean) => void;
  setDeleteConfirmation: (confirmation: { isOpen: boolean; id: number | null }) => void;
  isLoading: boolean;
}

const SupplierSkeletonRow: React.FC = () => (
  <TableRow>
    <TableCell>
      <Skeleton className="h-4 w-32" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-48" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-24" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-64" />
    </TableCell>
    <TableCell className="flex gap-2.5 justify-end">
                <Skeleton className="w-9 h-7" />
                <Skeleton className="w-9 h-7" />
              </TableCell>
  </TableRow>
);

export const SuppliersTable: React.FC<SuppliersTableProps> = ({
  suppliers,
  search,
  setSearch,
  availableProducts,
  setIsAddSupplierModalOpen,
  setSelectedSupplier,
  setIsEditSupplierModalOpen,
  setDeleteConfirmation,
  isLoading,
}) => {
  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Suppliers</CardTitle>
        <Button
          onClick={() => setIsAddSupplierModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Supplier
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            placeholder="Search suppliers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Supplier Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Products Supplied</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => <SupplierSkeletonRow key={index} />)
            ) : suppliers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No suppliers found
                </TableCell>
              </TableRow>
            ) : (
              suppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell className="font-medium">{supplier.name}</TableCell>
                  <TableCell>{supplier.email}</TableCell>
                  <TableCell>{supplier.phone}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {supplier.productsSupplied.map((productId) => (
                        <Badge key={productId} variant="secondary">
                          {availableProducts.find((p) => p.id === productId)?.name}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedSupplier(supplier);
                        setIsEditSupplierModalOpen(true);
                      }}
                      className="mr-2"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDeleteConfirmation({ isOpen: true, id: supplier.id })}
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