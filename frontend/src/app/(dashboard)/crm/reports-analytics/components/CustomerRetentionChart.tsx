"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { RetentionData } from "../types/AnalyticsTypes";

interface CustomerRetentionChartProps {
  data: RetentionData[];
}

export function CustomerRetentionChart({ data }: CustomerRetentionChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Retention</CardTitle>
        <CardDescription>Monthly retention rates</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[85, 100]} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="rate"
              stroke="#0891b2"
              fill="#0891b2"
              fillOpacity={0.2}
              name="Retention Rate (%)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}