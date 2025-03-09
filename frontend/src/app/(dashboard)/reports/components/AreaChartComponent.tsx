"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface AreaChartProps {
  data: any[];
  area: { dataKey: string; stroke: string; fill: string; fillOpacity: number; name: string };
  xAxisKey: string;
  yDomain?: [number, number];
}

export function AreaChartComponent({ data, area, xAxisKey, yDomain }: AreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} />
        <YAxis domain={yDomain} width={80} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey={area.dataKey}
          stroke={area.stroke}
          fill={area.fill}
          fillOpacity={area.fillOpacity}
          name={area.name}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}