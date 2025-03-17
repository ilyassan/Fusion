"use client";

import Skeleton from "@/app/(dashboard)/components/Skeleton";

export default function TaskSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg">
      <Skeleton className="h-5 w-5 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-3/4 rounded" />
        <Skeleton className="h-4 w-1/2 rounded" />
      </div>
      <Skeleton className="h-6 w-16 rounded-full" />
      <div className="flex items-center gap-1">
        <Skeleton className="h-4 w-4 rounded" />
        <Skeleton className="h-4 w-24 rounded" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-5 w-12 rounded-full" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
    </div>
  );
}