"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, ShoppingCart, Target, ArrowUpRight, ArrowDownRight } from 'lucide-react';

// Mock data for sales dashboard
const mockSalesData = {
  metrics: {
    totalRevenue: 850000,
    totalSales: 1234,
    avgOrderValue: 689,
    conversionRate: 3.2,
  },
  revenueHistory: [
    { month: 'Jan', revenue: 120000 },
    { month: 'Feb', revenue: 140000 },
    { month: 'Mar', revenue: 160000 },
    { month: 'Apr', revenue: 155000 },
    { month: 'May', revenue: 180000 },
    { month: 'Jun', revenue: 195000 },
  ],
  productPerformance: [
    { product: 'Product A', sales: 450 },
    { product: 'Product B', sales: 380 },
    { product: 'Product C', sales: 290 },
    { product: 'Product D', sales: 240 },
    { product: 'Product E', sales: 190 },
  ],
  salesByChannel: [
    { channel: 'Direct', value: 45 },
    { channel: 'Online', value: 35 },
    { channel: 'Partners', value: 20 },
  ],
  monthlyTargets: {
    current: 195000,
    forecast: 200000,
    previousMonth: 180000
  }
};

export default function SalesOverviewPage() {
  // Calculate month-over-month growth
  const growth = ((mockSalesData.monthlyTargets.current - mockSalesData.monthlyTargets.previousMonth) / 
                  mockSalesData.monthlyTargets.previousMonth * 100).toFixed(1);
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Sales Overview</h2>
        <p className="text-gray-500">Real-time sales performance metrics and analytics</p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mockSalesData.metrics.totalRevenue.toLocaleString()}</div>
            <div className="flex items-center mt-1">
              <span className={`text-sm ${growth >= 0 ? 'text-green-500' : 'text-red-500'} flex items-center`}>
                {growth >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                {Math.abs(growth)}%
              </span>
              <span className="text-gray-500 text-sm ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Sales
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSalesData.metrics.totalSales.toLocaleString()}</div>
            <div className="text-gray-500 text-sm mt-1">orders this month</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Avg Order Value
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mockSalesData.metrics.avgOrderValue}</div>
            <div className="text-gray-500 text-sm mt-1">per order</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Conversion Rate
            </CardTitle>
            <Target className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSalesData.metrics.conversionRate}%</div>
            <div className="text-gray-500 text-sm mt-1">of total visitors</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Revenue History Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockSalesData.revenueHistory}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Product Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Product Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockSalesData.productPerformance}>
                  <XAxis dataKey="product" />
                  <YAxis />
                  <Tooltip />
                  <Bar 
                    dataKey="sales" 
                    fill="#10B981"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Distribution Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sales by Channel */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Channel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockSalesData.salesByChannel}>
                  <XAxis dataKey="channel" />
                  <YAxis />
                  <Tooltip />
                  <Bar 
                    dataKey="value" 
                    fill="#8B5CF6"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Target Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Target Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Current</span>
                <span className="font-bold">${mockSalesData.monthlyTargets.current.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${(mockSalesData.monthlyTargets.current / mockSalesData.monthlyTargets.forecast) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Forecast: ${mockSalesData.monthlyTargets.forecast.toLocaleString()}</span>
                <span className="text-blue-600 font-medium">
                  {((mockSalesData.monthlyTargets.current / mockSalesData.monthlyTargets.forecast) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}