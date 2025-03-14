"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Service, SortConfig } from "../types/ServiceTypes";
import { ArrowUpDown, Edit, Trash2 } from "lucide-react";
import Skeleton from "@/app/(dashboard)/components/Skeleton";

interface ServiceTableProps {
  isLoading: boolean;
  services: Service[];
  sortConfig: SortConfig;
  handleSort: (key: keyof Service) => void;
  setSelectedService: (service: Service) => void;
  handleDelete: (id: number) => void;
}

export function ServiceTable({
  isLoading,
  services,
  sortConfig,
  handleSort,
  setSelectedService,
  handleDelete,
}: ServiceTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead onClick={() => handleSort("name")} className="cursor-pointer">
            Service Name <ArrowUpDown className="h-4 w-4 inline" />
          </TableHead>
          <TableHead className="hidden md:table-cell">Description</TableHead>
          <TableHead onClick={() => handleSort("price")} className="cursor-pointer">
            Price <ArrowUpDown className="h-4 w-4 inline" />
          </TableHead>
          <TableHead className="hidden md:table-cell">Category</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          ["suspense1", "suspense2", "suspense3"].map((key) => (
            <TableRow key={key}>
              <TableCell>
                <Skeleton className="w-32" />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton className="w-72" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-16" />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton className="w-24" />
              </TableCell>
              <TableCell className="flex gap-2.5 justify-end">
                <Skeleton className="w-9 h-7" />
                <Skeleton className="w-9 h-7" />
              </TableCell>
            </TableRow>
          ))
        ) : services.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-8">
              <h2 className="text-xl font-semibold text-gray-600">No services found</h2>
            </TableCell>
          </TableRow>
        ) : (
          services.map((service) => (
            <TableRow key={service.id}>
              <TableCell>{service.name}</TableCell>
              <TableCell className="hidden md:table-cell">{service.description.substring(0, 50)}...</TableCell>
              <TableCell>${service.price.toFixed(2)}</TableCell>
              <TableCell className="hidden md:table-cell">{service.category}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm" onClick={() => setSelectedService(service)} className="mr-2">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => handleDelete(service.id)}
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