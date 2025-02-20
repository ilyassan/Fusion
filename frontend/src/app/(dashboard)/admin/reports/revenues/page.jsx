"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, CalendarIcon, DollarSign, TrendingUp, BarChart3, PieChartIcon } from "lucide-react"

// Mock data remains the same
const revenueOverview = {
  totalRevenue: 5000000,
  netProfit: 1500000,
  revenueGrowth: 15.5,
}

const revenueTrends = [
  { month: "Jan", revenue: 350000 },
  { month: "Feb", revenue: 400000 },
  { month: "Mar", revenue: 450000 },
  { month: "Apr", revenue: 500000 },
  { month: "May", revenue: 550000 },
  { month: "Jun", revenue: 600000 },
]

const revenueByProduct = [
  { name: "Product A", revenue: 1500000, color: "#4f46e5" },
  { name: "Product B", revenue: 1200000, color: "#7c3aed" },
  { name: "Service X", revenue: 800000, color: "#2563eb" },
  { name: "Service Y", revenue: 700000, color: "#0891b2" },
  { name: "Product C", revenue: 500000, color: "#10b981" },
  { name: "Other", revenue: 300000, color: "#f59e0b" },
]

const profitMarginAnalysis = [
  { name: "Product A", revenue: 1500000, cost: 900000 },
  { name: "Product B", revenue: 1200000, cost: 700000 },
  { name: "Service X", revenue: 800000, cost: 400000 },
  { name: "Service Y", revenue: 700000, cost: 350000 },
  { name: "Product C", revenue: 500000, cost: 300000 },
]

const topCustomers = [
  { name: "Acme Corp", revenue: 750000, percentage: 15 },
  { name: "TechGiant Inc", revenue: 600000, percentage: 12 },
  { name: "MegaCorp", revenue: 450000, percentage: 9 },
  { name: "InnovateTech", revenue: 350000, percentage: 7 },
  { name: "Global Solutions", revenue: 300000, percentage: 6 },
]

const revenueVsExpenses = [
  { month: "Jan", revenue: 350000, expenses: 280000 },
  { month: "Feb", revenue: 400000, expenses: 310000 },
  { month: "Mar", revenue: 450000, expenses: 340000 },
  { month: "Apr", revenue: 500000, expenses: 370000 },
  { month: "May", revenue: 550000, expenses: 400000 },
  { month: "Jun", revenue: 600000, expenses: 430000 },
]

export default function RevenueReportsDashboard() {
  const [dateRange, setDateRange] = useState("6months")

  const downloadReport = () => {
    console.log("Generating comprehensive revenue report...")
  }

  return (
    <div className="w-full space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Revenue Reports</h1>
          <p className="text-sm text-muted-foreground">Deep insights into revenue sources and profitability trends</p>
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

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6 flex items-center">
            <DollarSign className="h-6 md:h-8 w-6 md:w-8 text-blue-600 mr-4" />
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <h3 className="text-lg md:text-2xl font-bold">${revenueOverview.totalRevenue.toLocaleString()}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center">
            <TrendingUp className="h-6 md:h-8 w-6 md:w-8 text-green-600 mr-4" />
            <div>
              <p className="text-sm text-muted-foreground">Net Profit</p>
              <h3 className="text-lg md:text-2xl font-bold">${revenueOverview.netProfit.toLocaleString()}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center">
            <BarChart3 className="h-6 md:h-8 w-6 md:w-8 text-purple-600 mr-4" />
            <div>
              <p className="text-sm text-muted-foreground">Revenue Growth</p>
              <h3 className="text-lg md:text-2xl font-bold">+{revenueOverview.revenueGrowth}%</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center">
            <PieChartIcon className="h-6 md:h-8 w-6 md:w-8 text-teal-600 mr-4" />
            <div>
              <p className="text-sm text-muted-foreground">Profit Margin</p>
              <h3 className="text-lg md:text-2xl font-bold">
                {((revenueOverview.netProfit / revenueOverview.totalRevenue) * 100).toFixed(1)}%
              </h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trends */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
            <CardDescription>Monthly revenue analysis</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis width={80} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#4f46e5" name="Revenue" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue by Product/Service */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Revenue by Product/Service</CardTitle>
            <CardDescription>Earnings breakdown by category</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueByProduct}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="revenue"
                  label
                >
                  {revenueByProduct.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Profit Margin Analysis */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Profit Margin Analysis</CardTitle>
            <CardDescription>Revenue vs. costs per product/service</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={profitMarginAnalysis}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                <YAxis width={80} />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" stackId="a" fill="#4f46e5" name="Revenue" />
                <Bar dataKey="cost" stackId="a" fill="#ef4444" name="Cost" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue vs. Expenses */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Revenue vs. Expenses</CardTitle>
            <CardDescription>Profit margins against operational costs</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueVsExpenses}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis width={80} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#4f46e5" name="Revenue" />
                <Line type="monotone" dataKey="expenses" stroke="#ef4444" name="Expenses" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Customer Segmentation by Revenue */}
      <Card>
        <CardHeader>
          <CardTitle>Top Customers by Revenue</CardTitle>
          <CardDescription>High-value customers contributing most to earnings</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>% of Total Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topCustomers.map((customer, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>${customer.revenue.toLocaleString()}</TableCell>
                  <TableCell>{customer.percentage}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}