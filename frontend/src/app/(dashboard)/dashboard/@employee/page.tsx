import { DollarSign, Users, ClipboardList, Clock } from "lucide-react";
import { Header } from "../components/Header";
import { MetricCard } from "../components/MetricCard";
import { SalesChart } from "../components/SalesChartLine";
import { TaskList } from "../components/TaskList";
import { ClientInteractions } from "../components/ClientInteractions";
import { PerformanceMetrics } from "../components/PerformanceMetrics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Simulated data fetching function with filtering based on timePeriod
async function fetchDashboardData(timePeriod: string) {
  "use server"; // Mark as server-only

  // Mock data with filtering (adjust as needed for your real data source)
  const salesData = [
    { date: "2023-05-01", sales: timePeriod === "This Week" ? 1200 : 2400 },
    { date: "2023-05-02", sales: timePeriod === "This Week" ? 1800 : 3600 },
    { date: "2023-05-03", sales: timePeriod === "This Week" ? 1400 : 2800 },
    { date: "2023-05-04", sales: timePeriod === "This Week" ? 2200 : 4400 },
    { date: "2023-05-05", sales: timePeriod === "This Week" ? 1600 : 3200 },
    { date: "2023-05-06", sales: timePeriod === "This Week" ? 2400 : 4800 },
    { date: "2023-05-07", sales: timePeriod === "This Week" ? 2000 : 4000 },
  ].slice(0, timePeriod === "This Week" ? 7 : 14); // Example: shorter range for "This Week"

  const taskData = [
    { id: 1, title: "Follow up with client X", status: "In Progress", priority: "High", due: "Today" },
    { id: 2, title: "Prepare sales presentation", status: "Pending", priority: "Medium", due: "Tomorrow" },
    { id: 3, title: "Update client database", status: "Completed", priority: "Low", due: "Yesterday" },
    { id: 4, title: "Schedule team meeting", status: "Pending", priority: "Medium", due: "Next Week" },
  ].slice(0, timePeriod === "This Week" ? 2 : 4);

  const clientInteractions = [
    { id: 1, client: "Acme Corp", type: "Email", date: "2023-05-07", summary: "Discussed new product features" },
    { id: 2, client: "Beta Inc", type: "Call", date: "2023-05-06", summary: "Resolved billing inquiry" },
    { id: 3, client: "Gamma LLC", type: "Meeting", date: "2023-05-05", summary: "Presented product demo" },
  ].slice(0, timePeriod === "This Week" ? 1 : 3);

  const performanceMetrics = [
    { metric: "Sales Target", current: timePeriod === "This Week" ? 85 : 90, target: 100 },
    { metric: "Client Satisfaction", current: timePeriod === "This Week" ? 92 : 94, target: 95 },
    { metric: "Task Completion Rate", current: timePeriod === "This Week" ? 88 : 91, target: 90 },
  ];

  const metrics = [
    { title: "Your Sales", value: timePeriod === "This Week" ? "$12,345" : "$24,690", icon: DollarSign, subValue: "23% of team total" },
    { title: "Tasks Completed", value: timePeriod === "This Week" ? "15" : "30", icon: ClipboardList, subValue: "5 pending" },
    { title: "Client Interactions", value: timePeriod === "This Week" ? "28" : "56", icon: Users, subValue: "Last 7 days" },
    { title: "Time Tracked", value: timePeriod === "This Week" ? "32h 15m" : "64h 30m", icon: Clock, subValue: timePeriod },
  ];

  return { salesData, taskData, clientInteractions, performanceMetrics, metrics };
}

// Server Action to update filter
async function updateFilter(formData: FormData) {
  "use server";
  const timePeriod = formData.get("timePeriod") as string;
  revalidatePath("/dashboard");
  redirect(`/dashboard?timePeriod=${encodeURIComponent(timePeriod)}`);
}

export default async function EmployeeDashboard({ searchParams }: { searchParams?: { timePeriod?: string } }) {
  const timePeriod = searchParams?.timePeriod || "This Week"; // Default to "This Week"
  const data = await fetchDashboardData(timePeriod);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="space-y-6">
        <Header initialTimePeriod={timePeriod} updateFilter={updateFilter} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.metrics.map((metric, index) => (
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
              <SalesChart data={data.salesData} />
              <PerformanceMetrics data={data.performanceMetrics} />
            </div>
          </TabsContent>
          <TabsContent value="tasks" className="space-y-4">
            <TaskList tasks={data.taskData} />
          </TabsContent>
          <TabsContent value="clients" className="space-y-4">
            <ClientInteractions interactions={data.clientInteractions} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}