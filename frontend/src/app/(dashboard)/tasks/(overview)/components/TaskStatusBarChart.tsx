"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { TaskStatus } from "../types/taskTypes";

interface TaskStatusBarChartProps {
  data: TaskStatus[];
}

export function TaskStatusBarChart({ data }: TaskStatusBarChartProps) {
  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="text-gray-700">Tasks by Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function TaskStatusBarChartSkeleton() {
  return (
    <Card className="border-gray-200">
      <CardHeader>
        <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
      </CardHeader>
      <CardContent>
        <div className="h-64 space-y-3">
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-48 w-full bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </CardContent>
    </Card>
  );
}