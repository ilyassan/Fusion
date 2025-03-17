"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { TaskPriority } from "../types/taskTypes";

interface TaskPriorityPieChartProps {
  data: TaskPriority[];
}

const COLORS = ["#10B981", "#F59E0B", "#EF4444", "#6B7280"];

export function TaskPriorityPieChart({ data }: TaskPriorityPieChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Distribution by Priority</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="priority"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function TaskPriorityPieChartSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-center justify-center">
          <div className="h-40 w-40 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </CardContent>
    </Card>
  );
}