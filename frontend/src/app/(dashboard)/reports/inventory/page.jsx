"use client"

import { useState } from "react"
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, CalendarIcon, Package, CheckCircle, Warehouse, Truck } from "lucide-react"

// Mock data remains the same
const inventoryOverview = {
  totalStockValue: 1250000,
  productCategories: [
    { name: "Electronics", value: 450000, color: "#4f46e5" },
    { name: "Furniture", value: 350000, color: "#7c3aed" },
    { name: "Clothing", value: 250000, color: "#2563eb" },
    { name: "Books", value: 200000, color: "#0891b2" },
  ],
  productVsServices: [
    { name: "Products", value: 80, color: "#4f46e5" },
    { name: "Services", value: 20, color: "#10b981" },
  ],
  stockoutRate: 5.2
}

const inventoryMovements = [
  { month: "Jan", stockIn: 1200, stockOut: 1000 },
  { month: "Feb", stockIn: 1300, stockOut: 1100 },
  { month: "Mar", stockIn: 1400, stockOut: 1200 },
  { month: "Apr", stockIn: 1500, stockOut: 1300 },
  { month: "May", stockIn: 1600, stockOut: 1400 },
  { month: "Jun", stockIn: 1700, stockOut: 1500 },
]

const topSellingProducts = [
  { name: "Smartphone X", sales: 1200, stockLevel: 500 },
  { name: "Laptop Pro", sales: 800, stockLevel: 300 },
  { name: "Wireless Earbuds", sales: 1500, stockLevel: 700 },
  { name: "Smart Watch", sales: 950, stockLevel: 400 },
  { name: "Tablet Ultra", sales: 600, stockLevel: 200 },
]

const inventoryValueTrend = [
  { month: "Jan", value: 1000000 },
  { month: "Feb", value: 1050000 },
  { month: "Mar", value: 1100000 },
  { month: "Apr", value: 1180000 },
  { month: "May", value: 1220000 },
  { month: "Jun", value: 1250000 },
]

export default function InventoryReportsDashboard() {
  const [dateRange, setDateRange] = useState("6months")

  const downloadReport = () => {
    console.log("Generating comprehensive inventory report...")
  }

  return (
    <div className="w-full space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Inventory Reports</h1>
          <p className="text-sm text-muted-foreground">Comprehensive insights into your inventory status and movements</p>
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

      {/* Inventory Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6 flex items-center">
            <Package className="h-6 md:h-8 w-6 md:w-8 text-blue-600 mr-4" />
            <div>
              <p className="text-sm text-muted-foreground">Total Stock Value</p>
              <h3 className="text-lg md:text-2xl font-bold">${inventoryOverview.totalStockValue.toLocaleString()}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center">
            <CheckCircle className="h-6 md:h-8 w-6 md:w-8 text-green-600 mr-4" />
            <div>
              <p className="text-sm text-muted-foreground">Stockout Rate</p>
              <h3 className="text-lg md:text-2xl font-bold">{inventoryOverview.stockoutRate}%</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center">
            <Warehouse className="h-6 md:h-8 w-6 md:w-8 text-purple-600 mr-4" />
            <div>
              <p className="text-sm text-muted-foreground">Total SKUs</p>
              <h3 className="text-lg md:text-2xl font-bold">1,250</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center">
            <Truck className="h-6 md:h-8 w-6 md:w-8 text-teal-600 mr-4" />
            <div>
              <p className="text-sm text-muted-foreground">Avg. Lead Time</p>
              <h3 className="text-lg md:text-2xl font-bold">7 days</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stock Value by Category */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Stock Value by Category</CardTitle>
            <CardDescription>Distribution of inventory value across product categories</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={inventoryOverview.productCategories}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {inventoryOverview.productCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Products vs Services */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Products vs Services</CardTitle>
            <CardDescription>Percentage split between products and services</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={inventoryOverview.productVsServices}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {inventoryOverview.productVsServices.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Inventory Movements */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Inventory Movements</CardTitle>
            <CardDescription>Stock-in and stock-out trends over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={inventoryMovements}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis width={80} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="stockIn" stroke="#4f46e5" name="Stock In" />
                <Line type="monotone" dataKey="stockOut" stroke="#ef4444" name="Stock Out" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Selling Products */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>Best-performing products by sales volume</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topSellingProducts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                <YAxis width={80} />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#4f46e5" name="Sales" />
                <Bar dataKey="stockLevel" fill="#10b981" name="Current Stock" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Value Trend */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Inventory Value Trend</CardTitle>
          <CardDescription>Historical trend of total inventory value over time</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={inventoryValueTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis width={80} />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#4f46e5"
                fill="#4f46e5"
                fillOpacity={0.2}
                name="Inventory Value"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}