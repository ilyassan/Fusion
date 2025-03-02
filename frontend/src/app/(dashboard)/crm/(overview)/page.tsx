import { Suspense } from "react";
import { DashboardHeader } from "./components/DashboardHeader";
import { SalesPipeline, PipelineData } from "./components/SalesPipeline";
import { ConversionMetrics, ConversionMetricsData } from "./components/ConversionMetrics";
import { RecentActivities, ActivityData } from "./components/RecentActivities";
import { UpcomingTasks, TaskData } from "./components/UpcomingTasks";
import { TopPerformers, PerformerData } from "./components/TopPerformers";
import ChartSkeleton from "@/app/(dashboard)/components/ChartSkeleton";


// Simulated data fetching functions
async function fetchPipelineData(): Promise<PipelineData[]> {
  "use server";
  await new Promise((r) => setTimeout(r, 1000)); // Simulate fetch
  return [
    { stage: "Lead", value: 245, amount: 125000 },
    { stage: "Proposal", value: 180, amount: 95000 },
    { stage: "Negotiation", value: 85, amount: 68000 },
    { stage: "Closed", value: 35, amount: 38000 },
  ];
}

async function fetchActivities(): Promise<ActivityData[]> {
  "use server";
  await new Promise((r) => setTimeout(r, 800));
  return [
    { type: "call", contact: "John Smith", company: "Tech Corp", time: "2h ago", status: "completed" },
    { type: "email", contact: "Sarah Johnson", company: "Digital Solutions", time: "3h ago", status: "pending" },
    { type: "meeting", contact: "Mike Brown", company: "Innovation Labs", time: "5h ago", status: "scheduled" },
    { type: "task", contact: "Lisa Anderson", company: "Global Services", time: "1d ago", status: "completed" },
  ];
}

async function fetchTasks(): Promise<TaskData[]> {
  "use server";
  await new Promise((r) => setTimeout(r, 600));
  return [
    { task: "Follow-up call", contact: "David Wilson", time: "Today, 2:00 PM" },
    { task: "Proposal review", contact: "Emma Davis", time: "Today, 4:30 PM" },
    { task: "Client meeting", contact: "Robert Taylor", time: "Tomorrow, 10:00 AM" },
    { task: "Contract signing", contact: "Jennifer White", time: "Tomorrow, 3:00 PM" },
  ];
}

async function fetchPerformers(): Promise<PerformerData[]> {
  "use server";
  await new Promise((r) => setTimeout(r, 700));
  return [
    { name: "OCP", deals: 28, revenue: 156000 },
    { name: "Maroc Telecom", deals: 24, revenue: 142000 },
    { name: "Government", deals: 22, revenue: 128000 },
    { name: "Ansamble", deals: 20, revenue: 115000 },
  ];
}

async function fetchConversionMetrics(): Promise<ConversionMetricsData> {
  "use server";
  await new Promise((r) => setTimeout(r, 500));
  return {
    leadToOpportunity: 35,
    opportunityToProposal: 65,
    proposalToClose: 45,
    averageTimeToClose: 18,
  };
}

// Main dashboard component
export default async function CRMDashboard() {
  return (
    <div className="space-y-8 bg-gray-50 min-h-screen">
      <DashboardHeader title="Overview" subtitle="Comprehensive snapshot of your CRM performance" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Suspense fallback={<ChartSkeleton className="lg:col-span-2"/>}>
          <PipelineSection />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <ConversionMetricsSection />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <ActivitiesSection />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <TasksSection />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <PerformersSection />
        </Suspense>
      </div>
    </div>
  );
}

// Sub-components with their own data fetching
async function PipelineSection() {
  const data = await fetchPipelineData();
  return <SalesPipeline data={data} />;
}

async function ConversionMetricsSection() {
  const data = await fetchConversionMetrics();
  return <ConversionMetrics data={data} />;
}

async function ActivitiesSection() {
  const activities = await fetchActivities();
  return <RecentActivities activities={activities} />;
}

async function TasksSection() {
  const tasks = await fetchTasks();
  return <UpcomingTasks tasks={tasks} />;
}

async function PerformersSection() {
  const performers = await fetchPerformers();
  return <TopPerformers performers={performers} />;
}