"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { EmployeeGrowth } from "../types/employeeTypes";

interface EmployeeGrowthChartProps {
  data: EmployeeGrowth[];
}

export function EmployeeGrowthChart({ data }: EmployeeGrowthChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Employee Growth</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="workers" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}