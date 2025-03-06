import { MonthlyData, PipelineData, SalesPerformance, RetentionData } from "../types/AnalyticsTypes";

export async function fetchMonthlyData(timePeriod: string): Promise<MonthlyData[]> {
  "use server";
  await new Promise((r) => setTimeout(r, 1000));
  const fullData = [
    { month: "Jan", leads: 120, conversions: 25, revenue: 45000 },
    { month: "Feb", leads: 140, conversions: 30, revenue: 52000 },
    { month: "Mar", leads: 160, conversions: 35, revenue: 58000 },
    { month: "Apr", leads: 180, conversions: 40, revenue: 65000 },
    { month: "May", leads: 200, conversions: 45, revenue: 72000 },
    { month: "Jun", leads: 220, conversions: 50, revenue: 80000 },
  ];
  return fullData.slice(0, timePeriod === "30days" ? 1 : timePeriod === "6months" ? 3 : 6);
}

export async function fetchPipelineData(timePeriod: string): Promise<PipelineData[]> {
  "use server";
  await new Promise((r) => setTimeout(r, 800));
  return [
    { name: "Lead Capture", value: timePeriod === "30days" ? 35 : 45, color: "#4f46e5" },
    { name: "Proposal", value: timePeriod === "30days" ? 25 : 35, color: "#7c3aed" },
    { name: "Negotiation", value: 20, color: "#2563eb" },
    { name: "Closing", value: 20, color: "#0891b2" },
  ];
}

export async function fetchSalesPerformance(timePeriod: string): Promise<SalesPerformance[]> {
  "use server";
  await new Promise((r) => setTimeout(r, 1200));
  const fullData = [
    { rep: "John Smith", deals: 45, revenue: 125000, conversion: 68 },
    { rep: "Sarah Johnson", deals: 52, revenue: 145000, conversion: 72 },
    { rep: "Mike Wilson", deals: 38, revenue: 98000, conversion: 65 },
    { rep: "Emma Davis", deals: 41, revenue: 115000, conversion: 70 },
    { rep: "Tom Brown", deals: 35, revenue: 85000, conversion: 62 },
  ];
  return fullData.slice(0, timePeriod === "30days" ? 3 : 5);
}

export async function fetchRetentionData(timePeriod: string): Promise<RetentionData[]> {
  "use server";
  await new Promise((r) => setTimeout(r, 900));
  const fullData = [
    { month: "Jan", rate: 95 },
    { month: "Feb", rate: 94 },
    { month: "Mar", rate: 96 },
    { month: "Apr", rate: 93 },
    { month: "May", rate: 95 },
    { month: "Jun", rate: 97 },
  ];
  return fullData.slice(0, timePeriod === "30days" ? 1 : timePeriod === "6months" ? 3 : 6);
}