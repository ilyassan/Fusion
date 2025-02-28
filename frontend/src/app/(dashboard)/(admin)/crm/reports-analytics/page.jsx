"use client";

import React, { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Download, Calendar as CalendarIcon, ArrowUp, ArrowDown,
  TrendingUp, Users, DollarSign, LineChart as ChartIcon
} from 'lucide-react';

// Mock data for charts
const monthlyData = [
  { month: 'Jan', leads: 120, conversions: 25, revenue: 45000 },
  { month: 'Feb', leads: 140, conversions: 30, revenue: 52000 },
  { month: 'Mar', leads: 160, conversions: 35, revenue: 58000 },
  { month: 'Apr', leads: 180, conversions: 40, revenue: 65000 },
  { month: 'May', leads: 200, conversions: 45, revenue: 72000 },
  { month: 'Jun', leads: 220, conversions: 50, revenue: 80000 },
];

const pipelineData = [
  { name: 'Lead Capture', value: 35, color: '#4f46e5' },
  { name: 'Proposal', value: 25, color: '#7c3aed' },
  { name: 'Negotiation', value: 20, color: '#2563eb' },
  { name: 'Closing', value: 20, color: '#0891b2' },
];

const salesPerformance = [
  { rep: 'John Smith', deals: 45, revenue: 125000, conversion: 68 },
  { rep: 'Sarah Johnson', deals: 52, revenue: 145000, conversion: 72 },
  { rep: 'Mike Wilson', deals: 38, revenue: 98000, conversion: 65 },
  { rep: 'Emma Davis', deals: 41, revenue: 115000, conversion: 70 },
  { rep: 'Tom Brown', deals: 35, revenue: 85000, conversion: 62 },
];

const retentionData = [
  { month: 'Jan', rate: 95 },
  { month: 'Feb', rate: 94 },
  { month: 'Mar', rate: 96 },
  { month: 'Apr', rate: 93 },
  { month: 'May', rate: 95 },
  { month: 'Jun', rate: 97 },
];

export default function AnalyticsDashboard() {
  const [dateRange, setDateRange] = useState('6months');
  const [salesRep, setSalesRep] = useState('all');

  const downloadReport = () => {
    // Implementation for report download
    console.log('Downloading report...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Reports & Analytics</h2>
          <p className="text-muted-foreground">
            Track your sales performance and business metrics
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={downloadReport}>
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Revenue & Leads Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Leads</CardTitle>
            <CardDescription>Monthly revenue and lead generation</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#4f46e5"
                  name="Revenue ($)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="leads"
                  stroke="#2563eb"
                  name="Leads"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pipeline Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Pipeline Distribution</CardTitle>
            <CardDescription>Deal distribution across stages</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pipelineData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {pipelineData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Customer Retention */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Retention</CardTitle>
            <CardDescription>Monthly retention rates</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={retentionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[85, 100]} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="rate"
                  stroke="#0891b2"
                  fill="#0891b2"
                  fillOpacity={0.2}
                  name="Retention Rate (%)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Conversion Rates */}
        <Card>
          <CardHeader>
            <CardTitle>Conversion Rates</CardTitle>
            <CardDescription>Monthly lead conversion rates</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="conversions"
                  fill="#7c3aed"
                  name="Conversions"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Sales Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Performance</CardTitle>
          <CardDescription>Individual sales representative performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sales Representative</TableHead>
                <TableHead>Deals Closed</TableHead>
                <TableHead>Revenue Generated</TableHead>
                <TableHead>Conversion Rate</TableHead>
                <TableHead>Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesPerformance.map((rep) => (
                <TableRow key={rep.rep}>
                  <TableCell className="font-medium">{rep.rep}</TableCell>
                  <TableCell>{rep.deals}</TableCell>
                  <TableCell>${rep.revenue.toLocaleString()}</TableCell>
                  <TableCell>{rep.conversion}%</TableCell>
                  <TableCell>
                    <Badge variant={rep.conversion > 65 ? "success" : "warning"}>
                      {rep.conversion > 65 ? "Above Target" : "Below Target"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}