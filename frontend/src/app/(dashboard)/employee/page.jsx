"use client"

import { useState } from "react"
import {
  Calendar,
  Bell,
  MessageSquare,
  ChevronDown,
  DollarSign,
  Users,
  ClipboardList,
  ArrowRight,
  Clock,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts"

// Mock data (replace with real data fetching in production)
const salesData = [
  { date: "2023-05-01", sales: 1200 },
  { date: "2023-05-02", sales: 1800 },
  { date: "2023-05-03", sales: 1400 },
  { date: "2023-05-04", sales: 2200 },
  { date: "2023-05-05", sales: 1600 },
  { date: "2023-05-06", sales: 2400 },
  { date: "2023-05-07", sales: 2000 },
]

const taskData = [
  { id: 1, title: "Follow up with client X", status: "In Progress", priority: "High", due: "Today" },
  { id: 2, title: "Prepare sales presentation", status: "Pending", priority: "Medium", due: "Tomorrow" },
  { id: 3, title: "Update client database", status: "Completed", priority: "Low", due: "Yesterday" },
  { id: 4, title: "Schedule team meeting", status: "Pending", priority: "Medium", due: "Next Week" },
]

const clientInteractions = [
  { id: 1, client: "Acme Corp", type: "Email", date: "2023-05-07", summary: "Discussed new product features" },
  { id: 2, client: "Beta Inc", type: "Call", date: "2023-05-06", summary: "Resolved billing inquiry" },
  { id: 3, client: "Gamma LLC", type: "Meeting", date: "2023-05-05", summary: "Presented product demo" },
]

const performanceMetrics = [
  { metric: "Sales Target", current: 85, target: 100 },
  { metric: "Client Satisfaction", current: 92, target: 95 },
  { metric: "Task Completion Rate", current: 88, target: 90 },
]

// Components
const Header = ({ timePeriod, setTimePeriod }) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg border border-gray-200">
    <div className="space-y-1">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h1>
      <p className="text-sm text-gray-600">Welcome back! Here's your overview.</p>
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
        <MessageSquare className="h-4 w-4 text-gray-600" />
      </Button>
    </div>
  </div>
)

const MetricCard = ({ title, value, icon: Icon, subValue }) => (
  <Card className="bg-white border border-gray-200 hover:shadow-md transition-all duration-200">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
      <div className="p-1.5 bg-indigo-50 rounded-lg">
        <Icon className="h-4 w-4 text-indigo-600" />
      </div>
    </CardHeader>
    <CardContent className="pt-0">
      <div className="text-xl sm:text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-xs text-gray-500 mt-0.5">{subValue}</div>
    </CardContent>
  </Card>
)

const SalesChart = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-indigo-600" />
        Your Sales Performance
      </CardTitle>
    </CardHeader>
    <CardContent className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#4f46e5" strokeWidth={2} />
        </LineChart>
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
          Your Tasks
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
            <TableHead>Priority</TableHead>
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
              <TableCell>{task.priority}</TableCell>
              <TableCell>{task.due}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
)

const ClientInteractions = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Users className="h-5 w-5 text-indigo-600" />
        Recent Client Interactions
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Summary</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clientInteractions.map((interaction) => (
            <TableRow key={interaction.id}>
              <TableCell className="font-medium">{interaction.client}</TableCell>
              <TableCell>{interaction.type}</TableCell>
              <TableCell>{interaction.date}</TableCell>
              <TableCell>{interaction.summary}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
)

const PerformanceMetrics = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-indigo-600" />
        Your Performance Metrics
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {performanceMetrics.map((metric) => (
          <div key={metric.metric} className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">{metric.metric}</span>
              <span className="text-sm text-gray-500">{metric.current}%</span>
            </div>
            <Progress value={(metric.current / metric.target) * 100} className="h-2 [&>*]:bg-blue-600" />
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)

export default function EmployeeDashboard() {
  const [timePeriod, setTimePeriod] = useState("This Week")

  const metrics = [
    {
      title: "Your Sales",
      value: "$12,345",
      icon: DollarSign,
      subValue: "23% of team total",
    },
    {
      title: "Tasks Completed",
      value: "15",
      icon: ClipboardList,
      subValue: "5 pending",
    },
    {
      title: "Client Interactions",
      value: "28",
      icon: Users,
      subValue: "Last 7 days",
    },
    {
      title: "Time Tracked",
      value: "32h 15m",
      icon: Clock,
      subValue: "This week",
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
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <SalesChart />
              <PerformanceMetrics />
            </div>
          </TabsContent>
          <TabsContent value="tasks" className="space-y-4">
            <TaskList />
          </TabsContent>
          <TabsContent value="clients" className="space-y-4">
            <ClientInteractions />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
