"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Sale, SortConfig } from "../types/salesTypes";
import Skeleton from "@/app/(dashboard)/components/Skeleton";

interface SalesTableProps {
  sales: Sale[];
  isLoading: boolean;
  sortConfig: SortConfig;
  handleSort: (key: keyof Sale) => void;
  setSelectedSale: (sale: Sale) => void;
}

export function SalesTable({ sales, isLoading, sortConfig, handleSort, setSelectedSale }: SalesTableProps) {
  const getSortIndicator = (key: keyof Sale) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? " ↑" : " ↓";
    }
    return "";
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => handleSort("id")} className="cursor-pointer whitespace-nowrap">
              ID {getSortIndicator("id")}
            </TableHead>
            <TableHead onClick={() => handleSort("date")} className="cursor-pointer whitespace-nowrap">
              Date {getSortIndicator("date")}
            </TableHead>
            <TableHead className="whitespace-nowrap">Customer</TableHead>
            <TableHead className="whitespace-nowrap">Company</TableHead>
            <TableHead className="whitespace-nowrap">Product</TableHead>
            <TableHead className="whitespace-nowrap">Category</TableHead>
            <TableHead onClick={() => handleSort("amount")} className="cursor-pointer whitespace-nowrap">
              Amount {getSortIndicator("amount")}
            </TableHead>
            <TableHead className="whitespace-nowrap">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            ["skeleton1", "skeleton2", "skeleton3"].map((key) => (
              <TableRow key={key}>
                <TableCell><Skeleton className="w-5 h-6" /></TableCell>
                <TableCell><Skeleton className="w-24 h-6" /></TableCell>
                <TableCell><Skeleton className="w-32 h-6" /></TableCell>
                <TableCell><Skeleton className="w-28 h-6" /></TableCell>
                <TableCell><Skeleton className="w-28 h-6" /></TableCell>
                <TableCell><Skeleton className="w-20 h-6" /></TableCell>
                <TableCell><Skeleton className="w-16 h-6" /></TableCell>
                <TableCell><Skeleton className="w-12 h-6" /></TableCell>
              </TableRow>
            ))
          ) : (
            sales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell className="whitespace-nowrap">{sale.id}</TableCell>
                <TableCell className="whitespace-nowrap">{sale.date}</TableCell>
                <TableCell className="whitespace-nowrap">{sale.customer}</TableCell>
                <TableCell className="whitespace-nowrap">{sale.company}</TableCell>
                <TableCell className="whitespace-nowrap">{sale.product}</TableCell>
                <TableCell className="whitespace-nowrap">{sale.category}</TableCell>
                <TableCell className="whitespace-nowrap">${sale.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedSale(sale)}
                    className="bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700"
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}