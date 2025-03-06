import { Suspense } from "react";
import { DollarSign, Users, Activity, ClipboardList } from "lucide-react";
import { Header } from "../components/Header";
import { MetricCard } from "../components/MetricCard";
import { TaskList } from "../components/TaskList";
import { SalesChart } from "../components/SalesChartBar";
import { RevenueChart } from "../components/RevenueChart";
import { PieChartComponent } from "../components/PieChart";
import { TopProducts } from "../components/TopProducts";
import { CustomerSegments } from "../components/CustomerSegments";
import { EmployeePerformance } from "../components/EmployeePerformance";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import MetricsSkeleton from "../../components/MetricsSkeleton";
import ChartSkeleton from "../../components/ChartSkeleton";
import TableSkeleton from "../../components/TableSkeleton";

// Simulated individual data fetching functions
async function fetchMetrics(timePeriod: string) {
  "use server";
  await new Promise((r) => setTimeout(r, 500)); // Simulate fast fetch
  return [
    { title: "Team Revenue", value: timePeriod === "This Week" ? "$67,230" : "$134,460", icon: DollarSign, change: "12.5% from last month", changeType: "increase" },
    { title: "Active Customers", value: timePeriod === "This Week" ? "1,230" : "2,460", icon: Users, change: "3.2% from last month", changeType: "decrease" },
    { title: "Team Productivity", value: timePeriod === "This Week" ? "87%" : "90%", icon: Activity, change: "5.1% from last week", changeType: "increase" },
    { title: "Open Tasks", value: timePeriod === "This Week" ? "23" : "46", icon: ClipboardList, change: "2 less than yesterday", changeType: "decrease" },
  ];
}

async function fetchTaskData(timePeriod: string) {
  "use server";
  await new Promise((r) => setTimeout(r, 1000)); // Simulate medium fetch
  return [
    { id: 1, title: "Review Q2 sales report", status: "In Progress", assignee: "John Doe", due: "2 days" },
    { id: 2, title: "Prepare team performance reviews", status: "Pending", assignee: "Jane Smith", due: "1 week" },
    { id: 3, title: "Update inventory forecasts", status: "Completed", assignee: "Mike Johnson", due: "Yesterday" },
  ].slice(0, timePeriod === "This Week" ? 1 : 3);
}

async function fetchSalesData(timePeriod: string) {
  "use server";
  await new Promise((r) => setTimeout(r, 1500)); // Simulate slower fetch
  return [
    { category: "Electronics", sales: timePeriod === "This Week" ? 4000 : 8000, returns: 240 },
    { category: "Apparel", sales: timePeriod === "This Week" ? 6500 : 13000, returns: 150 },
    { category: "Home Goods", sales: timePeriod === "This Week" ? 2800 : 5600, returns: 75 },
    { category: "Services", sales: timePeriod === "This Week" ? 5200 : 10400, returns: 45 },
  ];
}

async function fetchRevenueData(timePeriod: string) {
  "use server";
  await new Promise((r) => setTimeout(r, 1200)); // Simulate medium-slow fetch
  return [
    { month: "Jan", revenue: timePeriod === "This Week" ? 45000 : 90000, expenses: 32000 },
    { month: "Feb", revenue: timePeriod === "This Week" ? 52000 : 104000, expenses: 35000 },
    { month: "Mar", revenue: timePeriod === "This Week" ? 48000 : 96000, expenses: 33000 },
    { month: "Apr", revenue: timePeriod === "This Week" ? 61000 : 122000, expenses: 38000 },
    { month: "May", revenue: timePeriod === "This Week" ? 55000 : 110000, expenses: 36000 },
    { month: "Jun", revenue: timePeriod === "This Week" ? 67000 : 134000, expenses: 41000 },
  ].slice(0, timePeriod === "This Week" ? 3 : 6);
}

async function fetchTeamPerformance(timePeriod: string) {
  "use server";
  await new Promise((r) => setTimeout(r, 800)); // Simulate medium fetch
  return [
    { name: "Sales", value: timePeriod === "This Week" ? 85 : 90 },
    { name: "Customer Service", value: timePeriod === "This Week" ? 92 : 95 },
    { name: "Operations", value: timePeriod === "This Week" ? 78 : 85 },
  ];
}

async function fetchTopProducts(timePeriod: string) {
  "use server";
  await new Promise((r) => setTimeout(r, 1400)); // Simulate slower fetch
  return [
    { name: "Product A", sales: timePeriod === "This Week" ? 1200 : 2400, revenue: timePeriod === "This Week" ? 60000 : 120000 },
    { name: "Product B", sales: timePeriod === "This Week" ? 800 : 1600, revenue: timePeriod === "This Week" ? 48000 : 96000 },
    { name: "Product C", sales: timePeriod === "This Week" ? 600 : 1200, revenue: timePeriod === "This Week" ? 36000 : 72000 },
  ];
}

async function fetchCustomerSegments(timePeriod: string) {
  "use server";
  await new Promise((r) => setTimeout(r, 1300)); // Simulate medium-slow fetch
  return [
    { name: "High Value", count: timePeriod === "This Week" ? 50 : 100, revenue: timePeriod === "This Week" ? 250000 : 500000 },
    { name: "Regular", count: timePeriod === "This Week" ? 200 : 400, revenue: timePeriod === "This Week" ? 400000 : 800000 },
    { name: "Occasional", count: timePeriod === "This Week" ? 500 : 1000, revenue: timePeriod === "This Week" ? 150000 : 300000 },
  ];
}

async function fetchEmployeePerformance(timePeriod: string) {
  "use server";
  await new Promise((r) => setTimeout(r, 1100)); // Simulate medium fetch
  return [
    { name: "Alice", sales: timePeriod === "This Week" ? 120 : 240, customerSatisfaction: 95, salary: 1000 },
    { name: "Bob", sales: timePeriod === "This Week" ? 90 : 180, customerSatisfaction: 88, salary: 2500 },
    { name: "Charlie", sales: timePeriod === "This Week" ? 150 : 300, customerSatisfaction: 92, salary: 2100 },
    { name: "Ilyass", sales: timePeriod === "This Week" ? 150 : 300, customerSatisfaction: 92, salary: 5000 },
  ];
}

// Server Action to update filter
async function updateFilter(formData: FormData) {
  "use server";
  const timePeriod = formData.get("timePeriod") as string;
  revalidatePath("/dashboard");
  redirect(`/dashboard?timePeriod=${encodeURIComponent(timePeriod)}`);
}

export default async function ManagerDashboard({ searchParams }: { searchParams?: { timePeriod?: string } }) {
  const timePeriod = (await searchParams)?.timePeriod || "This Week";

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="space-y-6">
        <Header initialTimePeriod={timePeriod} updateFilter={updateFilter} />

        {/* Metrics Section */}
        <Suspense fallback={<MetricsSkeleton/>}>
          <MetricsSection timePeriod={timePeriod} />
        </Suspense>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Suspense fallback={<ChartSkeleton />}>
                <SalesSection timePeriod={timePeriod} />
              </Suspense>
              <Suspense fallback={<ChartSkeleton />}>
                <RevenueSection timePeriod={timePeriod} />
              </Suspense>
            </div>
            <Suspense fallback={<TableSkeleton />}>
              <TasksSection timePeriod={timePeriod} />
            </Suspense>
          </TabsContent>

          <TabsContent value="sales" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Suspense fallback={<TableSkeleton />}>
                <TopProductsSection timePeriod={timePeriod} />
              </Suspense>
              <Suspense fallback={<TableSkeleton />}>
                <CustomerSegmentsSection timePeriod={timePeriod} />
              </Suspense>
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Suspense fallback={<ChartSkeleton />}>
                <TeamPerformanceSection timePeriod={timePeriod} />
              </Suspense>
              <Suspense fallback={<ChartSkeleton />}>
                <EmployeePerformanceSection timePeriod={timePeriod} />
              </Suspense>
            </div>
          </TabsContent>
        </Tabs>
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
  const taskData = await fetchTaskData(timePeriod);
  return <TaskList tasks={taskData} title="Team Tasks" />;
}

async function SalesSection({ timePeriod }: { timePeriod: string }) {
  const salesData = await fetchSalesData(timePeriod);
  return <SalesChart data={salesData} />;
}

async function RevenueSection({ timePeriod }: { timePeriod: string }) {
  const revenueData = await fetchRevenueData(timePeriod);
  return <RevenueChart data={revenueData} />;
}

async function TeamPerformanceSection({ timePeriod }: { timePeriod: string }) {
  const teamPerformance = await fetchTeamPerformance(timePeriod);
  return <PieChartComponent data={teamPerformance} title="Team Performance" />;
}

async function TopProductsSection({ timePeriod }: { timePeriod: string }) {
  const topProducts = await fetchTopProducts(timePeriod);
  return <TopProducts products={topProducts} />;
}

async function CustomerSegmentsSection({ timePeriod }: { timePeriod: string }) {
  const customerSegments = await fetchCustomerSegments(timePeriod);
  return <CustomerSegments segments={customerSegments} />;
}

async function EmployeePerformanceSection({ timePeriod }: { timePeriod: string }) {
  const employeePerformance = await fetchEmployeePerformance(timePeriod);
  return <EmployeePerformance employees={employeePerformance} />;
}