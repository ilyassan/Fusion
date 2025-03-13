"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, Eye, Trash2 } from "lucide-react";
import { Product, SortConfig } from "../types/ProductTypes";
import Skeleton from "@/app/(dashboard)/components/Skeleton";

interface ProductTableProps {
  products: Product[];
  sortConfig: SortConfig;
  isLoading: boolean;
  handleSort: (key: keyof Product) => void;
  setSelectedProduct: (product: Product) => void;
  handleDelete: (id: number) => void;
}

const stockLevelColors: Record<string, string> = {
  low: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-blue-100 text-blue-800",
};

export function ProductTable({
  products,
  isLoading,
  sortConfig,
  handleSort,
  setSelectedProduct,
  handleDelete,
}: ProductTableProps) {
  const getStockLevelColor = (currentStock: number, minStockLevel: number) => {
    if (currentStock <= minStockLevel) return stockLevelColors.low;
    if (currentStock <= minStockLevel * 2) return stockLevelColors.medium;
    return stockLevelColors.high;
  };

  return (
    <Table className="min-w-[400px]">
      <TableHeader>
        <TableRow>
          <TableHead onClick={() => handleSort("name")} className="cursor-pointer">
            Product Name <ArrowUpDown className="h-4 w-4 inline" />
          </TableHead>
          <TableHead className="hidden md:table-cell">SKU</TableHead>
          <TableHead onClick={() => handleSort("price")} className="cursor-pointer">
            Price <ArrowUpDown className="h-4 w-4 inline" />
          </TableHead>
          <TableHead className="hidden md:table-cell">Category</TableHead>
          <TableHead onClick={() => handleSort("currentStock")} className="cursor-pointer">
            Stock <ArrowUpDown className="h-4 w-4 inline" />
          </TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          ["suspense1", "suspense2", "suspense3"].map((key) => (
            <TableRow key={key}>
              <TableCell className="py-4">
                <Skeleton className="w-32" />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton className="w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-20" />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton className="w-28" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-16" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="w-24" />
              </TableCell>
            </TableRow>
          ))
        ) : products.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-8">
              <h2 className="text-xl font-semibold text-gray-600">No products found</h2>
            </TableCell>
          </TableRow>
        ) : (
          products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell className="hidden md:table-cell">{product.sku}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell className="hidden md:table-cell">{product.category}</TableCell>
              <TableCell>
                <Badge className={getStockLevelColor(product.currentStock, product.minStockLevel)}>
                  {product.currentStock}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedProduct(product)}
                  className="mr-2 text-blue-600 hover:text-blue-700"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => handleDelete(product.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}