"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface LineChartProps {
  data: any[];
  lines: { dataKey: string; stroke: string; name: string }[];
  xAxisKey: string;
}

export function LineChartComponent({ data, lines, xAxisKey }: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <XAxis dataKey={xAxisKey} />
        <YAxis width={80} />
        <Tooltip />
        <Legend />
        {lines.map((line) => (
          <Line
            key={line.dataKey}
            type="monotone"
            dataKey={line.dataKey}
            stroke={line.stroke}
            name={line.name}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}