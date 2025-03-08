"use client";

import { Order } from "../types/ordersTypes";
import Skeleton from "@/app/(dashboard)/components/Skeleton";

interface OrderActivityTabProps {
  order: Order;
  isLoading: boolean;
}

export function OrderActivityTab({ order, isLoading }: OrderActivityTabProps) {
  const SkeletonActivity = () => (
    <div className="space-y-4 p-2">
      {["activity1", "activity2"].map((key) => (
        <div key={key} className="border-l-4 border-blue-500 pl-3">
          <div className="text-sm text-gray-500 flex justify-between">
            <Skeleton className="w-20 h-5" />
            <Skeleton className="w-16 h-5" />
          </div>
          <Skeleton className="mt-1 w-32 h-5" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-4 p-2">
      {isLoading ? (
        <SkeletonActivity />
      ) : order.activityLog.length > 0 ? (
        order.activityLog.map((log, index) => (
          <div key={index} className="border-l-4 border-blue-500 pl-3">
            <div className="text-sm text-gray-500 flex justify-between">
              <span>{log.action}</span>
              <span className="text-blue-600">@{log.by}</span>
            </div>
            <p className="mt-1 text-gray-800">{new Date(log.at).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No activity recorded.</p>
      )}
    </div>
  );
}