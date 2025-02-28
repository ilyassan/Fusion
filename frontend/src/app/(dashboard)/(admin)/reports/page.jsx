"use client";

import React, { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Cell, ComposedChart
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Download, CalendarIcon, TrendingUp, 
  Package, Briefcase, MapPin 
} from 'lucide-react';
import { 
  Select, SelectContent, 
  SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";

// Mock Data remains the same
const performanceData = {
  totalRevenue: 1450000,
  totalSalesOrders: 485,
  averageOrderValue: 2990,
  salesGrowth: 18.5
};

const salesTrendsData = [
  { period: 'Jan', revenue: 210000, prevRevenue: 180000 },
  { period: 'Feb', revenue: 230000, prevRevenue: 195000 },
  { period: 'Mar', revenue: 260000, prevRevenue: 220000 },
  { period: 'Apr', revenue: 285000, prevRevenue: 240000 },
  { period: 'May', revenue: 310000, prevRevenue: 260000 },
];

const topSellingData = [
  { name: 'Micro Chips', unitsSold: 95, revenue: 475000, profitability: 62 },
  { name: 'Marketing', unitsSold: 65, revenue: 325000, profitability: 55 },
  { name: 'Transistors', unitsSold: 125, revenue: 250000, profitability: 48 },
];

const salesDistributionData = [
  { name: 'Products', revenue: 720000, color: '#4f46e5' },
  { name: 'Services', revenue: 730000, color: '#10b981' },
];

const geographicalSalesData = [
  { region: 'Agadir', revenue: 620000, color: '#2563eb' },
  { region: 'Rabat', revenue: 450000, color: '#7c3aed' },
  { region: 'Tanger', revenue: 380000, color: '#0891b2' },
];

export default function SalesReportsDashboard() {
  const [dateRange, setDateRange] = useState('6months');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const downloadReport = () => {
    console.log('Generating comprehensive sales report...');
  };

  return (
    <div className="w-full space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Sales Reports</h1>
          <p className="text-sm text-muted-foreground">Comprehensive insights into your sales performance</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <CalendarIcon className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700"
            onClick={downloadReport}
          >
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Performance KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6 flex items-center">
            <TrendingUp className="h-6 md:h-8 w-6 md:w-8 text-blue-600 mr-4" />
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <h3 className="text-lg md:text-2xl font-bold">${performanceData.totalRevenue.toLocaleString()}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center">
            <Package className="h-6 md:h-8 w-6 md:w-8 text-green-600 mr-4" />
            <div>
              <p className="text-sm text-muted-foreground">Total Sales Orders</p>
              <h3 className="text-lg md:text-2xl font-bold">{performanceData.totalSalesOrders}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center">
            <Briefcase className="h-6 md:h-8 w-6 md:w-8 text-purple-600 mr-4" />
            <div>
              <p className="text-sm text-muted-foreground">Avg. Order Value</p>
              <h3 className="text-lg md:text-2xl font-bold">${performanceData.averageOrderValue}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center">
            <MapPin className="h-6 md:h-8 w-6 md:w-8 text-teal-600 mr-4" />
            <div>
              <p className="text-sm text-muted-foreground">Sales Growth</p>
              <h3 className="text-lg md:text-2xl font-bold text-green-600">
                {performanceData.salesGrowth}%
              </h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trends */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Sales Trends</CardTitle>
            <CardDescription>Revenue performance comparison</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesTrendsData}>
                <XAxis dataKey="period" />
                <YAxis width={80} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#4f46e5" 
                  name="Current Period" 
                />
                <Line 
                  type="monotone" 
                  dataKey="prevRevenue" 
                  stroke="#10b981" 
                  name="Previous Period" 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top-Selling Products & Services */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Top-Selling Items</CardTitle>
            <CardDescription>Performance by product/service</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topSellingData}>
                <XAxis dataKey="name" />
                <YAxis width={80} />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#4f46e5" name="Revenue" />
                <Bar dataKey="unitsSold" fill="#10b981" name="Units Sold" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sales Distribution: Products vs Services */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Revenue Distribution</CardTitle>
            <CardDescription>Products vs Services</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={salesDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  dataKey="revenue"
                  label
                >
                  {salesDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Geographical Sales Distribution */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Geographical Sales</CardTitle>
            <CardDescription>Revenue by region</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={geographicalSalesData} layout="vertical">
                <XAxis type="number" />
                <YAxis dataKey="region" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="revenue" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}