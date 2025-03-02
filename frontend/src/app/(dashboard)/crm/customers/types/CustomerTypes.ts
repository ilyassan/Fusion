export interface Customer {
    id: number;
    name: string;
    email: string;
    company: string | null;
    type: "Individual" | "Organization";
    status: "Active" | "Inactive";
    lastContact: string;
    deals: number;
    value: number;
    phone: string;
    address: string;
    timeline: {
      date: string;
      type: "call" | "email" | "meeting";
      description: string;
    }[];
    notes: {
      date: string;
      content: string;
      author: string;
    }[];
  }
  
  export interface SortConfig {
    key: keyof Customer;
    direction: "asc" | "desc";
  }
  
  export interface Filters {
    type: "all" | "Individual" | "Organization";
    status: "all" | "Active" | "Inactive";
  }