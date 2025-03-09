"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    CartesianGrid,
  } from "recharts";
  
  interface BarChartProps {
    data: any[];
    bars: { dataKey: string; fill: string; name: string }[];
    xAxisKey: string;
    xAxisProps?: { angle?: number; textAnchor?: string; height?: number };
  }
  
  export function BarChartComponent({ data, bars, xAxisKey, xAxisProps = {} }: BarChartProps) {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisKey} {...xAxisProps} />
          <YAxis width={80} />
          <Tooltip />
          <Legend />
          {bars.map((bar) => (
            <Bar key={bar.dataKey} dataKey={bar.dataKey} fill={bar.fill} name={bar.name} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  }