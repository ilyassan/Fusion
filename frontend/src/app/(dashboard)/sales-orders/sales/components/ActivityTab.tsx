// sales/components/ActivityTab.tsx
"use client";

import { Sale, ActivityLog } from "../types/salesTypes";
import Skeleton from "@/app/(dashboard)/components/Skeleton";

interface ActivityTabProps {
  sale: Sale;
  isLoading: boolean;
}

const ActivityTab: React.FC<ActivityTabProps> = ({ sale, isLoading }) => {
  const activityLog: ActivityLog[] = sale
    ? [
        { action: "Created" as const, by: sale.createdBy, at: sale.createdAt },
        ...(sale.updatedBy && sale.updatedAt
          ? [{ action: "Updated" as const, by: sale.updatedBy, at: sale.updatedAt }]
          : []),
      ]
    : [];

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
      ) : activityLog.length > 0 ? (
        activityLog.map((log, index) => (
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
};

export default ActivityTab;