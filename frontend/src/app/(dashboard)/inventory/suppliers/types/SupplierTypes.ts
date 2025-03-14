export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface Supplier {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  productsSupplied: number[];
}