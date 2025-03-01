"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ArrowRight } from "lucide-react";

interface SalesData {
  category: string;
  sales: number;
  returns: number;
}

interface SalesChartProps {
  data: SalesData[];
}

export function SalesChart({ data }: SalesChartProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-indigo-600" />
            Sales Breakdown
          </CardTitle>
          <Button variant="ghost" className="text-sm text-indigo-600 hover:text-indigo-700">
            View Report <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#4f46e5" radius={[4, 4, 0, 0]} name="Total Sales" />
            <Bar dataKey="returns" fill="#ef4444" radius={[4, 4, 0, 0]} name="Returns" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}