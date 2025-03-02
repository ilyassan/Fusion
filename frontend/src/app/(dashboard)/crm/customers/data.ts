import { Customer, SortConfig, Filters } from "./types/CustomerTypes"; // Adjust path as needed

export const mockCustomers: Customer[] = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@techcorp.com",
    company: "Tech Corp",
    type: "Organization",
    status: "Active",
    lastContact: "2024-01-15",
    deals: 3,
    value: 15000,
    phone: "+1 (555) 123-4567",
    address: "123 Tech Street, San Francisco, CA",
    timeline: [
      { date: "2024-01-15", type: "call", description: "Quarterly review call" },
      { date: "2024-01-01", type: "email", description: "Sent proposal for new project" },
      { date: "2023-12-15", type: "meeting", description: "On-site meeting to discuss requirements" },
    ],
    notes: [
      { 
        date: "2024-01-15", 
        content: "Key decision maker for enterprise deals",
        author: "John Doe" 
      }
    ],
  },
  {
    id: 2,
    name: "Alice Johnson",
    email: "alice.j@innovate.io",
    company: "Innovate Solutions",
    type: "Organization",
    status: "Active",
    lastContact: "2024-02-01",
    deals: 1,
    value: 5000,
    phone: "+1 (415) 555-9876",
    address: "456 Innovation Ave, Palo Alto, CA",
    timeline: [
      { date: "2024-02-01", type: "email", description: "Initial inquiry about services" },
      { date: "2024-01-25", type: "meeting", description: "Introductory meeting." },
    ],
    notes: [
      {
        date: "2024-02-01",
        content: "Interested in our cloud services. Needs a follow up.",
        author: "Jane Smith"
      }
    ],
  },
  {
    id: 3,
    name: "Bob Williams",
    email: "bob.w@freelance.net",
    company: null,
    type: "Individual",
    status: "Active",
    lastContact: "2024-01-20",
    deals: 2,
    value: 8000,
    phone: "+1 (650) 555-2345",
    address: "789 Freelance Lane, Mountain View, CA",
    timeline: [
      {date: "2024-01-20", type: "call", description: "Follow-up on a contract"},
      {date: "2024-01-10", type: "email", description: "Sent contract proposal"},
    ],
    notes: [
      {
        date: "2024-01-20",
        content: "Freelance developer looking for ongoing project opportunities.",
        author: "John Doe"
      }
    ],
  },
  {
    id: 4,
    name: "Samantha Lee",
    email: "s.lee@globalcorp.com",
    company: "Global Corp",
    type: "Organization",
    status: "Active",
    lastContact: "2023-12-20",
    deals: 5,
    value: 30000,
    phone: "+1 (212) 555-8765",
    address: "100 Main Street, New York, NY",
    timeline: [
      { date: "2023-12-20", type: "meeting", description: "Annual partnership review." },
      { date: "2023-12-05", type: "email", description: "Sent contract renewal terms" },
    ],
    notes: [
      {
        date: "2023-12-20",
        content: "Key account, requires careful handling and personalized communication.",
        author: "John Doe"
      }
    ],
  },
  {
    id: 5,
    name: "David Chen",
    email: "d.chen@startup.co",
    company: "Startup Co",
    type: "Organization",
    status: "Inactive",
    lastContact: "2023-11-15",
    deals: 0,
    value: 0,
    phone: "+1 (310) 555-4321",
    address: "222 Launchpad Blvd, Los Angeles, CA",
    timeline: [
      { date: "2023-11-15", type: "call", description: "Initial outreach call." },
      { date: "2023-10-25", type: "email", description: "Sent introductory email." },
    ],
    notes: [
      {
        date: "2023-11-15",
        content: "Not currently looking for solutions but might be in the future.",
        author: "Jane Smith"
      }
    ],
  },
];

export const fetchCustomers = async (sortConfig: SortConfig): Promise<Customer[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const sorted = [...mockCustomers].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (aValue == null) return 1;
        if (bValue == null) return -1;
        if (aValue == null && bValue == null) return 0;

        const strA = String(aValue).toLowerCase();
        const strB = String(bValue).toLowerCase();

        return sortConfig.direction === "asc"
          ? strA.localeCompare(strB)
          : strB.localeCompare(strA);
      });
      resolve(sorted);
    }, 1000); // 1 second delay for initial fetch
  });
};

export const fetchFilteredCustomers = async (
  filters: Filters,
  search: string,
  sortConfig: SortConfig,
  page: number,
  itemsPerPage: number
): Promise<{ data: Customer[]; total: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = mockCustomers.filter((customer) => {
        const matchesSearch = Object.values(customer).some((value) =>
          String(value).toLowerCase().includes(search.toLowerCase())
        );
        const matchesType = filters.type === "all" || customer.type === filters.type;
        const matchesStatus = filters.status === "all" || customer.status === filters.status;
        return matchesSearch && matchesType && matchesStatus;
      });

      // Sort the filtered data
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (aValue == null) return 1;
        if (bValue == null) return -1;
        if (aValue == null && bValue == null) return 0;

        const strA = String(aValue).toLowerCase();
        const strB = String(bValue).toLowerCase();

        return sortConfig.direction === "asc"
          ? strA.localeCompare(strB)
          : strB.localeCompare(strA);
      });

      // Apply pagination
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const paginatedData = filtered.slice(start, end);

      resolve({
        data: paginatedData,
        total: filtered.length,
      });
    }, 800); // 0.8 second delay for filtering
  });
};