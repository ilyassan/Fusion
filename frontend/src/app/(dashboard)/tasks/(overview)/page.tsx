import { Suspense } from "react";
import { TasksHeader } from "./components/TasksHeader";
import { MetricCard } from "./components/MetricCard";
import { TaskStatusBarChart, TaskStatusBarChartSkeleton } from "./components/TaskStatusBarChart";
import { OverdueTasksList, OverdueTasksListSkeleton } from "./components/OverdueTasksList";
import { TaskPriorityPieChart, TaskPriorityPieChartSkeleton } from "./components/TaskPriorityPieChart";
import { RecentActivities, RecentActivitiesSkeleton } from "./components/RecentActivities";
import {
  fetchTaskMetrics,
  fetchTaskStatus,
  fetchTaskPriority,
  fetchOverdueTasks,
  fetchRecentActivities,
} from "./data/tasksData";
import { ListTodo, Clock, Loader2, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export default async function TasksOverviewPage() {
  return (
    <div className="space-y-6">
      <TasksHeader />

      <Suspense fallback={<MetricsSkeleton />}>
        <MetricsSection />
      </Suspense>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Suspense fallback={<TaskStatusBarChartSkeleton />}>
          <TaskStatusSection />
        </Suspense>
        <Suspense fallback={<OverdueTasksListSkeleton />}>
          <OverdueTasksSection />
        </Suspense>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Suspense fallback={<TaskPriorityPieChartSkeleton />}>
          <TaskPrioritySection />
        </Suspense>
        <Suspense fallback={<RecentActivitiesSkeleton />}>
          <RecentActivitiesSection />
        </Suspense>
      </div>
    </div>
  );
}

async function MetricsSection() {
  const metrics = await fetchTaskMetrics();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        title="Total Tasks"
        value={metrics.totalTasks}
        Icon={ListTodo}
        iconColor="text-blue-500"
      />
      <MetricCard
        title="Pending Tasks"
        value={metrics.pendingTasks}
        Icon={Clock}
        iconColor="text-yellow-500"
      />
      <MetricCard
        title="In Progress Tasks"
        value={metrics.inProgressTasks}
        Icon={Loader2}
        iconColor="text-orange-500"
      />
      <MetricCard
        title="Completed Tasks"
        value={metrics.completedTasks}
        Icon={CheckCircle2}
        iconColor="text-green-500"
      />
    </div>
  );
}

async function TaskStatusSection() {
  const data = await fetchTaskStatus();
  return <TaskStatusBarChart data={data} />;
}

async function OverdueTasksSection() {
  const data = await fetchOverdueTasks();
  return <OverdueTasksList data={data} />;
}

async function TaskPrioritySection() {
  const data = await fetchTaskPriority();
  return <TaskPriorityPieChart data={data} />;
}

async function RecentActivitiesSection() {
  const data = await fetchRecentActivities();
  return <RecentActivities data={data} />;
}

function MetricsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <Card key={i} className="h-28 bg-white animate-pulse">
          <div className="p-4 space-y-3">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-6 w-16 bg-gray-200 rounded"></div>
          </div>
        </Card>
      ))}
    </div>
  );
}