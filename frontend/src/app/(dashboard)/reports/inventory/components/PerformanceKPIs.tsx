import { MetricCard } from "../../components/MetricCard";
import { fetchPerformanceData } from "../data/fetchPerformanceData";
import { Package, CheckCircle, Warehouse, Truck } from "lucide-react";

interface PerformanceKPIsProps {
  dateRange: string;
}

export async function PerformanceKPIs({ dateRange }: PerformanceKPIsProps) {
  const performanceData = await fetchPerformanceData(dateRange);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Stock Value"
        value={`$${performanceData.totalStockValue.toLocaleString()}`}
        icon={<Package className="h-6 md:h-8 w-6 md:w-8 text-blue-600" />}
      />
      <MetricCard
        title="Stockout Rate"
        value={`${performanceData.stockoutRate}%`}
        icon={<CheckCircle className="h-6 md:h-8 w-6 md:w-8 text-green-600" />}
      />
      <MetricCard
        title="Total SKUs"
        value={performanceData.totalSKUs.toLocaleString()}
        icon={<Warehouse className="h-6 md:h-8 w-6 md:w-8 text-purple-600" />}
      />
      <MetricCard
        title="Avg. Lead Time"
        value={`${performanceData.avgLeadTime} days`}
        icon={<Truck className="h-6 md:h-8 w-6 md:w-8 text-teal-600" />}
      />
    </div>
  );
}