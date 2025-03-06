export interface SalesMetrics {
  totalRevenue: number;
  totalSales: number;
  avgOrderValue: number;
  conversionRate: number;
}

export interface RevenueHistory {
  month: string;
  revenue: number;
}

export interface ProductPerformance {
  product: string;
  sales: number;
}

export interface SalesByChannel {
  channel: string;
  value: number;
}

export interface MonthlyTargets {
  current: number;
  forecast: number;
  previousMonth: number;
}