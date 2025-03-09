"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface VerticalBarChartProps {
  data: any[];
  bar: { dataKey: string; fill: string };
  yAxisKey: string;
}

export function VerticalBarChartComponent({ data, bar, yAxisKey }: VerticalBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical">
        <XAxis type="number" />
        <YAxis dataKey={yAxisKey} type="category" width={80} />
        <Tooltip />
        <Bar dataKey={bar.dataKey} fill={bar.fill} />
      </BarChart>
    </ResponsiveContainer>
  );
}