import { SalesMetrics, RevenueHistory, ProductPerformance, SalesByChannel, MonthlyTargets } from "../types/salesTypes";

export async function fetchSalesMetrics(): Promise<SalesMetrics> {
  "use server";
  await new Promise((r) => setTimeout(r, 800)); // Simulate fetch
  return {
    totalRevenue: 850000,
    totalSales: 1234,
    avgOrderValue: 689,
    conversionRate: 3.2,
  };
}

export async function fetchRevenueHistory(): Promise<RevenueHistory[]> {
  "use server";
  await new Promise((r) => setTimeout(r, 1000)); // Simulate fetch
  return [
    { month: "Jan", revenue: 120000 },
    { month: "Feb", revenue: 140000 },
    { month: "Mar", revenue: 160000 },
    { month: "Apr", revenue: 155000 },
    { month: "May", revenue: 180000 },
    { month: "Jun", revenue: 195000 },
  ];
}

export async function fetchProductPerformance(): Promise<ProductPerformance[]> {
  "use server";
  await new Promise((r) => setTimeout(r, 1000)); // Simulate fetch
  return [
    { product: "Product A", sales: 450 },
    { product: "Product B", sales: 380 },
    { product: "Product C", sales: 290 },
    { product: "Product D", sales: 240 },
    { product: "Product E", sales: 190 },
  ];
}

export async function fetchSalesByChannel(): Promise<SalesByChannel[]> {
  "use server";
  await new Promise((r) => setTimeout(r, 1000)); // Simulate fetch
  return [
    { channel: "Direct", value: 45 },
    { channel: "Online", value: 35 },
    { channel: "Partners", value: 20 },
  ];
}

export async function fetchMonthlyTargets(): Promise<MonthlyTargets> {
  "use server";
  await new Promise((r) => setTimeout(r, 1000)); // Simulate fetch
  return {
    current: 195000,
    forecast: 200000,
    previousMonth: 180000,
  };
}