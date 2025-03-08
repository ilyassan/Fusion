export interface Sale {
    id: number;
    date: string;
    customer: string;
    company: string;
    product: string;
    category: string;
    quantity: number;
    amount: number;
    status: "Completed" | "Pending" | "Shipped" | "Processing";
    createdBy: string;
    createdAt: string;
    updatedBy?: string;
    updatedAt?: string;
    coupon?: string;
  }
  
  export interface Filters {
    category: string;
    dateFrom: string;
    dateTo: string;
  }
  
  export interface SortConfig {
    key: keyof Sale;
    direction: "asc" | "desc";
  }
  
  export interface TrendData {
    date: string;
    sales: number;
  }
  
  export interface ActivityLog {
    action: "Created" | "Updated";
    by: string;
    at: string;
    changes?: Partial<Sale>;
  }
  
  export interface Product {
    name: string;
    price: number;
    category: string;
  }
  
  export interface Coupon {
    code: string;
    discountPercentage: number;
  }