// movements/data/mockData.ts
import { Product, Supplier, StockMovement } from "../types/MovementTypes";

export const mockProducts: Product[] = [
  { id: 1, name: "Product A", image: "/product-a.jpg" },
  { id: 2, name: "Product B", image: "/product-b.jpg" },
  { id: 3, name: "Product C", image: "/product-c.jpg" },
];

export const mockSuppliers: Supplier[] = [
  { id: 1, name: "Supplier X" },
  { id: 2, name: "Supplier Y" },
  { id: 3, name: "Supplier Z" },
];

export const mockStockMovements: StockMovement[] = [
  {
    id: 1,
    date: "2023-06-01T10:30:00Z",
    productName: "Product A",
    movementType: "New Stock",
    quantity: 100,
    user: "John Doe",
    supplier: "Supplier X",
    notes: "Initial stock order",
  },
  {
    id: 2,
    date: "2023-06-02T14:45:00Z",
    productName: "Product B",
    movementType: "Consumption",
    quantity: -50,
    user: "Jane Smith",
    notes: "Used in production",
  },
  {
    id: 3,
    date: "2023-06-03T09:15:00Z",
    productName: "Product C",
    movementType: "Damage",
    quantity: -10,
    user: "Mike Johnson",
    notes: "Damaged during transportation",
  },
];