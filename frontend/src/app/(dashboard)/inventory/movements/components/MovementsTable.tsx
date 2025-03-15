// movements/components/MovementsTable.tsx
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowUpDown, Eye } from "lucide-react";
import { format } from "date-fns";
import { StockMovement } from "../types/MovementTypes";
import Skeleton from "@/app/(dashboard)/components/Skeleton";

interface MovementsTableProps {
  movements: StockMovement[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  onSort: (key: keyof StockMovement) => void;
  onViewDetails: (movement: StockMovement) => void;
}

export const MovementsTable: React.FC<MovementsTableProps> = ({
  movements,
  currentPage,
  totalPages,
  totalItems,
  isLoading,
  onPageChange,
  onSort,
  onViewDetails,
}) => {
  const itemsPerPage = 10;

  const renderSkeletonRows = () => {
    return Array(5) // Show 5 skeleton rows during loading
      .fill(0)
      .map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton className="h-4 w-24" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-32" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-20" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-16" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-28" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-8" />
          </TableCell>
        </TableRow>
      ));
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => !isLoading && onSort("date")} className="cursor-pointer">
                Date <ArrowUpDown className="w-4 h-4 inline" />
              </TableHead>
              <TableHead onClick={() => !isLoading && onSort("productName")} className="cursor-pointer">
                Product <ArrowUpDown className="w-4 h-4 inline" />
              </TableHead>
              <TableHead onClick={() => !isLoading && onSort("movementType")} className="cursor-pointer">
                Movement Type <ArrowUpDown className="w-4 h-4 inline" />
              </TableHead>
              <TableHead onClick={() => !isLoading && onSort("quantity")} className="cursor-pointer">
                Quantity <ArrowUpDown className="w-4 h-4 inline" />
              </TableHead>
              <TableHead>User</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? renderSkeletonRows()
              : movements.map((movement) => (
                  <TableRow key={movement.id}>
                    <TableCell>{format(new Date(movement.date), "PPP")}</TableCell>
                    <TableCell>{movement.productName}</TableCell>
                    <TableCell>{movement.movementType}</TableCell>
                    <TableCell>{movement.quantity}</TableCell>
                    <TableCell>{movement.user}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        onClick={() => onViewDetails(movement)}
                        className="hover:bg-blue-100"
                        disabled={isLoading}
                      >
                        <Eye className="w-4 h-4 text-blue-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {isLoading ? (
            <Skeleton className="h-4 w-40" />
          ) : (
            `Showing ${(currentPage - 1) * itemsPerPage + 1} to ${Math.min(
              currentPage * itemsPerPage,
              totalItems,
            )} of ${totalItems} entries`
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          {isLoading
            ? Array(3)
                .fill(0)
                .map((_, i) => <Skeleton key={i} className="h-10 w-10" />)
            : Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNumber = i + 1;
                return (
                  <Button
                    key={pageNumber}
                    variant={currentPage === pageNumber ? "default" : "outline"}
                    onClick={() => onPageChange(pageNumber)}
                    className={currentPage === pageNumber ? "bg-blue-500 text-white" : ""}
                  >
                    {pageNumber}
                  </Button>
                );
              })}
          <Button
            variant="outline"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || isLoading}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};