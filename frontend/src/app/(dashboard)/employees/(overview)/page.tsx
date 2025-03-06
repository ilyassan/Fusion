import { Suspense } from "react";
import { EmployeeHeader } from "./components/EmployeeHeader";
import { MetricCard } from "./components/MetricCard";
import { EmployeeGrowthChart } from "./components/EmployeeGrowthChart";
import { DepartmentDistributionChart } from "./components/DepartmentDistributionChart";
import {
  fetchEmployeeMetrics,
  fetchEmployeeGrowth,
  fetchDepartmentDistribution,
} from "./data/employeeData";
import { Users, DollarSign, Briefcase } from "lucide-react";
import ChartSkeleton from "@/app/(dashboard)/components/ChartSkeleton";

export default async function EmployeeOverviewPage() {
  return (
    <div className="space-y-8">
      <EmployeeHeader />

      {/* Key Metrics - All in one row */}
      <Suspense fallback={<MetricsSkeleton />}>
        <MetricsSection />
      </Suspense>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Suspense fallback={<ChartSkeleton />}>
          <EmployeeGrowthSection />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <DepartmentDistributionSection />
        </Suspense>
      </div>
    </div>
  );
}

async function MetricsSection() {
  const { totalWorkers, workerTypes, salaryExpenses } = await fetchEmployeeMetrics();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
      <MetricCard title="Total Workers" value={totalWorkers} Icon={Users} iconColor="text-blue-500" />
      <MetricCard title="Employees" value={workerTypes.employees} Icon={Briefcase} iconColor="text-green-500" />
      <MetricCard title="Managers" value={workerTypes.managers} Icon={Briefcase} iconColor="text-purple-500" />
      <MetricCard
        title="Total Salary Expenses"
        value={`$${salaryExpenses.toLocaleString()}`}
        Icon={DollarSign}
        iconColor="text-green-500"
      />
    </div>
  );
}

async function EmployeeGrowthSection() {
  const employeeGrowth = await fetchEmployeeGrowth();
  return <EmployeeGrowthChart data={employeeGrowth} />;
}

async function DepartmentDistributionSection() {
  const departmentDistribution = await fetchDepartmentDistribution();
  return <DepartmentDistributionChart data={departmentDistribution} />;
}

// Placeholder MetricsSkeleton component (you might already have this)
function MetricsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
      <div className="h-24 bg-gray-200 animate-pulse rounded-lg" />
      <div className="h-24 bg-gray-200 animate-pulse rounded-lg" />
      <div className="h-24 bg-gray-200 animate-pulse rounded-lg" />
      <div className="h-24 bg-gray-200 animate-pulse rounded-lg" />
    </div>
  );
}