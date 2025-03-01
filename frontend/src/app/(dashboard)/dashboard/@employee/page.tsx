import { DollarSign, Users, ClipboardList, Clock } from "lucide-react"
import { Header } from "../components/Header"
import { MetricCard } from "../components/MetricCard"
import { SalesChart } from "../components/SalesChartLine"
import { TaskList } from "../components/TaskList"
import { ClientInteractions } from "../components/ClientInteractions"
import { PerformanceMetrics } from "../components/PerformanceMetrics"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data (unchanged, with implicit types)
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

export default function EmployeeDashboard() {

  const metrics = [
    { title: "Your Sales", value: "$12,345", icon: DollarSign, subValue: "23% of team total" },
    { title: "Tasks Completed", value: "15", icon: ClipboardList, subValue: "5 pending" },
    { title: "Client Interactions", value: "28", icon: Users, subValue: "Last 7 days" },
    { title: "Time Tracked", value: "32h 15m", icon: Clock, subValue: "This week" },
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="space-y-6">
        <Header initialTimePeriod="This Week" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} change="" changeType="" />
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
              <SalesChart data={salesData} />
              <PerformanceMetrics data={performanceMetrics} />
            </div>
          </TabsContent>
          <TabsContent value="tasks" className="space-y-4">
            <TaskList tasks={taskData} />
          </TabsContent>
          <TabsContent value="clients" className="space-y-4">
            <ClientInteractions interactions={clientInteractions} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}