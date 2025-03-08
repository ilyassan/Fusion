"use client";

import { User, Mail, Phone } from "lucide-react";
import { Order } from "../types/ordersTypes";
import Skeleton from "@/app/(dashboard)/components/Skeleton";

interface CustomerDetailsTabProps {
  order: Order;
  isLoading: boolean;
}

export function CustomerDetailsTab({ order, isLoading }: CustomerDetailsTabProps) {
  const SkeletonCustomerDetails = () => (
    <div className="grid grid-cols-2 gap-4 p-2">
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <User className="h-4 w-4 text-blue-500" />
          <span className="font-medium text-sm">Name</span>
        </div>
        <Skeleton className="w-32 h-6" />
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <Mail className="h-4 w-4 text-blue-500" />
          <span className="font-medium text-sm">Email</span>
        </div>
        <Skeleton className="w-40 h-6" />
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <Phone className="h-4 w-4 text-blue-500" />
          <span className="font-medium text-sm">Phone</span>
        </div>
        <Skeleton className="w-28 h-6" />
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-2 gap-4 p-2">
      {isLoading ? (
        <SkeletonCustomerDetails />
      ) : (
        <>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4 text-blue-500" />
              <span className="font-medium text-sm">Name</span>
            </div>
            <p className="text-sm">{order.customerName || "N/A"}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4 text-blue-500" />
              <span className="font-medium text-sm">Email</span>
            </div>
            <p className="text-sm">{order.email || "N/A"}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4 text-blue-500" />
              <span className="font-medium text-sm">Phone</span>
            </div>
            <p className="text-sm">{order.phone || "N/A"}</p>
          </div>
        </>
      )}
    </div>
  );
}