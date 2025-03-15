// warehouses/data/mockData.ts
import { Warehouse, Product, StockLevel } from "../types/WarehouseTypes";

export const mockProducts: Product[] = [
  { id: 1, name: "Smartphone X", price: 499.99 },
  { id: 2, name: "Laptop Pro", price: 1499.99 },
  { id: 3, name: "Wireless Earbuds", price: 79.99 },
];

export const mockWarehouses: Warehouse[] = [
  {
    id: 1,
    name: "Main Warehouse",
    location: "New York, NY",
    capacity: 10000,
    capacityUnit: "m²",
    contact: "John Doe",
    phone: "+1 (555) 123-4567",
    email: "john.doe@warehouse.com",
    totalItems: 5678,
    totalValue: 234567.89,
    utilizationRate: 75,
  },
  {
    id: 2,
    name: "West Coast Distribution",
    location: "Los Angeles, CA",
    capacity: 8000,
    capacityUnit: "m²",
    contact: "Jane Smith",
    phone: "+1 (555) 987-6543",
    email: "jane.smith@warehouse.com",
    totalItems: 3456,
    totalValue: 178901.23,
    utilizationRate: 60,
  },
  {
    id: 3,
    name: "Midwest Fulfillment",
    location: "Chicago, IL",
    capacity: 6000,
    capacityUnit: "m²",
    contact: "Mike Johnson",
    phone: "+1 (555) 456-7890",
    email: "mike.johnson@warehouse.com",
    totalItems: 2345,
    totalValue: 98765.43,
    utilizationRate: 45,
  },
];

export const mockStockLevels: StockLevel[] = [
  { warehouseId: 1, productId: 1, productName: "Smartphone X", quantity: 500, value: 249999.5 },
  { warehouseId: 1, productId: 2, productName: "Laptop Pro", quantity: 200, value: 299999.0 },
  { warehouseId: 2, productId: 1, productName: "Smartphone X", quantity: 300, value: 149999.7 },
  { warehouseId: 2, productId: 3, productName: "Wireless Earbuds", quantity: 1000, value: 79999.0 },
  { warehouseId: 3, productId: 2, productName: "Laptop Pro", quantity: 150, value: 224999.25 },
  { warehouseId: 3, productId: 3, productName: "Wireless Earbuds", quantity: 500, value: 39999.5 },
];