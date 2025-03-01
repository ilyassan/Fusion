"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts"

interface SalesDataPoint {
  date: string
  sales: number
}

interface SalesChartProps {
  data: SalesDataPoint[]
}

export function SalesChart({ data }: SalesChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-indigo-600" />
          Your Sales Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#4f46e5" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}