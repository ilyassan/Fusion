"use server";

export interface ProductService {
  name: string;
  value: number;
}

export async function fetchProductServiceData(): Promise<ProductService[]> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  return [
    { name: "Products", value: 75 },
    { name: "Services", value: 25 },
  ];
}