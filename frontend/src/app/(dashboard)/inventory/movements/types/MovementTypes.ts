export interface Product {
  id: number;
  name: string;
  image: string;
}

export interface Supplier {
  id: number;
  name: string;
}

export interface StockMovement {
  id: number;
  date: string;
  productName: string;
  movementType: "New Stock" | "Consumption" | "Damage" | "Loss" | "Correction";
  quantity: number;
  user: string;
  supplier?: string;
  notes?: string;
}

export interface NewMovementFormData {
  product: string;
  quantity: string;
  movementType: string;
  date: Date;
  supplier?: string;
  notes?: string;
}