import { Sale, TrendData, Product, Coupon, Filters, SortConfig } from "../types/salesTypes";

const mockSalesData: Sale[] = [
  { id: 1, date: "2024-03-01", customer: "John Doe", company: "TechCorp", product: "Laptop", category: "Electronics", quantity: 1, amount: 1200, status: "Completed", createdBy: "admin", createdAt: "2024-03-01T10:00:00Z" },
  { id: 2, date: "2024-03-05", customer: "Jane Smith", company: "FashionInc", product: "T-Shirt", category: "Clothing", quantity: 2, amount: 50, status: "Pending", createdBy: "admin", createdAt: "2024-03-05T12:00:00Z" },
  { id: 3, date: "2024-03-10", customer: "Peter Jones", company: "Foodies", product: "Pizza", category: "Food", quantity: 3, amount: 45, status: "Completed", createdBy: "user1", createdAt: "2024-03-10T15:00:00Z" },
  // ... (other mock data updated similarly with company, quantity, createdBy, createdAt)
];

const products: Product[] = [
  { name: "Laptop", price: 1200, category: "Electronics" },
  { name: "T-Shirt", price: 25, category: "Clothing" },
  { name: "Pizza", price: 15, category: "Food" },
  { name: "Novel", price: 20, category: "Books" },
  { name: "Basketball", price: 50, category: "Sports" },
];

const coupons: Coupon[] = [
  { code: "SAVE10", discountPercentage: 10 },
  { code: "SAVE20", discountPercentage: 20 },
];

export async function fetchSales(): Promise<Sale[]> {
  await new Promise((r) => setTimeout(r, 1000));
  return mockSalesData;
}

export async function fetchFilteredSales(
  search: string,
  filters: Filters,
  sortConfig: SortConfig,
  page: number,
  itemsPerPage: number
): Promise<{ data: Sale[]; total: number }> {
  await new Promise((r) => setTimeout(r, 1000));
  let filtered = [...mockSalesData];

  if (search) {
    const lowerSearch = search.toLowerCase();
    filtered = filtered.filter(sale =>
      Object.values(sale).some(value => String(value).toLowerCase().includes(lowerSearch))
    );
  }

  if (filters.category && filters.category !== "all") {
    filtered = filtered.filter(sale => sale.category === filters.category);
  }

  if (filters.dateFrom) {
    filtered = filtered.filter(sale => sale.date >= filters.dateFrom);
  }

  if (filters.dateTo) {
    filtered = filtered.filter(sale => sale.date <= filters.dateTo);
  }

  filtered.sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue === undefined && bValue === undefined) return 0;
    if (aValue === undefined) return sortConfig.direction === "asc" ? 1 : -1;
    if (bValue === undefined) return sortConfig.direction === "asc" ? -1 : 1;

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortConfig.direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginated = filtered.slice(start, end);

  return { data: paginated, total: filtered.length };
}

export async function fetchTrendData(): Promise<TrendData[]> {
  await new Promise((r) => setTimeout(r, 1000));
  return [
    { date: "2024-03-01", sales: 1200 },
    { date: "2024-03-08", sales: 1500 },
    { date: "2024-03-15", sales: 1800 },
    { date: "2024-03-22", sales: 2100 },
    { date: "2024-03-29", sales: 2400 },
    { date: "2024-04-05", sales: 2700 },
    { date: "2024-04-12", sales: 3000 },
    { date: "2024-04-19", sales: 3300 },
    { date: "2024-04-26", sales: 3600 },
  ];
}

const customersData = [
  { name: "John Doe", company: "TechCorp" },
  { name: "Jane Smith", company: "FashionInc" },
  { name: "Peter Jones", company: "Foodies" },
];

export async function fetchCustomers(): Promise<{ name: string; company: string }[]> {
  await new Promise((r) => setTimeout(r, 500));
  return customersData;
}

export async function fetchProducts(): Promise<Product[]> {
  await new Promise((r) => setTimeout(r, 500));
  return products;
}

export async function fetchCoupons(): Promise<Coupon[]> {
  await new Promise((r) => setTimeout(r, 500));
  return coupons;
}

export async function addSale(newSale: Omit<Sale, "id" | "createdBy" | "createdAt">): Promise<Sale> {
  await new Promise((r) => setTimeout(r, 1000));
  const sale: Sale = {
    ...newSale,
    id: mockSalesData.length + 1,
    createdBy: "currentUser", // Replace with actual user logic
    createdAt: new Date().toISOString(),
  };
  mockSalesData.push(sale);
  return sale;
}

export async function updateSale(id: number, updatedSale: Partial<Sale>): Promise<Sale> {
  await new Promise((r) => setTimeout(r, 1000));
  const index = mockSalesData.findIndex(sale => sale.id === id);
  if (index === -1) throw new Error("Sale not found");
  const sale = mockSalesData[index];
  const newSale = {
    ...sale,
    ...updatedSale,
    updatedBy: "currentUser", // Replace with actual user logic
    updatedAt: new Date().toISOString(),
  };
  mockSalesData[index] = newSale;
  return newSale;
}