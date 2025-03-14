export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  tax: number;
  category: string;
}

export interface Category {
  id: number;
  name: string;
  serviceCount: number;
}

export interface Filters {
  category: string;
  priceRange: string;
}

export interface SortConfig {
  key: keyof Service;
  direction: "asc" | "desc";
}