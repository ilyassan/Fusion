export interface PurchaseOrderItem {
  productId: number;
  name: string;
  quantity: number;
  price: number;
}

export interface PurchaseOrder {
  id: string;
  supplierId: number;
  supplierName: string;
  orderDate: string;
  expectedDelivery: string;
  status: "pending" | "received" | "canceled";
  items: PurchaseOrderItem[];
}