"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { DepartmentDistribution } from "../types/employeeTypes";

interface DepartmentDistributionChartProps {
  data: DepartmentDistribution[];
}

export function DepartmentDistributionChart({ data }: DepartmentDistributionChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Department Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}