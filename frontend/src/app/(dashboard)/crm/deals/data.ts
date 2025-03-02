// deals/data.ts
import { DealsData, Deal, Filters } from "./types/DealTypes"

export const mockDeals: DealsData = {
  "lead-capture": [
    {
      id: "1",
      name: "Enterprise Software Package",
      customer: "Tech Corp",
      value: 75000,
      priority: "high",
      status: "active",
      salesRep: "John Smith",
      expectedClose: "2024-03-15",
      lastActivity: "2024-02-28",
      notes: "Client interested in full suite implementation",
      activities: [
        { date: "2024-02-28", type: "call", description: "Initial discovery call" },
        { date: "2024-02-25", type: "email", description: "Sent product documentation" },
      ],
      tasks: [
        { title: "Send proposal", due: "2024-03-05", status: "pending" },
        { title: "Schedule follow-up", due: "2024-03-10", status: "completed" },
      ],
    },
    {
      id: "34",
      name: "Enterprise Software Package",
      customer: "Tech Corp",
      value: 75000,
      priority: "low",
      status: "active",
      salesRep: "John Smith",
      expectedClose: "2024-03-15",
      lastActivity: "2024-02-28",
      notes: "Client interested in full suite implementation",
      activities: [
        { date: "2024-02-28", type: "call", description: "Initial discovery call" },
        { date: "2024-02-25", type: "email", description: "Sent product documentation" },
      ],
      tasks: [
        { title: "Send proposal", due: "2024-03-05", status: "pending" },
        { title: "Schedule follow-up", due: "2024-03-10", status: "completed" },
      ],
    },
    {
      id: "55",
      name: "Enterprise Software Package",
      customer: "Tech Corp",
      value: 75000,
      priority: "high",
      status: "active",
      salesRep: "John Smith",
      expectedClose: "2024-03-15",
      lastActivity: "2024-02-28",
      notes: "Client interested in full suite implementation",
      activities: [
        { date: "2024-02-28", type: "call", description: "Initial discovery call" },
        { date: "2024-02-25", type: "email", description: "Sent product documentation" },
      ],
      tasks: [
        { title: "Send proposal", due: "2024-03-05", status: "pending" },
        { title: "Schedule follow-up", due: "2024-03-10", status: "completed" },
      ],
    },
  ],
  proposal: [
    {
      id: "2",
      name: "Cloud Migration Project",
      customer: "Global Industries",
      value: 120000,
      priority: "high",
      status: "active",
      salesRep: "Sarah Johnson",
      expectedClose: "2024-04-01",
      lastActivity: "2024-02-27",
      notes: "Proposal under review by IT department",
      activities: [{ date: "2024-02-27", type: "meeting", description: "Technical review meeting" }],
      tasks: [{ title: "Technical assessment", due: "2024-03-15", status: "pending" }],
    },
  ],
  negotiation: [
    {
      id: "3",
      name: "Security Suite Upgrade",
      customer: "Finance Corp",
      value: 45000,
      priority: "medium",
      status: "active",
      salesRep: "Mike Wilson",
      expectedClose: "2024-03-20",
      lastActivity: "2024-02-26",
      notes: "Negotiating terms and pricing",
      activities: [{ date: "2024-02-26", type: "call", description: "Price negotiation call" }],
      tasks: [{ title: "Revise pricing", due: "2024-03-08", status: "pending" }],
    },
  ],
  "order-confirmation": [
    {
      id: "4",
      name: "Data Analytics Platform",
      customer: "Retail Solutions",
      value: 95000,
      priority: "medium",
      status: "active",
      salesRep: "Emma Davis",
      expectedClose: "2024-03-10",
      lastActivity: "2024-02-25",
      notes: "Final contract review in progress",
      activities: [{ date: "2024-02-25", type: "email", description: "Sent final contract" }],
      tasks: [{ title: "Contract signing", due: "2024-03-05", status: "pending" }],
    },
  ],
  closing: [
    {
      id: "5",
      name: "API Integration Service",
      customer: "E-commerce Pro",
      value: 35000,
      priority: "low",
      status: "active",
      salesRep: "Tom Brown",
      expectedClose: "2024-03-05",
      lastActivity: "2024-02-24",
      notes: "Payment processing",
      activities: [{ date: "2024-02-24", type: "email", description: "Payment confirmation sent" }],
      tasks: [{ title: "Process payment", due: "2024-03-01", status: "completed" }],
    },
  ],
}

export const priorityColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-green-100 text-green-800",
}

export const fetchDeals = async (): Promise<Deal[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Flatten the deals from all stages
      const allDeals = Object.values(mockDeals).flat();
      resolve(allDeals);
    }, 1000); // 1-second delay to simulate initial fetch
  });
};

export const fetchFilteredDeals = async (
  filters: Filters,
  search: string
): Promise<Deal[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Flatten the deals from all stages
      let filteredDeals = Object.values(mockDeals).flat();

      // Apply filters
      filteredDeals = filteredDeals.filter((deal) => {
        const matchesSearch = search
          ? [deal.name, deal.customer, deal.salesRep, deal.notes]
              .some((field) => field.toLowerCase().includes(search.toLowerCase()))
          : true;

        const matchesPriority = filters.priority
          ? deal.priority === filters.priority
          : true;

        const matchesFromDate = filters.fromDate
          ? new Date(deal.expectedClose) >= filters.fromDate
          : true;

        const matchesToDate = filters.toDate
          ? new Date(deal.expectedClose) <= filters.toDate
          : true;

        const matchesDateRange = matchesFromDate && matchesToDate;

        return matchesSearch && matchesPriority && matchesDateRange && matchesDateRange;
      });

      resolve(filteredDeals);
    }, 800); // 0.8-second delay for filtered fetch
  });
};