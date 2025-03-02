"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Target } from "lucide-react";

export interface PipelineData {
  stage: string;
  value: number;
  amount: number;
}

interface SalesPipelineProps {
  data: PipelineData[];
}

export const SalesPipeline = ({ data }: SalesPipelineProps) => {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-500" />
          Sales Pipeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="stage" />
              <YAxis yAxisId="left" orientation="left" stroke="#3B82F6" />
              <YAxis yAxisId="right" orientation="right" stroke="#10B981" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="value" fill="#3B82F6" name="Leads" />
              <Bar yAxisId="right" dataKey="amount" fill="#10B981" name="Amount ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};