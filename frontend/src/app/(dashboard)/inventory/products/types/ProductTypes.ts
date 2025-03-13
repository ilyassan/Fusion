export interface Product {
  id: number;
  name: string;
  sku: string;
  barcode: string;
  description: string;
  price: number;
  cost: number;
  tax: number;
  supplier: string;
  warehouse: string;
  currentStock: number;
  minStockLevel: number;
  category: string;
}

export interface Category {
  id: number;
  name: string;
  productCount: number;
}

export interface Filters {
  category: string;
  stockStatus: string;
}

export interface SortConfig {
  key: keyof Product;
  direction: "asc" | "desc";
}