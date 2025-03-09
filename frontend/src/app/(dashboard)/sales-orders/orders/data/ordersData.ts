import { Order, Filters, SortConfig, ActivityLog } from "../types/ordersTypes";

export const mockOrders: Order[] = Array.from({ length: 100 }, (_, i) => {
  const id = `ORD${String(i + 1).padStart(3, "0")}`;
  const isProduct = i % 2 === 0;
  const day = (i % 31) + 1; // Cap at 31 days
  const month = i < 31 ? "03" : "04"; // Switch to April after 31
  return {
    id,
    customerName: i < 3 ? ["John Doe", "Jane Smith", "Bob Johnson"][i] : `Customer ${i + 1}`,
    type: isProduct ? "Product" : "Service",
    itemName: isProduct ? (i === 0 ? "Laptop" : i === 2 ? "Smartphone" : "Generic Product") : (i === 1 ? "Website Design" : "Generic Service"),
    quantity: isProduct ? (i === 2 ? 2 : 1) : "N/A",
    price: i < 3 ? [999.99, 1500, 1599.98][i] : (i + 1) * 10,
    orderDate: `2024-${month}-${String(day).padStart(2, "0")}`, // Valid dates: "2024-03-01" to "2024-04-31"
    status: i % 5 === 0 ? "Completed" : i % 3 === 0 ? "Canceled" : "Pending",
    email: `${i < 3 ? ["john.doe", "jane.smith", "bob.johnson"][i] : `customer${i + 1}`}@example.com`,
    phone: `+1 234-567-89${String(i).padStart(2, "0")}`,
    ...(isProduct
      ? {
          shippingAddress: `${i + 1} Main St, Town${i + 1}, ST 12345`,
          shippingMethod: i % 2 === 0 ? "Standard" : "Express",
        }
      : {
          scheduledDate: `2024-${month}-${String((day + 14) % 31 || 31).padStart(2, "0")}`,
          serviceDescription: i === 1 ? "Custom e-commerce website design and development" : `Service description ${i + 1}`,
        }),
    activityLog: [
      { action: "Created", by: "admin", at: `2024-${month}-${String(day).padStart(2, "0")}T10:00:00Z` },
      ...(i % 3 === 0
        ? [{ action: "Updated", by: "user", at: `2024-${month}-${String((day + 1) % 31 || 31).padStart(2, "0")}T12:00:00Z` }]
        : []),
      ...(i % 5 === 0 || i % 3 === 0
        ? [{ action: "Status Changed", by: "system", at: `2024-${month}-${String((day + 1) % 31 || 31).padStart(2, "0")}T12:30:00Z` }]
        : []),
    ] as ActivityLog[],
  };
});

export async function fetchOrders(): Promise<Order[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockOrders;
}

export async function fetchFilteredOrders(
  search: string,
  filters: Filters,
  sortConfig: SortConfig,
  page: number,
  itemsPerPage: number
): Promise<{ data: Order[]; total: number }> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  let filteredOrders = [...mockOrders];

  if (search) {
    const searchLower = search.toLowerCase();
    filteredOrders = filteredOrders.filter(
      (order) =>
        order.id.toLowerCase().includes(searchLower) ||
        order.customerName.toLowerCase().includes(searchLower) ||
        order.itemName.toLowerCase().includes(searchLower)
    );
  }

  if (filters.orderType !== "All") {
    filteredOrders = filteredOrders.filter((order) => order.type === filters.orderType);
  }

  if (filters.status !== "All") {
    filteredOrders = filteredOrders.filter((order) => order.status === filters.status);
  }

  if (filters.dateFrom) {
    filteredOrders = filteredOrders.filter((order) => order.orderDate >= filters.dateFrom);
  }

  if (filters.dateTo) {
    filteredOrders = filteredOrders.filter((order) => order.orderDate <= filters.dateTo);
  }

  filteredOrders.sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortConfig.direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
    }
    return 0;
  });

  const total = filteredOrders.length;
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedOrders = filteredOrders.slice(start, end);

  return { data: paginatedOrders, total };
}

export async function updateOrder(id: string, updatedOrder: Partial<Order>): Promise<Order> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const orderIndex = mockOrders.findIndex((order) => order.id === id);
  if (orderIndex === -1) throw new Error("Order not found");

  // Ensure activityLog is included and merged correctly
  const currentOrder = mockOrders[orderIndex];
  const newOrder = {
    ...currentOrder,
    ...updatedOrder,
    activityLog: updatedOrder.activityLog || currentOrder.activityLog, // Preserve or update activityLog
  };

  mockOrders[orderIndex] = newOrder;
  return newOrder;
}