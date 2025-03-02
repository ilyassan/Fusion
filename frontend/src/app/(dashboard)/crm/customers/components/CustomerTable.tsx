"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown } from "lucide-react";
import { Customer, SortConfig } from "../types/CustomerTypes";
import Skeleton from "@/app/(dashboard)/components/Skeleton";

interface CustomerTableProps {
  customers: Customer[];
  sortConfig: SortConfig;
  isLoading: boolean;
  handleSort: (key: keyof Customer) => void;
  setSelectedCustomer: (customer: Customer) => void;
}

const statusColors: Record<string, string> = {
  Active: "bg-green-100 text-green-800",
  Inactive: "bg-gray-100 text-gray-800",
};

export function CustomerTable({ customers, isLoading, sortConfig, handleSort, setSelectedCustomer }: CustomerTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Contact</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Status</TableHead>
          <TableHead onClick={() => handleSort("lastContact")} className="cursor-pointer">
            Last Contact <ArrowUpDown className="h-4 w-4 inline" />
          </TableHead>
          <TableHead onClick={() => handleSort("deals")} className="cursor-pointer">
            Deals <ArrowUpDown className="h-4 w-4 inline" />
          </TableHead>
          <TableHead onClick={() => handleSort("value")} className="cursor-pointer">
            Value <ArrowUpDown className="h-4 w-4 inline" />
          </TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading
        ?
          ["suspence1", "suspence2", "suspence3"].map((key) => (
            <TableRow key={key}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={`/api/placeholder/32/32`} />
                    <AvatarFallback>
                      <Skeleton/>
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div><Skeleton className="w-32"/></div>
                    <div className="mt-3"><Skeleton className="w-36"/></div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="w-32"/>
              </TableCell>
              <TableCell>
                <Skeleton/>
              </TableCell>
              <TableCell>
                <Skeleton/>
              </TableCell>
              <TableCell>
                <Skeleton/>
              </TableCell>
              <TableCell>
                <Skeleton/>
              </TableCell>
              <TableCell className="text-right">
                <Skeleton/>
              </TableCell>
            </TableRow>
          ))
        :
        customers.map((customer) => (
          <TableRow key={customer.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={`/api/placeholder/32/32`} />
                  <AvatarFallback>
                    {customer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{customer.name}</div>
                  <div className="text-sm text-gray-500">{customer.email}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>{customer.company || "None"}</TableCell>
            <TableCell>
              <Badge className={statusColors[customer.status]}>{customer.status}</Badge>
            </TableCell>
            <TableCell>{customer.lastContact}</TableCell>
            <TableCell>{customer.deals}</TableCell>
            <TableCell>${customer.value.toLocaleString()}</TableCell>
            <TableCell className="text-right">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedCustomer(customer)}
                className="bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700"
              >
                Details
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}