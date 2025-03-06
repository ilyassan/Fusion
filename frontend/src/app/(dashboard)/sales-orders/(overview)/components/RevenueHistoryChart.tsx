"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { RevenueHistory } from "../types/salesTypes";

interface RevenueHistoryChartProps {
  data: RevenueHistory[];
}

export function RevenueHistoryChart({ data }: RevenueHistoryChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]} />
              <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}