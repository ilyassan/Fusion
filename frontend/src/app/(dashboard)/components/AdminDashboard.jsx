"use client"

import { useState } from "react"
import {
  Calendar,
  Bell,
  Settings,
  ChevronDown,
  DollarSign,
  Users,
  ShoppingCart,
  Activity,
  ArrowUp,
  ArrowDown,
  ClipboardList,
  Package,
  AlertCircle,
  ArrowRight,
  Clock,
  User,
  TrendingUp,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  LineChart,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Line,
  CartesianGrid,
  Legend,
  Pie,
  Cell,
} from "recharts"

// Data
const recentTasks = [
  { id: 1, title: "Process Q2 invoices", status: "Pending", priority: "High", due: "2 days" },
  { id: 2, title: "Update inventory records", status: "In Progress", priority: "Medium", due: "5 days" },
  { id: 3, title: "Review sales contracts", status: "Completed", priority: "Low", due: "1 week" },
]

const inventoryAlerts = [
  { product: "Widget A", stock: 12, minStock: 50 },
  { product: "Gadget B", stock: 8, minStock: 30 },
  { product: "Tool C", stock: 23, minStock: 40 },
]

const salesData = [
  { category: "Electronics", sales: 4000, returns: 240 },
  { category: "Apparel", sales: 6500, returns: 150 },
  { category: "Home Goods", sales: 2800, returns: 75 },
  { category: "Services", sales: 5200, returns: 45 },
]

const customerActivity = [
  { id: 1, name: "John Smith", lastPurchase: "2h ago", totalSpent: 450 },
  { id: 2, name: "Sarah Johnson", lastPurchase: "5h ago", totalSpent: 1200 },
  { id: 3, name: "Mike Chen", lastPurchase: "1d ago", totalSpent: 750 },
]

const revenueData = [
  { month: "Jan", revenue: 45000, expenses: 32000 },
  { month: "Feb", revenue: 52000, expenses: 35000 },
  { month: "Mar", revenue: 48000, expenses: 33000 },
  { month: "Apr", revenue: 61000, expenses: 38000 },
]

const revenueBreakdown = [
  { name: "Products", value: 65 },
  { name: "Services", value: 35 },
]

// Components
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

const Header = ({ timePeriod, setTimePeriod }) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg border border-gray-200">
    <div className="space-y-1">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Overview</h1>
      <p className="text-sm text-gray-600">Welcome back! Here's your business overview.</p>
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

const DashboardOperations = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
    <Card className="lg:col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-indigo-600" />
            Recent Tasks
          </CardTitle>
          <Button variant="ghost" className="text-sm text-indigo-600 hover:text-indigo-700">
            View All <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Due</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentTasks.map((task) => (
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
                <TableCell>{task.priority}</TableCell>
                <TableCell>{task.due}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5 text-indigo-600" />
          Inventory Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {inventoryAlerts.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-rose-500" />
                <span className="font-medium">{item.product}</span>
              </div>
              <span className="text-sm text-gray-500">
                {item.stock}/{item.minStock}
              </span>
            </div>
            <Progress value={(item.stock / item.minStock) * 100} className="h-2 bg-gray-200 [&>*]:bg-red-600" />
          </div>
        ))}
      </CardContent>
    </Card>

    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-indigo-600" />
          Operational Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-gray-900">98.2%</div>
            <div className="text-sm text-gray-500 flex items-center gap-1 justify-center">
              <Clock className="h-4 w-4" /> Uptime
            </div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-gray-900">2.4h</div>
            <div className="text-sm text-gray-500 flex items-center gap-1 justify-center">
              <User className="h-4 w-4" /> Avg. Response
            </div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-gray-900">84%</div>
            <div className="text-sm text-gray-500 flex items-center gap-1 justify-center">
              <ClipboardList className="h-4 w-4" /> Task Completion
            </div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-gray-900">23</div>
            <div className="text-sm text-gray-500 flex items-center gap-1 justify-center">
              <AlertCircle className="h-4 w-4" /> Open Issues
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
)

const DashboardSales = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-indigo-600" />
            Sales Breakdown
          </CardTitle>
          <Button variant="ghost" className="text-sm text-indigo-600 hover:text-indigo-700">
            View Report <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={salesData}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#4f46e5" radius={[4, 4, 0, 0]} name="Total Sales" />
            <Bar dataKey="returns" fill="#ef4444" radius={[4, 4, 0, 0]} name="Returns" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-indigo-600" />
          Recent Customers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {customerActivity.map((customer) => (
            <div key={customer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                  {customer.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{customer.name}</p>
                  <p className="text-sm text-gray-500">Last purchase: {customer.lastPurchase}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">${customer.totalSpent}</p>
                <p className="text-sm text-gray-500">Total spent</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
)

const Charts = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-indigo-600" />
          Revenue Trend
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={2} name="Revenue" />
            <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} name="Expenses" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChart className="h-5 w-5 text-indigo-600" />
          Revenue Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={revenueBreakdown}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              label
            >
              {revenueBreakdown.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={["#4f46e5", "#10b981"][index % 2]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  </div>
)

export default function AdminDashboard() {
  const [timePeriod, setTimePeriod] = useState("This Week")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const metrics = [
    {
      title: "Total Revenue",
      value: "$45,230",
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
      title: "Transactions",
      value: "2,456",
      icon: ShoppingCart,
      change: "8.1% from last month",
      changeType: "increase",
    },
    {
      title: "Active Staff",
      value: "45",
      icon: Activity,
      change: "2 new hires",
      changeType: "increase",
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

        <Charts />

        <DashboardOperations />

        <DashboardSales />
      </div>
    </div>
  )
}

