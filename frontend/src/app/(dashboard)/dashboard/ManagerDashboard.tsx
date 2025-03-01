import { DollarSign, Users, Activity, ClipboardList } from "lucide-react";
import { Header } from "./components/Header";
import { MetricCard } from "./components/MetricCard";
import { TaskList } from "./components/TaskList";
import { SalesChart } from "./components/SalesChartBar";
import { RevenueChart } from "./components/RevenueChart";
import { PieChartComponent } from "./components/PieChart";
import { TopProducts } from "./components/TopProducts";
import { CustomerSegments } from "./components/CustomerSegments";
import { EmployeePerformance } from "./components/EmployeePerformance";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const taskData = [
  { id: 1, title: "Review Q2 sales report", status: "In Progress", assignee: "John Doe", due: "2 days" },
  { id: 2, title: "Prepare team performance reviews", status: "Pending", assignee: "Jane Smith", due: "1 week" },
  { id: 3, title: "Update inventory forecasts", status: "Completed", assignee: "Mike Johnson", due: "Yesterday" },
];

const salesData = [
  { category: "Electronics", sales: 4000, returns: 240 },
  { category: "Apparel", sales: 6500, returns: 150 },
  { category: "Home Goods", sales: 2800, returns: 75 },
  { category: "Services", sales: 5200, returns: 45 },
];

const revenueData = [
  { month: "Jan", revenue: 45000, expenses: 32000 },
  { month: "Feb", revenue: 52000, expenses: 35000 },
  { month: "Mar", revenue: 48000, expenses: 33000 },
  { month: "Apr", revenue: 61000, expenses: 38000 },
  { month: "May", revenue: 55000, expenses: 36000 },
  { month: "Jun", revenue: 67000, expenses: 41000 },
];

const teamPerformance = [
  { name: "Sales", value: 85 },
  { name: "Customer Service", value: 92 },
  { name: "Operations", value: 78 },
];

const topProducts = [
  { name: "Product A", sales: 1200, revenue: 60000 },
  { name: "Product B", sales: 800, revenue: 48000 },
  { name: "Product C", sales: 600, revenue: 36000 },
];

const customerSegments = [
  { name: "High Value", count: 50, revenue: 250000 },
  { name: "Regular", count: 200, revenue: 400000 },
  { name: "Occasional", count: 500, revenue: 150000 },
];

const employeePerformance = [
  { name: "Alice", sales: 120, customerSatisfaction: 95, salary: 1000 },
  { name: "Bob", sales: 90, customerSatisfaction: 88, salary: 2500 },
  { name: "Charlie", sales: 150, customerSatisfaction: 92, salary: 2100 },
  { name: "Ilyass", sales: 150, customerSatisfaction: 92, salary: 5000 },
];

const metrics = [
  { title: "Team Revenue", value: "$67,230", icon: DollarSign, change: "12.5% from last month", changeType: "increase" },
  { title: "Active Customers", value: "1,230", icon: Users, change: "3.2% from last month", changeType: "decrease" },
  { title: "Team Productivity", value: "87%", icon: Activity, change: "5.1% from last week", changeType: "increase" },
  { title: "Open Tasks", value: "23", icon: ClipboardList, change: "2 less than yesterday", changeType: "decrease" },
];

export default function ManagerDashboard() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="space-y-6">
        <Header initialTimePeriod="This Week" />
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
              <SalesChart data={salesData} />
              <RevenueChart data={revenueData} />
            </div>
            <TaskList tasks={taskData} title="Team Tasks" />
          </TabsContent>
          <TabsContent value="sales" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <TopProducts products={topProducts} />
              <CustomerSegments segments={customerSegments} />
            </div>
          </TabsContent>
          <TabsContent value="team" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <PieChartComponent data={teamPerformance} title="Team Performance" />
              <EmployeePerformance employees={employeePerformance} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}