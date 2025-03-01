import { Suspense } from "react";
import { DollarSign, Users, ShoppingBag, Activity } from "lucide-react";
import { Header } from "../components/Header";
import { MetricCard } from "../components/MetricCard";
import { TaskList } from "../components/TaskList";
import { SalesChart } from "../components/SalesChartBar";
import { RevenueChart } from "../components/RevenueChart";
import { PieChartComponent } from "../components/PieChart";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import MetricsSkeleton from "../components/MetricsSkeleton";
import ChartSkeleton from "../components/ChartSkeleton";
import TableSkeleton from "../components/TableSkeleton";

// Simulated individual data fetching functions
async function fetchMetrics(timePeriod: string) {
  "use server";
  await new Promise((r) => setTimeout(r, 500)); // Simulate fast fetch
  return [
    { title: "Total Revenue", value: timePeriod === "This Week" ? "$45,230" : "$90,000", icon: DollarSign, change: "12.5% from last month", changeType: "increase" },
    { title: "Active Customers", value: "1,230", icon: Users, change: "3.2% from last month", changeType: "decrease" },
    { title: "Transactions", value: "2,456", icon: ShoppingBag, change: "8.1% from last month", changeType: "increase" },
    { title: "Active Staff", value: "45", icon: Activity, change: "2 new hires", changeType: "increase" },
  ];
}

async function fetchRecentTasks(timePeriod: string) {
  "use server";
  await new Promise((r) => setTimeout(r, 1000)); // Simulate medium fetch
  return [
    { id: 1, title: "Process Q2 invoices", status: "Pending", priority: "High", due: "2 days" },
    { id: 2, title: "Update inventory records", status: "In Progress", priority: "Medium", due: "5 days" },
    { id: 3, title: "Review sales contracts", status: "Completed", priority: "Low", due: "1 week" },
  ].slice(0, timePeriod === "This Week" ? 1 : 3);
}

async function fetchSalesData(timePeriod: string) {
  "use server";
  await new Promise((r) => setTimeout(r, 1400)); // Simulate slower fetch
  return [
    { category: "Electronics", sales: timePeriod === "This Week" ? 4000 : 8000, returns: 240 },
    { category: "Apparel", sales: 6500, returns: 150 },
    { category: "Home Goods", sales: 2800, returns: 75 },
    { category: "Services", sales: 5200, returns: 45 },
  ];
}

async function fetchRevenueData(timePeriod: string) {
  "use server";
  await new Promise((r) => setTimeout(r, 1200)); // Simulate medium-slow fetch
  return [
    { month: "Jan", revenue: timePeriod === "This Week" ? 45000 : 90000, expenses: 32000 },
    { month: "Feb", revenue: 52000, expenses: 35000 },
    { month: "Mar", revenue: 48000, expenses: 33000 },
    { month: "Apr", revenue: 61000, expenses: 38000 },
  ].slice(0, timePeriod === "This Week" ? 2 : 4);
}

async function fetchRevenueBreakdown(timePeriod: string) {
  "use server";
  await new Promise((r) => setTimeout(r, 800)); // Simulate medium fetch
  return [
    { name: "Products", value: timePeriod === "This Week" ? 65 : 70 },
    { name: "Services", value: timePeriod === "This Week" ? 35 : 30 },
  ];
}

// Server Action to update filter
async function updateFilter(formData: FormData) {
  "use server";
  const timePeriod = formData.get("timePeriod") as string;
  revalidatePath("/dashboard");
  redirect(`/dashboard?timePeriod=${encodeURIComponent(timePeriod)}`);
}


export default async function AdminDashboard({ searchParams }: { searchParams?: { timePeriod?: string } }) {
  const timePeriod = searchParams?.timePeriod || "This Week";

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="space-y-6">
        <Header initialTimePeriod={timePeriod} updateFilter={updateFilter} />

        {/* Metrics Section */}
        <Suspense fallback={<MetricsSkeleton/>}>
          <MetricsSection timePeriod={timePeriod} />
        </Suspense>

        {/* Revenue Chart and Pie Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Suspense fallback={<ChartSkeleton />}>
            <RevenueSection timePeriod={timePeriod} />
          </Suspense>
          <Suspense fallback={<ChartSkeleton />}>
            <RevenueBreakdownSection timePeriod={timePeriod} />
          </Suspense>
        </div>

        {/* Tasks Section */}
        <Suspense fallback={<TableSkeleton />}>
          <TasksSection timePeriod={timePeriod} />
        </Suspense>

        {/* Sales Chart Section */}
        <Suspense fallback={<ChartSkeleton />}>
          <SalesSection timePeriod={timePeriod} />
        </Suspense>
      </div>
    </div>
  );
}

// Sub-components fetching their own data
async function MetricsSection({ timePeriod }: { timePeriod: string }) {
  const metrics = await fetchMetrics(timePeriod);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
}

async function TasksSection({ timePeriod }: { timePeriod: string }) {
  const recentTasks = await fetchRecentTasks(timePeriod);
  return <TaskList tasks={recentTasks} />;
}

async function SalesSection({ timePeriod }: { timePeriod: string }) {
  const salesData = await fetchSalesData(timePeriod);
  return <SalesChart data={salesData} />;
}

async function RevenueSection({ timePeriod }: { timePeriod: string }) {
  const revenueData = await fetchRevenueData(timePeriod);
  return <RevenueChart data={revenueData} />;
}

async function RevenueBreakdownSection({ timePeriod }: { timePeriod: string }) {
  const revenueBreakdown = await fetchRevenueBreakdown(timePeriod);
  return <PieChartComponent data={revenueBreakdown} title="Revenue Breakdown" />;
}