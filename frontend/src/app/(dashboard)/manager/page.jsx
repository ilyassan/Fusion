"use client"

import { useState } from "react"
import {
  Calendar,
  Bell,
  Settings,
  ChevronDown,
  DollarSign,
  Users,
  Activity,
  ArrowUp,
  ArrowDown,
  ClipboardList,
  Package,
  ArrowRight,
  User,
  BarChart,
  PieChart,
  LineChart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts"

// Mock data (replace with real data fetching in production)
const salesData = [
  { category: "Electronics", sales: 4000, returns: 240 },
  { category: "Apparel", sales: 6500, returns: 150 },
  { category: "Home Goods", sales: 2800, returns: 75 },
  { category: "Services", sales: 5200, returns: 45 },
]

const taskData = [
  { id: 1, title: "Review Q2 sales report", status: "In Progress", assignee: "John Doe", due: "2 days" },
  { id: 2, title: "Prepare team performance reviews", status: "Pending", assignee: "Jane Smith", due: "1 week" },
  { id: 3, title: "Update inventory forecasts", status: "Completed", assignee: "Mike Johnson", due: "Yesterday" },
]

const teamPerformance = [
  { name: "Sales", value: 85 },
  { name: "Customer Service", value: 92 },
  { name: "Operations", value: 78 },
]

const revenueData = [
  { month: "Jan", revenue: 45000, expenses: 32000 },
  { month: "Feb", revenue: 52000, expenses: 35000 },
  { month: "Mar", revenue: 48000, expenses: 33000 },
  { month: "Apr", revenue: 61000, expenses: 38000 },
  { month: "May", revenue: 55000, expenses: 36000 },
  { month: "Jun", revenue: 67000, expenses: 41000 },
]

const topProducts = [
  { name: "Product A", sales: 1200, revenue: 60000 },
  { name: "Product B", sales: 800, revenue: 48000 },
  { name: "Product C", sales: 600, revenue: 36000 },
]

const customerSegments = [
  { name: "High Value", count: 50, revenue: 250000 },
  { name: "Regular", count: 200, revenue: 400000 },
  { name: "Occasional", count: 500, revenue: 150000 },
]

const employeePerformance = [
  { name: "Alice", sales: 120, customerSatisfaction: 95, salary: 1000 },
  { name: "Bob", sales: 90, customerSatisfaction: 88, salary: 2500 },
  { name: "Charlie", sales: 150, customerSatisfaction: 92, salary: 2100 },
  { name: "Ilyass", sales: 150, customerSatisfaction: 92, salary: 5000 },
]

// Components
const Header = ({ timePeriod, setTimePeriod }) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg border border-gray-200">
    <div className="space-y-1">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Manager Dashboard</h1>
      <p className="text-sm text-gray-600">Welcome back! Here's your team's overview.</p>
    </div>

    <div className="flex flex-wrap items-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 gap-2">
            <Calendar className="h-4 w-4 text-gray-600" />
            <span className="hidden sm:inline">{timePeriod}</span>
            <ChevronDown className="h-4 w-4 text-gray-600" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px] bg-white border border-gray-200">
          {["Today", "This Week", "This Month", "This Quarter", "This Year"].map((period) => (
            <DropdownMenuItem
              key={period}
              onSelect={() => setTimePeriod(period)}
              className="cursor-pointer hover:bg-gray-50 text-gray-700"
            >
              {period}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="outline" size="icon" className="bg-white border-gray-200 hover:bg-gray-50">
        <Bell className="h-4 w-4 text-gray-600" />
      </Button>
      <Button variant="outline" size="icon" className="bg-white border-gray-200 hover:bg-gray-50">
        <Settings className="h-4 w-4 text-gray-600" />
      </Button>
    </div>
  </div>
)

const MetricCard = ({ title, value, icon: Icon, change, changeType }) => (
  <Card className="bg-white border border-gray-200 hover:shadow-md transition-all duration-200">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
      <div className="p-1.5 bg-indigo-50 rounded-lg">
        <Icon className="h-4 w-4 text-indigo-600" />
      </div>
    </CardHeader>
    <CardContent className="pt-0">
      <div className="text-xl sm:text-2xl font-bold text-gray-900">{value}</div>
      <div
        className={`flex items-center text-xs mt-0.5 ${
          changeType === "increase" ? "text-emerald-600" : "text-rose-600"
        }`}
      >
        {changeType === "increase" ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
        {change}
      </div>
    </CardContent>
  </Card>
)

const SalesOverview = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <BarChart className="h-5 w-5 text-indigo-600" />
        Sales Overview
      </CardTitle>
    </CardHeader>
    <CardContent className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales" fill="#4f46e5" name="Sales" />
          <Bar dataKey="returns" fill="#ef4444" name="Returns" />
        </RechartsBarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
)

const TeamPerformance = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <PieChart className="h-5 w-5 text-indigo-600" />
        Team Performance
      </CardTitle>
    </CardHeader>
    <CardContent className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={teamPerformance}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label
          >
            {teamPerformance.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={["#4f46e5", "#10b981", "#f59e0b"][index % 3]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </RechartsPieChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
)

const RevenueChart = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <LineChart className="h-5 w-5 text-indigo-600" />
        Revenue vs Expenses
      </CardTitle>
    </CardHeader>
    <CardContent className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={revenueData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={2} name="Revenue" />
          <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} name="Expenses" />
        </RechartsLineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
)

const TaskList = () => (
  <Card>
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-indigo-600" />
          Team Tasks
        </CardTitle>
        <Button variant="ghost" className="text-sm text-indigo-600 hover:text-indigo-700">
          View All <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Task</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assignee</TableHead>
            <TableHead>Due</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {taskData.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.title}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    task.status === "Completed"
                      ? "bg-emerald-100 text-emerald-600"
                      : task.status === "In Progress"
                        ? "bg-indigo-100 text-indigo-600"
                        : "bg-amber-100 text-amber-600"
                  }`}
                >
                  {task.status}
                </span>
              </TableCell>
              <TableCell>{task.assignee}</TableCell>
              <TableCell>{task.due}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
)

const TopProducts = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Package className="h-5 w-5 text-indigo-600" />
        Top Products
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Sales</TableHead>
            <TableHead>Revenue</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topProducts.map((product) => (
            <TableRow key={product.name}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.sales}</TableCell>
              <TableCell>${product.revenue.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
)

const CustomerSegments = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Users className="h-5 w-5 text-indigo-600" />
        Customer Segments
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Segment</TableHead>
            <TableHead>Count</TableHead>
            <TableHead>Revenue</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customerSegments.map((segment) => (
            <TableRow key={segment.name}>
              <TableCell className="font-medium">{segment.name}</TableCell>
              <TableCell>{segment.count}</TableCell>
              <TableCell>${segment.revenue.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
)

const EmployeePerformance = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <User className="h-5 w-5 text-indigo-600" />
        Employee Performance
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Sales</TableHead>
            <TableHead>Satisfaction</TableHead>
            <TableHead>Salary</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employeePerformance.map((employee) => (
            <TableRow key={employee.name}>
              <TableCell className="font-medium">{employee.name}</TableCell>
              <TableCell>{employee.sales}</TableCell>
              <TableCell>{employee.customerSatisfaction}%</TableCell>
              <TableCell>{employee.salary}$</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
)

export default function ManagerDashboard() {
  const [timePeriod, setTimePeriod] = useState("This Week")

  const metrics = [
    {
      title: "Team Revenue",
      value: "$67,230",
      icon: DollarSign,
      change: "12.5% from last month",
      changeType: "increase",
    },
    {
      title: "Active Customers",
      value: "1,230",
      icon: Users,
      change: "3.2% from last month",
      changeType: "decrease",
    },
    {
      title: "Team Productivity",
      value: "87%",
      icon: Activity,
      change: "5.1% from last week",
      changeType: "increase",
    },
    {
      title: "Open Tasks",
      value: "23",
      icon: ClipboardList,
      change: "2 less than yesterday",
      changeType: "decrease",
    },
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="space-y-6">
        <Header timePeriod={timePeriod} setTimePeriod={setTimePeriod} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <SalesOverview />
              <RevenueChart />
            </div>
            <TaskList />
          </TabsContent>
          <TabsContent value="sales" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <TopProducts />
              <CustomerSegments />
            </div>
          </TabsContent>
          <TabsContent value="team" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <TeamPerformance />
              <EmployeePerformance />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

