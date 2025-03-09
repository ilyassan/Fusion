"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    CartesianGrid,
  } from "recharts";
  
  interface LineChartProps {
    data: any[];
    lines: { dataKey: string; stroke: string; name: string }[];
    xAxisKey: string;
    dualAxis?: boolean;
  }
  
  export function LineChartComponent({ data, lines, xAxisKey, dualAxis = false }: LineChartProps) {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisKey} />
          <YAxis yAxisId="left" width={80} />
          {dualAxis && <YAxis yAxisId="right" orientation="right" width={80} />}
          <Tooltip />
          <Legend />
          {lines.map((line, index) => (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.stroke}
              name={line.name}
              yAxisId={dualAxis && index === 1 ? "right" : "left"}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    );
  }