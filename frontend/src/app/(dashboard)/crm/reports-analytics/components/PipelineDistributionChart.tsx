"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { PipelineData } from "../types/AnalyticsTypes";

interface PipelineDistributionChartProps {
  data: PipelineData[];
}

export function PipelineDistributionChart({ data }: PipelineDistributionChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pipeline Distribution</CardTitle>
        <CardDescription>Deal distribution across stages</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}