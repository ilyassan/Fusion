import { PurchaseOrder } from "./types/PurchaseTypes";

export const availableProducts = [
  { id: 1, name: "Laptops", price: 1200 },
  { id: 2, name: "Phones", price: 800 },
  { id: 3, name: "Tablets", price: 500 },
  { id: 4, name: "Paper", price: 5 },
  { id: 5, name: "Pens", price: 2 },
  { id: 6, name: "Furniture", price: 300 },
];

export const mockSuppliers = [
  {
    id: 1,
    name: "Tech Supplies Co",
    email: "contact@techsupplies.com",
    phone: "555-0123",
    address: "123 Tech Street",
    productsSupplied: [1, 2, 3],
  },
  {
    id: 2,
    name: "Office Essentials Ltd",
    email: "sales@officeessentials.com",
    phone: "555-0124",
    address: "456 Office Avenue",
    productsSupplied: [4, 5, 6],
  },
];

export const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: "PO-001",
    supplierId: 1,
    supplierName: "Tech Supplies Co",
    orderDate: "2024-02-01",
    expectedDelivery: "2024-02-15",
    status: "pending",
    items: [
      { productId: 1, name: "Laptops", quantity: 10, price: 1200 },
      { productId: 2, name: "Phones", quantity: 20, price: 800 },
    ],
  },
  {
    id: "PO-002",
    supplierId: 2,
    supplierName: "Office Essentials Ltd",
    orderDate: "2024-02-05",
    expectedDelivery: "2024-02-20",
    status: "received",
    items: [{ productId: 6, name: "Furniture", quantity: 20, price: 300 }],
  },
];

export const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  received: "bg-blue-100 text-blue-800",
  canceled: "bg-red-100 text-red-800",
};