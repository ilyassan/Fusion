export interface MonthlyData {
    month: string;
    leads: number;
    conversions: number;
    revenue: number;
  }
  
  export interface PipelineData {
    name: string;
    value: number;
    color: string;
  }
  
  export interface SalesPerformance {
    rep: string;
    deals: number;
    revenue: number;
    conversion: number;
  }
  
  export interface RetentionData {
    month: string;
    rate: number;
  }