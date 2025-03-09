export interface Order {
  id: string;
  customerName: string;
  type: "Product" | "Service";
  itemName: string;
  quantity: number | "N/A";
  price: number;
  orderDate: string;
  status: "Pending" | "Completed" | "Canceled";
  email: string;
  phone: string;
  shippingAddress?: string;
  shippingMethod?: "Standard" | "Express";
  scheduledDate?: string;
  serviceDescription?: string;
  activityLog: ActivityLog[];
}

export interface Filters {
  orderType: "All" | "Product" | "Service";
  status: "All" | "Pending" | "Completed" | "Canceled";
  dateFrom: string;
  dateTo: string;
}

export interface SortConfig {
  key: keyof Order;
  direction: "asc" | "desc";
}

export interface ActivityLog {
  action: "Created" | "Updated" | "Status Changed";
  by: string;
  at: string;
}