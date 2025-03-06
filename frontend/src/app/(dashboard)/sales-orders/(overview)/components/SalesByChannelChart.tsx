"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { SalesByChannel } from "../types/salesTypes";

interface SalesByChannelChartProps {
  data: SalesByChannel[];
}

export function SalesByChannelChart({ data }: SalesByChannelChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales by Channel</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="channel" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}