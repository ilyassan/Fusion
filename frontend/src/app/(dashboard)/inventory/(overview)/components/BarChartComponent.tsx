"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TopSellingItem } from "../data/fetchTopSellingItemsData";
  
  export function BarChartComponent({ topSellingItems }: { topSellingItems: TopSellingItem[] }) {
    return (
    <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={topSellingItems}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={60}
              interval={0}
              stroke="#6b7280"
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              stroke="#8884d8"
              label={{ value: "Sales", angle: -90, position: "insideLeft", fill: "#8884d8" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#82ca9d"
              label={{ value: "Stock", angle: 90, position: "insideRight", fill: "#82ca9d" }}
            />
            <Tooltip
              formatter={(value: number, name: string) => [value, name]}
              contentStyle={{ backgroundColor: "#fff", borderRadius: "4px", border: "1px solid #e5e7eb" }}
            />
            <Legend
              layout="horizontal"
              align="center"
              verticalAlign="bottom"
              iconType="rect"
            />
            <Bar
              yAxisId="left"
              dataKey="sales"
              fill="#8884d8"
              name="Sales"
              barSize={20}
            />
            <Bar
              yAxisId="right"
              dataKey="stock"
              fill="#82ca9d"
              name="Current Stock"
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }