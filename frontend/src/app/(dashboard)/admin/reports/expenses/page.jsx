"use client"

import { useState } from "react"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, CalendarIcon, DollarSign, TrendingDown, PieChartIcon, ArrowUpDown } from "lucide-react"

// Mock data remains the same
const totalExpenses = 1250000
const monthlyTrend = -2.5
const expenseCategories = [
  { name: "Salaries", value: 600000, color: "#4f46e5" },
  { name: "Rent", value: 200000, color: "#7c3aed" },
  { name: "Marketing", value: 150000, color: "#2563eb" },
  { name: "Utilities", value: 100000, color: "#0891b2" },
  { name: "Software", value: 120000, color: "#10b981" },
  { name: "Others", value: 80000, color: "#f59e0b" },
]

const expenseTrends = [
  { month: "Jan", expenses: 200000, revenue: 250000 },
  { month: "Feb", expenses: 210000, revenue: 270000 },
  { month: "Mar", expenses: 220000, revenue: 290000 },
  { month: "Apr", expenses: 200000, revenue: 310000 },
  { month: "May", expenses: 230000, revenue: 330000 },
  { month: "Jun", expenses: 210000, revenue: 350000 },
]

const highCostTransactions = [
  { description: "Annual Office Rent", amount: 150000, date: "2023-06-01" },
  { description: "Q2 Marketing Campaign", amount: 75000, date: "2023-04-15" },
  { description: "Server Infrastructure Upgrade", amount: 50000, date: "2023-05-20" },
  { description: "Employee Training Program", amount: 30000, date: "2023-03-10" },
  { description: "New Product Development", amount: 100000, date: "2023-02-28" },
]

const recurringExpenses = [
  { name: "CRM Software", amount: 5000, frequency: "Monthly" },
  { name: "Cloud Hosting", amount: 8000, frequency: "Monthly" },
  { name: "Office Cleaning Service", amount: 2000, frequency: "Monthly" },
  { name: "Team Collaboration Tools", amount: 1500, frequency: "Monthly" },
  { name: "Cybersecurity Suite", amount: 3000, frequency: "Monthly" },
]

export default function ExpenseReportsDashboard() {
  const [dateRange, setDateRange] = useState("6months")

  const downloadReport = () => {
    console.log("Generating comprehensive expense report...")
  }

  return (
    <div className="w-full space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Expense Reports</h1>
          <p className="text-sm text-muted-foreground">Track company expenses and identify cost-saving opportunities</p>
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

      {/* Total Expenses Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6 flex items-center">
            <DollarSign className="h-6 md:h-8 w-6 md:w-8 text-blue-600 mr-4" />
            <div>
              <p className="text-sm text-muted-foreground">Total Expenses</p>
              <h3 className="text-lg md:text-2xl font-bold">${totalExpenses.toLocaleString()}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center">
            <TrendingDown className="h-6 md:h-8 w-6 md:w-8 text-green-600 mr-4" />
            <div>
              <p className="text-sm text-muted-foreground">Monthly Trend</p>
              <h3 className="text-lg md:text-2xl font-bold">{monthlyTrend}%</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center">
            <PieChartIcon className="h-6 md:h-8 w-6 md:w-8 text-purple-600 mr-4" />
            <div>
              <p className="text-sm text-muted-foreground">Largest Category</p>
              <h3 className="text-lg md:text-2xl font-bold">Salaries</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center">
            <ArrowUpDown className="h-6 md:h-8 w-6 md:w-8 text-teal-600 mr-4" />
            <div>
              <p className="text-sm text-muted-foreground">Expense Ratio</p>
              <h3 className="text-lg md:text-2xl font-bold">68%</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Breakdown by Category */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Expense Breakdown by Category</CardTitle>
            <CardDescription>Distribution of expenses across major categories</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseCategories}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {expenseCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Expense Trends */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Expense vs Revenue Trends</CardTitle>
            <CardDescription>Monthly comparison of expenses and revenue</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={expenseTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis width={80} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="expenses" stroke="#ef4444" name="Expenses" />
                <Line type="monotone" dataKey="revenue" stroke="#22c55e" name="Revenue" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tables */}
      <div className="space-y-6">
        {/* High-Cost Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>High-Cost Transactions</CardTitle>
            <CardDescription>Largest business expenses in the selected period</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {highCostTransactions.map((transaction, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{transaction.description}</TableCell>
                    <TableCell>${transaction.amount.toLocaleString()}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recurring Expenses */}
        <Card>
          <CardHeader>
            <CardTitle>Recurring Expenses</CardTitle>
            <CardDescription>Regular ongoing expenses such as subscriptions</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Frequency</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recurringExpenses.map((expense, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{expense.name}</TableCell>
                    <TableCell>${expense.amount.toLocaleString()}</TableCell>
                    <TableCell>{expense.frequency}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}