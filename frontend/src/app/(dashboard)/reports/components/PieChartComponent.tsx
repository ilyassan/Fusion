"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface PieChartProps {
  data: { name: string; [key: string]: any; color: string }[];
  dataKey: string;
  nameKey: string;
  innerRadius?: number;
  outerRadius?: number;
}

export function PieChartComponent({
  data,
  dataKey,
  nameKey,
  innerRadius = 0,
  outerRadius = 80,
}: PieChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          dataKey={dataKey}
          nameKey={nameKey}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}