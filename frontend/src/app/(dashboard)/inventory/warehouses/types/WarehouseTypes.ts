export interface Warehouse {
  id: number;
  name: string;
  location: string;
  capacity: number;
  capacityUnit: "m²" | "ft²" | "yd²";
  contact: string;
  phone: string;
  email: string;
  totalItems: number;
  totalValue: number;
  utilizationRate: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface StockLevel {
  warehouseId: number;
  productId: number;
  productName: string;
  quantity: number;
  value: number;
}

export interface TransferFormData {
  sourceWarehouse: string;
  destinationWarehouse: string;
  product: string;
  quantity: string;
}