// deals/data.ts
import { DealsData, Deal, Filters } from "./types/DealTypes"

export const mockDeals: DealsData = {
  // "lead-capture": [
  //   {
  //     id: "1",
  //     name: "Enterprise Software Package",
  //     customer: "Tech Corp",
  //     value: 75000,
  //     priority: "high",
  //     status: "active",
  //     salesRep: "John Smith",
  //     expectedClose: "2024-03-15",
  //     lastActivity: "2024-02-28",
  //     notes: [],
  //     activities: [
  //       { date: "2024-02-28", type: "call", description: "Initial discovery call" },
  //       { date: "2024-02-25", type: "email", description: "Sent product documentation" },
  //     ],
  //   },
  //   {
  //     id: "34",
  //     name: "Enterprise Software Package",
  //     customer: "Tech Corp",
  //     value: 75000,
  //     priority: "low",
  //     status: "active",
  //     salesRep: "John Smith",
  //     expectedClose: "2024-03-15",
  //     lastActivity: "2024-02-28",
  //     notes: [],
  //     activities: [
  //       { date: "2024-02-28", type: "call", description: "Initial discovery call" },
  //       { date: "2024-02-25", type: "email", description: "Sent product documentation" },
  //     ],
  //   },
  //   {
  //     id: "55",
  //     name: "Enterprise Software Package",
  //     customer: "Tech Corp",
  //     value: 75000,
  //     priority: "high",
  //     status: "active",
  //     salesRep: "John Smith",
  //     expectedClose: "2024-03-15",
  //     lastActivity: "2024-02-28",
  //     notes: [],
  //     activities: [
  //       { date: "2024-02-28", type: "call", description: "Initial discovery call" },
  //       { date: "2024-02-25", type: "email", description: "Sent product documentation" },
  //     ],
  //   },
  // ],
  // proposal: [
  //   {
  //     id: "2",
  //     name: "Cloud Migration Project",
  //     customer: "Global Industries",
  //     value: 120000,
  //     priority: "high",
  //     status: "active",
  //     salesRep: "Sarah Johnson",
  //     expectedClose: "2024-04-01",
  //     lastActivity: "2024-02-27",
  //     notes: [
  //       {
  //         date: "2024-02-01",
  //         content: "Interested in our cloud services. Needs a follow up.",
  //         author: "Jane Smith"
  //       }
  //     ],
  //     activities: [{ date: "2024-02-27", type: "meeting", description: "Technical review meeting" }],
  //   },
  // ],
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
      notes: [
        {
          date: "2024-02-01",
          content: "Interested in our cloud services. Needs a follow up.",
          author: "Jane Smith"
        }
      ],
      activities: [{ date: "2024-02-26", type: "call", description: "Price negotiation call" }],
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
      notes: [],
      activities: [{ date: "2024-02-24", type: "email", description: "Payment confirmation sent" }],
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
          ? [deal.name, deal.customer]
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