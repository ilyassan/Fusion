"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { MonthlyData } from "../types/AnalyticsTypes";

interface RevenueLeadsChartProps {
  data: MonthlyData[];
}

export function RevenueLeadsChart({ data }: RevenueLeadsChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue & Leads</CardTitle>
        <CardDescription>Monthly revenue and lead generation</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#4f46e5" name="Revenue ($)" />
            <Line yAxisId="right" type="monotone" dataKey="leads" stroke="#2563eb" name="Leads" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}