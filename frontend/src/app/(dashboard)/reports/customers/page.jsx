"use client"

import { useState } from "react"
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, CalendarIcon, TrendingUp, Users, DollarSign, BarChartIcon as ChartIcon } from "lucide-react"

// Mock data remains the same
const monthlyData = [
  { month: "Jan", leads: 120, conversions: 25, revenue: 45000 },
  { month: "Feb", leads: 140, conversions: 30, revenue: 52000 },
  { month: "Mar", leads: 160, conversions: 35, revenue: 58000 },
  { month: "Apr", leads: 180, conversions: 40, revenue: 65000 },
  { month: "May", leads: 200, conversions: 45, revenue: 72000 },
  { month: "Jun", leads: 220, conversions: 50, revenue: 80000 },
]

const pipelineData = [
  { name: "Lead Capture", value: 35, color: "#4f46e5" },
  { name: "Proposal", value: 25, color: "#7c3aed" },
  { name: "Negotiation", value: 20, color: "#2563eb" },
  { name: "Closing", value: 20, color: "#0891b2" },
]

const salesPerformance = [
  { rep: "John Smith", deals: 45, revenue: 125000, conversion: 68 },
  { rep: "Sarah Johnson", deals: 52, revenue: 145000, conversion: 72 },
  { rep: "Mike Wilson", deals: 38, revenue: 98000, conversion: 65 },
  { rep: "Emma Davis", deals: 41, revenue: 115000, conversion: 70 },
  { rep: "Tom Brown", deals: 35, revenue: 85000, conversion: 62 },
]

const retentionData = [
  { month: "Jan", rate: 95 },
  { month: "Feb", rate: 94 },
  { month: "Mar", rate: 96 },
  { month: "Apr", rate: 93 },
  { month: "May", rate: 95 },
  { month: "Jun", rate: 97 },
]

export default function CustomerReportsDashboard() {
  const [dateRange, setDateRange] = useState("6months")
  const [salesRep, setSalesRep] = useState("all")

  const downloadReport = () => {
    console.log("Generating comprehensive customer report...")
  }

  return (
    <div className="w-full space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Customer Reports</h1>
          <p className="text-sm text-muted-foreground">Comprehensive insights into your customer performance</p>
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
              <h3 className="text-lg md:text-2xl font-bold">
                ${monthlyData.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}
              </h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center">
            <Users className="h-6 md:h-8 w-6 md:w-8 text-green-600 mr-4" />
            <div>
              <p className="text-sm text-muted-foreground">Total Leads</p>
              <h3 className="text-lg md:text-2xl font-bold">
                {monthlyData.reduce((sum, item) => sum + item.leads, 0)}
              </h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center">
            <DollarSign className="h-6 md:h-8 w-6 md:w-8 text-purple-600 mr-4" />
            <div>
              <p className="text-sm text-muted-foreground">Avg. Deal Size</p>
              <h3 className="text-lg md:text-2xl font-bold">
                ${Math.round(
                  monthlyData.reduce((sum, item) => sum + item.revenue, 0) /
                  monthlyData.reduce((sum, item) => sum + item.conversions, 0)
                ).toLocaleString()}
              </h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center">
            <ChartIcon className="h-6 md:h-8 w-6 md:w-8 text-teal-600 mr-4" />
            <div>
              <p className="text-sm text-muted-foreground">Conversion Rate</p>
              <h3 className="text-lg md:text-2xl font-bold text-green-600">
                {Math.round(
                  (monthlyData.reduce((sum, item) => sum + item.conversions, 0) /
                    monthlyData.reduce((sum, item) => sum + item.leads, 0)) *
                    100
                )}%
              </h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue & Leads Chart */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Revenue & Leads</CardTitle>
            <CardDescription>Monthly revenue and lead generation</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" width={80} />
                <YAxis yAxisId="right" orientation="right" width={80} />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#4f46e5" name="Revenue ($)" />
                <Line yAxisId="right" type="monotone" dataKey="leads" stroke="#2563eb" name="Leads" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pipeline Distribution */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Pipeline Distribution</CardTitle>
            <CardDescription>Deal distribution across stages</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
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
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Customer Retention</CardTitle>
            <CardDescription>Monthly retention rates</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={retentionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[85, 100]} width={80} />
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
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Conversion Rates</CardTitle>
            <CardDescription>Monthly lead conversion rates</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis width={80} />
                <Tooltip />
                <Bar dataKey="conversions" fill="#7c3aed" name="Conversions" />
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
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sales Representative</TableHead>
                <TableHead className="text-right">Deals Closed</TableHead>
                <TableHead className="text-right">Revenue Generated</TableHead>
                <TableHead className="text-right">Conversion Rate</TableHead>
                <TableHead>Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesPerformance.map((rep) => (
                <TableRow key={rep.rep}>
                  <TableCell className="font-medium">{rep.rep}</TableCell>
                  <TableCell className="text-right">{rep.deals}</TableCell>
                  <TableCell className="text-right">${rep.revenue.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{rep.conversion}%</TableCell>
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
  )
}