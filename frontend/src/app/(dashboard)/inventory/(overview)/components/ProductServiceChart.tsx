import { ChartCard } from "@/app/(dashboard)/reports/components/ChartCard";
import { fetchProductServiceData } from "../data/fetchProductServiceData";
import PieChart from "./PieChart";

export async function ProductServiceChart() {

  const productServiceData = await fetchProductServiceData();
    
  return (
    <ChartCard title="Products vs Services" description="Revenue distribution">
        <PieChart productServiceData={productServiceData}/>
    </ChartCard>
  );
}