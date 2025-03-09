"use client";

import {
  PieChart as RePieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { ProductService } from "../data/fetchProductServiceData";

const COLORS = ["#0088FE", "#00C49F"];

const PieChart = ({ productServiceData }: { productServiceData: ProductService[]}) => {
  return (
    <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
            <RePieChart>
                <Pie
                data={productServiceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                {productServiceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
                <Tooltip
                formatter={(value: number, name: string) => [`${value}%`, name]}
                contentStyle={{ backgroundColor: "#fff", borderRadius: "4px", border: "1px solid #e5e7eb" }}
                />
                <Legend
                layout="horizontal"
                align="center"
                verticalAlign="bottom"
                iconType="circle"
                />
            </RePieChart>
        </ResponsiveContainer>
    </div>
  )
}

export default PieChart