"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Skeleton from "@/app/(dashboard)/components/Skeleton";
import TaskSkeleton from "./TaskSkeleton";

export default function TasksSkeleton() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48 rounded" />
        <Skeleton className="h-4 w-64 rounded" />
      </div>
      <div className="flex gap-4 mb-6">
        <Skeleton className="h-10 w-full max-w-sm rounded-md" />
        <Skeleton className="h-10 w-40 rounded-md" />
      </div>
      <Card className="shadow-sm">
        <CardHeader className="bg-gray-50 border-b">
          <Skeleton className="h-6 w-64 rounded" />
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-4 pt-2">
            <TaskSkeleton />
            <TaskSkeleton />
            <TaskSkeleton />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}