import { Product, Category, SortConfig, Filters } from "./types/ProductTypes";

export const mockCategories: Category[] = [
  { id: 1, name: "Electronics", productCount: 150 },
  { id: 2, name: "Clothing", productCount: 200 },
  { id: 3, name: "Home & Garden", productCount: 100 },
  { id: 4, name: "Books", productCount: 300 },
  { id: 5, name: "Toys", productCount: 75 },
];

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Smartphone X",
    sku: "PHNE-001",
    barcode: "123456789",
    description: "Latest model smartphone with advanced features",
    price: 699.99,
    cost: 450,
    tax: 0.08,
    supplier: "TechGadgets Inc.",
    warehouse: "Main Warehouse",
    currentStock: 50,
    minStockLevel: 10,
    category: "Electronics",
  },
  {
    id: 2,
    name: "Classic T-Shirt",
    sku: "SHRT-001",
    barcode: "987654321",
    description: "Comfortable cotton t-shirt in various colors",
    price: 19.99,
    cost: 5,
    tax: 0.06,
    supplier: "FashionWear Co.",
    warehouse: "Apparel Storage",
    currentStock: 200,
    minStockLevel: 50,
    category: "Clothing",
  },
];

export const fetchProducts = async (sortConfig: SortConfig): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const sorted = [...mockProducts].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        return sortConfig.direction === "asc"
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue));
      });
      resolve(sorted);
    }, 1000);
  });
};

export const fetchFilteredProducts = async (
  filters: Filters,
  search: string,
  sortConfig: SortConfig,
  page: number,
  itemsPerPage: number
): Promise<{ data: Product[]; total: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = mockProducts.filter((product) => {
        const matchesSearch = Object.values(product).some((value) =>
          String(value).toLowerCase().includes(search.toLowerCase())
        );
        const matchesCategory = filters.category === "all" || product.category === filters.category;
        const matchesStockStatus =
          filters.stockStatus === "all" ||
          (filters.stockStatus === "low" && product.currentStock <= product.minStockLevel) ||
          (filters.stockStatus === "medium" &&
            product.currentStock > product.minStockLevel &&
            product.currentStock <= product.minStockLevel * 2) ||
          (filters.stockStatus === "high" && product.currentStock > product.minStockLevel * 2);

        return matchesSearch && matchesCategory && matchesStockStatus;
      });

      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        return sortConfig.direction === "asc"
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue));
      });

      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const paginatedData = filtered.slice(start, end);

      resolve({
        data: paginatedData,
        total: filtered.length,
      });
    }, 800);
  });
};

export const fetchCategories = async (): Promise<Category[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockCategories]);
    }, 500);
  });
};