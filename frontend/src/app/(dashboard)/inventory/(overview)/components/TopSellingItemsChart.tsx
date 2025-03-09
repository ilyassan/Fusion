import { ChartCard } from "@/app/(dashboard)/reports/components/ChartCard";
import { fetchTopSellingItemsData } from "../data/fetchTopSellingItemsData";
import { BarChartComponent } from "./BarChartComponent";

export async function TopSellingItemsChart() {
  const topSellingItems = await fetchTopSellingItemsData();

  return (
    <ChartCard title="Top Selling Items" description="Best performing products by sales volume">
        <BarChartComponent topSellingItems={topSellingItems}/>
    </ChartCard>
  );
}