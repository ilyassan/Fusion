"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Zap } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface SalesForecastChartProps {
  data: {
    month: string;
    actual: number | null;
    predicted: number;
    lower: number;
    upper: number;
  }[];
}

export default function SalesForecastChart({ data }: SalesForecastChartProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card className="lg:col-span-2">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-lg sm:text-xl">AI Sales Forecast</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="h-60 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="actual"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.1}
                  name="Actual Sales"
                />
                <Area
                  type="monotone"
                  dataKey="predicted"
                  stroke="#10B981"
                  strokeDasharray="5 5"
                  fill="#10B981"
                  fillOpacity={0.1}
                  name="AI Prediction"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl">Prediction Insights</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-4">
            {data.slice(-3).map((data, index) => (
              <div key={index} className="flex items-center gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    <h4 className="text-sm sm:text-base font-medium">{data.month} Forecast</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    ${data.predicted.toLocaleString()} (±${(data.predicted * 0.05).toFixed(0)})
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}