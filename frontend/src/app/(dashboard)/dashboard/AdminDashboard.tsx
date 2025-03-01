import { DollarSign, Users, ShoppingCart, Activity } from "lucide-react";
import { Header } from "./components/Header";
import { MetricCard } from "./components/MetricCard";
import { TaskList } from "./components/TaskList";
import { SalesChart } from "./components/SalesChartBar";
import { RevenueChart } from "./components/RevenueChart";
import { PieChartComponent } from "./components/PieChart";

// Data (can be fetched server-side with async/await in production)
const recentTasks = [
  { id: 1, title: "Process Q2 invoices", status: "Pending", priority: "High", due: "2 days" },
  { id: 2, title: "Update inventory records", status: "In Progress", priority: "Medium", due: "5 days" },
  { id: 3, title: "Review sales contracts", status: "Completed", priority: "Low", due: "1 week" },
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
];

const revenueBreakdown = [
  { name: "Products", value: 65 },
  { name: "Services", value: 35 },
];

const metrics = [
  { title: "Total Revenue", value: "$45,230", icon: DollarSign, change: "12.5% from last month", changeType: "increase" },
  { title: "Active Customers", value: "1,230", icon: Users, change: "3.2% from last month", changeType: "decrease" },
  { title: "Transactions", value: "2,456", icon: ShoppingCart, change: "8.1% from last month", changeType: "increase" },
  { title: "Active Staff", value: "45", icon: Activity, change: "2 new hires", changeType: "increase" },
];

export default function AdminDashboard() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="space-y-6">
        <Header initialTimePeriod="This Week" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <RevenueChart data={revenueData} />
          <PieChartComponent data={revenueBreakdown} title="Revenue Breakdown" />
        </div>
        <TaskList tasks={recentTasks} />
        <SalesChart data={salesData} />
      </div>
    </div>
  );
}