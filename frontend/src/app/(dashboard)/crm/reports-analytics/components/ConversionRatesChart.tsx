"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { MonthlyData } from "../types/AnalyticsTypes";

interface ConversionRatesChartProps {
  data: MonthlyData[];
}

export function ConversionRatesChart({ data }: ConversionRatesChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversion Rates</CardTitle>
        <CardDescription>Monthly lead conversion rates</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="conversions" fill="#7c3aed" name="Conversions" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}